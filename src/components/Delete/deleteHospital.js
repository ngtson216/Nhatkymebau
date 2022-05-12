import React from 'react'
import style from '../../CSS/CreateDiseases.module.scss'
export default function DeleteHos(props) {
    function Delete(del) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("ID", del);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://103.74.123.192:8080/api/hospital/erase/", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message === 'OK') {
                    alert("Xóa cơ sở y tế thành công")
                }
                console.log(result)
                window.location.reload()
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
                Bạn có chắc chắn muốn xóa cơ sở y tế này?
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
