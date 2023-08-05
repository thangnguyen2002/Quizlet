import { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { RiEyeCloseFill } from "react-icons/ri"
import { ImEye } from "react-icons/im"
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner2 } from "react-icons/im";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

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

        setIsLoading(true)

        // submit apis
        let data = await postLogin(email, password)
        // console.log('dat: ', data);
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM)
            setIsLoading(false)
            navigate('/')

        } else {
            toast.error(data.EM)
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        // console.log(e);
        if (e && e.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <div className="login-container">
            <div className="header">
                <span>Don't have an account yet?</span>
                <button className='sign-up' onClick={() => navigate('/register')}>Sign up</button>
            </div>

            <div className="title">
                Quizzes
            </div>

            <div className="welcome">
                Hello, who's this?
            </div>

            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                </div>

                <div className="form-group pass-group">
                    <label>Password</label>
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

                <span className='forgot-pw'>Forgot password?</span>

                <div>
                    <button className='btn-submit'
                        onClick={handleLogin} disabled={isLoading}>
                        {isLoading === true && <ImSpinner2 className='loaderIcon' />}
                        <span>Log in to Quizzes</span>
                    </button>
                </div>

                <div className='text-center'>
                    <span className='back' onClick={() => navigate('/')}>&lt;&lt; Go to home page</span>
                </div>
            </div>

        </div>
    );
}

export default Login;