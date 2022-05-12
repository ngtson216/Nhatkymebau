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

function CreateSchedule(baby, vaccine, hospital, note, year, month, date, hours, minutes) {
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
    urlencoded.append("babyID", baby);
    urlencoded.append("hospitalID", hospital);
    urlencoded.append("vaccineID", vaccine);
    urlencoded.append("note", note);
    urlencoded.append("dateTime", year + '-' + temp + month + '-' + temp1 + date + ':' + hours + ':' + minutes);
    urlencoded.append("type", "Đăng Ký Tiêm Chủng");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://nhatkymebau.vn:8080/api/schedulevaccinated/create", requestOptions)
        .then(response => response.text())
        .then(result => {
            alert(result)
            console.log(result)
        })
        .catch(error => console.log('error', error));
}

export default function VaccineRegister() {
    const [value, setValue] = React.useState(new Date());
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [items1, setItems1] = useState([]);
    const [items2, setItems2] = useState([]);
    const [baby, setBaby] = useState();
    const [hospital, setHospital] = useState();
    const [vaccine, setVaccine] = useState();
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
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://103.74.123.192:8080/api/vaccine/list", requestOptions)
            .then(response => response.json())
            .then(result => setItems2(result))
            .catch(error => console.log('error', error));
    }, [])
    var VaccineID = items2.map(function (item) {
        return {
            label: item.name,
            id: item._id
        }
    });
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-auth-token", localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://103.74.123.192:8080/api/baby/getMyChild", requestOptions)
            .then(response => response.json())
            .then(result => setItems1(result))
            .catch(error => console.log('error', error));
    }, [])
    var Child = items1.map(function (item1) {
        return {
            label: item1.name,
            id: item1._id
        }
    });
    return (
        <div className={MedicalRe.contentHeader3}>
            <div className={MedicalRe.contentHeader}>
                <img src={LogoBaby} alt="Logo em bé" className={MedicalRe.babyImage} />
                <h1 className={login.contentHeading}>Đăng ký tiêm</h1>
            </div>
            <div className={MedicalRe.contentBody}>
                <div className={MedicalRe.bodyItems}>
                    <label >Chọn em bé của bạn:</label>
                    <Autocomplete
                        options={Child}
                        onChange={(event, value) => setBaby(value.id)}
                        style={{ width: 300 }}
                        className={classes.root}
                        renderInput={(params) =>
                            <TextField {...params} placeholder='Chọn em bé' />}
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
            <div className={MedicalRe.contentBody}>
                <div className={MedicalRe.bodyItems}>
                    <label >Chọn vaccine:</label>
                    <Autocomplete
                        options={VaccineID}
                        onChange={(event, value) => setVaccine(value.id)}
                        style={{ width: 300 }}
                        className={classes.root}
                        renderInput={(params) =>
                            <TextField {...params} placeholder='Chọn loại vaccine' />}
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
                    CreateSchedule(baby, vaccine, hospital, note, year, month, date, hours, minutes)
                }
                } >Đăng ký khám</button>
            </div>
        </div>
    )
}