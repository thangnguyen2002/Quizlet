
const TableUser = (props) => {
    const { listUser, handleClickBtnUpdate, handleClickBtnView, handleClickBtnDelete } = props // = const listUser = props.listUser

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
                            <td colSpan={4}>Not Found Data</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    );
}

export default TableUser;