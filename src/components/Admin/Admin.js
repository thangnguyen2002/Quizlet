import Sidebar from "./Sidebar";
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { NavDropdown } from "react-bootstrap";
import Language from "../Header/Language";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postLogOut } from "../../services/apiService";
import { doLogOut } from "../../redux/action/userAction";

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const account = useSelector(state => state.user.account)

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
        <div className="admin-container">
            <div className="admin-sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <Language />

                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogOut}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
}

export default Admin;