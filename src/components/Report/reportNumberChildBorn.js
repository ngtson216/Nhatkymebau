import React, { useEffect, useState } from 'react'
import styleTable from '../../CSS/TableStyle.module.scss'
import { PDFExport } from '@progress/kendo-react-pdf';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



export default function ReportNumberChildBorn() {
    const [items, setItems] = useState([]);
    function btnOK(year) {
        const url = "http://103.74.123.192:8080/api/baby/staticBabyBornByYear"

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("year", year);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => setItems(result))
            .catch(error => console.log('error', error));
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Biểu đồ thống kê số lượng trẻ em được sinh ra',
            },
        },
    };
    const getRandomIntInclusive = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const getRandomRGB = () => {
        const r = getRandomIntInclusive(0, 255);
        const g = getRandomIntInclusive(0, 255);
        const b = getRandomIntInclusive(0, 255);
        return `rgb(${r}, ${g}, ${b})`;
    };
    const data = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12', 'Cả năm'],
        datasets: items.map((item) => {
            return {
                label: item.hospital,
                data: item.data,
                backgroundColor: getRandomRGB()
            }
        })

    };

    const container = React.useRef(null);
    const pdfExportComponent = React.useRef(null);
    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };
    return (
        <div ref={container}>
            <PDFExport
                ref={pdfExportComponent}
                paperSize="auto"
                margin={40}
                fileName={`Thống kê về số lượng trẻ em được sinh ra năm ${new Date().getFullYear()}`}>

                <div>
                    <div>
                        <div className={styleTable.title}>
                            <b>Thống kê về số lượng trẻ em được sinh ra</b>
                        </div>
                        <div>
                            <div className={styleTable.center}>
                                <input className={styleTable.inputBar} type='text' placeholder='Nhập năm muốn thống kê' onChange={(event) => {
                                    btnOK(event.target.value);
                                }} />
                            </div>
                            <button
                                className={styleTable.exportBtn}
                                onClick={exportPDFWithComponent}
                            >
                                Export
                            </button>
                        </div>
                    </div>
                    <div>

                        <table className={styleTable.tableStyle}>
                            <thead>
                                <tr style={{ background: '#aee8ff' }}>
                                    <th style={{ width: '15%' }}>Tên cơ sở y tế</th>
                                    <th style={{ width: '5%' }}>Tháng 1</th>
                                    <th style={{ width: '5%' }}>Tháng 2</th>
                                    <th style={{ width: '5%' }}>Tháng 3</th>
                                    <th style={{ width: '5%' }}>Tháng 4</th>
                                    <th style={{ width: '5%' }}>Tháng 5</th>
                                    <th style={{ width: '5%' }}>Tháng 6</th>
                                    <th style={{ width: '5%' }}>Tháng 7</th>
                                    <th style={{ width: '5%' }}>Tháng 8</th>
                                    <th style={{ width: '5%' }}>Tháng 9</th>
                                    <th style={{ width: '5%' }}>Tháng 10</th>
                                    <th style={{ width: '5%' }}>Tháng 11</th>
                                    <th style={{ width: '5%' }}>Tháng 12</th>
                                    <th style={{ width: '5%' }}>Cả năm</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item, index) => {
                                        return (
                                            <tr key={item}>
                                                <td className={styleTable.bold}>
                                                    {item.hospital}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[0]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[1]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[2]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[3]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[4]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[5]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[6]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[7]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[8]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[9]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[10]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[11]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[12]}
                                                </td>
                                            </tr>
                                        )

                                    })
                                }
                            </tbody>
                        </table>
                        <div style={{ width: "90%", paddingLeft: "10%", paddingBottom: "50px" }}>

                            <Bar options={options} data={data} />
                        </div>

                    </div>
                </div>
            </PDFExport>
        </div >
    )
}
