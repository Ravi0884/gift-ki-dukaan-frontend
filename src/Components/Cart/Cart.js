import React, { useEffect, useState } from 'react'
import './cart.css'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Link,useNavigate} from 'react-router-dom'

function Cart() {
    const navigate = useNavigate()
    const [product, setProduct] = useState()
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState(1)
    var price = 0
    const productId = []

    const userId = localStorage.getItem('id')
    useEffect(() => {
       
        setLoading(true)
        async function fetchData() {
            await axios.get(`https://gkdback.onrender.com/backend/user/user-cart/${userId}`).then((res) => {
                setProduct(res.data)
                setLoading(false)
            });
        }
        fetchData()

    }, [value]);
    const plusClick = (e) => {
        const data = {
            id: e.target.id,
        }
        async function fetchData() {
            setLoading(true)
            await axios.post(`https://gkdback.onrender.com/backend/user/user-cart-plus/${userId}`, data).then((res) => {
                setValue(value+1)
               setLoading(false);
                
            });
           
        }
        fetchData()
    }
    const minusClick = (e) => {
        const data = {
            id: e.target.id,
        }
        setLoading(true)
        async function fetchData() {
            await axios.post(`https://gkdback.onrender.com/backend/user/user-cart-minus/${userId}`, data).then((res) => {
               setValue(value-1)
                setLoading(false)
            });
        }
        fetchData()
    }
    const deleteClick = (e) => {

        const data = {
            id: e.target.id
        }

        async function fetchData() {
            setLoading(true)
            await axios.post(`https://gkdback.onrender.com/backend/user/user-cart-remove/${userId}`, data).then((res) => {
                setValue(value+1)
                setLoading(false)
            });
        }
        fetchData()
    }
    return (
        <>
        
            <div className="user-cart-container">
            {loading?<Box className='loading' sx={{ display: 'flex' }}>
                    <CircularProgress className='circular-loading'  />
                </Box>:""}
            {product && product.length===0?<p><img className="not-image" src={require("../Photos/product-not-found.jpg")} alt="Not found" /></p>:<>
                {product && [...product].reverse().map((item) => {
                    price += item.rate
                    productId.push(item.id)
                    return (

                        <div className="user-cart">
                            <div className="cart-image">
                                <img className="cart-item-pic" src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${item.image}`} alt="Product" />

                            </div>
                            <div className="cart-item-desc">
                                <Link className="page-link" to={`/selected-product?q=${item.id}`}>
                                <p className='cart-item-title'>{item.title}</p>
                                </Link>
                                <div className="cart-data-change">
                                    <span>Qty:</span>{item.qty<2?"":<p onClick={minusClick} className="cart-number-change" id={item.id}>-</p>}
                                    <p className="cart-value">{item.qty}</p>
                                    <p onClick={plusClick} className="cart-number-change" id={item.id}>+</p>
                                </div>
                            </div>
                            <div className="item-remove" >
                                <div>
                                    <p className='cart-item-new-rate'>₹ {item.rate} </p>
                                </div>
                                <div className="delete-cart-item" >
                                    <img onClick={deleteClick} id={item.id} className='item-delete' src={require('../Photos/delete.png')} alt="delete" /><span onClick={deleteClick} id={item.id}>&nbsp;&nbsp;REMOVE</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {/* <div className="total-item-cost-container">
                    <p className="total-item-availble">
                        Price Details ({product && product.length} Items)
                    </p>
                    <div className="total-item-cost-inner">
                        <p className="total-item-title-inner">Cart Total</p>
                        <p className="total-item-rate-inner">₹ {price}</p>
                    </div>
                    <div className="total-item-cost-inner">
                        <p className="total-item-title-inner">Delivery Charge</p>
                        <p className="total-item-rate-inner">Free</p>
                    </div>
                    <div className="total-item-cost-inner">
                        <p className="total-item-title-inner">Convenience Charge</p>
                        <p className="total-item-rate-inner">₹ 0</p>
                    </div>
                    <div className="total-item-cost-inner title-bold-rate">
                        <p className="total-item-title-main">Total Amount</p>
                        <p className="total-item-rate-main">₹  {price}
                        </p>
                    </div>
                    <button className="checkout-btn">Continue To Checkout</button>
                </div> */}
                </>}
            </div>
        </>
    )
}

export default Cart