import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import '../../CSS/CreateDiseases.module.scss'
const sex = [
    'Nam',
    'Nữ'
]
const bloodType = [
    'A',
    'B',
    'AB',
    'O',
]
const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            padding: 0,
            border: 0,
        },
        "& .MuiInputBase-root": {
            border: 'solid white 1px',
            width: '92%',
            color: 'white',
        }
    },
});
function CreateBb(momID, name, note, DOB, sex, weight, birthPlace, bloodType, timeOfBirth, height) {
    if(sex === 'Nam'){
        var newS = 'true'
    }
    else if(sex === 'Nữ'){
        newS = 'false'
    }
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("momID", momID);
    urlencoded.append("name", name);
    urlencoded.append("note", note);
    urlencoded.append("DOB", DOB);
    urlencoded.append("sex", newS);
    urlencoded.append("weight", weight);
    urlencoded.append("birthPlace", birthPlace);
    urlencoded.append("bloodType", bloodType);
    urlencoded.append("timeOfBirth", timeOfBirth);
    urlencoded.append("high", height);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://103.74.123.192:8080/api/baby/create", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.message === "OK") {
                alert("Thêm mới trẻ thành công")
            }
            window.location.reload()
        })
        .catch(error => console.log('error', error));
}
export default function CreateBaby(props) {
    const classes = useStyles();
    const [items, setItems] = useState([]);
    const [getMomID, setMomID] = useState();
    const [getName, setName] = useState();
    const [getNote, setNote] = useState();
    const [getDOB, setDOB] = useState();
    const [getSex, setSex] = useState();
    const [getWeight, setWeight] = useState();
    const [getBirthPlace, setBirthPlace] = useState();
    const [getBloodType, setBloodType] = useState();
    const [getTimeOfBirth, setTimeOfBirth] = useState();
    const [getHeight, setHeight] = useState();
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
                    setItems(result);
                },
            )
    }, [])
    var mom = items.map(function (item) {
        if (item.roles === 'User') {
            return {
                label: item.name,
                id: item._id
            }
        }
    }).filter(item => item !== undefined);
    return (
        <div style={{
            color: '#fff',
            padding: '1% 10% 4% 10%'
        }}>
            <p style={{
                fontSize: '40px',
                textAlign: 'Center',
                textShadow: '2px 2px 2px black',
                paddingBottom: '40px',
            }}>
                Thêm mới trẻ sơ sinh
            </p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <div>
                    <div>
                        <label>Tên trẻ:</label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập tên trẻ'
                            onChange={e => setName(e.target.value)}
                            style={{
                                borderRadius: '10px',
                                border: 'solid white 1px',
                                lineHeight: '1.4375em',
                                width: '92%',
                                fontSize: '1rem',
                                letterSpacing: '0.00938em',
                                height: '38px',
                                position: 'relative',
                                backgroundColor: 'transparent',
                                color: 'white',

                            }}
                        ></input>
                    </div>
                    <div>
                        <label>Tên mẹ:</label>
                        <Autocomplete
                            options={mom}
                            onChange={(event, value) => setMomID(value.id)}
                            style={{ width: 300 }}
                            className={classes.root}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Chọn mẹ bé' />}
                        />
                    </div>
                    <div>
                        <label>Ngày sinh:</label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập theo dạng yyyy-mm-dd'
                            onChange={e => setDOB(e.target.value)}
                            style={{
                                borderRadius: '10px',
                                border: 'solid white 1px',
                                lineHeight: '1.4375em',
                                width: '92%',
                                fontSize: '1rem',
                                letterSpacing: '0.00938em',
                                height: '38px',
                                position: 'relative',
                                backgroundColor: 'transparent',
                                color: 'white',

                            }}
                        ></input>
                    </div>
                    <div>
                        <label>Giới tính:</label>
                        <Autocomplete
                            options={sex}
                            onChange={(event, value) => setSex(value)}
                            style={{ width: 300 }}
                            className={classes.root}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Chọn giới tính' />}
                        />
                    </div>
                    <div>
                        <label>Giờ sinh:</label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập giờ sinh'
                            onChange={e => setTimeOfBirth(e.target.value)}
                            style={{
                                borderRadius: '10px',
                                border: 'solid white 1px',
                                lineHeight: '1.4375em',
                                width: '92%',
                                fontSize: '1rem',
                                letterSpacing: '0.00938em',
                                height: '38px',
                                position: 'relative',
                                backgroundColor: 'transparent',
                                color: 'white',

                            }}
                        ></input>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Nhóm máu:</label>
                        <Autocomplete
                            options={bloodType}
                            onChange={(event, value) => setBloodType(value)}
                            style={{ width: 300 }}
                            className={classes.root}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Chọn nhóm máu' />}
                        />
                    </div>
                    <div>
                        <label>Chiều cao:</label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập chiều cao'
                            onChange={e => setHeight(e.target.value)}
                            style={{
                                borderRadius: '10px',
                                border: 'solid white 1px',
                                lineHeight: '1.4375em',
                                width: '92%',
                                fontSize: '1rem',
                                letterSpacing: '0.00938em',
                                height: '38px',
                                position: 'relative',
                                backgroundColor: 'transparent',
                                color: 'white',

                            }}
                        ></input>
                    </div>
                    <div>
                        <label>Cân nặng:</label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập cân nặng'
                            onChange={e => setWeight(e.target.value)}
                            style={{
                                borderRadius: '10px',
                                border: 'solid white 1px',
                                lineHeight: '1.4375em',
                                width: '92%',
                                fontSize: '1rem',
                                letterSpacing: '0.00938em',
                                height: '38px',
                                position: 'relative',
                                backgroundColor: 'transparent',
                                color: 'white',

                            }}
                        ></input>
                    </div>
                    <div>
                        <label>Nơi sinh:</label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập nơi sinh'
                            onChange={e => setBirthPlace(e.target.value)}
                            style={{
                                borderRadius: '10px',
                                border: 'solid white 1px',
                                lineHeight: '1.4375em',
                                width: '92%',
                                fontSize: '1rem',
                                letterSpacing: '0.00938em',
                                height: '38px',
                                position: 'relative',
                                backgroundColor: 'transparent',
                                color: 'white',

                            }}
                        ></input>
                    </div>
                </div>
            </div>
            <div>
                <label>Mô tả:</label>
                <br></br>
                <textarea placeholder='Vui lòng nhập mô tả'
                    onChange={e => setNote(e.target.value)}
                    style={{
                        borderRadius: '10px',
                        border: 'solid white 1px',
                        lineHeight: '1.4375em',
                        width: '103%',
                        fontSize: '1rem',
                        letterSpacing: '0.00938em',
                        height: '95px',
                        position: 'relative',
                        fontFamily: 'unset',
                        backgroundColor: 'transparent',
                        color: 'white'
                    }}
                ></textarea>
            </div>
            <button style={{
                marginTop: '30px',
                float: 'right',
                backgroundColor: 'rgb(201, 201, 201)',
                borderRadius: '8px',
                width: '19%',
                height: '35px'
            }}
                onClick={
                    () => {                          
                        if (
                            getMomID !== null &&
                            getMomID !== undefined &&
                            getDOB !== '' &&
                            getDOB !== undefined &&
                            getName !== undefined &&
                            getName !== '' &&
                            getSex !== undefined &&
                            getSex !== null &&
                            getWeight !== undefined &&
                            getWeight !== '' &&
                            getBirthPlace !== undefined &&
                            getBirthPlace !== '' &&
                            getTimeOfBirth !== undefined &&
                            getTimeOfBirth !== '' &&
                            getHeight !== undefined &&
                            getHeight !== '' &&
                            getBloodType !== undefined &&
                            getBloodType !== null
                        ) {
                            CreateBb(getMomID, getName.trim().replace(/\s+/g, ' '), getNote, getDOB, getSex, getWeight, getBirthPlace, getBloodType, getTimeOfBirth, getHeight)
                        }
                        else {
                            alert("Vui lòng nhập và chọn đầy đủ thông tin")
                        }}
                    }> Xác nhận</button>
        </div>
    )
}
