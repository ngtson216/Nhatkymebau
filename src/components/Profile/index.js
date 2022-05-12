import React, { useEffect, useState } from 'react'
import styleProfile from "../../CSS/Profile.module.scss"
import jwt_decode from "jwt-decode";

export default function Profile() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    const [getItem, setItem] = useState([])
    const url = "http://nhatkymebau.vn:8080/api/user/" + decoded.id
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-auth-token", localStorage.getItem('token'));
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => setItem(result))
            .catch(error => console.log('error', error));
    }, [])
    return (
        <div >
            <div className={styleProfile.title}>
                <p >Thông tin cá nhân</p>
            </div>
            <div>
                <div className={styleProfile.info}>
                    <ul >
                        <li><b>Tên: </b>
                            <span>{getItem.name} </span>
                        </li>
                        <li><b>Email: </b>
                            <span>{getItem.email}  </span>
                        </li>
                        <li><b>Số điện thoại: </b>
                            <span>{getItem.phone}</span>
                        </li>
                        <li><b>Ngày sinh: </b>
                            <span>{getItem.DOB} </span>
                        </li>
                        <li><b>CMND/CCCD: </b>
                            <span>{getItem.idCard} </span>
                        </li>
                        <li><b>Địa chỉ: </b>
                            <span>{getItem.address} </span>
                        </li>
                        <li><b>Phường/Xã: </b>
                            <span>{getItem.ward} </span>
                        </li>
                        <li><b>Quận/Huyện: </b>
                            <span>{getItem.district}</span>
                        </li>
                        <li><b>Tỉnh/Thành phố: </b>
                            <span>{getItem.city} </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}