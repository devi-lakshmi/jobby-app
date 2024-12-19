import React from 'react'
import { useState } from 'react';
import Header from '../Header';
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import './style.css';



const Login = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',

    });


    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    // const [isShowPassword, setIsShowPassword] = useState(false);

    const { username, password } = form;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
        return <Navigate to="/" />;
    }

    const handleOnChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setErrorMessage(null);
        if (username === "" || password === "") {
            setErrorMessage('*username and password required');
        }

        const url = "https://apis.ccbp.in/login";
        const options = {
            method: 'POST',
            body: JSON.stringify(form),
        }
        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok === true) {
                //Store the token in cookies
                Cookies.set('jwt_token', data.jwt_token, { expires: 30 });
                setIsLoginSuccess(true);
                navigate("/");
            }
            else {
                setErrorMessage(data.error_msg || "login failed");
            }
        } catch (error) {
            setErrorMessage('something went wrong');
        }

    };
    return (
        <div>
            <div className='login-form-container'>

                <form className='form-login' onSubmit={handleSubmit}>
                    <div>
                        <img className="app-logo" src="https://assets.ccbp.in/frontend/react-js/logo-img.png " alt="website logo" />
                    </div>
                    <div>
                        <label className='input-label' htmlFor='Username'>USERNAME</label>
                        <input type="text"
                            name="username"
                            value={username}
                            onChange={handleOnChange}
                            placeholder="username"
                            className='input-form' />
                    </div>
                    <div>
                        <label className='input-label' htmlFor='Password'>PASSWORD</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="password"
                            className='input-form' />
                    </div>
                    <button className="login-btn" type="submit" >Login</button>
                    {errorMessage && <p className='errormsg'>{errorMessage}</p>}
                </form>
            </div>


        </div>
    )
}

export default Login;