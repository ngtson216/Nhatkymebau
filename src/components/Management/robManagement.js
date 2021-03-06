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
                <b style={{ fontSize: '22px' }}>H??? s?? kh??m cho tr???</b><br />
            </div>
            <div>
                <Link to="/recordOfBaby" onClick={() => {
                    setButtonPopup1(true);
                }}>
                    <button className={styleTable.btn}>
                        Th??m m???i
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
                                    var newStatus = 'T???t'
                                }
                                else if (item.rob.status === 'bad') {
                                    newStatus = 'X???u'
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
                                                        return "N???"
                                                    }
                                                }
                                            })}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            ng??y {item.rob.date.slice(8, 10)}
                                            /{item.rob.date.slice(5, 7)}
                                            /{item.rob.date.slice(0, 4)}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {newStatus}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {getItem1.map((item1) => {
                                                if (item1._id === item.rob.babyID) {
                                                    return (item.rob.pulse + "/ph??t")
                                                }
                                            })}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {getItem1.map((item1) => {
                                                if (item1._id === item.rob.babyID) {
                                                    return (item.rob.bodyTemperature + " ?????")
                                                }
                                            })}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {getItem1.map((item1) => {
                                                if (item1._id === item.rob.babyID) {
                                                    if (item1._id === item.rob.babyID) {
                                                        if (item1.dinkingMotherMilk === true) {
                                                            return "C??"
                                                        }
                                                        else {
                                                            return "Kh??ng"
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
