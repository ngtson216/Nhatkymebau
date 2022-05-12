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
// import PopupCreROM from '../PopupCreROM'
// import CreateROM from '../CreateROM';
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
    var count = 0
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
    var newMap = [];
    for (let i = 0; i < getItem.length; i++) {
        for (let j = 0; j < getItem1.length; j++) {
            if (getItem1[j]._id === getItem[i].rob.babyID && getItem1[j].momID === decoded.id) {
                newMap[count] = {
                    name: getItem1[j].name,
                    note: getItem[i].rob.note,
                    sex: getItem1[j].sex,
                    date: getItem[i].rob.date,
                    status: getItem[i].rob.status,
                    pulse: getItem[i].rob.pulse,
                    bodyTemperature: getItem[i].rob.bodyTemperature,
                    dinkingMotherMilk: getItem[i].rob.dinkingMotherMilk,
                    breastFeedingTimes: getItem[i].rob.breastFeedingTimes,
                    divergent: getItem[i].rob.divergent,
                    breathing: getItem[i].rob.breathing,
                    externalExamination: getItem[i].rob.externalExamination
                }
                count += 1;
            }
        }
    }
    // console.log(newMap)
    // console.log(getItem.rob)
    return (
        <div>
            <div style={{ padding: '1.4%', textAlign: 'center' }}>
                <b style={{ fontSize: '22px' }}>Hồ sơ khám cho trẻ</b><br />
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
                            newMap.map((item, index) => {
                                if (item.status === 'good') {
                                    var newStatus = 'Tốt'
                                }
                                else if (item.status === 'bad') {
                                    newStatus = 'Xấu'
                                }
                                else {
                                    newStatus = item.status
                                }
                                if (item.dinkingMotherMilk === true) {
                                    var newDinking = "Có"
                                }
                                else if (item.dinkingMotherMilk === false) {
                                    newDinking = "Không"
                                }
                                if(item.sex === true){
                                    var newSex = 'Nam'
                                }
                                else if (item.sex === false){
                                    newSex = 'Nữ'
                                }
                                return (
                                    <tr key={index}>
                                        <td style={{ textAlign: 'center' }}>
                                            {index + 1}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {item.name}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {newSex}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>

                                            ngày {item.date.slice(8, 10)}
                                            /{item.date.slice(5, 7)}
                                            /{item.date.slice(0, 4)}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {newStatus}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {item.pulse} /phút
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {item.bodyTemperature} độ
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {newDinking}
                                        </td>

                                        <td style={{ textAlign: 'center' }}>
                                            {item.breastFeedingTimes}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {item.divergent}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {item.breathing}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {item.externalExamination}
                                        </td>

                                        <td>
                                            {item.note}
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
