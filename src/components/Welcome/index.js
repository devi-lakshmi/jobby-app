import React from 'react'
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div>
            <Link to="/login" className='header-link'>Login</Link>
        </div>
    )
}

export default Welcome;
