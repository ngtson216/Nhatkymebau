import React, { useEffect, useState } from 'react'
import styleTable from '../../CSS/TableStyle.module.scss'
import { PDFExport } from '@progress/kendo-react-pdf';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ReportSex() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("http://103.74.123.192:8080/api/baby/staticBabyBySex/", requestOptions)
            .then(response => response.json())
            .then(result => setItems(result))
            .catch(error => console.log('error', error));

    }, [])
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Biểu đồ thống kê giới tính của trẻ',
            },
        },
    };
    const data = {
        labels: [
            "Nam",
            "Nữ",
        ],
        datasets: [
            {
                label: '# of Votes',
                data: [items.boy, items.girl],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',

                ],
            }
        ]
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
            <div>
                <div>
                    <div className={styleTable.title}>
                        <b>Thống kê về tỷ lệ giới tính trẻ sinh ra từ năm 2021</b>
                    </div>
                    <div>
                        <button
                            className={styleTable.exportBtn}
                            onClick={exportPDFWithComponent}
                        >Export
                        </button>
                    </div>
                </div>
                <div style={{ width: "65%", paddingLeft: "35%", paddingBottom: "50px" }} >
                    <PDFExport
                        ref={pdfExportComponent}
                        paperSize="auto"
                        margin={40}
                        fileName={`Thống kê về tỷ lệ giới tính trẻ sinh ra từ năm 2021`}
                    >
                        <Pie options={options} data={data} width="50%" height="50%" />
                    </PDFExport>
                </div>
            </div>
        </div >
    )
}
