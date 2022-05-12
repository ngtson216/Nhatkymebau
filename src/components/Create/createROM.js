import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import '../../CSS/CreateDiseases.module.scss'
const pro = [
    {
        label: 'Có',
        id: 'true'
    },
    {
        label: 'Không',
        id: 'false',
    }
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
function CreROM(MomID, Date, Status, AntenatalDay, GestationalWeek, WeightBefore, WeightAfter,
    Height, BloodPressure, AgeAtPregnancy, Pelvic, Pulse, DoctorExamines, Note, ReExaminationDate,
    Supersonic, UterineHeight, WaistCircumference, Proteinuria, Anemia, Hemoglobin, FetalHeart, Breast) {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("momID", MomID);
    urlencoded.append("date", Date);
    urlencoded.append("status", Status);
    urlencoded.append("antenatalDay", AntenatalDay);
    urlencoded.append("gestationalWeek", GestationalWeek);
    urlencoded.append("weightBefore", WeightBefore);
    urlencoded.append("weightAfter", WeightAfter);
    urlencoded.append("height", Height);
    urlencoded.append("bloodPressure", BloodPressure);
    urlencoded.append("ageAtPregnancy", AgeAtPregnancy);
    urlencoded.append("pelvic", Pelvic);
    urlencoded.append("pulse", Pulse);
    urlencoded.append("doctorExamines", DoctorExamines);
    urlencoded.append("note", Note);
    urlencoded.append("reExaminationDate", ReExaminationDate);
    urlencoded.append("supersonic", Supersonic);
    urlencoded.append("uterineHeight", UterineHeight);
    urlencoded.append("waistCircumference", WaistCircumference);
    urlencoded.append("proteinuria", Proteinuria);
    urlencoded.append("anemia", Anemia);
    urlencoded.append("hemoglobin", Hemoglobin);
    urlencoded.append("fetalHeart", FetalHeart);
    urlencoded.append("breast", Breast);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://103.74.123.192:8080/api/recordofmom/create", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.message === "OK") {
                alert("Thêm mới hồ sơ thành công")
            }
            // window.location.reload()
            else {
                alert("Thêm mới hồ sơ không thành công")
            }
        })
        .catch(error => console.log('error', error));
}
export default function CreateROM(props) {
    const classes = useStyles();
    const [items, setItems] = useState([]);
    const [getMomID, setMomID] = useState()
    const [getDate, setDate] = useState()
    const [getStatus, setStatus] = useState()
    const [getAntenatalDay, setAntenatalDay] = useState()
    const [getGestationalWeek, setGestationalWeek] = useState()
    const [getWeightBefore, setWeightBefore] = useState()
    const [getWeightAfter, setWeightAfter] = useState()
    const [getHeight, setHeight] = useState()
    const [getBloodPressure, setBloodPressure] = useState()
    const [getAgeAtPregnancy, setAgeAtPregnancy] = useState()
    const [getPelvic, setPelvic] = useState()
    const [getPulse, setPulse] = useState()
    const [getDoctorExamines, setDoctorExamines] = useState()
    const [getNote, setNote] = useState()
    const [getReExaminationDate, setReExaminationDate] = useState()
    const [getSupersonic, setSupersonic] = useState()
    const [getUterineHeight, setUterineHeight] = useState()
    const [getWaistCircumference, setWaistCircumference] = useState()
    const [getProteinuria, setProteinuria] = useState()
    const [getAnemia, setAnemia] = useState()
    const [getHemoglobin, setHemoglobin] = useState()
    const [getFetalHeart, setFetalHeart] = useState()
    const [getBreast, setBreast] = useState()
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
            padding: '1% 2% 4% 4%'
        }}>
            <p style={{
                fontSize: '40px',
                textAlign: 'Center',
                textShadow: '2px 2px 2px black',
                paddingBottom: '40px',
            }}>
                Thêm mới hồ sơ khám thai
            </p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr'
            }}>
                <div>
                    <div>
                        <label>Vui lòng chọn thai phụ:</label>
                        <Autocomplete
                            options={mom}
                            onChange={(event, value) => setMomID(value.id)}
                            style={{ width: 300 }}
                            className={classes.root}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Chọn thai phụ' />}
                        />
                    </div>
                    <div>
                        <label>Ngày khám:</label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập theo dạng yyyy-mm-dd'
                            onChange={e => setDate(e.target.value)}
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
                        <label>Tình trạng: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập tình trạng thai phụ'
                            onChange={e => setStatus(e.target.value)}
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
                        <label>Thời gian sinh dự kiến: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập thời gian dự kiến'
                            onChange={e => setAntenatalDay(e.target.value)}
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
                        <label>Protein Niệu:</label>
                        <Autocomplete
                            options={pro}
                            onChange={(event, value) => setProteinuria(value.id)}
                            style={{ width: 300 }}
                            className={classes.root}
                            renderInput={(params) =>
                                <TextField {...params} placeholder='Chọn thai phụ' />}
                        />
                    </div>
                    <div>
                        <label>Tim thai nhi: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập tim thai'
                            onChange={e => setFetalHeart(e.target.value)}
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
                        <label>Tuần thai: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập tuần thai'
                            onChange={e => setGestationalWeek(e.target.value)}
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
                        <label>Cân nặng trước khi mang thai: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập cân nặng'
                            onChange={e => setWeightBefore(e.target.value)}
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
                        <label>Cân nặng hiện tại: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập cân nặng'
                            onChange={e => setWeightAfter(e.target.value)}
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
                        <label>Chiều cao tử cung: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập chiều cao tử cung'
                            onChange={e => setUterineHeight(e.target.value)}
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
                        <label>Số đo vòng bụng: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập số đo vòng bụng'
                            onChange={e => setWaistCircumference(e.target.value)}
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
                        <label>Tuyến sữa: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập'
                            onChange={e => setBreast(e.target.value)}
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
                        <label>Chiều cao: </label>
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
                        <label>Tuổi trước khi mang thai: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập tuổi'
                            onChange={e => setAgeAtPregnancy(e.target.value)}
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
                        <label>Mạch: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập số đo'
                            onChange={e => setPulse(e.target.value)}
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
                        <label>Kết quả siêu âm: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập kết quả siêu âm'
                            onChange={e => setSupersonic(e.target.value)}
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
                        <label>Nồng độ Hemoglobin: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập nồng độ Hemoglobin'
                            onChange={e => setHemoglobin(e.target.value)}
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
                        <label>Huyết áp: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập huyết áp'
                            onChange={e => setBloodPressure(e.target.value)}
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
                        <label>Số đo khung chậu: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập số đo'
                            onChange={e => setPelvic(e.target.value)}
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
                        <label>Thiếu máu: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập'
                            onChange={e => setAnemia(e.target.value)}
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
                        <label>Bác sĩ khám: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập tên bác sĩ'
                            onChange={e => setDoctorExamines(e.target.value)}
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
                        <label>Ngày tái khám: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập ngày'
                            onChange={e => setReExaminationDate(e.target.value)}
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
                        width: '98%',
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
                            getMomID !== null && getMomID !== undefined &&
                            getDate !== '' && getDate !== undefined &&
                            getStatus !== undefined && getStatus !== '' &&
                            getAntenatalDay !== undefined && getAntenatalDay !== '' &&
                            getGestationalWeek !== undefined && getGestationalWeek !== '' &&
                            getWeightBefore !== '' && getWeightBefore !== undefined &&
                            getWeightAfter !== undefined && getWeightAfter !== '' &&
                            getHeight !== undefined && getHeight !== '' &&
                            getBloodPressure !== '' && getBloodPressure !== undefined &&
                            getAgeAtPregnancy !== undefined && getAgeAtPregnancy !== '' &&
                            getPelvic !== undefined && getPelvic !== '' &&
                            getPulse !== undefined && getPulse !== '' &&
                            getDoctorExamines !== '' && getDoctorExamines !== undefined &&
                            getReExaminationDate !== undefined && getReExaminationDate !== '' &&
                            getSupersonic !== undefined && getSupersonic !== '' &&
                            getUterineHeight !== '' && getUterineHeight !== undefined &&
                            getWaistCircumference !== undefined && getWaistCircumference !== '' &&
                            getProteinuria !== undefined && getProteinuria !== null &&
                            getAnemia !== undefined && getAnemia !== '' &&
                            getHemoglobin !== '' && getHemoglobin !== undefined &&
                            getFetalHeart !== undefined && getFetalHeart !== '' &&
                            getBreast !== undefined && getBreast !== ''
                        ) {
                            CreROM(getMomID, getDate, getStatus, getAntenatalDay, getGestationalWeek, getWeightBefore, getWeightAfter,
                                getHeight, getBloodPressure, getAgeAtPregnancy, getPelvic, getPulse, getDoctorExamines, getNote, getReExaminationDate,
                                getSupersonic, getUterineHeight, getWaistCircumference, getProteinuria, getAnemia, getHemoglobin, getFetalHeart, getBreast)
                        }
                        else {
                            alert("Vui lòng nhập và chọn đầy đủ thông tin")
                        }
                    }
                }> Xác nhận</button>
        </div >
    )
}
