import React from 'react'
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService'
import { useEffect, useState } from 'react'
import Select from 'react-select';
import { toast } from 'react-toastify';

const AssignQuiz = () => {
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [listQuiz, setListQuiz] = useState([])

    const [selectedUser, setSelectedUser] = useState({})
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        fetchQuiz()
        fetchUsers()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        // console.log('res: ', res)
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id, //gtri
                    label: `${item.id} - ${item.name}` //ten hien thi
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const fetchUsers = async () => { //ngta thuong ko dung async await trong useEffect de dam bao code trong useEffect chay theo tung dong 1
        let res = await getAllUsers() //goi API
        // console.log(res);
        if (res && res.EC === 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(users)
        }
    }
    // console.log('listUser: ', listUser);

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className='assign-quiz-container row'>
            <div className="col-6">
                <label>Select Quiz:</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className="col-6">
                <label>Select users:</label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button
                    className='btn btn-warning mt-3'
                    onClick={handleAssign}
                >Assign</button>
            </div>
        </div>
    )
}

export default AssignQuiz