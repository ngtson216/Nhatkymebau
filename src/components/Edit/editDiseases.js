import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import style from '../../CSS/CreateDiseases.module.scss'
const stat = [
    'Mẹ',
    'Trẻ'
]
const needInject = [
    'Có',
    'Không'
]
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
function EditDis(getID, getFor, getCate, getName, getNote, getInjec) {
    if (getFor === 'Trẻ') {
        var newGetFor = 'false'
    }
    else if (getFor === 'Mẹ') {
        newGetFor = 'true'
    }

    if (getInjec === 'Có') {
        var newGetInjec = 'true'
    }
    else if (getInjec === 'Không') {
        newGetInjec = 'false'
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("ID", getID);
    urlencoded.append("name", getName);
    urlencoded.append("note", getNote);
    urlencoded.append("category", getCate);
    urlencoded.append("forMom", newGetFor);
    urlencoded.append("needInjection", newGetInjec);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://103.74.123.192:8080/api/diseases/edit", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.message === 'OK') {
                alert('Chỉnh sửa bệnh thành công')
            }
            window.location.reload()
        })
        .catch(error => console.log('error', error));
}
export default function EditDiseases(props) {
    const classes = useStyles();
    const [getFor, setGetFor] = useState();
    const [getCate, setGetCate] = useState();
    const [items, setItems] = useState([]);
    const [getName, setGetName] = useState();
    const [getNote, setGetNote] = useState();
    const [getInjec, setGetInjec] = useState();
    const url = "http://103.74.123.192:8080/api/DiseaseCategory/list"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                },
            )
    }, [])
    var cate = items.map(function (item) {
        return item.name
    });
    return (
        <div style={{
            paddingLeft: '40px',
            color: '#fff',
        }}>
            <p style={{
                fontSize: '40px',
                textAlign: 'Center',
                textShadow: '2px 2px 2px black',
                paddingBottom: '40px',
            }}>Chỉnh sửa bệnh</p>
            <div>
                <div>
                    <label>Tên bệnh:</label>
                    <br></br>
                    <input
                        className={style.inputForm}
                        id='Name'
                        type='text'
                        defaultValue={props.dataFromParent[0].name}
                        placeholder='Vui lòng nhập tên bệnh'
                        onChange={e => setGetName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label>Bệnh cho:</label>
                    <Autocomplete
                        id='For'
                        options={stat}
                        onChange={(event, value) => setGetFor(value)}
                        className={classes.root}
                        defaultValue={props.dataFromParent[0].for}
                        renderInput={(params) =>
                            <TextField {...params} placeholder='Chọn đối tượng' />}
                    />
                </div>
                <div>
                    <label>Bệnh có cần tiêm chủng hay không:</label>
                    <Autocomplete
                        id='Inject'
                        options={needInject}
                        onChange={(event, value) => setGetInjec(value)}
                        className={classes.root}
                        defaultValue={props.dataFromParent[0].needInjection}
                        renderInput={(params) =>
                            <TextField {...params} placeholder='Chọn lựa chọn' />}
                    />
                </div>
                <div>
                    <label>Loại bệnh:</label>
                    <Autocomplete
                        id='Cate'
                        options={cate}
                        onChange={(event, value) => setGetCate(value)}
                        className={classes.root}
                        defaultValue={props.dataFromParent[0].category}
                        renderInput={(params) =>
                            <TextField {...params} placeholder='Chọn loại bệnh' />}
                    />
                </div>
            </div>
            <div>
                <label>Mô tả:</label>
                <br></br>
                <textarea
                    id='Note'
                    type='text'
                    className={style.textinput}
                    defaultValue={props.dataFromParent[0].note}
                    placeholder='Vui lòng nhập mô tả'
                    onChange={e => setGetNote(e.target.value)}
                ></textarea>
            </div>
            <button
                className={style.btnAccept}
                onClick={
                    () => {
                        if (getName === undefined) {
                            var newName = document.getElementById("Name").defaultValue
                        } else {
                            newName = getName
                        }
                        if (getNote === undefined) {
                            var newNote = document.getElementById("Note").defaultValue
                        } else {
                            newNote = getNote
                        }
                        if (getFor === undefined) {
                            var newFor = document.getElementById("For").defaultValue
                        } else {
                            newFor = getFor
                        }
                        if (getInjec === undefined) {
                            var newInjec = document.getElementById("Inject").defaultValue
                        } else {
                            newInjec = getInjec
                        }
                        if (getCate === undefined) {
                            var newCate = document.getElementById("Cate").defaultValue
                        } else {
                            newCate = getCate
                        }

                        if (newInjec === 'Có' && newFor === 'Mẹ') {
                            alert("Nếu bệnh cần tiêm chủng vui lòng chọn cho trẻ!!")
                        }
                        else if (
                            newFor !== null &&
                            newCate !== null &&
                            newName.trim() !== '' &&
                            newInjec !== null
                        ) {
                            EditDis(props.dataFromParent[0].ID, newFor, newCate, newName.trim().replace(/\s+/g, ' '), newNote, newInjec)
                        }
                        else {
                            alert("Vui lòng nhập và chọn đầy đủ thông tin")
                        }
                    }}>
                Xác nhận
            </button>
        </div>
    )
}
