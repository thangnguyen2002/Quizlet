import { useState } from 'react';
import './Register.scss'
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiService';
import { toast } from 'react-toastify';
import { RiEyeCloseFill } from "react-icons/ri"
import { ImEye } from "react-icons/im"
import Language from '../Header/Language';

const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const [isShowPassword, setIsShowPassword] = useState(false)

    const validateEmail = (email) => { //ham nay return true neu email dung
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        // Validate
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error('Invalid email')
            return
        }

        if (!password) {
            toast.error('Invalid password')
            return
        }

        // submit apis
        let data = await postRegister(email, password, username)
        // console.log('dat: ', data);
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/login')

        } else {
            toast.error(data.EM)
        }
    }

    const handleKeyDown = (e) => {
        // console.log(e);
        if (e && e.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <div className="register-container">
            <div className="header">
                <span>Already have an account?</span>
                <button className='sign-up' onClick={() => navigate('/login')}>Log in</button>
                <Language />
            </div>

            <div className="title">
                Quizzes
            </div>

            <div className="welcome">
                Start your journey?
            </div>

            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email (*)</label>
                    <input type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                </div>

                <div className="form-group pass-group">
                    <label>Password (*)</label>
                    <input type={isShowPassword ? 'text' : 'password'}
                        className="form-control" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />

                    {isShowPassword ?
                        <span className='icons-eye' onClick={() => setIsShowPassword(false)}>
                            <ImEye />
                        </span>
                        :
                        <span className='icons-eye' onClick={() => setIsShowPassword(true)}>
                            <RiEyeCloseFill />
                        </span>
                    }
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                </div>

                <div>
                    <button className='btn-submit' onClick={handleLogin}>Create my free account</button>
                </div>

                <div className='text-center'>
                    <span className='back' onClick={() => navigate('/')}>&lt;&lt; Go to home page</span>
                </div>
            </div>

        </div>
    );
}

export default Register;