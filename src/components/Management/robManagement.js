import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import QLBCTC from '../../CSS/TableStyle.module.scss'
import styleTable from '../../CSS/TableStyle.module.scss'
// import PopupROM from '../PopupROM'
import { BiDetail } from 'react-icons/bi';
import { Link } from 'react-router-dom';
// import DetailRecord from '../DetailRoMForm';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import PopupCreROM from '../Popup/PopupCreROM'
// import CreateROM from '../CreateROM';
import CreateROB from '../Create/createROB';
export default function ROBManager() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    const [getItem, setItem] = useState([])
    const [getItem1, setItem1] = useState([])
    const [searchTerm, setSearchTerm] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonPopup1, setButtonPopup1] = useState(false);
    const [getId, setGetId] = useState([]);
    const [getMom, setMom] = useState();
    const url = "http://nhatkymebau.vn:8080/api/recordofbaby/list/"
    const url1 = "http://103.74.123.192:8080/api/baby/list"

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-auth-token", localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://103.74.123.192:8080/api/baby/list", requestOptions)
            .then(response => response.json())
            .then(result => setItem1(result))
            .catch(error => console.log('error', error));
    }, [])

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-auth-token", localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://103.74.123.192:8080/api/recordofbaby/list", requestOptions)
            .then(response => response.json())
            .then(result => setItem(result))
            .catch(error => console.log('error', error));
    }, [])

    // console.log("getItem", getItem)
    // console.log("getItem1", getItem1)
    return (
        <div>
            <div style={{ padding: '1.4%', textAlign: 'center' }}>
                <b style={{ fontSize: '22px' }}>Hồ sơ khám cho trẻ</b><br />
            </div>
            <div>
                <Link to="/recordOfBaby" onClick={() => {
                    setButtonPopup1(true);
                }}>
                    <button className={styleTable.btn}>
                        Thêm mới
                    </button>
                </Link>
                <PopupCreROM trigger={buttonPopup1} setTrigger={setButtonPopup1} >
                    <CreateROB />
                </PopupCreROM>
            </div>
            <div>
                <table className={`${QLBCTC.tableStyle}`} >
                    <thead>
                        <tr style={{ background: '#aee8ff' }}>
                            <th style={{ width: '3%' }}>STT</th>
                            <th style={{ width: '15%' }}>Tên trẻ</th>
                            <th style={{ width: '6%' }}>Giới tính</th>
                            <th style={{ width: '15%' }}>Ngày khám</th>
                            <th style={{ width: '5%' }}>Tình trạng</th>
                            <th style={{ width: '5%' }}>Mạch đập</th>
                            <th style={{ width: '5%' }}>Thân nhiệt</th>
                            <th style={{ width: '5%' }}>Uống sữa mẹ</th>
                            <th style={{ width: '5%' }}>Thời gian cho trẻ bú</th>
                            <th style={{ width: '6%' }}>Khác thường</th>
                            <th style={{ width: '6%' }}>Hô hấp</th>
                            <th style={{ width: '8%' }}>Kiểm tra bên ngoài</th>
                            <th style={{ width: '21%' }}>Mô tả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getItem.filter((item, babyName) => {
                                getItem1.map((item1) => {
                                    if (item1._id === item.rob.babyID) {
                                        babyName = item1.name
                                    }
                                })
                                if (searchTerm == "") {
                                    return item
                                }
                                else if (babyName.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return item
                                }
                            }).map((item, index) => {
                                if (item.rob.status === 'good') {
                                    var newStatus = 'Tốt'
                                }
                                else if (item.rob.status === 'bad') {
                                    newStatus = 'Xấu'
                                }

                                else {
                                    newStatus = item.rob.status
                                }
                                return (
                                    <tr key={index}>
                                        <td style={{ textAlign: 'center' }}>
                                            {index + 1}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {getItem1.map((item1) => {
                                                if (item1._id === item.rob.babyID) {
                                                    return (item1.name)
                                                }
                                            })}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {getItem1.map((item1) => {
                                                if (item1._id === item.rob.babyID) {
                                                    if (item1.sex === true) {
                                                        return "Nam"
                                                    }
                                                    else {
                                                        return "Nữ"
                                                    }
                                                }
                                            })}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            ngày {item.rob.date.slice(8, 10)}
                                            /{item.rob.date.slice(5, 7)}
                                            /{item.rob.date.slice(0, 4)}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {newStatus}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {getItem1.map((item1) => {
                                                if (item1._id === item.rob.babyID) {
                                                    return (item.rob.pulse + "/phút")
                                                }
                                            })}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {getItem1.map((item1) => {
                                                if (item1._id === item.rob.babyID) {
                                                    return (item.rob.bodyTemperature + " độ")
                                                }
                                            })}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {getItem1.map((item1) => {
                                                if (item1._id === item.rob.babyID) {
                                                    if (item1._id === item.rob.babyID) {
                                                        if (item1.dinkingMotherMilk === true) {
                                                            return "Có"
                                                        }
                                                        else {
                                                            return "Không"
                                                        }
                                                    }
                                                }
                                            })}
                                        </td>

                                        <td style={{ textAlign: 'center' }}>
                                            {getItem1.map((item1) => {
                                                if (item1._id === item.rob.babyID) {
                                                    return (item.rob.breastFeedingTimes)
                                                }
                                            })}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {getItem1.map((item1) => {
                                                if (item1._id === item.rob.babyID) {
                                                    return (item.rob.divergent)
                                                }
                                            })}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {getItem1.map((item1) => {
                                                if (item1._id === item.rob.babyID) {
                                                    return (item.rob.breathing)
                                                }
                                            })}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {getItem1.map((item1) => {
                                                if (item1._id === item.rob.babyID) {
                                                    return (item.rob.externalExamination)
                                                }
                                            })}
                                        </td>

                                        <td>
                                            {item.rob.note}
                                        </td>

                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
