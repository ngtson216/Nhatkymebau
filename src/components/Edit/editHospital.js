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
            paddingLeft: '1%',
            border: 0,
        },
        "& .MuiInputBase-root": {
            width: '90%',
            color: 'black',
        }
    },
});
function EditHos(ID, Name, Address, Note, WardBox, DistBox, CityBox, Phone, NumC) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("ID", ID);
    urlencoded.append("name", Name);
    urlencoded.append("address", Address);
    urlencoded.append("note", Note);
    urlencoded.append("ward", WardBox);
    urlencoded.append("district", DistBox);
    urlencoded.append("city", CityBox);
    urlencoded.append("phone", Phone);
    urlencoded.append("numberOfClinic", NumC);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://103.74.123.192:8080/api/hospital/edit", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.message === 'OK'){
                alert('Chỉnh sửa thông tin csyt thành công')
                window.location.reload()
            }
            console.log(result)})
        .catch(error => console.log('error', error));
}
export default function EditDiseases(props) {
    const classes = useStyles();
    const [getCity, setGetCity] = useState([])
    const [getDisAPI, setGetDisAPI] = useState([])
    const [getDis, setGetDis] = useState([])
    const [getWardAPI, setGetWardAPI] = useState([])
    const [getWard, setGetWard] = useState([])
    const [getCityBox, setCityBox] = useState()
    const [getDistBox, setDistBox] = useState()
    const [getWardBox, setWardBox] = useState()
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
                Chỉnh sửa cơ sở Y tế
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
                            id='name'
                            type='text'
                            defaultValue={props.dataFromParent[0].name}
                            placeholder='Vui lòng nhập tên csyt'
                            onChange={e => setName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Địa chỉ:</label>
                        <br></br>
                        <input className={style.inputForm}
                            id='address'
                            type='text'
                            defaultValue={props.dataFromParent[0].address}
                            placeholder='Vui lòng nhập địa chỉ'
                            onChange={e => setAddress(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Tỉnh/Thành phố:</label>
                        <Autocomplete
                            id='city'
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
                            defaultValue={props.dataFromParent[0].city}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Chọn tỉnh/thành phố' />}
                        />
                    </div>

                    <div>
                        <label>Số phòng khám:</label>
                        <br></br>
                        <input className={style.inputForm}
                            id='numberOfClinic'
                            type='text'
                            defaultValue={props.dataFromParent[0].numberOfClinic}
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
                            defaultValue={props.dataFromParent[0].ID}
                            readOnly
                        ></input>
                    </div>
                    <div>
                        <label>Số điện thoại:</label>
                        <br></br>
                        <input className={style.inputForm}
                            id='phone'
                            type='text'
                            defaultValue={props.dataFromParent[0].phone}
                            placeholder='Vui lòng nhập số điện thoại'
                            onChange={e => setPhone(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Quận/Huyện:</label>
                        <Autocomplete
                            id="district"
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
                            defaultValue={props.dataFromParent[0].district}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Chọn quận/huyện' />}
                        />
                    </div>

                    <div>
                        <label>Phường/Xã:</label>
                        <Autocomplete
                            id='ward'
                            options={getWard}
                            onChange={(event, value) => setWardBox(value.label)}
                            className={classes.root}
                            defaultValue={props.dataFromParent[0].ward}
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
                    id='note'
                    type='text'
                    className={style.textinput}
                    defaultValue={props.dataFromParent[0].note}
                    placeholder='Vui lòng nhập mô tả'
                    onChange={e => setNote(e.target.value)}
                ></textarea>
            </div>
            <button
                className={style.btnAccept}
                onClick={
                    () => {
                        if (getName === undefined) {
                            var newName = document.getElementById("name").defaultValue
                        } else {
                            newName = getName
                        }
                        if (getAddress === undefined) {
                            var newAddress = document.getElementById("address").defaultValue
                        } else {
                            newAddress = getAddress
                        }
                        if (getNote === undefined) {
                            var newNote = document.getElementById("note").defaultValue
                        } else {
                            newNote = getNote
                        }
                        if (getWardBox === undefined) {
                            var newWardBox = document.getElementById("ward").defaultValue
                        } else {
                            newWardBox = getWardBox
                        }
                        if (getDistBox === undefined) {
                            var newDistBox = document.getElementById("district").defaultValue
                        } else {
                            newDistBox = getDistBox
                        }
                        if (getCityBox === undefined) {
                            var newCityBox = document.getElementById("city").defaultValue
                        } else {
                            newCityBox = getCityBox
                        }
                        if (getPhone === undefined) {
                            var newPhone = document.getElementById("phone").defaultValue
                        } else {
                            newPhone = getPhone
                        }
                        if (getNumC === undefined) {
                            var newNumC = document.getElementById("numberOfClinic").defaultValue
                        } else {
                            newNumC = getNumC
                        }
                        if (
                            newName.trim() !== '' &&
                            newAddress !== '' &&
                            newPhone !== '' &&
                            newNumC !== ''
                        ) {
                           EditHos(props.dataFromParent[0].ID, newName.trim().replace(/\s+/g, ' '), newAddress, newNote, newWardBox, newDistBox, newCityBox, newPhone, newNumC)
                        }
                        else {
                            alert("Vui lòng nhập và chọn đầy đủ thông tin")
                        }
                    }}
            >
                Xác nhận
            </button>
        </div>
    )
}
