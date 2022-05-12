import React from 'react'
import Footers from '../../CSS/Footer.module.scss'
import LogoBYT from '../../img/BoYTe.png'
import LogoBaby from '../../img/baby.png';
export default function Footer() {
    return (
        <footer id={Footers.footer}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <p>Bản quyền thuộc Bộ Y Tế, ĐH Thăng Long</p>
                            <p style={{ fontSize: '12px' }} >Phát triển bởi <strong style={{ color: 'yellow' }}>AniTeam</strong></p>
                            <img className={Footers.logo} src={LogoBYT} alt="Logo Bộ Y Tế" />
                            <img className={Footers.logo} src={LogoBaby} alt="Logo em bé" />
                        </td>
                        <td>
                            <p style={{ float: 'right' }}>Tải ứng dụng quản lý mang thai và sinh con trên điện thoại</p> <br></br> <br></br>
                            <a className={`${Footers.btn} ${Footers.btnstore} ${Footers.btnapple}`} style={{ float: 'right' }} href=" " title="Google Play">Apple Store</a>
                            <a className={`${Footers.btn} ${Footers.btnstore} ${Footers.btngoogle}`} style={{ float: 'right' }} href=" " title="Google Play">Google Play</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </footer >
    )
}
