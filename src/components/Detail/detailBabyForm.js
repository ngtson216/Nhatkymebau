import React, { useEffect, useState } from 'react'
import DetailDiseasesForm from '../../CSS/DetailDiseasesForm.module.scss'
export default function DetailBaby(props) {
    const [getMom, setMom] = useState()
    const url = "http://103.74.123.192:8080/api/user/" + props.dataFromParent[0].momID
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                setMom(result.name)
            })
            .catch(error => console.log('error', error));
    })
    return (
        <div className={DetailDiseasesForm.container}>
            <div>
                <p className={DetailDiseasesForm.titleStyle}>Thông tin chi tiết về trẻ</p>
            </div>
            <div>
                <p className={DetailDiseasesForm.noteStyle}>
                    <b className={DetailDiseasesForm.spanStyle}>Tên trẻ:</b>
                    <span> {props.dataFromParent[0].name}</span>
                </p>
                <p className={DetailDiseasesForm.noteStyle}>
                <b className={DetailDiseasesForm.spanStyle}>Tên mẹ:</b>
                        <span> {getMom} </span>
                </p>
                <ul className={DetailDiseasesForm.ulStyle}>                    
                    <li><b className={DetailDiseasesForm.spanStyle}>Giới tính:</b>
                        <span> {props.dataFromParent[0].sex}</span>
                    </li>
                    <li><b className={DetailDiseasesForm.spanStyle}>Cân nặng:</b>
                        <span> {props.dataFromParent[0].weight}</span>
                    </li>
                    <li><b className={DetailDiseasesForm.spanStyle}>Nhóm máu:</b>
                        <span> {props.dataFromParent[0].bloodType}</span>
                    </li>
                    <li><b className={DetailDiseasesForm.spanStyle}>Giờ sinh:</b>
                        <span> {props.dataFromParent[0].timeOfBirth} giờ</span>
                    </li>
                    <li><b className={DetailDiseasesForm.spanStyle}>high:</b>
                        <span> {props.dataFromParent[0].high}</span>
                    </li>
                </ul>
                <p className={DetailDiseasesForm.noteStyle}>
                    <b className={DetailDiseasesForm.spanStyle}>Ngày sinh:</b>
                    <span> {props.dataFromParent[0].DOB}</span>
                </p>
                <p className={DetailDiseasesForm.noteStyle}>
                    <b className={DetailDiseasesForm.spanStyle}>Nơi sinh:</b>
                    <span> {props.dataFromParent[0].birthPlace}</span>
                </p>
                <p className={DetailDiseasesForm.noteStyle}>
                    <b className={DetailDiseasesForm.spanStyle}>Mô tả:</b>
                    <span> {props.dataFromParent[0].note}</span>
                </p>
            </div>
        </div>
    )
}
