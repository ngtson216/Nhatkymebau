import React from 'react'
import DetailDiseasesForm from '../../CSS/DetailDiseasesForm.module.scss'
export default function DetailDes(props) {
    var for1
    (props.dataFromParent[0].for === true) ? (
        for1 = 'Mẹ'
    ) : (
        for1 = 'Trẻ'
    )
    return (
        <div className={DetailDiseasesForm.container}>
            <div>
                <p className={DetailDiseasesForm.titleStyle}>Thông tin chi tiết về bệnh</p>
            </div>
            <div>
                <ul className={DetailDiseasesForm.ulStyle}>
                    <li><b className={DetailDiseasesForm.spanStyle}>Tên bệnh:</b>
                        <span> {props.dataFromParent[0].name}</span>
                    </li>
                    <li><b className={DetailDiseasesForm.spanStyle}>Bệnh cho:</b>
                        <span> {for1} </span>
                    </li>                   
                    <li><b className={DetailDiseasesForm.spanStyle}>Loại bệnh:</b>
                        <span> {props.dataFromParent[0].category}</span>
                    </li>
                    <li><b className={DetailDiseasesForm.spanStyle}>Vaccine:</b>
                        <span> </span>
                    </li>
                </ul>
                <p className={DetailDiseasesForm.noteStyle}>
                    <b className={DetailDiseasesForm.spanStyle}>Mô tả:</b>
                    <span> {props.dataFromParent[0].note}</span>
                </p>
            </div>
        </div>
    )
}
