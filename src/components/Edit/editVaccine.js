import React, { useEffect, useState } from 'react'
import styleVaccine from '../../CSS/CreateVaccine.module.scss'

function EditVac(ID, name, note, repeat, numberOfVaccinated, injectedAt, price) {
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
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://103.74.123.192:8080/api/vaccine/edit/" + ID, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.message === 'OK') {
                alert('Chỉnh sửa vaccine thành công')
                window.location.reload()
            }
            console.log(result)
        })
        .catch(error => console.log('error', error));

  
}
export default function CreateVaccine(props) {
    const [getName, setName] = useState();
    const [getNote, setNote] = useState();
    const [getRepeat, setRepeat] = useState();
    const [getNumberOfVaccinated, setNumberOfVaccinated] = useState();
    const [getInjectedAt, setInjectedAt] = useState();
    const [getPrice, setPrice] = useState();
    return (
        <div style={{
            color: '#fff',
        }}>
            <p className={styleVaccine.title}>Chỉnh sửa thông tin Vắc-xin</p>
            <div >
                <div>
                    <div>
                        <label className={styleVaccine.title2}>Tên Vắc-xin:</label>
                    </div>
                    <div className={styleVaccine.padding}>
                        <input className={styleVaccine.inputForm}
                            id='name'
                            defaultValue={props.dataFromParent[0].name}
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
                            id='price'
                            defaultValue={props.dataFromParent[0].price}
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
                            id='injectedAt'
                            defaultValue={props.dataFromParent[0].injectedAt}
                            placeholder='Vui lòng nhập thời điểm cần tiêm'
                            onChange={e => setInjectedAt(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div>
                    <div>
                        <label className={styleVaccine.title2}>Nhắc lại (Tháng) (Nếu không cần nhắc lại hãy nhập 0)</label>
                    </div>
                    <div className={styleVaccine.padding}>
                        <input className={styleVaccine.inputForm}
                            id='repeat'
                            defaultValue={props.dataFromParent[0].repeat}
                            placeholder='Vui lòng nhập số tháng tiêm nhắc lại'
                            onChange={e => setRepeat(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div>
                    <div>
                        <label className={styleVaccine.title2}>Số mũi cần tiêm:</label>
                    </div>
                    <div className={styleVaccine.padding}>
                        <input className={styleVaccine.inputForm}
                            id='numC'
                            defaultValue={props.dataFromParent[0].numberOfVaccinated}
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
                        id='note'
                        defaultValue={props.dataFromParent[0].note}
                        placeholder='Vui lòng nhập mô tả'
                        onChange={e => setNote(e.target.value)}
                    ></textarea>
                </div>
            </div>
            <button className={styleVaccine.btnAccept}
                onClick={
                    () => {
                        if (getName === undefined) {
                            var newName = document.getElementById("name").defaultValue
                        } else {
                            newName = getName
                        }
                        if (getRepeat === undefined) {
                            var newRepeat = document.getElementById("repeat").defaultValue
                        } else {
                            newRepeat = getRepeat
                        }
                        if (getNumberOfVaccinated === undefined) {
                            var newNumC = document.getElementById("numC").defaultValue
                        } else {
                            newNumC = getNumberOfVaccinated
                        }
                        if (getInjectedAt === undefined) {
                            var newInjectedAt = document.getElementById("injectedAt").defaultValue
                        } else {
                            newInjectedAt = getInjectedAt
                        }
                        if (getPrice === undefined) {
                            var newPrice = document.getElementById("price").defaultValue
                        } else {
                            newPrice = getPrice
                        }
                        if (getNote === undefined) {
                            var newNote = document.getElementById("note").defaultValue
                        } else {
                            newNote = getNote
                        }
                        if (
                            newName !== '' &&
                            newRepeat !== '' &&
                            newNumC !== '' &&
                            newInjectedAt !== '' &&
                            newPrice !== ''
                        ) {
                            EditVac(props.dataFromParent[0].ID, newName.trim().replace(/\s+/g, ' '), newNote,
                                newRepeat.trim().replace(/\s+/g, ' '), newNumC.trim().replace(/\s+/g, ' '),
                                newInjectedAt.trim().replace(/\s+/g, ' '), newPrice)
                        }
                        else {
                            alert("Vui lòng nhập đầy đủ thông tin")
                        }
                    }}> Xác nhận</button>
        </div>
    )
}
