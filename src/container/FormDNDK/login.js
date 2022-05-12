import React from 'react'
import login from '../../CSS/Login.module.css'
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import LogoBaby from '../../img/baby.png';
import PropTypes from 'prop-types';
import SignUp from './signup';

function AccessToken(username, password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": username,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://103.74.123.192:8080/api/user/login", requestOptions)
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json()
            }
            throw Error(response.status)
        })
        .then(result => {
            localStorage.setItem("token", result.token)
            localStorage.setItem("roles", result.roles)
            window.location.href = '/home'
        })
        .catch(error => {
            console.log('error', error)
            alert("email, password are wrong")
        });
}

export default function Login() {
    const [passwordShow, setPasswordShow] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [popupLogin, setPopupLogin] = useState(false);
    const togglePassword = () => {
        setPasswordShow(!passwordShow);
    };
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const handleChange = ((e) => {
        if (e.key === "Enter") {
            document.getElementById("myBtn").click()
        }
    })
    return (
        <div>
            <div id={login.main}>
                <div id={login.content} >
                    <div className={login.contentSection}>
                        <div className={login.contentHeader}>
                            <img src={LogoBaby} alt="Logo em bé" className={login.babyImage} />
                            <h1 className={login.contentHeading}>Đăng nhập</h1>
                        </div>
                        <div className={login.contentBody}>
                            <div className={login.userName}>
                                <label>Tên đăng nhập:</label>
                                <input onChange={e => {
                                    if (e.target.value.includes('@gmail.com') === false && e.target.value !== 'admin') {
                                        setUserName(e.target.value + '@gmail.com')
                                    }
                                    else setUserName(e.target.value)
                                }}
                                    id="inputTDN" type="text"
                                    placeholder="Vui lòng nhập tên đăng nhập"
                                    onFocus={
                                        () => {
                                            document.getElementById("errorLog").style.display = 'none';
                                        }
                                    }
                                    onKeyPress={handleChange}
                                />
                                <p id="errorLog" hidden> <strong style={{ color: 'red', fontSize: '12px' }} >
                                    Tên đăng nhập không được để trống !!! </strong></p>
                            </div>
                            <div className={login.password}>
                                <label>Mật khẩu:</label>
                                <div className={login.inputWithIcon}>
                                    <input onChange={e => setPassword(e.target.value)} type={passwordShow ? "text" : "password"}
                                        placeholder="Vui lòng nhập mật khẩu"
                                        onKeyPress={handleChange}
                                    />
                                    <button className={`${login.btn} ${login.eyeIcon}`} onClick={togglePassword}>
                                        {passwordShow ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>

                                <Link to="/resetPass" style={{ textDecoration: "underline" }} in react>
                                    Quên mật khẩu
                                </Link>
                                <div>
                                    <button id="myBtn" className={login.signInBtn} onClick={() => {
                                        AccessToken(username, password)
                                        if (document.getElementById("inputTDN").value.trim() === '')
                                            document.getElementById("errorLog").style.display = 'block'
                                    }
                                    }>
                                        Đăng nhập
                                    </button>
                                </div>
                                <p>
                                    Hoặc đăng ký tài khoản
                                    <Link to="/signup" > Đăng ký</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
};