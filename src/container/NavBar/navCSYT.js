import Header from '../../CSS/Header.module.scss'
import Home from '../Home'
import HosManage from '../../components/Management/hospitalsManagement'
import DisReqVacManage from '../../components/Management/disReqVacManagement'
import DisPregWomanManage from '../../components/Management/disPregWomanManagement'
import DisChildManage from '../../components/Management/disChildManagement'
import VaccineManage from '../../components/Management/vaccineManagement'
import Profile from '../../components/Profile'
import ReportChildbirthAge from '../../components/Report/reportChildbirthAge'
import ReportNumberChildBorn from '../../components/Report/reportNumberChildBorn'
import ReportSex from '../../components/Report/reportSex'
import { Routes, Route, Link } from 'react-router-dom'
import MedicalScheduleHos from '../../components/Management/Schedule/HospitalEmp/medicalSchedule'
import VaccinatedScheduleHos from '../../components/Management/Schedule/HospitalEmp/vaccinatedSchedule'
import ListBaby from '../../components/List/baby'
import ROBManager from '../../components/Management/robManagement'
import ROMManager from '../../components/Management/romM'

export default function NavBarCSYT() {
    return (
        <div>
            <header>
                <nav id={Header.header}>
                    <ul id={Header.nav}>
                        <li>
                            <Link to="/home">Trang chủ</Link>
                        </li>
                        <li>
                            <Link to="/home">Quản lý</Link>
                            <ul className={Header.subnav}>
                                <li><Link to="/hospitalsManagement">Quản lý cơ sở y tế</Link></li>
                                <li><Link to="/medicalScheduleManagement">Quản lý danh sách lịch khám</Link></li>
                                <li><Link to="/vaccinatedScheduleManagement">Quản lý danh sách lịch tiêm</Link></li>
                                <li><Link to="/managementOfDiseasesRequiringVaccination">Quản lý bệnh cần tiêm chủng</Link></li>
                                <li><Link to="/management0fCommonDiseasesInChildren">Quản lý bệnh thường gặp ở trẻ sau sinh</Link></li>
                                <li><Link to="/management0fCommonDiseasesInPregnantWomen">Quản lý bệnh thường gặp ở phụ nữ mang thai</Link></li>
                                <li><Link to="/vaccineManagement">Quản lý Vắc-xin</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/home">Hồ sơ</Link>
                            <ul className={Header.subnav}>
                                <li><Link to="/profile">Hồ sơ cá nhân</Link></li>
                                <li><Link to="/listAllBaby">Danh sách trẻ sơ sinh</Link></li>
                                <li><Link to="/recordOfMom">Hồ sơ khám thai</Link></li>
                                <li><Link to="/recordOfBaby">Hồ sơ trẻ sơ sinh</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/home">Báo cáo thống kê</Link>
                            <ul className={Header.subnav}>
                                <li><Link to="/reportNumberChildrenBorn">Báo cáo thống kê về số trẻ được sinh ra</Link></li>
                                <li><Link to="/reportChildBirthAge">Báo cáo thống kê về độ tuổi sinh con</Link></li>
                                <li><Link to="/reportBabyBySex">Báo cáo thống kê về tỉ lệ giới tính</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
            <Routes>
                <Route path="/management0fCommonDiseasesInPregnantWomen" element={<DisPregWomanManage />} />
                <Route path="/management0fCommonDiseasesInChildren" element={<DisChildManage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/hospitalsManagement" element={<HosManage />}/>
                <Route path="/managementOfDiseasesRequiringVaccination" element={<DisReqVacManage />} />
                <Route path="/" element={<Home />} />
                <Route path="/vaccineManagement" element={<VaccineManage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/reportNumberChildrenBorn" element={<ReportNumberChildBorn />} />
                <Route path="/reportChildBirthAge" element={<ReportChildbirthAge />} />
                <Route path="/reportBabyBySex" element={<ReportSex />} />
                <Route path="/medicalScheduleManagement" element={<MedicalScheduleHos />} />
                <Route path="/vaccinatedScheduleManagement" element={<VaccinatedScheduleHos />} />
                <Route path='/listAllBaby' element={<ListBaby />} />
                <Route path="/recordOfBaby" element={<ROBManager />} />
                <Route path="/recordOfMom" element={<ROMManager />} />
            </Routes>
        </div>
    )
}
