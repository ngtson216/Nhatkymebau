import { useState } from 'react'
import ReqReset from './requestReset'
import ResetPassword from './resetPassword'
export default function FormReset() {
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
            { showComp ? <ReqReset parentCallback={callbackFunction} parentCallback2={callbackFunction2} parentCallback3={callbackFunction3} /> : null }
            { showComp1 ? <ResetPassword parentCallback2={callbackFunction2} parentCallback3={callbackFunction3} dataFromParent={mess}/> :null }
        </div>
    )
}