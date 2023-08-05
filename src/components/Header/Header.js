import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { postLogOut } from '../../services/apiService';
import { doLogOut } from '../../redux/action/userAction';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate()
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)
  // console.log('acount: ', account);
  // console.log('isAuthenticated: ', isAuthenticated);

  const dispatch = useDispatch()

  const handleLogin = () => {
    navigate("/login")
  }

  const handleRegister = () => {
    navigate("/register")
  }

  const handleLogOut = async () => {
    let res = await postLogOut(account.email, account.refresh_token)
    console.log('res: ', res); //logout succeed => delete data in redux
    if (res && res.EC === 0) {
      //clear data redux
      dispatch(doLogOut())
      toast.success(res.EM)
      navigate('/login')

    } else { //when postLogOut don't have either 2 filed -> error
      toast.error(res.EM)
    }


  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* <Navbar.Brand href="#home">QUIZZ</Navbar.Brand> */}
        <NavLink to={'/'} className='navbar-brand'>QUIZZ</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={'/'} className='nav-link'>Home</NavLink>
            <NavLink to={'/users'} className='nav-link'>Users</NavLink>
            <NavLink to={'/admins'} className='nav-link'>Admin</NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ?
              <>
                <button className='btn-login' onClick={handleLogin}>Log in</button>
                <button className='btn-signup' onClick={handleRegister}>Sign up</button>
              </>
              :
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                {/* <NavDropdown.Item>Log in</NavDropdown.Item> */}
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogOut}>Log out</NavDropdown.Item>
              </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;