import React, { useEffect, useState } from 'react'
import QLBCTC from '../../CSS/TableStyle.module.scss'
import { Link } from 'react-router-dom';
import { BiDetail } from 'react-icons/bi';
import Popup from '../Popup/Popup'
import DetailHos from '../Detail/detailHospitalForm';
import styleTable from '../../CSS/TableStyle.module.scss'

export default function CSYT() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [getId, setGetId]= useState([]);
    const url = "http://nhatkymebau.vn:8080/api/hospital/list"
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
                <b>Danh sách cơ sở Y tế</b>
            </div>
            <input className={QLBCTC.searchBarUser} type='text' placeholder='Nhập tên hoặc thành phố..' onChange={(event) => {
                setSearchTerm(event.target.value);
            }} />
            <table className={`${QLBCTC.tableStyle}`} style={{ marginTop: '50px' }}>
                <thead>
                    <tr style={{ background: '#aee8ff' }}>
                        <th style={{ width: '10%' }}>Mã bệnh viện</th>
                        <th style={{ width: '35%' }}>Tên bệnh viện</th>
                        <th style={{ width: '48%' }}>Tỉnh/Thành phố</th>
                        <th style={{ width: '7%' }}>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.filter((item) => {
                            if (searchTerm == "") {
                                return item
                            }
                            else if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.city.toLowerCase().includes(searchTerm.toLowerCase()) ) {
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
                                <td className={QLBCTC.tdpadding} style={{textAlign: 'center'}}>
                                    {item.city}
                                </td>
                                <td className={QLBCTC.center}>
                                    <Link to="/hospitalList"
                                        onClick={() => {
                                            setButtonPopup(true); setGetId([{
                                                phone: item.phone,
                                                name: item.name,
                                                note: item.note,
                                                numberOfClinic: item.numberOfClinic,
                                                address: item.address,
                                                ward: item.ward,
                                                district: item.district,
                                                city: item.city
                                            }])
                                        }}
                                    >
                                        <BiDetail className={QLBCTC.marginStyle} style={{ color: '#000000' }} />
                                    </Link>
                                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
                                        <DetailHos dataFromParent={getId} />
                                    </Popup>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}
