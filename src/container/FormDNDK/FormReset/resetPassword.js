import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import login from '../../../CSS/Login.module.css'
import { useState } from 'react';
import LogoBaby from '../../../img/baby.png';
function Reset(pass, id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("password", pass);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://103.74.123.192:8080/api/user/reset-password/" + id, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result === 'password reset sucessfully.') {
                alert('Thay đổi mật khẩu thành công')
                window.location.reload()
                console.log(result)
            }
        })
        .catch(error => console.log('error', error));
}

export default function ResetPassword(props) {
    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordShow1, setPasswordShow1] = useState(false);
    const togglePassword = () => {
        setPasswordShow(!passwordShow);
    };
    const togglePassword1 = () => {
        setPasswordShow1(!passwordShow1);
    };
    const [password, setPassword] = useState();
    const [password1, setPassword1] = useState();
    const [otp, setOTP] = useState();
    const handleChange = ((e) => {
        if (e.key === "Enter") {
            document.getElementById("myBtn").click()
        }
    })
    var sendData2 = (p) => {
        props.parentCallback2(p)
    }
    var sendData3 = (p) => {
        props.parentCallback3(p)
    }
    return (
        <div>
            <IoMdArrowRoundBack style={{
                marginTop: '10px',
                width: '100px',
                height: '30px'
            }} onClick={() => {
                sendData2(true)
                sendData3(false)
            }} />
            <div id={login.main}>
                <div id={login.content} >
                    <div className={login.contentSection}>
                        <div className={login.contentHeader}>
                            <img src={LogoBaby} alt="Logo em bé" className={login.babyImage} />
                            <h1 className={login.contentHeading}>Quên mật khẩu</h1>
                        </div>
                        <div className={login.contentBody}>
                            <div className={login.password}>
                                <label>Nhập mật khẩu mới:</label>
                                <div className={login.inputWithIcon}>
                                    <input onChange={e => setPassword(e.target.value)} type={passwordShow ? "text" : "password"}
                                        placeholder="Vui lòng nhập mật khẩu"
                                        onKeyPress={handleChange}
                                    />
                                    <button className={`${login.btn} ${login.eyeIcon}`} onClick={togglePassword}>
                                        {passwordShow ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                                <label>Nhập lại mật khẩu:</label>
                                <div className={login.inputWithIcon}>
                                    <input onChange={e => setPassword1(e.target.value)} type={passwordShow1 ? "text" : "password"}
                                        placeholder="Xác nhận mật khẩu"
                                        onKeyPress={handleChange}
                                    />
                                    <button className={`${login.btn} ${login.eyeIcon}`} onClick={togglePassword1}>
                                        {passwordShow1 ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                                <label>Mã xác thực:</label>
                                <input onChange={e => {
                                    setOTP(e.target.value)
                                }}
                                id="inputTDN" type="text"
                                placeholder="Vui lòng nhập mã xác thực đã được gửi về email"
                                />
                            </div>
                            <button className={login.signInBtn} onClick={() => {
                                if (password !== password1 || otp.toLowerCase() !== props.dataFromParent) {
                                    alert('Mật khẩu không trùng khớp')
                                }
                                else {
                                    Reset(password, props.dataFromParent)
                                }
                            }}>
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
