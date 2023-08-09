import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { postLogOut } from '../../services/apiService';
import { doLogOut } from '../../redux/action/userAction';
import { toast } from 'react-toastify';
import Language from './Language';
import { useTranslation } from 'react-i18next';
import { FaReact } from "react-icons/fa";
import { useState } from 'react';
import Profile from './Profile';

const Header = () => {
  const navigate = useNavigate()
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)
  // console.log('acount: ', account);
  // console.log('isAuthenticated: ', isAuthenticated);

  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch()
  const { t } = useTranslation();

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
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          {/* <Navbar.Brand href="#home">QUIZZ</Navbar.Brand> */}
          <NavLink to={'/'} className='navbar-brand'>
            <FaReact className='header-icon' />
            QUIZZ
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to={'/'} className='nav-link'>{t('header.title1')}</NavLink>
              <NavLink to={'/users'} className='nav-link'>{t('header.title2')}</NavLink>
              <NavLink to={'/admins'} className='nav-link'>{t('header.title3')}</NavLink>

            </Nav>
            <Nav>
              {isAuthenticated === false ?
                <>
                  <button className='btn-login' onClick={handleLogin}>{t('header.title4')}</button>
                  <button className='btn-signup' onClick={handleRegister} style={{ marginRight: 10 }}>{t('header.title5')}</button>
                </>
                :
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                  {/* <NavDropdown.Item>Log in</NavDropdown.Item> */}
                  <NavDropdown.Item onClick={() => setModalShow(true)}>{t('header.title6')}</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogOut}>{t('header.title7')}</NavDropdown.Item>

                </NavDropdown>
              }

              <Language />

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>

  );
}

export default Header;