import React, { useEffect, useState } from 'react'
import {Link,useLocation} from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function SearchProduct() {
    const location = useLocation();
    const value = location.state.value
    function siteClick() {
        window.scrollTo(0, 0);
    }
    let search = window.location.search;
    const params = new URLSearchParams(search);
    const [frames,setFrames] = useState()
    const [loading,setLoading] = useState(true)
    const category =params.get("q")
    useEffect(() => {
        async function fetchData() {
            await axios.get(`https://gkdback.onrender.com/backend/api/category/${category}`).then((res) => {
                setLoading(false);
                setFrames(res.data.data);
            }).catch((err) => {
                setLoading(false);
            })
        }
        
        fetchData()

    }, [value]);
    return (
        <>
            <div className="selected-product-container">
            {loading?<Box className='loading' sx={{ display: 'flex' }}>
                    <CircularProgress className='circular-loading'  />
                </Box>:""}
                {frames && frames?<p className="search-title">{frames && frames.length} products found for "{category}" </p>:<p className="search-title">"Product not found Please select from the list!"</p>}
                
                <div className="search-product">
                    <div className='premium-gift-container'>
                        {loading ? "Loading......" : frames && frames.map((product) =>
                            <Link onClick={siteClick} className='premium-gift-item' to={`/selected-product?q=${product.id}`}>

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
            </div>
        </>
    )
}

export default SearchProduct