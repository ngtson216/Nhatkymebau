import { Routes, Route, Link } from 'react-router-dom'
import Login from './login'
import SignUp from './signup'
import FormReset from './FormReset/index'
export default function Form() {
    return (
        <div>  
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element = {<SignUp/>} />
                <Route path="/resetPass" element={<FormReset/>} />
            </Routes>
        </div>
    )
}