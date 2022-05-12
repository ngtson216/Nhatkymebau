import { Routes, Route, Link } from 'react-router-dom'
import ROMManager from './romManagementAllMom'
import ROMDetails from '../Management/romManagement'
import { useState } from 'react'
export default function ROM() {
    const [showComp, setShowComp] = useState(true)
    const [showComp1, setShowComp1] = useState(false)
    const [mess, setMess] = useState()

    var callbackFunction = (childData) => {
        setMess(childData)
    }
    var callbackFunction2 = (childData2) => {
        setShowComp(childData2)
    }
    var callbackFunction3 = (childData3) => {
        setShowComp1(childData3)
    }
    return (
        <div>
            { showComp ? <ROMManager parentCallback={callbackFunction} parentCallback2={callbackFunction2} parentCallback3={callbackFunction3}/> : null } 
            { showComp1 ? <ROMDetails parentCallback2={callbackFunction2} parentCallback3={callbackFunction3} dataFromParent={mess}/> : null }   
        </div>
    )
}