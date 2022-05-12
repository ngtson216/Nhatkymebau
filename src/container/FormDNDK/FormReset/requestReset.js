import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';
import login from '../../../CSS/Login.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import LogoBaby from '../../../img/baby.png';
export default function ReqReset(props) {
    const [username, setUserName] = useState();
    const [item, setItem] = useState([])
    const handleChange = ((e) => {
        if (e.key === "Enter") {
            document.getElementById("myBtn").click()
        }
    })
    var sendData = (p) => {
        props.parentCallback(p)
    }
    var sendData2 = (p) => {
        props.parentCallback2(p)
    }
    var sendData3 = (p) => {
        props.parentCallback3(p)
    }
    const url = "http://103.74.123.192:8080/api/user"
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-auth-token", localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setItem(result);
                },
            )
    }, [])
    var userList = item.map(function (item) {
        return {
            email: item.email,
            id: item._id
        }
    })
    function SendRequest(email) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://103.74.123.192:8080/api/user/request-reset", requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result === 'An OTP sent to your email account') {
                    alert('Đã gửi mã OTP về email, vui lòng kiểm tra email')
                    sendData2(false)
                    sendData3(true)
                }
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }
    return (
        <div>
            <Link to="/" >
                <IoMdArrowRoundBack style={{
                    marginTop: '10px',
                    width: '100px',
                    height: '30px'
                }} onClick={() => {

                }} />
            </Link>
            <div id={login.main}>
                <div id={login.content} >
                    <div className={login.contentSection}>
                        <div className={login.contentHeader}>
                            <img src={LogoBaby} alt="Logo em bé" className={login.babyImage} />
                            <h1 className={login.contentHeading}>Quên mật khẩu</h1>
                            <p className={login.contentHeading} style={{
                                marginTop: '40px'
                            }}>Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng ký
                                <strong style={{ color: 'red', fontSize: '14px' }} > (*)</strong></p>
                        </div>
                        <div className={login.contentBody}>
                            <div className={login.userName}>
                                <label>Email:</label>
                                <input onChange={e => {
                                    if (e.target.value.includes('@gmail.com') === false && e.target.value !== 'admin') {
                                        setUserName(e.target.value + '@gmail.com')
                                    }
                                    else setUserName(e.target.value)
                                }}
                                    id="inputTDN" type="text"
                                    placeholder="Vui lòng nhập email"
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
                            <button id="myBtn" className={login.signInBtn} onClick={() => {
                                var check
                                for (let i = 0; i < userList.length; i++) {
                                    if (username === userList[i].email && username !== 'admin') {
                                        SendRequest(username)
                                        sendData(userList[i].id)
                                        check = 1
                                        break
                                    }
                                    else {
                                        check = 0
                                    }
                                }
                                if (check === 0)
                                    alert('Email không đúng, vui lòng thử lại!!')
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
