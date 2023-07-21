import React, { useState } from 'react'
import './adminedit.css'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'

function AdminEdit() {
    const navigate = useNavigate()
    const [code, setCode] = useState()
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const categoryClick = (e) => {
        const id = e.target.id
        async function fetchData() {
            setLoading(true)
            await axios.get(`https://gkdback.onrender.com/backend/api/category/${id}`).then((res) => {
                setLoading(false);
                setProduct(res.data.data);
            });
        }
        fetchData()
    }
    const codeSearch = () =>{
        navigate(`/admin-select?q=${code}`)
    }
    return (
        <>
            <div className="admin">
                <div className="admin-navbar">
                    <p className="admin-navbar-item">
                        Edit Product
                    </p>
                    <Link className="adminlink" to='/admin-pannel'>
                    <p className="admin-navbar-item">
                        Add Product
                    </p>
                    </Link>
                    <Link to='/admin-order' className='adminlink'>
                    <p className="admin-navbar-item">
                        Order Details
                    </p>
                    </Link>
                </div>
                <div className="admin-edit-search">
                    <p className="admin-edit-search-title">Search with Product Code:</p>
                    <input className="admin-edit-input" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter product Code" />
                    <button onClick={codeSearch} className="admin-navbar-item">Search</button>
                </div>

                <p className="admin-edit-search-title">Choose from category</p>
                <div className="category-choose">
                    <p onClick={categoryClick} className="different-category" id="frame">Frames</p>
                    <p onClick={categoryClick} className="different-category" id="love">Love</p>
                    <p onClick={categoryClick} className="different-category" id="acryclic">Frames-Acrylic</p>
                    <p onClick={categoryClick} className="different-category" id="metalstud">Frames Acrylic with metal Stud</p>
                    <p onClick={categoryClick} className="different-category" id="anniversary">Anniversary</p>
                    <p onClick={categoryClick} className="different-category" id="neon">Neon</p>
                    <p onClick={categoryClick} className="different-category" id="bottle">Bottle</p>
                    <p onClick={categoryClick} className="different-category" id="family">Family</p>
                    <p onClick={categoryClick} className="different-category" id="birthday">Birthday</p>
                    {/* <p onClick={categoryClick} className="different-category" id="father">Father</p> */}
                    <p onClick={categoryClick} className="different-category" id="brother">Brother</p>
                    <p onClick={categoryClick} className="different-category" id="sister">Sister</p>
                    <p onClick={categoryClick} className="different-category" id="clock">Clock</p>
                    <p onClick={categoryClick} className="different-category" id="pendant">Pendant</p>
                    <p onClick={categoryClick} className="different-category" id="pillow">Pillow</p>
                    <p onClick={categoryClick} className="different-category" id="tshirt">T-Shirts</p>
                    <p onClick={categoryClick} className="different-category" id="friend">Friend</p>
                </div>
                <div className='premium-gift-container'>
                    <p className="product-loading">{loading ? "Loading..." : ""}</p>
                    {product && product.map((product) =>
                        <Link className='premium-gift-item' to={`/admin-select?q=${product.id}`}>
                            {/* <div className='premium-gift-item'> */}

                            <img className='premium-gift-image' src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${product.image}`} alt="Gifts" />
                            <p className='premium-gift-heading'>{product.title}</p>
                            <div className='premium-gift-rate'>
                                <p className='premium-gift-new-rate'>₹ {product.rate}</p>
                                <p className='premium-gift-original-rate'>&nbsp;₹ {product.original}</p>
                                <p className='premium-gift-offer'>&nbsp;&#40;{product.offer}%&#41;</p>
                            </div>
                        </Link>

                    )}

                </div>
            </div>
        </>
    )
}

export default AdminEdit