import React from 'react'
import signUp from '../../CSS/SignUp.module.scss'
import login from '../../CSS/Login.module.css'
import LogoBaby from '../../img/baby.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import style from '../../CSS/newsignup.module.scss'
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { MarginOutlined } from '@mui/icons-material'
import { IoMdArrowRoundBack } from 'react-icons/io';
function SignUpApi(Name, Phone, Address, IdCard, DOB, CityBox, DistBox, WardBox, Email, Password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", Name);
    urlencoded.append("email", Email);
    urlencoded.append("password", Password);
    urlencoded.append("phone", Phone);
    urlencoded.append("idCard", IdCard);
    urlencoded.append("address", Address);
    urlencoded.append("ward", WardBox);
    urlencoded.append("district", DistBox);
    urlencoded.append("city", CityBox);
    urlencoded.append("DOB", DOB);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://103.74.123.192:8080/api/user/register", requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result === 'User with given email already exist!') {
                alert('Email này đã được đăng ký, vui lòng thử lại!!')
            }
            else if (result === 'An Email sent to your account please verify') {
                alert('Đăng ký thành công, hãy kiểm tra email để xác thực')
            }
            console.log(result)
        })
        .catch(error => console.log('error', error));
}

export default function SignUp() {
    const sex = [
        'Nam',
        'Nữ'
    ]
    const useStyles = makeStyles({
        root: {
            "& .MuiOutlinedInput-root": {
                borderRadius: 10,
                padding: 0,
                border: 0,
                paddingRight: 0,
            },
            "& .MuiInputBase-root": {
                border: 'black 1px',
                width: '90%',
                color: 'black',
            },
            "& .MuiAutocomplete-root": {
                padding: 0,
            },
        },
    });
    const classes = useStyles();
    const [getCity, setGetCity] = useState([])
    const [getDisAPI, setGetDisAPI] = useState([])
    const [getDis, setGetDis] = useState([])
    const [getWardAPI, setGetWardAPI] = useState([])
    const [getWard, setGetWard] = useState([])
    const [getCityBox, setCityBox] = useState()
    const [getDistBox, setDistBox] = useState()
    const [getWardBox, setWardBox] = useState()
    const [getIdCard, setIdCard] = useState()
    const [getName, setName] = useState()
    const [getAddress, setAddress] = useState()
    const [getPhone, setPhone] = useState()
    const [getSex, setSex] = useState()
    const [getDOB, setDOB] = useState()
    const [getEmail, setEmail] = useState()
    const [getPassword, setPassword] = useState()
    const [passwordShow, setPasswordShow] = useState(false);
    const togglePassword = () => {
        setPasswordShow(!passwordShow);
    };
    const url = "https://provinces.open-api.vn/api/p"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setGetCity(result);
                },
            )
    }, [])
    var city = getCity.map(function (item) {
        return {
            label: item.name,
            id: item.code
        }
    });
    return (
        <div style={{
            color: '#000000',
        }}>
            <Link to="/" >
                <IoMdArrowRoundBack style={{
                    marginTop: '10px',
                    width: '100px',
                    height: '30px'
                }} onClick={() => {

                }} />
            </Link>

            <div className={login.contentHeader}>
                <img src={LogoBaby} alt="Logo em bé" className={login.babyImage} />
                <h1 className={login.contentHeading}>Đăng Ký </h1>
            </div>
            <h3 style={{
                paddingTop: '40px',
                paddingLeft: '4%'
            }}>1. Thông tin cá nhân:</h3>
            <div style={{
                paddingLeft: '5%',
                paddingRight: '5%',
                paddingTop: '10px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr'
            }}>
                <div>
                    <div>
                        <label>Họ và Tên:</label>
                        <br></br>
                        <input className={style.inputForm}
                            placeholder='Vui lòng nhập họ và tên'
                            onChange={e => setName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Số điện thoại:</label>
                        <br></br>
                        <input className={style.inputForm}
                            placeholder='Vui lòng nhập số điện thoại'
                            onChange={e => setPhone(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Địa chỉ:</label>
                        <br></br>
                        <input className={style.inputForm}
                            placeholder='Vui lòng nhập địa chỉ'
                            onChange={e => setAddress(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div>
                    <div>
                        <label>CMND/CCCD:</label>
                        <br></br>
                        <input className={style.inputForm}
                            placeholder='Vui lòng nhập CMND hoặc CCCD'
                            onChange={e => setIdCard(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Ngày sinh:</label>
                        <br></br>
                        <input className={style.inputForm}
                            placeholder='Vui lòng nhập ngày sinh theo định dạng dd-mm-yyyy'
                            onChange={e => setDOB(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Giới tính:</label>
                        <Autocomplete
                            options={sex}
                            onChange={(event, value) => {
                                setSex(value.label)
                            }}
                            className={classes.root}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Vui lòng chọn giới tính' />}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Tỉnh/Thành phố:</label>
                        <Autocomplete
                            options={city}
                            onChange={(event, value) => {
                                setCityBox(value.label)
                                var url1 = 'https://provinces.open-api.vn/api/p/' + value.id + '?depth=2'
                                fetch(url1)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            setGetDisAPI(result);
                                        },
                                    )
                            }}
                            onBlur={() => {
                                setGetDis(getDisAPI.districts.map(function (item) {
                                    return {
                                        label: item.name,
                                        id: item.code
                                    }
                                }))
                            }}
                            className={classes.root}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Chọn tỉnh/thành phố' />}
                        />
                    </div>
                    <div>
                        <label>Quận/Huyện:</label>
                        <Autocomplete
                            id="quanhuyen"
                            options={getDis}
                            onChange={(event, value) => {
                                setDistBox(value.label)
                                var url1 = 'https://provinces.open-api.vn/api/d/' + value.id + '?depth=2'
                                fetch(url1)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            setGetWardAPI(result);
                                        },
                                    )
                            }}
                            onBlur={() => {
                                setGetWard(getWardAPI.wards.map(function (item) {
                                    return {
                                        label: item.name,
                                        id: item.code
                                    }
                                }))
                            }}
                            className={classes.root}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Chọn quận/huyện' />}
                        />
                    </div>
                    <div>
                        <label>Phường/Xã:</label>
                        <Autocomplete
                            options={getWard}
                            onChange={(event, value) => setWardBox(value.label)}
                            className={classes.root}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Chọn phường/xã' />}
                        />
                    </div>
                </div>
            </div>
            <h3 style={{
                paddingTop: '20px',
                paddingLeft: '4%'
            }}>2. Thông tin đăng nhập:</h3>
            <div style={{
                paddingLeft: '5%',
                paddingRight: '5%',
                paddingTop: '10px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr'
            }}>
                <div>
                    <label>Email:</label>
                    <br></br>
                    <input className={style.inputForm}
                        placeholder='Vui lòng nhập email'
                        onChange={e => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <br></br>
                    <input className={style.inputForm}
                        type={passwordShow ? "text" : "password"}
                        placeholder='Vui lòng nhập mật khẩu'
                        onChange={e => setPassword(e.target.value)}
                    ></input>
                    <button className={`${login.btn} ${login.eyeIcon}`} onClick={togglePassword}>
                        {passwordShow ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
            </div>
            <button
                style={{
                    marginTop: '20px',
                    marginBottom: '20px'
                }}
                className={signUp.signUpBtn}
                onClick={
                    () => {
                        if (
                            getName !== undefined &&
                            getName !== ' ' &&
                            getPhone !== undefined &&
                            getPhone !== ' ' &&
                            getAddress !== undefined &&
                            getAddress !== ' ' &&
                            getIdCard !== undefined &&
                            getIdCard !== ' ' &&
                            getDOB !== undefined &&
                            getDOB !== ' ' &&
                            getEmail !== undefined &&
                            getEmail !== ' ' &&
                            getPassword !== undefined &&
                            getPassword !== ' ' &&
                            getCityBox !== undefined &&
                            getWardBox !== undefined &&
                            getDistBox !== undefined
                        ) {
                            SignUpApi(getName.trim().replace(/\s+/g, ' '), getPhone.trim().replace(/\s+/g, ' '), getAddress.trim().replace(/\s+/g, ' '),
                                getIdCard.trim().replace(/\s+/g, ' '),
                                getDOB.trim().replace(/\s+/g, ' '), getCityBox, getDistBox, getWardBox, getEmail.trim().replace(/\s+/g, ' '),
                                getPassword.trim().replace(/\s+/g, ' '))
                        }
                        else {
                            alert("Vui lòng nhập đầy đủ thông tin")
                        }

                    }}>Đăng Ký</button>

        </div>

    )
}
