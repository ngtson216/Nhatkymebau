import React, { useEffect, useState } from 'react'
import styleVaccine from '../../CSS/CreateVaccine.module.scss'

function CreateVac(name, note, repeat, numberOfVaccinated, injectedAt, price) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", name);
    urlencoded.append("note", note);
    urlencoded.append("repeat", repeat);
    urlencoded.append("numberOfVaccinated", numberOfVaccinated);
    urlencoded.append("injectedAt", injectedAt);
    urlencoded.append("price", price);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://103.74.123.192:8080/api/vaccine/create", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.message === 'OK'){
                alert('Thêm mới vaccine thành công')
                window.location.reload()
            }
            if(result.message === 'This vaccine\'s exists'){
                alert('Bệnh đã tồn tại, vui lòng thử lại!!')
            }
            console.log(result)
        })
        .catch(error => console.log('error', error));
}
export default function CreateVaccine(props) {
    const [getName, setName] = useState();
    const [getNote, setNote] = useState();
    const [getReapeat, setReapeat] = useState();
    const [getNumberOfVaccinated, setNumberOfVaccinated] = useState();
    const [getInjectedAt, setInjectedAt] = useState();
    const [getPrice, setPrice] = useState();
    return (
        <div style={{
            color: '#fff',
        }}>
            <p className={styleVaccine.title}>Thêm mới Vắc-xin</p>
            <div >
                <div>
                    <div>
                        <label className={styleVaccine.title2}>Tên Vắc-xin:</label>
                    </div>
                    <div className={styleVaccine.padding}>
                        <input className={styleVaccine.inputForm}
                            placeholder='Vui lòng nhập tên Vắc-xin'
                            onChange={e => setName(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div>
                    <div>
                        <label className={styleVaccine.title2}>Giá tiền:</label>
                    </div>
                    <div className={styleVaccine.padding}>
                        <input className={styleVaccine.inputForm}
                            placeholder='Vui lòng nhập giá tiền của vaccine'
                            onChange={e => setPrice(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div>
                    <div>
                        <label className={styleVaccine.title2}>Thời điểm cần tiêm</label>
                    </div>
                    <div className={styleVaccine.padding}>
                        <input className={styleVaccine.inputForm}
                            placeholder='Vui lòng nhập thời điểm cần tiêm'
                            onChange={e => setInjectedAt(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div>
                    <div>
                        <label className={styleVaccine.title2}>Nhắc lại</label>
                    </div>
                    <div className={styleVaccine.padding}>
                        <input className={styleVaccine.inputForm}
                            placeholder='Vui lòng nhập số tháng tiêm nhắc lại'
                            onChange={e => setReapeat(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div>
                    <div>
                        <label className={styleVaccine.title2}>Số mũi cần tiêm:</label>
                    </div>
                    <div className={styleVaccine.padding}>
                        <input className={styleVaccine.inputForm}
                            placeholder='Vui lòng nhập số mũi cần tiêm'
                            onChange={e => setNumberOfVaccinated(e.target.value)}
                        ></input>
                    </div>
                </div>
            </div>
            <div>
                <div >
                    <label className={styleVaccine.title2}>Mô tả:</label>
                </div>
                <div className={`${styleVaccine.container} ${styleVaccine.padding}`}>
                    <textarea className={`${styleVaccine.textinput} ${styleVaccine.textinput}`}
                        placeholder='Vui lòng nhập mô tả'
                        onChange={e => setNote(e.target.value)}
                    ></textarea>
                </div>
            </div>
            <button className={styleVaccine.btnAccept}
                onClick={
                    () => {
                        if (
                            getName !== '' &&
                            getReapeat !== '' &&
                            getNumberOfVaccinated !== '' &&
                            getInjectedAt !== '' &&
                            getPrice !== ''
                        ) {
                            CreateVac(getName.trim().replace(/\s+/g, ' '), getNote,
                                getReapeat.trim().replace(/\s+/g, ' '), getNumberOfVaccinated.trim().replace(/\s+/g, ' '),
                                getInjectedAt.trim().replace(/\s+/g, ' '), getPrice)
                        }
                        else {
                            alert("Vui lòng nhập đầy đủ thông tin")
                        }
                    }}> Xác nhận</button>
        </div>
    )
}
