import React from 'react'
import './footer.css'
import { Link } from "react-router-dom";

function Footer() {
  function siteClick () {
    window.scroll(0,0)
  }
  return (
    <>
      <div className="footer">
        <div className="footer-item">
          <p className="footer-title">Gift ki Dukaan</p>
          <p className="footer-desc">Contact Us:- <br/> Phone: 09334058411,9153913742 <br/>Email:giftkidukaan@gmail.com<br/>
Shop No 1 & 4, Old Priya Hotel Gali,<br/> near Kuldeep Market, Bakarganj, Patna, Bihar 800004</p>
          <div className="social-div">
            <Link  target="_blank" rel="noreferrer" to="/">
          <img className="social-icon" src={require('./instagram.png')} alt="instagram" />
          </Link >
          <Link  target='_blank' rel="noreferrer" to="/">
          <img className="social-icon" src={require('./facebook.png')} alt="facebook"/>
          </Link >
          <Link  target="_blank" rel="noreferrer" to="/">
          <img className="social-icon" src={require('./linkedin.png')} alt="linkedin"/>
          </Link >
          <Link  target="_blank" rel="noreferrer" to="/">
          <img className="social-icon" src={require('./twitter.png')} alt="twitter"/>
          </Link >
          </div>
        </div>
        <div className="footer-item">
          <p className="footer-title">Useful Links</p>
          <Link  onClick={siteClick} className="web-link card-link" to="/">
            <p className="footer-link">⇢&nbsp; Home</p>
          </Link >
          <Link onClick={siteClick}  className="web-link card-link" to="/terms-and-condition">
            <p className="footer-link">⇢&nbsp; Terms & Conditions</p>
          </Link >
          <Link onClick={siteClick}  className="web-link card-link" to="/privacy-policy">
            <p className="footer-link">⇢&nbsp; Privacy Policy</p>
          </Link >
          <Link onClick={siteClick}  className="web-link card-link" to="/return">
            <p className="footer-link">⇢&nbsp; Return Policy</p>
          </Link >
        </div>
        <div className="footer-item">
          <div >
            <p className="footer-title">Find Us</p>
            <iframe title="map" className='map' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14390.602873031165!2d85.1497399!3d25.6165202!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58f7bb7023f7%3A0xdf7e1dd594dc7e1f!2sBandhan%20Lab%20%2F%20craft%20(Customize%20Photo%20Gift%20Printing%20Shop)!5e0!3m2!1sen!2sin!4v1687170977002!5m2!1sen!2sin" allowfullscreen="" loading="auto" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <span></span>
        </div>

      </div>
      <div className='footer-lower'>
        <p className="footer-lower-content">© Copyright <a rel="noreferrer"  target="_blank" href="https://kingsman.services/" className="km">Kingsman Services</a>. All Rights Reserved </p>
        <p className="footer-lower-content">Designed by <a rel="noreferrer"  target="_blank" href="https://kingsman.services/" className="km">Kingsman Services</a> </p>
      </div>
    </>
  )
}

export default Footer