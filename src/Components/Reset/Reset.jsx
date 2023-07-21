import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
function Reset() {
  const navigate = useNavigate()
    const toastOptions = {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    const [password,setPassword]=useState()
    const [cpassword,setCpassword]=useState()
    const [loading,setLoading]=useState(false)
    let search = window.location.search;
    const params = new URLSearchParams(search);
    const id =params.get("q")
    const handleReset = () => {
        if(password===cpassword){
            setLoading(true)
            const data ={
                password:password
            }
            axios.post(`https://gkdback.onrender.com/backend/user/user-password-reset/${id}`,data).then((res)=>{
                setLoading(false);
                toast.success(
                    res.data.message,
                      toastOptions
                    );

                  setTimeout(()=>{
                    navigate('/user-login')
                  },2000)
                    
                    
            }).catch((err)=>{
                setLoading(false);
                toast.error(
                    err.data.message,
                      toastOptions
                    );
            })
        }else if(password==="" | cpassword===""){
            toast.error(
                "please enter password and confirm password",
                  toastOptions
                );
        }else{
            toast.error(
                "Password and confirm password not match",
                  toastOptions
                );
        }
    }
  return (
    <div className="admin-login-container">
                <div className="admin-login-card">
                    <p className="admin-login-title">Reset Your Password</p>
                    <p className="admin-login-input-title">Password</p>
                    <input type="text" className="admin-login-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="" />
                    <p className="admin-login-input-title">Confirm Password</p>
                    <input type="password" className="admin-login-input" value={cpassword} onChange={(e) => setCpassword(e.target.value)} placeholder="" />
                    <button type="submit" onClick={handleReset} className="admin-login-submit">{loading ? "Submitting..." : "Submit"}</button>
                    <ToastContainer />
                </div>

            </div>
  )
}

export default Reset