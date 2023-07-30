import { useSelector } from 'react-redux';
import videoHome from '../../assets/video-1920.webm'
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()

    // console.log(isAuthenticated);

    return (
        <div className='home-container'>
            <div className='home-video'>
                <video autoPlay muted loop>
                    <source src={videoHome} />
                </video>
            </div>

            <div className="home-content">
                <div className="text-header">There's a better way to ask</div>
                <div className="text-content">You don't want to make a boring form. And your audience won't answer one. Create a typeform instead—and make everyone happy.</div>
                {isAuthenticated === false ?
                    <button className="text-btn" onClick={() => navigate('/login')}>Get started - it's free</button>
                    :
                    <button className="text-btn" onClick={() => navigate('/users')}>Doing Quiz</button>
                }
            </div>
        </div>
    );
}

export default Home;