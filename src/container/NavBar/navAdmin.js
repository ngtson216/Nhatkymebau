import Header from '../../CSS/Header.module.scss'
import { Routes, Route, Link } from 'react-router-dom'
import AccountsManagements from '../../components/Management/accountsManagement'
import Home from '../Home'
import SignUp from '../FormDNDK/signup'
export default function NavBarAdmin() {
    return (
        <div>
            <div>
                <nav id={Header.header}>
                    <ul id={Header.nav}>
                        <li>
                            <Link to="/home">Trang chủ</Link>
                        </li>
                        <li>
                            <Link to="/accountsManagements">Quản lý tài khoản người dùng</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Routes>
                <Route path="/accountsManagements" element={<AccountsManagements />} />
                <Route path="/home" element = {<Home/>} />
                <Route path="/" element = {<Home/>} />                
            </Routes>
        </div>
    )
}