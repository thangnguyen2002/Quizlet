import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss"
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useState, useEffect } from "react";
import { getAllUsers, getUsersPagniate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPagniate from "./TableUserPaginate";

const ManageUser = () => {
    const USER_LIMIT = 3    
    const [pageCount, setPageCount] = useState(0) //khoi tao = 0 de neu ko co user nao thi ko hien thanh phan trang
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

    const [dataUpdate, setDataUpdate] = useState({}) //state nay chua info cac truong email, username,.. de cho vao modal update

    // const [listUser, setListUser] = useState([
    //     {
    //         "id": 21,
    //         "username": "nam",
    //         "email": "da@gmail.com",
    //         "role": "USER",
    //         "image": ""
    //     },
    //     {
    //         "id": 16,
    //         "username": "thang",
    //         "email": "dsdada@gmail.com",
    //         "role": "USER",
    //         "image": ""
    //     }
    // ])
    const [listUser, setListUser] = useState([])

    useEffect(() => { //de render ra DOM phan <thead/> truoc, tuc la thuc hien phan return truoc roi moi chay useEffect, [] nghia la` useEffect nay chi chay dung 1 lan dau tien sau khi render giao dien
        // console.log('useEffect');

        // fetchListUser()
        fetchListUserWithPagniate(1) //lay user tai trang dau tien
    }, [])

    const fetchListUser = async () => { //ngta thuong ko dung async await trong useEffect de dam bao code trong useEffect chay theo tung dong 1
        let res = await getAllUsers() //goi API
        // console.log(res);
        if (res.EC === 0) {
            setListUser(res.DT) //cap nhat lai state listUser -> giao dien re-render
        }
    }

    const fetchListUserWithPagniate = async (page) => { 
        let res = await getUsersPagniate(page, USER_LIMIT) 
        if (res.EC === 0) {
            // console.log('res.DT: ', res.DT);
            setListUser(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickBtnUpdate = (user) => {
        // console.log('check update user: ', user); //object info user dc click update btn
        setShowModalUpdateUser(true)
        setDataUpdate(user)
    }

    const handleClickBtnView = (user) => {
        // console.log(user);
        setShowModalViewUser(true)
        setDataUpdate(user)
    }

    const handleClickBtnDelete = (user) => {
        // console.log(user);
        setShowModalDeleteUser(true)
        setDataUpdate(user)
    }

    return (
        <div className="manage-user-container">
            <div className="user-title">
                Add User
            </div>
            
            <div className="user-content">
                <div className="btn-add-new">
                    <button 
                        className="btn btn-primary"
                         onClick={() => setShowModalCreateUser(true)}> 
                         <FcPlus /> Add new user
                    </button>
                    {/* function can truyen tham so thi can co () => */}
                </div>
                <div>
                    {/* <TableUser 
                        listUser={listUser} 
                        handleClickBtnUpdate={handleClickBtnUpdate} 
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        /> */}
                    
                    <TableUserPagniate
                        listUser={listUser} 
                        handleClickBtnUpdate={handleClickBtnUpdate} 
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUserWithPagniate={fetchListUserWithPagniate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPagniate={fetchListUserWithPagniate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    setDataUpdate={setDataUpdate}
                    fetchListUserWithPagniate={fetchListUserWithPagniate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    setDataUpdate={setDataUpdate}
                    fetchListUserWithPagniate={fetchListUserWithPagniate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default ManageUser;