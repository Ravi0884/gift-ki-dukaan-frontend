import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import {Link} from 'react-router-dom'
import './login.css'

function Login() {
  // const history = useHistory()
  function siteClick() {
    window.scrollTo(0, 0);
}
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
  event.preventDefault()
    if(email !=="" && password!==""){
        setLoading(true);
        const parsedData ={
        email:email,
        password:password
    }
    await axios.post("https://gkdback.onrender.com/backend/user/userlogin",parsedData).then((res)=>{
      setLoading(false);
      // alert("Login successful")
        localStorage.setItem('name',res.data.name)
       localStorage.setItem('id',res.data.id)
     window.location.reload();
     window.history.back(-2)
       
    }).catch(function (error) {
        setLoading(false);
        toast.error(
          error.response.data.message,
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
        <p className="admin-login-title">User Login</p>
        <p className="admin-login-input-title">Email:-</p>
        <input type="email" className="admin-login-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Please enter your email" />
        <div className="user-forgot">
        <p className="admin-login-input-title">Password:-</p><span ><Link className='forgate' to="/mail">forgot password?</Link></span>
        </div>
        <input type="password" className="admin-login-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Please enter your password" />
        <button type="submit" onClick={handleAdminLogin} className="admin-login-submit">{loading ? "Submitting..." : "Submit"}</button>
        <ToastContainer />
        <div className="form-bottom signup-button">
          <span>Don't have an account?</span> &nbsp;&nbsp;
          <Link onClick={siteClick} className="link-decoration" to="/user-signup">Signup</Link>
        </div>
      </div>
      
    </div>
  </>
)
}

export default Login