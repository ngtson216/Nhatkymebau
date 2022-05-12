import React, { useEffect, useState } from 'react'
import MedicalRe from '../../CSS/MedicalRegister.module.scss'
import login from '../../CSS/Login.module.css'
import LogoBaby from '../../img/baby.png'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import viLocale from 'date-fns/locale/vi';
import Autocomplete from '@mui/material/Autocomplete'
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            padding: 0,
            border: 0,
        },
        "& .MuiInputBase-root": {
            border: 'solid 2px',
            width: '92%'
        }
    },
});
const typeS = [
    'Đăng Ký Khám Thai',
    'Đăng Ký Khám Cho Trẻ'
]

function CreateSchedule(hospital, type, note, year, month, date, hours, minutes) {
    var temp = '';
    var temp1 = '';
    if (month < 10) {
        temp = '0';
    }
    if (date < 10) {
        temp1 = '0';
    }
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("hospitalID", hospital);
    urlencoded.append("note", note);
    urlencoded.append("dateTime", year + '-' + temp + month + '-' + temp1 + date + ':' + hours + ':' + minutes);
    urlencoded.append("type", type);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://nhatkymebau.vn:8080/api/schedule/create", requestOptions)
        .then(response => response.text())
        .then(result => {
            alert(result)
            console.log(result)})
        .catch(error => console.log('error', error));
}

export default function MedicalRegister() {
    const [value, setValue] = React.useState(new Date());
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [type, setGetType] = useState();
    const [hospital, setHospital] = useState();
    const [note, setNote] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [year, setYear] = useState();
    const [date, setDate] = useState();
    const [month, setMonth] = useState();
    const url = "http://nhatkymebau.vn:8080/api/hospital/list"
    const classes = useStyles();
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    var hospitalID = items.map(function (item) {
        return {
            label: item.name,
            id: item.ID
        }
    });
    return (
        <div className={MedicalRe.contentHeader3}>
            <div className={MedicalRe.contentHeader}>
                <img src={LogoBaby} alt="Logo em bé" className={MedicalRe.babyImage} />
                <h1 className={login.contentHeading}>Đăng ký khám</h1>
            </div> <div className={MedicalRe.contentBody}>
                <div className={MedicalRe.bodyItems}>
                    <label >Loại hình khám:</label>
                    <Autocomplete
                        options={typeS}
                        onChange={(event, value) => setGetType(value)}
                        style={{ width: 300 }}
                        className={classes.root}
                        renderInput={(params) =>
                            <TextField {...params} placeholder='Chọn loại hình khám' />}
                    />
                </div>
            </div>
            <div className={MedicalRe.contentBody}>
                <div className={MedicalRe.bodyItems}>
                    <label >Cơ sở Y tế:</label>
                    <Autocomplete
                        options={hospitalID}
                        onChange={(event, value) => setHospital(value.id)}
                        style={{ width: 300 }}
                        className={classes.root}
                        renderInput={(params) =>
                            <TextField {...params} placeholder='Chọn ID CSYT' />}
                    />
                </div>
            </div>
            <div className={MedicalRe.contentBody1}>
                <div className={MedicalRe.bodyItems}>
                    <label >Ngày, giờ khám:</label>
                    <div >
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}>
                            <MobileDateTimePicker
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                    setYear(value.getFullYear());
                                    setMonth(value.getMonth() + 1);
                                    setDate(value.getDate());
                                    setHours(value.getHours());
                                    setMinutes(value.getMinutes());
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
            </div>

            <div className={MedicalRe.contentFooter}>
                <div className={MedicalRe.bodyItems}>
                    <label >Vấn đề:</label>
                    <div>
                        <input type="text" placeholder='Vui lòng nhập vấn đề' onChange={e => setNote(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className={MedicalRe.divBtn}>
                <button className={MedicalRe.signUpBtn} onClick={() => {
                    CreateSchedule(hospital, type, note, year, month, date, hours, minutes)
                }
                } >Đăng ký khám</button>
            </div>
        </div>
    )
}