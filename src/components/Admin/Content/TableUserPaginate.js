import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

const TableUserPagniate = (props) => {
    const { listUser, handleClickBtnUpdate, handleClickBtnView, handleClickBtnDelete, fetchListUserWithPagniate, pageCount, currentPage, setCurrentPage } = props // = const listUser = props.listUser

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1) //cap nhat lai trang hien tai dang o trang nao
        fetchListUserWithPagniate(+event.selected + 1) //co the day la string ma` string + number = string => ep sang number 
        // console.log(`User requested page number ${event.selected}`);//thu vien selected xac dinh trang hien tai dang la bao nhieu nay tinh tu 0
      };

    // console.log('render view');

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* dkien if() ko dung dc trong return nen phai dung dkien && kieu nay*/}
                    {(listUser && listUser.length > 0) &&
                        listUser.map((user) => {
                            return (
                                <tr key={`table-users-${user.id}`}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => handleClickBtnView(user)}>View</button>
                                        <button className="btn btn-warning mx-3" onClick={() => handleClickBtnUpdate(user)}>Update</button>
                                        {/* prop la 1 function thi luon luon phai co ()=>tenFunc() */}
                                        <button className="btn btn-danger" onClick={() => handleClickBtnDelete(user)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={5}>Not Found Data</td>
                        </tr>
                    }
                </tbody>
            </table>
            
            <div className="user-pagination">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    // pageCount={0} //pageCount=0 tuc la ko co user nao thi ko hien thanh phan trang
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1} //cap nhat lai thanh phan trang
                    //vi` thu vien paginate nay trang tinh tu 0, forcePage can biet trang hien tai nen ta tao state currentPage o cha la ManageUser
                />
            </div>
        </>
    );
}

export default TableUserPagniate;