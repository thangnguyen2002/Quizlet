import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';

const ModalCreateUser = (props) => {
  const { show, setShow, fetchListUser, fetchListUserWithPagniate, setCurrentPage } = props

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState(""); //state nay de upload thong tin cua img dc upload len server
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
    setShow(false)
    setEmail("")
    setUsername("")
    setPassword("")
    setRole("USER")
    setImage("")
    setPreviewImage("")
  };
  // const handleShow = () => setShow(true);

  const handleUploadImage = (e) => {
    // console.log(e.target.files[0])
    // e.target la the image
    if (e.target && e.target.files && e.target.files[0]) { //de phong ng dung da upload lan dau, 
      // lan t2 an vao upload nhung lai ko upload thi cung ko xay ra loi gi, va anh cu~ cua lan upload t1 van o do'
      // tuc la chi khi ng dung upload img thi moi thuc hien trong nay
      setPreviewImage(URL.createObjectURL(e.target.files[0]))
      // URL.createObjectURL(e.target.files[0]) chinh la url cua img

      setImage(e.target.files[0])
      // console.log(e.target.files[0]); //chinh la cac thong tin cua image dc upload

      // console.log(e.target.files); //kieu FileList
      // console.log(e.target); //chinh la the input type="file"
      // console.log(e.target.files[0]); //kieu File (phan tu thu 0 (luc nao upload file len server cung ghi ntn))

    } else { //else thi ko xet gi
      // setPreviewImage("")
    }
  }

  const validateEmail = (email) => { //ham nay return true neu email dung
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUser = async () => {
    // Validate
    const isValidEmail = validateEmail(email)
    if (!isValidEmail) {
      toast.error('Invalid email')
      return //ko thuc hien phia duoi
    }

    if (!password) {
      toast.error('Invalid password')
      return
    }

    //goi api ton tgian => async await
    let data = await postCreateNewUser(email, password, username, role, image)
    // console.log(">>>component: ", data); //phai wait res thuc hien xong roi moi log ra dc

    if (data && data.EC === 0) {
      toast.success(data.EM)
      handleClose()
      // await fetchListUser() //sau khi them moi user thanh cong -> close modal -> goi ham fetchListUser de re-render lai giao dien
      // khi goi ham tu child len parent phai co ()

      setCurrentPage(1)
      await fetchListUserWithPagniate(1)

    } else {
      toast.error(data.EM)
    }
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Add new user
      </Button> */}

      <Modal show={show} onHide={handleClose} backdrop="static" size="lg" className='modal-container'>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
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
          <Button variant="primary" onClick={handleSubmitCreateUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser