
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaHome, FaBriefcase, FaSignOutAlt } from 'react-icons/fa';
import './style.css';

const Header = () => {

    const navigate = useNavigate();

    const onClickLogout = () => {
        Cookies.remove('jwt_token');
        navigate('/login', { replace: true });

    }

    return (
        <div className='container'>

            <div>
                <Link to="/" >
                    <img className="app-logo" src="https://assets.ccbp.in/frontend/react-js/logo-img.png " alt="website logo" />
                </Link>

            </div>
            <div className='header-items'>

                <Link to="/" className='header-link'>
                    <FaHome className='nav-icon' />
                    <span className='nav-text'>Home </span>
                </Link>
                <Link to="/jobs" className='header-link'>
                    <FaBriefcase className='nav-icon' />
                    <span className='nav-text'>Jobs</span>
                </Link>
            </div>


            <button type="button" className="header-button" onClick={onClickLogout}>
                <FaSignOutAlt className='nav-icon' />
                <span className='nav-text'>Logout</span>
            </button>

        </div>
    )
}
export default Header;