import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import '../../CSS/CreateDiseases.module.scss'
import { GrDocumentWindows } from 'react-icons/gr'
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
function EditBb(ID, momID, name, note, DOB, sex, weight, birthPlace, bloodType, timeOfBirth, height) {
    if(sex === 'Nam'){
        var newS = true
    }
    else if(sex === 'Nữ'){
        newS = false
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
    urlencoded.append("high", height);
    urlencoded.append("birthPlace", birthPlace);
    urlencoded.append("bloodType", bloodType);
    urlencoded.append("timeOfBirth", timeOfBirth);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://103.74.123.192:8080/api/baby/edit/" + ID, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.message === 'OK'){
                alert('Chỉnh sửa thành công')
                window.location.reload()
            }
            console.log(result)
        })
        .catch(error => console.log('error', error));
}
export default function EditBaby(props) {
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
    const url1 = "http://103.74.123.192:8080/api/user"
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-auth-token", localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(url1, requestOptions)
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
                Chỉnh sửa thông tin trẻ sơ sinh
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
                            id='name'
                            defaultValue={props.dataFromParent[0].name}
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
                            id='momID'
                            defaultValue={props.dataFromParent[0].momID}
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
                            id='DOB'
                            defaultValue={props.dataFromParent[0].DOB.slice(0, 10)}
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
                            id='sex'
                            defaultValue={props.dataFromParent[0].sex}
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
                            id='timeOfBirth'
                            defaultValue={props.dataFromParent[0].timeOfBirth}
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
                            id='bloodType'
                            defaultValue={props.dataFromParent[0].bloodType}
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
                            id='height'
                            defaultValue={props.dataFromParent[0].high}
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
                            id='weight'
                            defaultValue={props.dataFromParent[0].weight}
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
                            id='birthPlace'
                            defaultValue={props.dataFromParent[0].birthPlace}
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
                <textarea
                    id='note'
                    defaultValue={props.dataFromParent[0].note}
                    placeholder='Vui lòng nhập mô tả'
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
                        if (getName === undefined) {
                            var newName = document.getElementById("name").defaultValue
                        } else {
                            newName = getName
                        }
                        if (getMomID === undefined) {
                            var newMomID = document.getElementById("momID").defaultValue
                        } else {
                            newMomID = getMomID
                        }
                        if (getDOB === undefined) {
                            var newDOB = document.getElementById("DOB").defaultValue
                        } else {
                            newDOB = getDOB
                        }
                        if (getSex === undefined) {
                            var newSex = document.getElementById("sex").defaultValue
                        } else {
                            newSex = getSex
                        }
                        if (getTimeOfBirth === undefined) {
                            var newTimeOfBirth = document.getElementById("timeOfBirth").defaultValue
                        } else {
                            newTimeOfBirth = getTimeOfBirth
                        }
                        if (getBloodType === undefined) {
                            var newBloodType = document.getElementById("bloodType").defaultValue
                        } else {
                            newBloodType = getBloodType
                        }
                        if (getHeight === undefined) {
                            var newHeight = document.getElementById("height").defaultValue
                        } else {
                            newHeight = getHeight
                        }
                        if (getWeight === undefined) {
                            var newWeight = document.getElementById("weight").defaultValue
                        } else {
                            newWeight = getWeight
                        }
                        if (getBirthPlace === undefined) {
                            var newBirthPlace = document.getElementById("birthPlace").defaultValue
                        } else {
                            newBirthPlace = getBirthPlace
                        }
                        if (getNote === undefined) {
                            var newNote = document.getElementById("note").defaultValue
                        } else {
                            newNote = getNote
                        }
                        if (
                            newDOB !== '' &&
                            newName !== '' &&
                            newWeight !== '' &&
                            newBirthPlace !== '' &&
                            newTimeOfBirth !== '' &&
                            newHeight !== '' &&
                            newBloodType !== null &&
                            newSex !== null
                        ) {
                            EditBb(props.dataFromParent[0].ID, newMomID, newName.trim().replace(/\s+/g, ' '), newNote, newDOB, newSex, newWeight, newBirthPlace, newBloodType, newTimeOfBirth, newHeight)
                        }
                        else {
                            alert("Vui lòng nhập và chọn đầy đủ thông tin")
                        }
                    }
                }> Xác nhận</button>
        </div>
    )
}
