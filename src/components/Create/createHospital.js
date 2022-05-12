import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import style from '../../CSS/CreateHos.module.scss'

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root": {
            backgroundColor: 'white',
            padding: 0,
            border: 0,
        },
        "& .MuiInputBase-root": {
            width: '90%',
            color: 'black',
        }
    },
});
function CreateHos(ID, name, address, note, ward, district, city, phone, numberOfClinic) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("ID", ID);
    urlencoded.append("name", name);
    urlencoded.append("address", address);
    urlencoded.append("note", note);
    urlencoded.append("ward", ward);
    urlencoded.append("district", district);
    urlencoded.append("city", city);
    urlencoded.append("phone", phone);
    urlencoded.append("numberOfClinic", numberOfClinic);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://103.74.123.192:8080/api/hospital/create", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.message === 'OK'){
                alert("Thêm mới csyt thành công")
                window.location.reload()
            }
            else if(result.message === 'Name is exists' || result.message === 'ID is exists' ){
                alert("Tên hoặc ID đã tồn tại! Vui lòng thử lại")
            }
            console.log(result)
        }             
        )
        .catch(error => console.log('error', error));
}


export default function CreateHospital(props) {
    const classes = useStyles();
    const [getCity, setGetCity] = useState([])
    const [getDisAPI, setGetDisAPI] = useState([])
    const [getDis, setGetDis] = useState([])
    const [getWardAPI, setGetWardAPI] = useState([])
    const [getWard, setGetWard] = useState([])
    const [getCityBox, setCityBox] = useState()
    const [getDistBox, setDistBox] = useState()
    const [getWardBox, setWardBox] = useState()
    const [getID, setID] = useState()
    const [getName, setName] = useState()
    const [getAddress, setAddress] = useState()
    const [getNote, setNote] = useState()
    const [getPhone, setPhone] = useState()
    const [getNumC, setNumC] = useState()
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
            color: '#fff',
            paddingLeft: '30px'
        }}>
            <p style={{
                fontSize: '40px',
                textAlign: 'Center',
                textShadow: '2px 2px 2px black',
                paddingBottom: '40px',
            }}>
                Thêm mới cơ sở Y tế
            </p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <div>
                    <div>
                        <label>Tên cơ sở Y tế:</label>
                        <br></br>
                        <input className={style.inputForm}
                            placeholder='Vui lòng nhập tên csyt'
                            onChange={e => setName(e.target.value)}
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
                        <label>Số phòng khám:</label>
                        <br></br>
                        <input className={style.inputForm}
                            placeholder='Vui lòng nhập số phòng khám'
                            onChange={e => setNumC(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div>
                    <div>
                        <label>ID:</label>
                        <br></br>
                        <input className={style.inputForm}
                            placeholder='ID là tên viết tắt chữ cái đầu'
                            onChange={e => setID(e.target.value)}
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
            <div>
                <label>Mô tả:</label>
                <br></br>
                <textarea
                    className={style.textinput}
                    placeholder='Vui lòng nhập mô tả'
                    onChange={e => setNote(e.target.value)}
                ></textarea>
            </div>
            <button
                className={style.btnAccept}
                onClick={
                    () => {
                        if(getID !== undefined &&
                            getName !== undefined &&
                            getAddress !== undefined &&
                            getNote !== undefined &&
                            getWardBox !== undefined &&
                            getDistBox !== undefined &&
                            getCityBox !== undefined &&
                            getPhone !== undefined &&
                            getNumC !== undefined){
                            CreateHos(getID, getName, getAddress, getNote, getWardBox, getDistBox, getCityBox, getPhone, getNumC)                            
                        }
                        else{
                            alert("Vui lòng nhập và chọn đầy đủ thông tin")
                        }                        
                    }}> Xác nhận</button>
        </div>
    )
}
