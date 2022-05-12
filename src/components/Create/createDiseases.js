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
            border: 0,
        },
        "& .MuiInputBase-root": {
            width: '90%',
            color: 'black',
        }
    },
});
function CreateDis(getFor, getCate, getName, getNote, getInjec) {
    if (getFor === 'Trẻ') {
        var newGetFor = 'false'
    }
    else if (getFor === 'Mẹ') {
        newGetFor = 'true'
    }

    if (getInjec === 'Có') {
        var newGetInjec = 'true'
    }
    else {
        newGetInjec = 'false'
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", getName);
    urlencoded.append("note", getNote);
    urlencoded.append("forMom", newGetFor);
    urlencoded.append("category", getCate);
    urlencoded.append("needInjection", newGetInjec);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };
    fetch("http://103.74.123.192:8080/api/diseases/create", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.message === "This diseases's exists") {
                alert("Bệnh đã tồn tại!! Vui lòng thử lại")
            }
            else if (result.message === "OK") {
                alert("Thêm mới bệnh thành công")
                window.location.reload()
            }
            console.log(result)
        })
        .catch(error => console.log('error', error));
}
export default function CreateDiseases(props) {
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
            color: '#fff',
            paddingLeft: '40px',
        }}>
            <p style={{
                fontSize: '40px',
                textAlign: 'Center',
                textShadow: '2px 2px 2px black',
                paddingBottom: '40px',
            }}>
                Thêm mới bệnh
            </p>
            <div>
                <div>
                    <div>
                        <label>Tên bệnh:</label>
                        <br></br>
                        <input
                            className={style.inputForm}
                            placeholder='Vui lòng nhập tên bệnh'
                            onChange={e => setGetName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Bệnh cho:</label>
                        <Autocomplete
                            options={stat}
                            onChange={(event, value) => setGetFor(value)}
                            className={classes.root}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Chọn đối tượng' />}
                        />
                    </div>
                </div>
                <div>
                    <div>

                        <label>Bệnh có cần tiêm chủng hay không:</label>
                        <Autocomplete
                            options={needInject}
                            onChange={(event, value) => setGetInjec(value)}
                            className={classes.root}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Chọn lựa chọn' />}
                        />
                    </div>
                    <div>
                        <label>Loại bệnh:</label>
                        <Autocomplete
                            options={cate}
                            onChange={(event, value) => setGetCate(value)}
                            className={classes.root}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Chọn loại bệnh ' />}
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
                    onChange={e => setGetNote(e.target.value)}
                ></textarea>
            </div>
            <button
                className={style.btnAccept}
                onClick={
                    () => {
                        if (getInjec === 'Có' && getFor === 'Mẹ') {
                            alert("Nếu bệnh cần tiêm chủng vui lòng chọn cho trẻ!!")
                        }
                        else if (
                            getFor !== null &&
                            getFor !== undefined &&
                            getCate !== null &&
                            getCate !== undefined &&
                            getName !== undefined &&
                            getName !== '' &&
                            getInjec !== undefined &&
                            getInjec !== null
                        ) {
                            CreateDis(getFor, getCate, getName.trim().replace(/\s+/g, ' '), getNote, getInjec)
                        }
                        else {
                            alert("Vui lòng nhập và chọn đầy đủ thông tin")
                        }
                    }}> Xác nhận</button>
        </div>
    )
}
