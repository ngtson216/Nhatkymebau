import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
const stat = [
    {
        label: 'Quyền Admin',
        id: 'Admin'
    },
    {
        label: 'Quyền Boss - Bộ Y Tế',
        id: 'Boss'
    },
    {
        label: 'Quyền Mod - Cơ sở Y Tế',
        id: 'Mod'
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

function UpdateRoles(idUser, sta) {
    if(sta === 'Admin'){
        var newRoles = 'set-admin'
    }
    else if(sta === 'Mod'){
        newRoles = 'set-mod'
    }
    else if(sta === 'Boss'){
        newRoles = 'set-boss'
    }
    var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
      };
      
      fetch("http://103.74.123.192:8080/api/user/" + newRoles + "/" + idUser, requestOptions)
        .then(response => response.json())
        .then(result =>{
            if(result.message === "Update admin role sucessfully"){
                alert('Thay đổi nhóm quyền thành công')
                window.location.reload()
            }
            else if(result.message === "Update mod role sucessfully"){
                alert('Thay đổi nhóm quyền thành công')
                window.location.reload()
            }
            else if(result.message === "Update boss role sucessfully"){
                alert('Thay đổi nhóm quyền thành công')
                window.location.reload()
            }
            console.log(result)
        })
        .catch(error => console.log('error', error));
}

export default function StatusRoles(props) {
    const classes = useStyles();
    const [getSta, setGetSta] = useState();
    var idUser = props.dataFromParent[0].ID;
    return (
        <div>
            <div>
                Phân quyền người dùng
            </div>
            <div style={{ textAlign: 'left', marginTop: '10px', padding:'5px' }}>                
                <p style={{paddingBottom: '5px'}}> Lựa chọn nhóm quyền:</p>
                <Autocomplete
                    options={stat}                    
                    onChange={(event, value) => setGetSta(value.id)}
                    style={{ width: 300 }}
                    className={classes.root}
                    renderInput={(params) =>
                        <TextField {...params} placeholder='Chọn nhóm quyền' />}
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
                        if (getSta !== props.dataFromParent[0].role && getSta !== undefined && getSta !== null) {
                            UpdateRoles(idUser, getSta)
                        }
                        else if(getSta === undefined || getSta === null ){
                            alert("Vui lòng chọn nhóm quyền mới")
                        }
                        else{
                            alert("Không thể cập nhật nhóm quyền mới trùng với nhóm quyền hiện tại")
                        }
                    }}
            >Xác nhận</button>
        </div>
    )
}