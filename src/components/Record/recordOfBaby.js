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
                <b style={{ fontSize: '22px' }}>H??? s?? kh??m cho tr???</b><br />
            </div>
            <div>
                <table className={`${QLBCTC.tableStyle}`} >
                    <thead>
                        <tr style={{ background: '#aee8ff' }}>
                            <th style={{ width: '3%' }}>STT</th>
                            <th style={{ width: '15%' }}>T??n tr???</th>
                            <th style={{ width: '6%' }}>Gi???i t??nh</th>
                            <th style={{ width: '15%' }}>Ng??y kh??m</th>
                            <th style={{ width: '5%' }}>T??nh tr???ng</th>
                            <th style={{ width: '5%' }}>M???ch ?????p</th>
                            <th style={{ width: '5%' }}>Th??n nhi???t</th>
                            <th style={{ width: '5%' }}>U???ng s???a m???</th>
                            <th style={{ width: '5%' }}>Th???i gian cho tr??? b??</th>
                            <th style={{ width: '6%' }}>Kh??c th?????ng</th>
                            <th style={{ width: '6%' }}>H?? h???p</th>
                            <th style={{ width: '8%' }}>Ki???m tra b??n ngo??i</th>
                            <th style={{ width: '21%' }}>M?? t???</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            newMap.map((item, index) => {
                                if (item.status === 'good') {
                                    var newStatus = 'T???t'
                                }
                                else if (item.status === 'bad') {
                                    newStatus = 'X???u'
                                }
                                else {
                                    newStatus = item.status
                                }
                                if (item.dinkingMotherMilk === true) {
                                    var newDinking = "C??"
                                }
                                else if (item.dinkingMotherMilk === false) {
                                    newDinking = "Kh??ng"
                                }
                                if(item.sex === true){
                                    var newSex = 'Nam'
                                }
                                else if (item.sex === false){
                                    newSex = 'N???'
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

                                            ng??y {item.date.slice(8, 10)}
                                            /{item.date.slice(5, 7)}
                                            /{item.date.slice(0, 4)}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {newStatus}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {item.pulse} /ph??t
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {item.bodyTemperature} ?????
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
