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
function CreROB(MomID, Date, Status, AntenatalDay, GestationalWeek, WeightBefore,
    WeightAfter, Note, UterineHeight, Proteinuria, FetalHeart) {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("babyID", MomID);
    urlencoded.append("note", Note);
    urlencoded.append("date", Date);
    urlencoded.append("status", Status);
    urlencoded.append("pulse", AntenatalDay);
    urlencoded.append("bodyTemperature", FetalHeart);
    urlencoded.append("dinkingMotherMilk", Proteinuria);
    urlencoded.append("breastFeedingTimes", GestationalWeek);
    urlencoded.append("divergent", WeightBefore);
    urlencoded.append("breathing", WeightAfter);
    urlencoded.append("externalExamination", UterineHeight);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://103.74.123.192:8080/api/recordOfBaby/create", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.message === "OK"){
                alert('Thêm mới hồ sơ thành công')
                window.location.reload()
            }
            console.log(result)
        })
        .catch(error => console.log('error', error));
}
export default function CreateROB(props) {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [getMomID, setMomID] = useState()
    const [getDate, setDate] = useState()
    const [getStatus, setStatus] = useState()
    const [getAntenatalDay, setAntenatalDay] = useState()
    const [getGestationalWeek, setGestationalWeek] = useState()
    const [getWeightBefore, setWeightBefore] = useState()
    const [getWeightAfter, setWeightAfter] = useState()
    const [getNote, setNote] = useState()
    const [getUterineHeight, setUterineHeight] = useState()
    const [getProteinuria, setProteinuria] = useState()
    const [getFetalHeart, setFetalHeart] = useState()
    const url = "http://103.74.123.192:8080/api/baby/list"

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
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    var baby = items.map(function (item) {
        return {
            label: item.name,
            id: item._id
        }
    });
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
                Thêm mới hồ sơ trẻ sơ sinh
            </p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr'
            }}>
                <div>
                    <div>
                        <label>Vui lòng chọn trẻ:</label>
                        <Autocomplete
                            options={baby}
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
                </div>
                <div>
                    <div>
                        <label>Thời gian cho trẻ bú: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập thời gian cho trẻ bú'
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
                        <label>Dị tật: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập có hoặc không'
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
                        <label>Hô hấp: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập hô hấp'
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

                </div>
                <div>
                    <div>
                        <label>Kiểm tra bên ngoài: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập kiểm tra bên ngoài'
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
                        <label>Mạch đập: </label>
                        <br></br>
                        <input
                            placeholder='Vui lòng nhập số  nhịp mạch đập trên phút'
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
                </div>
                <div>
                    <div>
                        <label>Uống sữa mẹ hay không:</label>
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
                        <label>Thân nhiệt: </label>
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
                            getWeightAfter !== undefined && getWeightAfter !== ''
                        ){
                            CreROB(getMomID, getDate, getStatus, getAntenatalDay, getGestationalWeek, getWeightBefore, getWeightAfter, getNote,
                                getUterineHeight, getProteinuria, getFetalHeart)
                        }
                        else {
                            alert("Vui lòng nhập và chọn đầy đủ thông tin")
                        }
                    }
                }> Xác nhận</button>
        </div >
    )
}
