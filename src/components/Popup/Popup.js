import React from 'react'
import popup from '../../CSS/Popup.module.css'
import { GrClose } from 'react-icons/gr';
export default function Popup(props) {
    return (props.trigger) ? (
        <div className={popup.popup}>
            <div className={popup.popupInner}>
                <div className={popup.closeBtn} onClick={() => props.setTrigger(false)}>
                    <GrClose className={popup.iconClose} />
                </div>
                {props.children}
            </div>
        </div>
    ) : "";
}
