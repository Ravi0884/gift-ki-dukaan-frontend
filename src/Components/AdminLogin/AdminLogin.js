import React, { useState } from 'react'
import './adminlogin.css'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

function AdminLogin() {
    const toastOptions = {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const handleAdminLogin = async(event) => {
        
        if(email !=="" && password!==""){
            setLoading(true);
            const parsedData ={
            email:email,
            password:password
        }
        await axios.post("https://gkdback.onrender.com/backend/api/adminlogin",parsedData).then((res)=>{
            
            localStorage.setItem('admin',res.data.email)
            localStorage.setItem('name','Kingsma')
            window.location.reload();
            navigate('/admin-pannel')
            setTimeout(()=>{
                navigate('/admin-pannel')
                setLoading(false);
            },1000)
        }).catch(function (error) {
            setLoading(false);
            toast.error(
                "Please insert correct details.",
                toastOptions
              );
        })
    }else{
        toast.error(
            "Please fill all required field",
            toastOptions
          );
    }
    }
    return (
        <>
            <div className="admin-login-container">
                <div className="admin-login-card">
                    <p className="admin-login-title">Admin Login</p>
                    <p className="admin-login-input-title">email:-</p>
                    <input type="email" className="admin-login-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Please enter your email" />
                    <p className="admin-login-input-title">password:-</p>
                    <input type="password" className="admin-login-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Please enter your password" />
                    <button type="submit" onClick={handleAdminLogin} className="admin-login-submit">{loading ? "Submitting..." : "Submit"}</button>
                    <ToastContainer/>
                </div>
            </div>
        </>
    )
}

export default AdminLogin