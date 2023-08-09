import { useSelector } from 'react-redux';
import videoHome from '../../assets/video-1920.webm'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    // console.log(isAuthenticated);

    const { t } = useTranslation();
    // console.log(t('homepage.title1'));

    return (
        <div className='home-container'>
            <div className='home-video'>
                <video autoPlay muted loop>
                    <source src={videoHome} />
                </video>
            </div>

            <div className="home-content">
                <div className="text-header">
                    {t('homepage.title1')}
                </div>
                <div className="text-content">
                    {t('homepage.title2')}
                </div>
                <div className="title3">
                    {isAuthenticated === false ?
                        <button className="text-btn" onClick={() => navigate('/login')}>{t('homepage.title3.login')}</button>
                        :
                        <button className="text-btn" onClick={() => navigate('/users')}>{t('homepage.title4')}</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;