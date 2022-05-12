import React from 'react'
import DetailDiseasesForm from '../../CSS/DetailDiseasesForm.module.scss'
export default function DetailHos(props) {
    return (
        <div className={DetailDiseasesForm.container}>
            <div>
                <p className={DetailDiseasesForm.titleStyle}>Thông tin chi tiết về cơ sở y tế</p>
            </div>
            <div>
                <ul className={DetailDiseasesForm.ulStyle}>
                    <li><b className={DetailDiseasesForm.spanStyle}>Tên CSYT:</b>
                        <span> {props.dataFromParent[0].name}</span>
                    </li>
                    <li><b className={DetailDiseasesForm.spanStyle}>Số điện thoại:</b>
                        <span> {props.dataFromParent[0].phone} </span>
                    </li>                   
                    <li><b className={DetailDiseasesForm.spanStyle}>Địa chỉ:</b>
                        <span> {props.dataFromParent[0].address}</span>
                    </li>
                    <li><b className={DetailDiseasesForm.spanStyle}>Phường/Xã:</b>
                        <span> {props.dataFromParent[0].ward} </span>
                    </li>
                    <li><b className={DetailDiseasesForm.spanStyle}>Quận/Huyện:</b>
                        <span> {props.dataFromParent[0].district} </span>
                    </li>
                    <li><b className={DetailDiseasesForm.spanStyle}>Tỉnh/Thành phố:</b>
                        <span> {props.dataFromParent[0].city} </span>
                    </li>
                    <li><b className={DetailDiseasesForm.spanStyle}>Số phòng khám:</b>
                        <span> {props.dataFromParent[0].numberOfClinic} </span>
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
