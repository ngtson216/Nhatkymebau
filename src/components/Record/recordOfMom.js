import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import QLBCTC from '../../CSS/TableStyle.module.scss'
import PopupROM from '../Popup/PopupROM'
import { BiDetail } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import DetailRecord from '../Detail/detailROMForm';

export default function RecordOfMom() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    const [getItem, setItem] = useState([])
    const [buttonPopup, setButtonPopup] = useState(false);
    const [getId, setGetId] = useState([]);
    const url = "http://nhatkymebau.vn:8080/api/recordofmom/list/"
    var count = 0;
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-auth-token", localStorage.getItem('token'));
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => setItem(result))
            .catch(error => console.log('error', error));
    }, [])
    return (
        <div >
            <div style={{ padding: '1.4%', textAlign: 'center' }}>
                <b style={{ fontSize: '22px' }}>Hồ sơ khám thai</b><br />
            </div>
            <div>
                <table className={`${QLBCTC.tableStyle}`} >
                    <thead>
                        <tr style={{ background: '#aee8ff' }}>
                            <th style={{ width: '8%' }}>Lần khám</th>
                            <th style={{ width: '35%' }}>Ngày khám</th>
                            <th style={{ width: '51%' }}>Tình trạng</th>
                            <th style={{ width: '6%' }}>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getItem.map((item, index) => {
                                if (item.rom.status === 'good') {
                                    var newStatus = 'Tốt'
                                }
                                else if (item.rom.status === 'bad') {
                                    newStatus = 'Xấu'
                                }
                                if (item.rom.momID === decoded.id) {
                                    count += 1;
                                    return (
                                        <tr key={index}>
                                            <td style={{ textAlign: 'center' }}>
                                                {count}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {item.rom.date.slice(11, 16)}h,
                                                ngày {item.rom.date.slice(8, 10)}
                                                /{item.rom.date.slice(5, 7)}
                                                /{item.rom.date.slice(0, 4)}
                                            </td>
                                            <td>
                                                {newStatus}
                                            </td>
                                            <td>
                                                <div className={QLBCTC.center}>
                                                    <Link to="/recordOfMom"
                                                        onClick={() => {
                                                            setButtonPopup(true); setGetId([{
                                                                note: item.rom.note,
                                                                date: item.rom.date,
                                                                status: item.rom.status,
                                                                antenatalDay: item.rom.antenatalDay,
                                                                gestationalWeek: item.rom.gestationalWeek,
                                                                weightBefore: item.rom.weightBefore,
                                                                weightAfter: item.rom.weightAfter,
                                                                height: item.rom.height,
                                                                bloodPressure: item.rom.bloodPressure,
                                                                ageAtPregnancy: item.rom.ageAtPregnancy,
                                                                pelvic: item.rom.pelvic,
                                                                pulse: item.rom.pulse,
                                                                doctorExamines: item.rom.doctorExamines,
                                                                reExaminationDate: item.rom.reExaminationDate,
                                                                supersonic: item.rom.supersonic,
                                                                uterineHeight: item.rom.uterineHeight,
                                                                waistCircumference: item.rom.waistCircumference,
                                                                proteinuria: item.rom.proteinuria,
                                                                anemia: item.rom.anemia,
                                                                hemoglobin: item.rom.hemoglobin,
                                                                fetalHeart: item.rom.fetalHeart,
                                                                breast: item.rom.breast,
                                                                // diseases: item.diseases.map((item, index) => {

                                                                // }),
                                                            }])
                                                        }}
                                                    >
                                                        <BiDetail
                                                            className={QLBCTC.marginStyle}
                                                            style={{ color: '#000000' }} />
                                                    </Link>
                                                </div>
                                                <div>
                                                    <PopupROM trigger={buttonPopup} setTrigger={setButtonPopup} >
                                                        <DetailRecord dataFromParent={getId} />
                                                    </PopupROM>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
