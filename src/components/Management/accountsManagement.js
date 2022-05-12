import React, { useEffect, useState } from 'react'
import QLBCTC from '../../CSS/TableStyle.module.scss'
import { Link, Route, Routes } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { BiDetail } from 'react-icons/bi';
import SignUp from '../../container/FormDNDK/signup';
import PopupDelete from '../Popup/PopupDelete';
import DeleteUser from '../Delete/deleteUser';
import Popup from '../Popup/Popup';
import EditRole from '../Edit/editRole'
import styleTable from '../../CSS/TableStyle.module.scss'
export default function QuanLyTaiKhoanNguoiDung() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [getIdDel, setGetIdDel] = useState([]);
    const [buttonPopup1, setButtonPopup1] = useState(false);
    const [getIdEdit, setGetIdEdit] = useState([]);
    const url = "http://nhatkymebau.vn:8080/api/user/"
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
                    setIsLoaded(true);
                    setItems(result);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    return (
        <div>
            <div className={styleTable.title}>
                <b>Quản lý tài khoản người dùng</b>
            </div>
            <div >
                <input className={QLBCTC.searchBar} style={{ marginBottom: '10px' }} type='text' placeholder='Nhập tên người dùng hoặc quyền..' onChange={(event) => {
                    setSearchTerm(event.target.value);
                }} />
            </div>
            <table className={`${QLBCTC.tableStyle}`} >
                <thead>
                    <tr style={{ background: '#aee8ff' }}>
                        <th style={{ width: '7%' }}>STT</th>
                        <th style={{ width: '28%' }}>Tên người dùng</th>
                        <th style={{ width: '28%' }}>Số điện thoại</th>
                        <th style={{ width: '28%' }}>Nhóm quyền</th>
                        <th style={{ width: '9%' }}>Chỉnh sửa</th>
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
                        }).map((item) => (
                            <tr key={item._id}>
                                <td className={QLBCTC.center}>
                                    {items.indexOf(item) + 1}
                                </td>
                                <td className={QLBCTC.center}>
                                    {item.name}
                                </td>
                                <td className={QLBCTC.center}>
                                    {item.phone}
                                </td>
                                <td className={QLBCTC.center}>
                                    {item.roles}
                                </td>
                                <td className={QLBCTC.center}>
                                    <Link to="/accountsManagements"
                                        onClick={() => {
                                            setButtonPopup1(true); setGetIdEdit([{
                                                ID: item._id,
                                                role: item.roles
                                            }])
                                        }}>
                                        <FiEdit className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                    </Link>
                                    <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1} >
                                        <EditRole dataFromParent={getIdEdit} />
                                    </Popup>
                                    <Link to="/accountsManagements"
                                        onClick={() => {
                                            setButtonPopup(true); setGetIdDel([{
                                                ID: item._id
                                            }])
                                        }}
                                    >
                                        <AiFillDelete className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                    </Link>
                                    <PopupDelete trigger={buttonPopup} setTrigger={setButtonPopup} >
                                        <DeleteUser dataFromParent={getIdDel} />
                                    </PopupDelete>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}
