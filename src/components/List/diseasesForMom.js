import React, { useEffect, useState } from 'react'
import QLBCTC from '../../CSS/TableStyle.module.scss'
import { Link } from 'react-router-dom';
import { BiDetail } from 'react-icons/bi';
import Popup from '../Popup/Popup'
import DetailDes from '../Detail/detailDiseasesForm';
import styleTable from '../../CSS/TableStyle.module.scss'

export default function DiseasesForMom() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [getId, setGetId]= useState([]);
    const url = "http://nhatkymebau.vn:8080/api/diseases/list"
    useEffect(() => {
        fetch(url)
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
                <b>Bệnh thường gặp ở phụ nữ mang thai</b>
            </div>
            <input className={QLBCTC.searchBarUser} type='text' placeholder='Nhập tên bệnh thường gặp..' onChange={(event) => {
                setSearchTerm(event.target.value);
            }} />
            <table className={`${QLBCTC.tableStyle}`} style={{ marginTop: '50px' }}>
                <thead>
                    <tr style={{ background: '#aee8ff' }}>
                        <th style={{ width: '10%' }}>Mã bệnh</th>
                        <th style={{ width: '35%' }}>Tên bệnh</th>
                        <th style={{ width: '48%' }}>Mô tả</th>
                        <th style={{ width: '7%' }}>Chi tiết</th>
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
                            if (item.forMom === true) {
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
                                            <Link to="/DiseasesForMom"
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
