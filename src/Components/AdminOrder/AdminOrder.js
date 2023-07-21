import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './adminorder.css'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import download from 'downloadjs';

function AdminOrder() {
  const [orderList, setOrderList] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get("https://gkdback.onrender.com/backend/order/admin-order-find").then((res) => {
      setOrderList(res.data)
      console.log(res.data)
      setLoading(false)
    })
  }, [])

    const handleDownload = (imageUrl) => {
      download(imageUrl, 'image.jpg');
    };
  return (
    <>
      {loading ? <Box className='loading' sx={{ display: 'flex' }}>
        <CircularProgress className='circular-loading' />
      </Box> : ""}
      <div className="admin-order">
        <div className="admin-navbar">
          <Link to='/admin-edit' className='adminlink'>
            <p className="admin-navbar-item">
              Edit Product
            </p>
          </Link>
          <Link className="adminlink" to='/admin-pannel'>
            <p className="admin-navbar-item">
              Add Product
            </p>
          </Link>

          <p className="admin-navbar-item">
            Order Details
          </p>

        </div>
        {orderList.length === 0 ? (
          <p></p>
        ) : (
          <table className={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th className="tableHeaderStyle">Order At</th>
                <th className="tableHeaderStyle">Required Image</th>
                <th className="tableHeaderStyle">Required Name</th>

                <th className="tableHeaderStyle">Area Code</th>
                <th className="tableHeaderStyle">User ID</th>
                <th className="tableHeaderStyle">User Number</th>
                <th className="tableHeaderStyle">Product ID</th>
                <th className="tableHeaderStyle">Product Code</th>
                <th className="tableHeaderStyle">Razorpay ID</th>
                <th className="tableHeaderStyle">Product Amount</th>
                <th className="tableHeaderStyle">User Address</th>
              </tr>
            </thead>
            <tbody>
              {[...orderList].reverse().map((item, index) => (
                <tr key={index}>
                  <td className="tableCellStyle">{item.timestamp}</td>
                  
                  {/* {item.image === "no" ? "Not Required" : <td className="tableCellStyle">
                  {item.image.map((src)=>{
                    return(
                     <img className="admin-order-item-image" src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${src}`} alt="Product" />
                     )
                  })}
                    
                  </td>} */}
                  {item.image === "no" ? (
  "Not Required"
) : (
  <td className="tableCellStyle">
  {item.image.map((src, index) => (
    <div key={index}>
      <img
        className="admin-order-item-image"
        src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${src}`}
        alt="Product"
      />
      <button
        onClick={() =>
          handleDownload(`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${src}`)
        }
      >
        Download
      </button>
    </div>
  ))}
</td>
)}
                 
                  <td className="tableCellStyle">{item.name}{console.log(item.name)}</td>

                  <td className="tableCellStyle">{item.areaCode}</td>
                  <td className="tableCellStyle">{item.userId}</td>
                  <td className="tableCellStyle">{item.userNumber}</td>
                  <td className="tableCellStyle">{item.productId}</td>
                  <td className="tableCellStyle">{item.productCode}</td>
                  <td className="tableCellStyle">{item.razorpayId}</td>
                  <td className="tableCellStyle">{item.productAmount}</td>
                  <td className="tableCellStyle">{item.userAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </>
  )
}

export default AdminOrder