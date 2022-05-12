import React, { useEffect, useState } from 'react'
import QLBCTC from '../../CSS/TableStyle.module.scss'
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { BiDetail } from 'react-icons/bi';
import Popup from '../Popup/Popup'
import DetailBaby from '../Detail/detailBabyForm';
import CreateBaby from '../Create/createBaby';
import PopupDelete from '../Popup/PopupDelete';
import DeleteBaby from '../Delete/deleteBaby';
import EditBaby from '../Edit/editBaby';
import styleTable from '../../CSS/TableStyle.module.scss'
export default function DanhSachTreSoSinh() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonPopup1, setButtonPopup1] = useState(false);
    const [buttonPopup2, setButtonPopup2] = useState(false);
    const [buttonPopup3, setButtonPopup3] = useState(false);
    const [getIdEdit, setGetIdEdit] = useState([]);
    const [getIdDel, setGetIdDel] = useState([]);
    const [getId, setGetId] = useState([]);
    const url = "http://103.74.123.192:8080/api/baby/list"

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
                <b>Danh sách trẻ sơ sinh</b>
            </div>
            <div>
                <Link to="/listAllBaby"
                    onClick={() => {
                        setButtonPopup1(true);
                    }}
                >
                    <button className={QLBCTC.btn}>
                        Thêm mới
                    </button>
                </Link>
                <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1} >
                    <CreateBaby />
                </Popup>
                <input className={QLBCTC.searchBar} type='text' placeholder='Nhập tên trẻ..' onChange={(event) => {
                    setSearchTerm(event.target.value);
                }} />
            </div>

            <table className={`${QLBCTC.tableStyle}`} >
                <thead>
                    <tr style={{ background: '#aee8ff' }}>
                        <th style={{ width: '7%' }}>STT</th>
                        <th style={{ width: '15%' }}>Tên trẻ</th>
                        <th style={{ width: '21%' }}>Ngày sinh</th>
                        <th style={{ width: '21%' }}>Giới tính</th>
                        <th style={{ width: '21%' }}>Mô tả</th>
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
                        }).map((item, index) => {
                            if (item.sex === true) {
                                var newSex = 'Nam'
                            }
                            else if (item.sex === false) {
                                newSex = 'Nữ'
                            }
                            return (
                                <tr key={index}>
                                    <td className={QLBCTC.center}>
                                        {index + 1}
                                    </td>
                                    <td className={QLBCTC.tdpadding}>
                                        {item.name}
                                    </td>
                                    <td className={QLBCTC.tdpadding}>
                                        ngày {item.DOB.slice(8, 10)} tháng {item.DOB.slice(5, 7)} năm {item.DOB.slice(0, 4)}
                                    </td>
                                    <td className={QLBCTC.tdpadding}>
                                        {newSex}
                                    </td>
                                    <td className={QLBCTC.tdpadding}>
                                        {item.note}
                                    </td>
                                    <td className={QLBCTC.center}>
                                        <Link to="/listAllBaby"
                                            onClick={() => {
                                                setButtonPopup(true); setGetId([{
                                                    momID: item.momID,
                                                    name: item.name,
                                                    note: item.note,
                                                    DOB: item.DOB,
                                                    sex: newSex,
                                                    weight: item.weight,
                                                    birthPlace: item.birthPlace,
                                                    bloodType: item.bloodType,
                                                    timeOfBirth: item.timeOfBirth,
                                                    high: item.high,
                                                }])
                                            }}
                                        >
                                            <BiDetail className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                        </Link>
                                        <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
                                            <DetailBaby dataFromParent={getId} />
                                        </Popup>
                                    </td>
                                    <td className={QLBCTC.center}>
                                        <Link to="/listAllBaby"
                                            onClick={() => {
                                                setButtonPopup3(true);
                                                setGetIdEdit([{
                                                    ID: item._id,
                                                    momID: item.momID,
                                                    name: item.name,
                                                    note: item.note,
                                                    DOB: item.DOB,
                                                    sex: newSex,
                                                    weight: item.weight,
                                                    birthPlace: item.birthPlace,
                                                    bloodType: item.bloodType,
                                                    timeOfBirth: item.timeOfBirth,
                                                    high: item.high,
                                                }])
                                            }}
                                        >
                                            <FiEdit className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                        </Link>
                                        <Popup trigger={buttonPopup3} setTrigger={setButtonPopup3} >
                                            <EditBaby dataFromParent={getIdEdit} />
                                        </Popup>

                                        <Link to="/listAllBaby"
                                            onClick={() => {
                                                setButtonPopup2(true); setGetIdDel([{
                                                    ID: item._id
                                                }])
                                            }}
                                        >
                                            <AiFillDelete className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                        </Link>
                                        <PopupDelete trigger={buttonPopup2} setTrigger={setButtonPopup2} >
                                            <DeleteBaby dataFromParent={getIdDel} />
                                        </PopupDelete>
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
