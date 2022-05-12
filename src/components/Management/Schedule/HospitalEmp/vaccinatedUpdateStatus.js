import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
const stat = [
    {
        label: 'Phê duyệt lịch khám',
        id: 'accept'
    },
    {
        label: 'Từ chối lịch khám',
        id: 'reject'
    },
    {
        label: 'Đã hoàn thành khám',
        id: 'success'
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
            border: 'solid 1px',
            width: '92%',
        }
    },
});

function CancelStatusVaccine(IDSche, sta) {
    const url = 'http://103.74.123.192:8080/api/schedulevaccinated/' + sta + '/' + IDSche
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", localStorage.getItem('token'));
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            window.location.reload()
        })
        .catch(error => console.log('error', error));
}

export default function VaccinatedStatusCSYT(props) {
    const classes = useStyles();
    const [getSta, setGetSta] = useState();
    var idSche = props.dataFromParent[0].id;
    return (
        <div>
            <div>
                Cập nhật trạng thái lịch tiêm chủng
            </div>
            <div style={{ textAlign: 'left' }}>
                <ul>
                    <li>
                        Thời gian tiêm: {props.dataFromParent[0].time}
                    </li>
                    <li>
                        Kiểu khám: {props.dataFromParent[0].type}
                    </li>
                    <li>
                        Nơi khám: {props.dataFromParent[0].hospital}
                    </li>
                    <li>
                        Trạng thái hiện tại: {props.dataFromParent[0].status}
                    </li>
                </ul>
                <p> Trạng thái mới:</p>
                <Autocomplete
                    options={stat}                    
                    onChange={(event, value) => setGetSta(value.id)}
                    style={{ width: 300 }}
                    className={classes.root}
                    renderInput={(params) =>
                        <TextField {...params} placeholder='Chọn trạng thái' />}
                />
            </div>
            <button
                style={{
                    float: 'right',
                    border: 'solid 1px',
                    width: '20%',
                    height: '30px',
                    borderRadius: '10px',
                    backgroundColor: 'rgb(80, 171, 245)'
                }}
                onClick={
                    () => {
                        if (getSta !== props.dataFromParent[0].status && getSta !== undefined && getSta !== null) {
                            CancelStatusVaccine(idSche, getSta)
                        }
                        else if(getSta === undefined || getSta === null ){
                            alert("Vui lòng chọn trạng thái mới")
                        }
                        else{
                            alert("Không thể cập nhật trạng thái mới trùng với trạng thái hiện tại")
                        }
                    }}
            >Xác nhận</button>
        </div>
    )
}