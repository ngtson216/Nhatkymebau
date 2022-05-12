import React from 'react'
import popup from '../../CSS/PopupROM.module.css'
export default function DetailRecord(props) {
    var statusTrans;
    (props.dataFromParent[0].status === 'good') ? (
        statusTrans = 'Tốt'
    ) : (
        statusTrans = 'Không tốt'
    )
    var statusProteinuria;
    (props.dataFromParent[0].proteinuria === true) ? (
        statusProteinuria = 'Có'
    ) : (
        statusProteinuria = 'Không'
    )

    return (
        <div>
            <div className={popup.title}>
                <p >Thông tin hồ sơ khám thai</p>
            </div>
            <div>
                <table style={{ width: '100%' }}>
                    <td style={{ width: '50%' }}>
                        <p>
                            <b>Ngày khám: </b>
                            <span>
                                {/* {props.dataFromParent[0].date.slice(11, 16)} giờ, */}
                                {props.dataFromParent[0].date.slice(8, 10)}
                                /{props.dataFromParent[0].date.slice(5, 7)}
                                /{props.dataFromParent[0].date.slice(0, 4)}
                            </span>
                        </p>
                        <p>
                            <b>Tình trạng: </b>
                            <span> {statusTrans} </span>
                        </p>
                        <p>
                            <b>Bệnh mắc phải: </b>
                            <span> {props.dataFromParent[0].diseases} </span>
                        </p>
                        <p>
                            <b>Ngày sinh dự kiến: </b>
                            <span>
                                {/* {props.dataFromParent[0].antenatalDay.slice(11, 16)} giờ, */}
                                {props.dataFromParent[0].antenatalDay.slice(8, 10)}
                                /{props.dataFromParent[0].antenatalDay.slice(5, 7)}
                                /{props.dataFromParent[0].antenatalDay.slice(0, 4)}
                            </span>
                        </p>
                        <p>
                            <b>Tuần thai: </b>
                            <span> {props.dataFromParent[0].gestationalWeek} </span>
                        </p>
                        <p>
                            <b>Cân nặng trước khi mang thai: </b>
                            <span> {props.dataFromParent[0].weightBefore} kg</span>
                        </p>
                        <p>
                            <b>Cân nặng hiện tại: </b>
                            <span> {props.dataFromParent[0].weightAfter} kg</span>
                        </p>
                        <p>
                            <b>Chiều cao: </b>
                            <span> {props.dataFromParent[0].height} cm</span>
                        </p>
                        <p>
                            <b>Huyết áp: </b>
                            <span> {props.dataFromParent[0].bloodPressure} mmHg</span>
                        </p>
                        <p>
                            <b>Tuổi trước khi mang thai: </b>
                            <span> {props.dataFromParent[0].ageAtPregnancy} </span>
                        </p>
                        <p>
                            <b>Khung chậu: </b>
                            <span> {props.dataFromParent[0].pelvic} cm</span>
                        </p>
                        <p>
                            <b>Mạch: </b>
                            <span> {props.dataFromParent[0].pulse}/phút</span>
                        </p>
                    </td>
                    <td>
                        <p>
                            <b>Bác sĩ khám: </b>
                            <span> {props.dataFromParent[0].doctorExamines} </span>
                        </p>
                        <p>
                            <b>Ngày tái khám: </b>
                            <span>
                                {props.dataFromParent[0].reExaminationDate.slice(8, 10)}
                                /{props.dataFromParent[0].reExaminationDate.slice(5, 7)}
                                /{props.dataFromParent[0].reExaminationDate.slice(0, 4)}
                            </span>
                        </p>
                        <p>
                            <b>Siêu âm: </b>
                            <span> {props.dataFromParent[0].supersonic} </span>
                        </p>
                        <p>
                            <b>Chiều cao tử cung: </b>
                            <span> {props.dataFromParent[0].uterineHeight} cm</span>
                        </p>
                        <p>
                            <b>Số đo vòng bụng: </b>
                            <span> {props.dataFromParent[0].waistCircumference} cm</span>
                        </p>
                        <p>
                            <b>Protein niệu: </b>
                            {statusProteinuria}
                        </p>
                        <p>
                            <b>Thiếu máu: </b>
                            <span> {props.dataFromParent[0].anemia} </span>
                        </p>
                        <p>
                            <b>Nồng độ Hemoglobin: </b>
                            <span> {props.dataFromParent[0].hemoglobin} </span>
                        </p>
                        <p>
                            <b>Tim thai nhi: </b>
                            <span> {props.dataFromParent[0].fetalHeart} </span>
                        </p>
                        <p>
                            <b>Tuyến sữa: </b>
                            <span> {props.dataFromParent[0].breast} </span>
                        </p>
                        <p>
                            <b>Mô tả: </b>
                            <span> {props.dataFromParent[0].note} </span>
                        </p>
                    </td>
                </table>
            </div>
        </div>
    )
}
