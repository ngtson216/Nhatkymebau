import header from '../../CSS/Header.module.scss'
import LogoBYT from '../../img/BoYTe.png'
import { FaAmbulance } from 'react-icons/fa';
import { BsTelephoneFill } from 'react-icons/bs';
import Ava from '../Header/ava';
export default function Header() {
    return (
        <div>
            <header>
                <div className={header.background}>
                    <div className={header.titleLeft}>
                        <ul className={header.iconUl}>
                            <li>
                                <FaAmbulance style={{ fontSize: '30px' }} />
                            </li>
                            <li style={{ paddingLeft: '10px' }}>
                                Hotline cấp cứu <br /> 19001997
                            </li>
                        </ul>
                    </div>
                    <h2 className={`${header.title} ${header.center} ${header.uppercase}`} >
                        Quản lý mang thai và sinh con <br />
                        Bộ y tế
                    </h2>
                    <img id={header.logo} src={LogoBYT} alt="Logo Bộ Y Tế" />
                    <div className={header.titleRight}>
                        <ul className={header.iconUl}>
                            <li>
                                <BsTelephoneFill style={{ fontSize: '28px' }} />
                            </li>
                            <li style={{ paddingLeft: '10px' }}>
                                Tổng đài tư vấn <br /> 19009999
                            </li>
                        </ul>
                    </div>
                    <div style={{
                        float: 'right',
                        marginRight : '40px',
                        marginTop : '17px'
                    }}>
                        <Ava />
                    </div>
                </div>
            </header>
        </div>
    )
}
