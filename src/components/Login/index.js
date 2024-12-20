// import React from 'react'
import { useState, useEffect } from 'react';

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
    // eslint-disable-next-line no-unused-vars
    // const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    // const [isShowPassword, setIsShowPassword] = useState(false);
    const [isAutoLoginAttempted, setIsAutoLoginAttempted] = useState(false);

    const { username, password } = form;
    const jwtToken = Cookies.get("jwt_token");
    // if (jwtToken !== undefined) {
    //     return <Navigate to="/" />;
    // }


    useEffect(() => {
        const autoLogin = async () => {
            if (jwtToken !== undefined) {
                return <Navigate to="/" />;
            }

            const username = process.env.REACT_APP_API_USERNAME;
            const password = process.env.REACT_APP_API_PASSWORD;

            if (username && password) {
                const url = "https://apis.ccbp.in/login";
                const options = {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                try {
                    const response = await fetch(url, options);
                    const data = await response.json();

                    if (response.ok === true) {
                        //Store the token in cookies
                        Cookies.set('jwt_token', data.jwt_token, { expires: 30 });
                        // setIsLoginSuccess(true);
                        navigate("/");
                    }
                    else {
                        setErrorMessage(data.error_msg || "Auto-login failed. Please log in manually.");
                    }
                } catch (error) {
                    setErrorMessage('something went wrong');
                }
            }

            setIsAutoLoginAttempted(true);

        };
        autoLogin();
    }, [navigate, jwtToken]);


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
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                Cookies.set('jwt_token', data.jwt_token, { expires: 30 });
                navigate("/");
            } else {
                setErrorMessage(data.error_msg || "Login failed");
            }
        } catch (error) {
            setErrorMessage("Something went wrong during login.");
        }
    };
    return (
        //         <div>
        //             <div className='login-form-container'>

        //                 <form className='form-login' onSubmit={handleSubmit}>
        //                     <div>
        //                         <img className="app-logo" src="https://assets.ccbp.in/frontend/react-js/logo-img.png " alt="website logo" />
        //                     </div>
        //                     <div>
        //                         <label className='input-label' htmlFor='Username'>USERNAME</label>
        //                         <input type="text"
        //                             name="username"
        //                             value={username}
        //                             onChange={handleOnChange}
        //                             placeholder="username"
        //                             className='input-form' />
        //                     </div>
        //                     <div>
        //                         <label className='input-label' htmlFor='Password'>PASSWORD</label>
        //                         <input
        //                             type="password"
        //                             name="password"
        //                             value={password}
        //                             onChange={handleOnChange}
        //                             placeholder="password"
        //                             className='input-form' />
        //                     </div>
        //                     <button className="login-btn" type="submit" >Login</button>
        //                     {errorMessage && <p className='errormsg'>{errorMessage}</p>}
        //                 </form>
        //             </div>


        //         </div>
        //     )
        // }
        <div>
            <div className='login-form-container'>
                {!isAutoLoginAttempted ? (
                    <div className="form-login">
                        <p>Attempting to log in automatically...</p>
                    </div>
                ) : (
                    <form className='form-login' onSubmit={handleSubmit}>
                        <div>
                            <img
                                className="app-logo"
                                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                                alt="website logo"
                            />
                        </div>
                        <div>
                            <label className='input-label' htmlFor='username'>USERNAME</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleOnChange}
                                placeholder="username"
                                className='input-form'
                            />
                        </div>
                        <div>
                            <label className='input-label' htmlFor='password'>PASSWORD</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleOnChange}
                                placeholder="password"
                                className='input-form'
                            />
                        </div>
                        <button className="login-btn" type="submit">Login</button>
                        {errorMessage && <p className='errormsg'>{errorMessage}</p>}
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;