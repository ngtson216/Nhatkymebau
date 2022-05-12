import React from 'react'
import style from '../../CSS/CreateDiseases.module.scss'
export default function DeleteVac(props) {
    function Delete(del) {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch("http://103.74.123.192:8080/api/vaccine/erase/" + del, requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.message === 'OK'){
                    alert('Xóa vaccine thành công')
                    window.location.reload()
                }
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }
    return (
        <div style={{
            color: '#fff',
        }}>
            <p style={{
                fontSize: '30px',
                textAlign: 'Center',
                textShadow: '2px 2px 2px black',
                paddingBottom: '30px',
            }}>Thông báo</p>

            <p>
                Bạn có chắc chắn muốn xóa vaccine này?
            </p>

            <button
                className={style.btnAccept}
                onClick={() => {
                    Delete(props.dataFromParent[0].ID)
                }}>
                Xác nhận
            </button>
        </div>
    )
}
