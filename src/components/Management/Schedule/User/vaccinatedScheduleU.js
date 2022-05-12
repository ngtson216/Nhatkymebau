import React, { useEffect, useState } from 'react'
import QLBCTC from '../../../../CSS/TableStyle.module.scss'
import { Link } from 'react-router-dom';
import { BiDetail } from 'react-icons/bi';
import jwt_decode from "jwt-decode";
import Popup from '../../../Popup/Popup'
import VaccinatedStatusUser from './vaccinatedUpdateStatusU';
import styleTable from '../../../../CSS/TableStyle.module.scss'

export default function VaccinatedScheUser() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [getId, setGetId] = useState([]);
    const decoded = jwt_decode(localStorage.getItem('token'));
    console.log(decoded.id)
    const url = "http://nhatkymebau.vn:8080/api/schedulevaccinated/listbyuser/" + decoded.id
    console.log(url)
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-auth-token", localStorage.getItem('token'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
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
                <b>Lịch tiêm cá nhân</b>
            </div>
            <input className={QLBCTC.searchBarUser} type='text' placeholder='Search..' onChange={(event) => {
                setSearchTerm(event.target.value);
            }} />
            <table className={`${QLBCTC.tableStyle}`} style={{ marginTop: '50px' }}>
                <thead>
                    <tr style={{ background: '#aee8ff' }}>
                        <th style={{ width: '5%' }}>STT</th>
                        <th style={{ width: '15%' }}>Tên trẻ</th>
                        <th style={{ width: '20%' }}>Nơi khám</th>
                        <th style={{ width: '20%' }}>Thời gian tiêm</th>
                        <th style={{ width: '15%' }}>Loại vaccine đã chọn</th>
                        <th style={{ width: '15%' }}>Trạng thái</th>
                        <th style={{ width: '5%' }}>Cập nhật</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.filter((item) => {
                            if (searchTerm == "") {
                                return item
                            }
                            else if (item.status.toLowerCase().includes(searchTerm.toLowerCase()) || item.hospital.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return item
                            }
                        }).map((item, index) => {
                            if (item.status === 'pending') {
                                var status = 'Chờ xét duyệt'
                            }
                            else if (item.status === 'accept') {
                                status = 'Đã được duyệt'
                            }
                            else if (item.status === 'reject') {
                                status = 'Từ chối khám'
                            }
                            else if (item.status === 'success') {
                                status = 'Đã hoàn thành khám'
                            }
                            else if (item.status === 'cancel') {
                                status = 'Đã hủy lịch'
                            }
                            return (
                                <tr key={index}>
                                    <td className={QLBCTC.center}>
                                        {index + 1}
                                    </td>
                                    <td className={QLBCTC.tdpadding}>
                                        {item.babyName}
                                    </td>
                                    <td className={QLBCTC.tdpadding}>
                                        {item.hospital}
                                    </td>
                                    <td className={QLBCTC.tdpadding}>
                                        {item.dateTime.slice(11, 16)} ngày {item.dateTime.slice(8, 10)} tháng {item.dateTime.slice(5, 7)} năm {item.dateTime.slice(0, 4)}
                                    </td>
                                    <td className={QLBCTC.tdpadding}>
                                        {item.vaccine}
                                    </td>
                                    <td className={QLBCTC.tdpadding}>
                                        {status}
                                    </td>
                                    <td className={QLBCTC.center}>
                                        <Link to="/personalVaccinatedSchedule"
                                            onClick={() => {
                                                setButtonPopup(true); setGetId([{
                                                    type: "Tiêm chủng",
                                                    hospital: item.hospital,
                                                    status: status,
                                                    time: item.dateTime,
                                                    id: item._id
                                                }])
                                            }}
                                        >
                                            <BiDetail className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                        </Link>
                                        <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
                                            <VaccinatedStatusUser dataFromParent={getId} />
                                        </Popup>
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </table>
        </div >
    )
}
