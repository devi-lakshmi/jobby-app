// import React from 'react'
import { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import './style.css';



const Login = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',

    });


    const [errorMessage, setErrorMessage] = useState(null);

    // // eslint-disable-next-line no-unused-vars
    // const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    // const [isAutoLoginAttempted, setIsAutoLoginAttempted] = useState(false);
    const { username, password } = form;
    const jwtToken = Cookies.get("jwt_token");
    console.log("jwtToken", jwtToken)

    // useEffect(() => {
    //     const autoLogin = async () => {
    //         if (jwtToken !== undefined) {
    //             navigate("/");
    //             return; // Prevent further execution
    //         }
    //         console.log("Attempting automatic login...");
    //         const username = "rahul";
    //         const password = "rahul@2021";

    //         try {
    //             const url = "https://apis.ccbp.in/login";
    //             const options = {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ username, password }),
    //             };

    //             const response = await fetch(url, options);
    //             if (!response.ok) {
    //                 // Handle non-200 responses
    //                 const data = await response.json();
    //                 console.error("Auto-login failed:", data.error_msg || "Unknown error");
    //                 setErrorMessage(data.error_msg || "Auto-login failed.");
    //             } else {
    //                 const data = await response.json();
    //                 console.log("Auto-login successful:", data);
    //                 Cookies.set('jwt_token', data.jwt_token, { expires: 30 });
    //                 navigate("/");
    //             }
    //         } catch (error) {
    //             console.error("Error during auto-login:", error);
    //             setErrorMessage("Something went wrong during auto-login.");
    //         }

    //         setIsAutoLoginAttempted(true); // Ensure this state is updated
    //     };

    //     autoLogin();
    // }, [jwtToken, navigate]);

    if (jwtToken !== undefined) {
        console.log("jwtToken", jwtToken)
        navigate("/");
        return;
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

        <div>
            <div className='login-form-container'>
                {/* {!isAutoLoginAttempted ? (
                    <div className="form-login">
                        <p>Attempting to log in automatically...</p>
                    </div>
                ) : ( */}
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
                            value={username}
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
                            value={password}
                            onChange={handleOnChange}
                            placeholder="password"
                            className='input-form'
                        />
                    </div>
                    <button className="login-btn" type="submit">Login</button>
                    {errorMessage && <p className='errormsg'>{errorMessage}</p>}
                </form>

            </div>
        </div>
    );
};

export default Login;