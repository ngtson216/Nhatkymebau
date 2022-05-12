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

export default function ReportChildbirthAge() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("http://103.74.123.192:8080/api/baby/staticOldHaveBaby/", requestOptions)
            .then(response => response.json())
            .then(result => setItems(result))
            .catch(error => console.log('error', error));
    }, [])
    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Thống kê về độ tuổi sinh con của các bà mẹ',
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
        labels: ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'],
        datasets: items.map((item) => {
            return {
                label: "Người",
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
            <div>
                <div>
                    <div className={styleTable.title}>
                        <b>Thống kê về độ tuổi sinh con của các bà mẹ</b>
                    </div>
                    <div>
                        <button
                            className={styleTable.exportBtn}
                            onClick={exportPDFWithComponent}
                        >
                            Export
                        </button>
                    </div>
                </div>
                <div>
                    <PDFExport
                        ref={pdfExportComponent}
                        paperSize="auto"
                        margin={40}
                        fileName={`Thống kê về độ tuổi sinh con của các bà mẹ năm`}
                    >
                        <table className={styleTable.tableStyle}>
                            <thead>
                                <tr style={{ background: '#aee8ff' }}>
                                    <th style={{ width: '1%' }}>Tuổi</th>
                                    <th style={{ width: '5%' }}>21</th>
                                    <th style={{ width: '5%' }}>22</th>
                                    <th style={{ width: '5%' }}>23</th>
                                    <th style={{ width: '5%' }}>24</th>
                                    <th style={{ width: '5%' }}>25</th>
                                    <th style={{ width: '5%' }}>26</th>
                                    <th style={{ width: '5%' }}>27</th>
                                    <th style={{ width: '5%' }}>28</th>
                                    <th style={{ width: '5%' }}>29</th>
                                    <th style={{ width: '5%' }}>30</th>
                                    <th style={{ width: '5%' }}>31</th>
                                    <th style={{ width: '5%' }}>32</th>
                                    <th style={{ width: '5%' }}>33</th>
                                    <th style={{ width: '5%' }}>34</th>
                                    <th style={{ width: '5%' }}>35</th>
                                    <th style={{ width: '5%' }}>36</th>
                                    <th style={{ width: '5%' }}>37</th>
                                    <th style={{ width: '5%' }}>38</th>
                                    <th style={{ width: '5%' }}>39</th>
                                    <th style={{ width: '5%' }}>40</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item, index) => {
                                        return (
                                            <tr key={item}>
                                                <td className={styleTable.center}>
                                                    <b>
                                                        Số người
                                                    </b>
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
                                                <td className={styleTable.center}>
                                                    {item.data[13]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[14]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[15]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[16]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[17]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[18]}
                                                </td>
                                                <td className={styleTable.center}>
                                                    {item.data[19]}
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
                    </PDFExport>
                </div>
            </div>
        </div >
    )
}
