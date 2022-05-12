import React, { useEffect, useState } from 'react'
import styleTable from '../../CSS/TableStyle.module.scss'
import { Link, Route, Routes } from 'react-router-dom';
import { RiContactsFill } from 'react-icons/ri';
import ROMDetails from '../Management/romManagement'
import PopupCreROM from '../Popup/PopupCreROM';
import CreateROM from '../Create/createROM';
export default function ROMManager(props) {

    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const url = "http://nhatkymebau.vn:8080/api/user/"
    const [buttonPopup1, setButtonPopup1] = useState(false);
    const [id, setId] = useState([]);
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-auth-token", localStorage.getItem('token'));
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                },
            )
    }, [])
    var sendData = (p) => {
        props.parentCallback(p)
    }
    var sendData2 = (p) => {
        props.parentCallback2(p)
    }
    var sendData3 = (p) => {
        props.parentCallback3(p)
    }
    return (
        <div>
            <div style={{ padding: '1.4%', textAlign: 'center' }}>
                <b style={{ fontSize: '22px' }}>Hồ sơ khám thai theo danh sách thai phụ</b><br />
            </div>
            <div>
                <Link to="/recordOfMom" onClick={() => {
                        setButtonPopup1(true);
                    }}>
                    <button className={styleTable.btn}>
                        Thêm mới
                    </button>
                </Link>
                <PopupCreROM trigger={buttonPopup1} setTrigger={setButtonPopup1} >
                    <CreateROM />
                </PopupCreROM>

                <input className={styleTable.searchBar} type='text' placeholder='Nhập tên người khám' onChange={(event) => {
                    setSearchTerm(event.target.value);
                }} />
            </div>
            <table className={`${styleTable.tableStyle}`} >
                <thead>
                    <tr style={{ background: '#aee8ff' }}>
                        <th style={{ width: '15%' }}>Tên thai phụ</th>
                        <th style={{ width: '15%' }}>Email</th>
                        <th style={{ width: '15%' }}>Địa chỉ</th>
                        <th style={{ width: '7%' }}>SĐT</th>
                        <th style={{ width: '8%' }}>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.filter((item) => {
                            if (searchTerm == "") {
                                return item
                            }
                            else if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.roles.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return item
                            }
                        }).map((item) => {
                            if (item.roles === "User") {
                                return (
                                    <tr key={item._id}>
                                        <td className={styleTable.center}>
                                            {item.name}
                                        </td>
                                        <td className={styleTable.center}>
                                            {item.email}
                                        </td>
                                        <td className={styleTable.center}>
                                            {item.address}, {item.ward}, {item.district}, {item.city}
                                        </td>
                                        <td className={styleTable.center}>
                                            {item.phone}
                                        </td>
                                        <td className={styleTable.center}>
                                            <Link to="/recordOfMom"
                                                onClick={() => {
                                                    sendData(item._id)
                                                    sendData2(false)
                                                    sendData3(true)
                                                }}
                                            >
                                                <RiContactsFill
                                                    className={styleTable.marginStyle}
                                                    style={{ color: '#000000' }}
                                                />
                                            </Link>
                                        </td>
                                    </tr>)
                            }
                        })
                    }
                </tbody>
            </table>
        </div >

    )
}

