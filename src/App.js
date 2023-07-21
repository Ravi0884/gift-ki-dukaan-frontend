import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import CustomizedGifts from './Components/CustomizedGifts/CustomizedGifts'
import Admin from './Components/Admin/Admin'
import AdminLogin from './Components/AdminLogin/AdminLogin'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Cart from './Components/Cart/Cart'
import AdminEdit from './Components/AdminEdit/AdminEdit'
import AdminSelect from './Components/AdminSelect/AdminSelect'
import SelectedProduct from './Components/selectedProduct/SelectedProduct.js'
import SearchProduct from './Components/SearchProduct/SearchProduct'
import Delivery from './Components/Delivery/Delivery'
import Order from './Components/Order/Order'
import AdminOrder from './Components/AdminOrder/AdminOrder'
import Notfound from './Components/Notfound/Notfound'
import Mail from './Components/Mail/Mail'
import Reset from './Components/Reset/Reset'
import TermsCondition from './Components/TermsCondition/TermsCondition'
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy'
import Return from './Components/Return/Return'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
function App() {
  const [admin, setAdmin] = useState(localStorage.getItem('admin'));
  const [id,setId] = useState(localStorage.getItem('id'))

  useEffect(() => {
    const handleAdminChange = () => {
      setAdmin(localStorage.getItem('admin'));
    };
    setId(localStorage.getItem('id'))
    window.addEventListener('storage', handleAdminChange);

    return () => {
      window.removeEventListener('storage', handleAdminChange);
    };
  }, []);
  console.log(id)
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/return" element={<Return />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-condition" element={<TermsCondition />} />
          <Route path="/customized-gifts" element={<CustomizedGifts />} />
          <Route path="/user-signup" element={<Signup />} />
          <Route path="/order" element={<Order />} />
          <Route path="/user-password-reset" element={<Reset />} />
          <Route path="/mail" element={<Mail />} />
          <Route path="/admin-order" element={<AdminOrder />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/user-login" element={<Login />} />
          <Route path="/cart" element={id===null?<Login />:<Cart/>} />
          <Route path="/selected-product" element={<SelectedProduct />} />
          <Route path="/search-product" element={<SearchProduct />} />
          <Route path="/admin-pannel" element={admin === "kingsman" ? <Admin /> : <Navigate to='/admin-login' />} />
          <Route path="/admin-edit" element={admin === "kingsman" ? <AdminEdit /> : <Navigate to='/admin-login' />} />
          <Route path="/admin-select" element={admin === "kingsman" ? <AdminSelect /> : <Navigate to='/admin-login' />} />
          <Route path="/admin-login" element={admin === "kingsman" ? <Navigate to='/admin-pannel' /> : <AdminLogin />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <a href="https://wa.me/+919153913742" target="_blank" rel="noreferrer">
        <WhatsAppIcon className="whatsapp"/>
        </a>
        <Footer />
      </Router>
  )
}

export default App