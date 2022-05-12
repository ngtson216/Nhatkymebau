import React, { useEffect, useState } from 'react'
import QLBCTC from '../../CSS/TableStyle.module.scss'
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { BiDetail } from 'react-icons/bi';
import Popup from '../Popup/Popup'
import DetailVaccine from '../Detail/detailVaccineForm';
import CreateVaccine from '../Create/createVaccine';
import DeleteVac from '../Delete/deleteVaccine';
import PopupDelete from '../Popup/PopupDelete';
import EditVac from '../Edit/editVaccine'
import styleTable from '../../CSS/TableStyle.module.scss'
export default function QuanLyVaccine() {
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [getId, setGetId] = useState([]);
    const [buttonPopup1, setButtonPopup1] = useState(false);
    const [buttonPopup2, setButtonPopup2] = useState(false);
    const [buttonPopup3, setButtonPopup3] = useState(false);
    const [getIdEdit, setGetIdEdit] = useState([]);
    const [getIdDel, setGetIdDel] = useState([]);
    const url = "http://103.74.123.192:8080/api/vaccine/list"

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
                <b>Quản lý Vaccine</b>
            </div>
            <div>
                <Link to="/vaccineManagement" onClick={() => {
                    setButtonPopup1(true);
                }}>
                    <button className={QLBCTC.btn}>
                        Thêm mới
                    </button>
                </Link>
                <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1} >
                    <CreateVaccine />
                </Popup>
                <input className={QLBCTC.searchBar} type='text' placeholder='Nhập tên vaccine..' onChange={(event) => {
                    setSearchTerm(event.target.value);
                }} />
            </div>

            <table className={`${QLBCTC.tableStyle}`} >
                <thead>
                    <tr style={{ background: '#aee8ff' }}>
                        <th style={{ width: '7%' }}>Mã bệnh</th>
                        <th style={{ width: '15%' }}>Tên bệnh</th>
                        <th style={{ width: '64%' }}>Mô tả</th>
                        <th style={{ width: '6%' }}>Chi tiết</th>
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
                        }).map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className={QLBCTC.center}>
                                        {index + 1}
                                    </td>
                                    <td className={QLBCTC.tdpadding}>
                                        {item.name}
                                    </td>
                                    <td className={QLBCTC.tdpadding}>
                                        {item.note}
                                    </td>
                                    <td className={QLBCTC.center}>
                                        <Link to="/vaccineManagement"
                                            onClick={() => {
                                                setButtonPopup(true); setGetId([{
                                                    name: item.name,
                                                    note: item.note,
                                                    repeat: item.repeat,
                                                    numberOfVaccinated: item.numberOfVaccinated,
                                                    injectedAt: item.injectedAt,
                                                    price: item.price,
                                                }])
                                            }}
                                        >
                                            <BiDetail className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                        </Link>
                                        <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
                                            <DetailVaccine dataFromParent={getId} />
                                        </Popup>
                                    </td>
                                    <td className={QLBCTC.center}>
                                        <Link to="/vaccineManagement"
                                            onClick={() => {
                                                setButtonPopup3(true); setGetIdEdit([{
                                                    name: item.name,
                                                    note: item.note,
                                                    repeat: item.repeat,
                                                    numberOfVaccinated: item.numberOfVaccinated,
                                                    injectedAt: item.injectedAt,
                                                    price: item.price,
                                                    ID: item._id,
                                                }])
                                            }}>
                                            <FiEdit className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                        </Link>
                                        <Popup trigger={buttonPopup3} setTrigger={setButtonPopup3} >
                                            <EditVac dataFromParent={getIdEdit} />
                                        </Popup>

                                        <Link to="/vaccineManagement"
                                            onClick={() => {
                                                setButtonPopup2(true); setGetIdDel([{
                                                    ID: item._id
                                                }])
                                            }}
                                        >
                                            <AiFillDelete className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                        </Link>
                                        <PopupDelete trigger={buttonPopup2} setTrigger={setButtonPopup2} >
                                            <DeleteVac dataFromParent={getIdDel} />
                                        </PopupDelete>
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}
