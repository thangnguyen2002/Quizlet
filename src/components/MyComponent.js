import { useState } from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";

const MyComponent = () => {
    const [listUsers, setListUsers] = useState(
        [
            { id: 1, name: 'Duc Thang', age: '20' },
            { id: 2, name: 'Henry', age: '15' },
            { id: 3, name: 'Kelvin', age: '10' },
        ]
    )

    const handleAddNewUser = (userObj) => {
        // console.log(userObj);
        setListUsers([userObj, ...listUsers])
    }

    const handleDeleteUser = (userId) => {
        let listUsersClone = listUsers
        listUsersClone = listUsersClone.filter(item => item.id !== userId)
        setListUsers(listUsersClone)
    }

    return (
        <>
            <br />
            <AddUserInfo
                handleAddNewUser={handleAddNewUser}
            />
            <br />
            <DisplayInfo
                listUsers={listUsers}
                handleDeleteUser={handleDeleteUser}
            />
        </>
    );
}

export default MyComponent;