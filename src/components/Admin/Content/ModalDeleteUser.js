import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../services/apiService';
import _ from 'lodash';

const ModalDeleteUser = (props) => {
    const { show, setShow, fetchListUser, dataUpdate, setDataUpdate, fetchListUserWithPagniate, setCurrentPage } = props
    
    const handleClose = () => {
        setShow(false)
        setEmail("")
        setDataUpdate({}) //de cho = {} rong vi useEffect o file nay phu thuoc vao dataUpdate tuc la chi no chi chay lai khi dataUpdate bi thay doi
        // neu ko reset {} thanh rong thi dataUpdate se van nhu cu~ ko he thay doi khi click vao update btn, tuc la useEffect se ko chay lai (co the check tab Components cua react de hieu ro)
    };

    const [email, setEmail] = useState("");

    useEffect(() => {
        // console.log('data update: ', dataUpdate); //ban dau dataUpdate chi la 1 object rong, chi khi click update btn moi get ra info user cua tk dc click vao trong object cua state
        // console.log('update useEffect');
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email)
        }
    }, [dataUpdate])
    //moi khi state dataUpdate thay doi, useEffect dc chay lai de set data cho update modal

    const handleSubmitDeleteUser = async () => {
        let data = await deleteUser(dataUpdate.id)
        // console.log(">>>component: ", data);

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            // await fetchListUser()

            setCurrentPage(1)
            await fetchListUserWithPagniate(1)

        } else {
            toast.error(data.EM)
        }
    }

    //   console.log('render update modal');

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" size="lg" className='modal-container'>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <p>Are you sure you want to delete this user email <strong>{email}</strong>?</p>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser