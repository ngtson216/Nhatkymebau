import React from 'react'
import DetailDiseasesForm from '../../CSS/DetailDiseasesForm.module.scss'
export default function DetailVaccine(props) {
    var repeat
    if (props.dataFromParent[0].repeat === 0) {
        repeat = 'Không cần'
    }
    else {
        repeat = props.dataFromParent[0].repeat + ' tháng'
    }
    return (
        <div className={DetailDiseasesForm.container}>
            <div>
                <p className={DetailDiseasesForm.titleStyle}>Thông tin chi tiết về Vaccine</p>
            </div>
            <div>
                <ul className={DetailDiseasesForm.ulStyle}>
                    <li><b className={DetailDiseasesForm.spanStyle}>Tên Vaccine:</b>
                        <span> {props.dataFromParent[0].name}</span>
                    </li>
                    <li><b className={DetailDiseasesForm.spanStyle}>Số mũi cần tiêm:</b>
                        <span> {props.dataFromParent[0].numberOfVaccinated}</span>
                    </li>
                </ul>
                <p className={DetailDiseasesForm.noteStyle}>
                    <b className={DetailDiseasesForm.spanStyle}>Giá tiền:</b>
                    <span>{props.dataFromParent[0].price} VNĐ</span>
                </p>
                <p className={DetailDiseasesForm.noteStyle}>
                    <b className={DetailDiseasesForm.spanStyle}>Thời điểm cần tiêm:</b>
                    <span>{props.dataFromParent[0].injectedAt}</span>
                </p>
                <p className={DetailDiseasesForm.noteStyle}>
                    <b className={DetailDiseasesForm.spanStyle}>Thời gian cần tiêm nhắc lại:</b>
                    <span>{repeat}</span>
                </p>
                <p className={DetailDiseasesForm.noteStyle}>
                    <b className={DetailDiseasesForm.spanStyle}>Mô tả:</b>
                    <span> {props.dataFromParent[0].note}</span>
                </p>
            </div>
        </div>
    )
}
