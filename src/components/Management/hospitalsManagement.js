import React, { useEffect, useState } from 'react'
import QLBCTC from '../../CSS/TableStyle.module.scss'
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { BiDetail } from 'react-icons/bi';
import Popup from '../Popup/Popup'
import PopupDelete from '../Popup/PopupDelete';
import DetailHos from '../Detail/detailHospitalForm';
import CreateHospital from '../Create/createHospital';
import EditHospital from '../Edit/editHospital';
import DeleteHos from '../Delete/deleteHospital';
import styleTable from '../../CSS/TableStyle.module.scss'
export default function QuanLyCSYT() {
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonPopup1, setButtonPopup1] = useState(false);
    const [buttonPopup2, setButtonPopup2] = useState(false);
    const [buttonPopup3, setButtonPopup3] = useState(false);
    const [getIdEdit, setGetIdEdit] = useState([]);
    const [getIdDel, setGetIdDel] = useState([]);
    const [getId, setGetId] = useState([]);
    const url = "http://nhatkymebau.vn:8080/api/hospital/list"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                },
                (error) => {
                    setError(error);
                }
            )
    }, [])
    return (
        <div>
            <div className={styleTable.title}>
                <b>Quản lý cơ sở Y tế </b>
            </div>
            <div>
                <Link to="/hospitalsManagement"
                    onClick={() => {
                        setButtonPopup1(true);
                    }}
                >
                    <button className={QLBCTC.btn}>
                        Thêm mới
                    </button>
                </Link>
                <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1} >
                    <CreateHospital />
                </Popup>
                <input className={QLBCTC.searchBar} type='text' placeholder='Nhập tên cơ sở y tế..' onChange={(event) => {
                    setSearchTerm(event.target.value);
                }} />
            </div>
            <table className={`${QLBCTC.tableStyle}`} >
                <thead>
                    <tr style={{ background: '#aee8ff' }}>
                        <th style={{ width: '10%' }}>Mã bệnh viện</th>
                        <th style={{ width: '35%' }}>Tên bệnh viện</th>
                        <th style={{ width: '40%' }}>Tỉnh/Thành phố</th>
                        <th style={{ width: '7%' }}>Chi tiết</th>
                        <th style={{ width: '8%' }}>Chỉnh sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.filter((item) => {
                            if (searchTerm == "") {
                                return item
                            }
                            else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return item
                            }
                        }).map((item) => (
                            <tr key={item.ID}>
                                <td className={QLBCTC.center}>
                                    {item.ID}
                                </td>
                                <td className={QLBCTC.tdpadding}>
                                    {item.name}
                                </td>
                                <td className={QLBCTC.tdpadding} style={{ textAlign: 'center' }}>
                                    {item.city}
                                </td>
                                <td className={QLBCTC.center}>
                                    <Link to="/hospitalsManagement"
                                        onClick={() => {
                                            setButtonPopup(true); setGetId([{
                                                phone: item.phone,
                                                name: item.name,
                                                note: item.note,
                                                numberOfClinic: item.numberOfClinic,
                                                address: item.address,
                                                ward: item.ward,
                                                district: item.district,
                                                city: item.city,
                                                ID: item.ID,
                                            }])
                                        }}
                                    >
                                        <BiDetail className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                    </Link>
                                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
                                        <DetailHos dataFromParent={getId} />
                                    </Popup>
                                </td>
                                <td className={QLBCTC.center}>
                                    <Link to="/hospitalsManagement"
                                        onClick={() => {
                                            setButtonPopup3(true);
                                            setGetIdEdit([{
                                                ID: item.ID,
                                                phone: item.phone,
                                                name: item.name,
                                                note: item.note,
                                                numberOfClinic: item.numberOfClinic,
                                                address: item.address,
                                                ward: item.ward,
                                                district: item.district,
                                                city: item.city,
                                            }])
                                        }}>                                    
                                        <FiEdit className={`${QLBCTC.marginStyle} ${QLBCTC.center}`} style={{ color: '#000000' }} />
                                    </Link>
                                    <Popup trigger={buttonPopup3} setTrigger={setButtonPopup3} >
                                        <EditHospital dataFromParent={getIdEdit} />
                                    </Popup>
                                    <Link to="/hospitalsManagement"
                                        onClick={() => {
                                            setButtonPopup2(true); setGetIdDel([{
                                                ID: item.ID
                                            }])
                                        }}
                                    >
                                        <AiFillDelete className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                    </Link>
                                    <PopupDelete trigger={buttonPopup2} setTrigger={setButtonPopup2} >
                                        <DeleteHos dataFromParent={getIdDel} />
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
