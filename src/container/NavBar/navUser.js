import Header from '../../CSS/Header.module.scss'
import { Routes, Route, Link } from 'react-router-dom'
import { ru } from 'date-fns/locale'
import Home from '../Home'
import MedicalRegister from '../../components/Register/medicalRegister'
import VaccineRegister from '../../components/Register/vaccinatedRegister'
import Hospital from '../../components/List/hospital'
import MedicalScheduleUser from '../../components/Management/Schedule/User/medicalScheduleU'
import VaccinatedScheUser from '../../components/Management/Schedule/User/vaccinatedScheduleU'
import DiseasesNeedVaccine from '../../components/List/diseasesNeedVaccine'
import DiseasesForBaby from '../../components/List/diseasesForBaby'
import DiseasesForMom from '../../components/List/diseasesForMom'
import Profile from '../../components/Profile'
import RecordOfMom from '../../components/Record/recordOfMom'
import RecordOfBaby from '../../components/Record/recordOfBaby'
export default function NavBarUser() {
    return (
        <div>
            <header>
                <nav id={Header.header}>
                    <ul id={Header.nav}>
                        <li>
                            <Link to="/home">Trang chủ</Link>
                        </li>
                        <li>
                            <Link to="/home">Đặt lịch</Link>
                            <ul className={Header.subnav}>
                                <li><Link to="/medicalRegister">Đăng ký khám</Link></li>
                                <li><Link to="/vaccinatedRegister">Đăng ký tiêm</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/home">Tra cứu</Link>
                            <ul className={Header.subnav}>
                                <li><Link to="/hospitalList">Danh sách Cơ sở y tế</Link></li>
                                <li><Link to="/personalMedicalSchedule">Lịch khám cá nhân</Link></li>
                                <li><Link to="/personalVaccinatedSchedule">Lịch tiêm cá nhân</Link></li>
                                <li><Link to="/DiseasesNeedVaccine">Bệnh cần tiêm chủng cho trẻ</Link></li>
                                <li><Link to="/DiseasesForBaby">Bệnh thường gặp ở trẻ sau sinh</Link></li>
                                <li><Link to="/DiseasesForMom">Bệnh thường gặp ở phụ nữ mang thai</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/home">Hồ sơ</Link>
                            <ul className={Header.subnav}>
                                <li><Link to="/profile">Hồ sơ cá nhân</Link></li>
                                <li><Link to="/recordOfMom">Hồ sơ khám thai</Link></li>
                                <li><Link to="/recordOfBaby">Hồ sơ trẻ sơ sinh</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/medicalRegister" element={<MedicalRegister />} />
                <Route path="/vaccinatedRegister" element={<VaccineRegister />} />
                <Route path="/hospitalList" element={<Hospital />} />
                <Route path="/personalMedicalSchedule" element={<MedicalScheduleUser />} />
                <Route path="/personalVaccinatedSchedule" element={<VaccinatedScheUser />} />
                <Route path="/DiseasesNeedVaccine" element={<DiseasesNeedVaccine />} />
                <Route path="/DiseasesForBaby" element={<DiseasesForBaby />} />
                <Route path="/DiseasesForMom" element={<DiseasesForMom />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/recordOfMom" element={<RecordOfMom />} />
                <Route path="/recordOfBaby" element={<RecordOfBaby />} />
            </Routes>
        </div>
    )
}
