import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiService';
import _ from 'lodash';

const ModalUpdateUser = (props) => {
    const { show, setShow, fetchListUser, dataUpdate, setDataUpdate, fetchListUserWithPagniate, currentPage } = props

    const handleClose = () => {
        setShow(false)
        setEmail("")
        setUsername("")
        setPassword("")
        setRole("USER")
        setImage("")
        setPreviewImage("")
        setDataUpdate({}) //de cho = {} rong vi useEffect o file nay phu thuoc vao dataUpdate tuc la chi no chi chay lai khi dataUpdate bi thay doi
        // neu ko reset {} thanh rong thi dataUpdate se van nhu cu~ ko he thay doi khi click vao update btn, tuc la useEffect se ko chay lai (co the check tab Components cua react de hieu ro)
    };

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState(""); //state nay de upload thong tin cua img dc upload len server
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        // console.log('data update: ', dataUpdate); //ban dau dataUpdate chi la 1 object rong, chi khi click update btn moi get ra info user cua tk dc click vao trong object cua state
        // console.log('update useEffect');
        if (!_.isEmpty(dataUpdate)) { //khi click btn update luc y moi co data cua user do' -> lay data user do' setState cho email, username, role, previewImage
            setEmail(dataUpdate.email)
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role)
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`) //decode image o dang based 64
            }
        }
    }, [dataUpdate])
    //moi khi state dataUpdate thay doi, useEffect dc chay lai de set data cho update modal

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        } else {

        }
    }

    const handleSubmitUpdateUser = async () => {
        let data = await putUpdateUser(dataUpdate.id, username, role, image)
        console.log(">>>component: ", data);

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            // await fetchListUser()
            
            await fetchListUserWithPagniate(currentPage)

        } else {
            toast.error(data.EM)
        }
    }

    //   console.log('render update modal');

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" size="lg" className='modal-container'>
                <Modal.Header closeButton>
                    <Modal.Title>Update new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label upload-img" htmlFor='upload-img'>
                                <FcPlus /> Upload File Image
                            </label>
                            <input type="file" id='upload-img' hidden onChange={handleUploadImage} />
                        </div>
                        {/* previewImage tuc la co gtri hoac la true hoac khac rong hoac khac null */}
                        <div className="col-md-12 preview-img">
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdateUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser