import React, { useEffect, useState } from 'react'
import QLBCTC from '../../CSS/TableStyle.module.scss'
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { BiDetail } from 'react-icons/bi';
import Popup from '../Popup/Popup'
import DetailDes from '../Detail/detailDiseasesForm';
import CreateDiseases from '../Create/createDiseases';
import DeleteDes from '../Delete/deleteDiseases';
import PopupDelete from '../Popup/PopupDelete';
import styleTable from '../../CSS/TableStyle.module.scss'
import EditDiseases from '../Edit/editDiseases';
export default function QuanLyBenhCanTiemChung() {
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
    const url = "http://103.74.123.192:8080/api/diseases/list"

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
                <b>Quản lý bệnh cần tiêm chủng</b>
            </div>
            <div>
                <Link to="/managementOfDiseasesRequiringVaccination"
                    onClick={() => {
                        setButtonPopup1(true);
                    }}
                >
                    <button className={QLBCTC.btn}>
                        Thêm mới
                    </button>
                </Link>
                <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1} >
                    <CreateDiseases />
                </Popup>
                <input className={QLBCTC.searchBar} type='text' placeholder='Nhập tên bệnh..' onChange={(event) => {
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
                        }).map((item) => {
                            if (item.needInjection === true) {
                                return (
                                    <tr key={item.ID}>
                                        <td className={QLBCTC.center}>
                                            {item.ID}
                                        </td>
                                        <td className={QLBCTC.tdpadding}>
                                            {item.name}
                                        </td>
                                        <td className={QLBCTC.tdpadding}>
                                            {item.note}
                                        </td>
                                        <td className={QLBCTC.center}>
                                            <Link to="/managementOfDiseasesRequiringVaccination"
                                                onClick={() => {
                                                    setButtonPopup(true); setGetId([{
                                                        category: item.category,
                                                        name: item.name,
                                                        note: item.note,
                                                        for: item.forMom,
                                                    }])
                                                }}
                                            >
                                                <BiDetail className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                            </Link>
                                            <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
                                                <DetailDes dataFromParent={getId} />
                                            </Popup>
                                        </td>
                                        <td className={QLBCTC.center}>
                                            <Link to="/managementOfDiseasesRequiringVaccination"
                                                onClick={() => {
                                                    setButtonPopup3(true);
                                                    if (item.forMom === true) {
                                                        var newFor = 'Mẹ'
                                                    }
                                                    else if (item.forMom === false) {
                                                        newFor = 'Trẻ'
                                                    }
                                                    if (item.needInjection === true) {
                                                        var newNeed = 'Có'
                                                    }
                                                    setGetIdEdit([{
                                                        category: item.category,
                                                        name: item.name,
                                                        note: item.note,
                                                        for: newFor,
                                                        needInjection: newNeed,
                                                        ID: item.ID,
                                                    }])
                                                }}
                                            >
                                                <FiEdit className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                            </Link>
                                            <Popup trigger={buttonPopup3} setTrigger={setButtonPopup3} >
                                                <EditDiseases dataFromParent={getIdEdit} />
                                            </Popup>

                                            <Link to="/managementOfDiseasesRequiringVaccination"
                                                onClick={() => {
                                                    setButtonPopup2(true); setGetIdDel([{
                                                        ID: item.ID
                                                    }])
                                                }}
                                            >
                                                <AiFillDelete className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                            </Link>
                                            <PopupDelete trigger={buttonPopup2} setTrigger={setButtonPopup2} >
                                                <DeleteDes dataFromParent={getIdDel} />
                                            </PopupDelete>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}
