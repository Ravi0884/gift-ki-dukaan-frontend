import React, { useState } from 'react'
import './mail.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../Firebase/Firebase'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {useNavigate} from 'react-router-dom'

function Mail() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState('')
    const [otp, setOtp] = useState()
    const [submitOtp, setSubmitOtp] = useState(false)
    const [captcha, setCaptcha] = useState(false)

    const toastOptions = {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    // const config = {
    //     Username: "kingsman@yopmail.com",
    //     Password: "B5D67F2192F66303617C0024CFB39AF44DB3",
    //     Host: "smtp.elasticemail.com",
    //     Port: 2525,
    //     From: 'raviraj.kingsman@gmail.com',
    //     To: email,
    //     Subject: "Password Reset",
    //     Body: `https://kingsmangkd.netlify.app/reset?q=${id}`
    // }
    // const handleAdminLogin = () => {
    //     setLoading(true)
    //     if(email===''){
    //         setLoading(false)
    //         toast.error(
    //             "Please enter your email",
    //               toastOptions
    //             );
    //     }else{
    //         axios.get(`https://localhost:8000/backend/user/found-user/${email}`).then((res)=>{
    //             toast.success(
    //                     res.data.message,
    //                     toastOptions
    //             );
    //             if(res.data.status === true){
    //                 setId(res.data.id)
    //                 if(window.Email){
    //                     setLoading(true)
    //                     const config = {
    //                         Username: "kingsman@yopmail.com",
    //                         Password: "B5D67F2192F66303617C0024CFB39AF44DB3",
    //                         Host: "smtp.elasticemail.com",
    //                         Port: 2525,
    //                         From: 'raviraj.kingsman@gmail.com',
    //                         To: email,
    //                         Subject: "Password Reset",
    //                         Body: `Please open this link to reset your password https://kingsmangkd.netlify.app/user-password-reset?q=${res.data.id}`
    //                     }
    //                     window.Email.send(config).then((res) => {
    //                         setLoading(false)
    //                         toast.success(
    //                             "Please check your inbox and spam for reset your password",
    //                               toastOptions
    //                             );
    //                     }).catch((err) => {
    //                         console.log(err)
    //                         setLoading(false)
    //                     })
    //                 }
    //             }

    //         }).catch((err)=>{
    //             setLoading(false)
    //             toast.error(
    //                 "User not found",
    //                 toastOptions
    //         );
    //         })

    //     }

    //     }
    function handleAdminLogin() {
        if (email === '' || email.length !== 13) {
            toast.error(
                "Please enter a valid mobile number",
                toastOptions
            );
        } else {
            axios.get(`https://gkdback.onrender.com/backend/user/found-user/${email}`).then((res) => {
                if (res.data.status === true) {
                    setId(res.data.id)
                    handleCaptcha()

                }
            }).catch((err) => {
                setLoading(false)
                toast.error(
                    "User not found",
                    toastOptions
                );
            })
        }
    }

    function userSubmit() {
        const confirmationResult = window.confirmationResult;
        confirmationResult.confirm(otp).then((result) => {
            navigate(`/user-password-reset?q=${id}`)
            
        }).catch((err) => {
            console.log(err)
            toast.error(
                "OTP not verified",
                toastOptions
            );
        })
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
        // e.preventDefault();
        if (email === '' || email.length !== 13) {
            toast.error(
                "Please enter a valid mobile number",
                toastOptions
            );
        }
        else {
            generateRecaptcha()
            setCaptcha(true)
            let appVerifier = window.recaptchaVerifier;

            signInWithPhoneNumber(auth, email, appVerifier)
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
        <>
            <div className="admin-login-container">
                <div className="admin-login-card">
                    <p className="admin-login-title">Forgot Password</p>
                    <p className="admin-login-input-title">Enter your register Mobile Number</p>
                    <label className="signup-lebel-section" htmlFor="mobile">Mobile No:-</label>

                    <PhoneInput defaultCountry='IN' value={email} onChange={setEmail} className="signup-input-section" id="mobile" placeholder="Enter Your Mobile No." />


                    {captcha ? "" : <button type="submit" onClick={handleAdminLogin} className="admin-login-submit">{loading ? "Submitting..." : "Submit"}</button>}
                    <div id="recaptcha-container"></div>
                    {submitOtp ? <><p className="signup-lebel-section">Please enter otp send to {email}</p>
                        <input className="signup-input-section" value={otp} onChange={(e) => setOtp(e.target.value)} type="number" />
                        {/* <button onClick={handleOtp} className="submit-btn" >Submit OTP</button> */}
                        <button onClick={userSubmit} className="user-signup-btn">{loading ? "Creating" : "Submit OTP"}</button>
                    </> : ""}
                    <ToastContainer />
                </div>

            </div>
        </>
    )
}

export default Mail