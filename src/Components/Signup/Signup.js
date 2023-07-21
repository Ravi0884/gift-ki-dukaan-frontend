import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css"
import axios from 'axios';
import { Link } from 'react-router-dom'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../Firebase/Firebase'

export const Signup = () => {
  function siteClick() {
    window.scrollTo(0, 0);
  }
  // const navigate = useNavigate()
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState()
  const [captcha, setCaptcha] = useState(false)
  const [submitOtp, setSubmitOtp] = useState(false)

  const userSubmit = (e) => {
    e.preventDefault()
    if (name === "") {
      toast.error(
        "Please enter your name.",
        toastOptions
      );
    } else if (email === "") {
      toast.error(
        "Please enter your email.",
        toastOptions
      );
    } else if (mobile.length !== 13) {
      toast.error(
        "Please enter valid mobile number.",
        toastOptions
      );
    } else if (password === "") {
      toast.error(
        "Please enter your password.",
        toastOptions
      );
    } else if (cpassword === "") {
      toast.error(
        "Please enter your confirm password.",
        toastOptions
      );
    } else if (password !== cpassword) {
      toast.error(
        "Password not matched",
        toastOptions
      );
    } else if (password.length < 8) {
      toast.error(
        "Password must be atleast 8 character",
        toastOptions
      );
    }
    else {
      const confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        setLoading(true)
        const parsedData = {
          email,
          mobile,
          name,
          password
        }
        axios.post("https://gkdback.onrender.com/backend/user/userRegistration", parsedData).then((res) => {
          localStorage.setItem('name', name)
          localStorage.setItem('id', res.data.data._id)
          alert("Signup Successfully")
          window.scrollTo(0, 0);
          setLoading(false)
          setCpassword("")
          setEmail("")
          setPassword("")
          setMobile("")
          setName("")
          window.history.back(-2)
        }).catch(function (error) {
          toast.error(
            "Email or Mobile already register",
            toastOptions
          );
          console.log(error);
        })
      }).catch(function (error) {toast.error(
        "OTP not verified",
        toastOptions
      );})
    }
  }

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        setSubmitOtp(true)
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        console.log("Expire")
      }
    }, auth);
  }

  const handleCaptcha = async (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error(
        "Please enter your name.",
        toastOptions
      );
    } else if (email === "") {
      toast.error(
        "Please enter your email.",
        toastOptions
      );
    } else if (mobile.length !== 13) {
      toast.error(
        "Please enter valid mobile number.",
        toastOptions
      );
    } else if (password === "") {
      toast.error(
        "Please enter your password.",
        toastOptions
      );
    } else if (cpassword === "") {
      toast.error(
        "Please enter your confirm password.",
        toastOptions
      );
    } else if (password !== cpassword) {
      toast.error(
        "Password not matched",
        toastOptions
      );
    } else if (password.length < 8) {
      toast.error(
        "Password must be atleast 8 character",
        toastOptions
      );
    }
    else {
      generateRecaptcha()
      setCaptcha(true)
      let appVerifier = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, mobile, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          console.log(error)
        });
    }
  }
  return (
    <div className="user-login-container">
      <div className="signup-card">
        <p className="signup-title">Signup</p>
        <form className="form">
          <label className="signup-lebel-section" htmlFor="name">Name:-</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="signup-input-section" id="name" type="text" placeholder="Enter Your Name" />

          <label className="signup-lebel-section" htmlFor="email">Email:-</label>

          <input value={email} onChange={(e) => setEmail(e.target.value)} className="signup-input-section" id="email" type="email" placeholder="Enter Your Email" />

          <label className="signup-lebel-section" htmlFor="mobile">Mobile No:-</label>

          <PhoneInput defaultCountry='IN' value={mobile} onChange={setMobile} className="signup-input-section" id="mobile"  placeholder="Enter Your Mobile No." />

          <label className="signup-lebel-section" htmlFor="password">Password:-</label>

          <input value={password} onChange={(e) => setPassword(e.target.value)} className="signup-input-section" id="password" type="text" placeholder="Enter Your Password" />
          <label className="signup-lebel-section" htmlFor="confirm-password">Confirm Password:-</label>
          <input value={cpassword} onChange={(e) => setCpassword(e.target.value)} className="signup-input-section" id="confirm-password" type="text" placeholder="Enter Your Confirm Password" />
          <br />
          {/* <button onClick={userSubmit} className="user-signup-btn ">{loading ? "Submiting..." : "Signup"}</button> */}
          {captcha?"":<button onClick={handleCaptcha} className="user-signup-btn">Sign Up</button>}
      <div id="recaptcha-container"></div>
      {submitOtp? <><p className="signup-lebel-section">Please enter otp send to {mobile}</p>
      <input className="signup-input-section" value={otp} onChange={(e) => setOtp(e.target.value)} type="number" />
      {/* <button onClick={handleOtp} className="submit-btn" >Submit OTP</button> */}
      <button onClick={userSubmit} className="user-signup-btn">{loading ? "Creating" : "Submit OTP"}</button>
      </>:""}
        </form>
        <div className="form-bottom signup-button">
          <span>Already have an account?</span> &nbsp;&nbsp;
          <Link onClick={siteClick} className="link-decoration" to="/user-login">login</Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Signup