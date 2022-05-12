import React from 'react'
import style from '../../CSS/CreateDiseases.module.scss'
export default function DeleteUser(props) {
    function Delete(del) {
        var myHeaders = new Headers();
        myHeaders.append("x-auth-token", localStorage.getItem('token'));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://103.74.123.192:8080/api/user/delete/" + del, requestOptions)
            .then(response => response.text())
            .then(result => {
                if(result === 'User delete sucessfully.'){
                    alert('Xóa thành công')
                    window.location.reload()
                }
                console.log(result)
            } )
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
                Bạn có chắc chắn muốn xóa người dùng này?
            </p>

            <button
                className={style.btnAccept}
                onClick={() => {
                    Delete(props.dataFromParent[0].ID)
                }}
                >
                Xác nhận
            </button>
        </div>
    )
}
