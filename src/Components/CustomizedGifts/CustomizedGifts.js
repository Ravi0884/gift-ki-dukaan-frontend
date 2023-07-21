import React, { useEffect, useState } from 'react'
import './customizedgifts.css'
import axios from 'axios';
import {Link} from 'react-router-dom'

function CustomizedGifts() {
  function siteClick() {
    window.scrollTo(0, 0);
}

const [frames,setFrames] = useState()
const [loading,setLoading] = useState(true)
const [value,setValue] = useState(1)
var search = window.location.search;
var params = new URLSearchParams(search);
var category =params.get("q")
useEffect(() => {
  
    async function fetchData() {
        await axios.get(`https://gkdback.onrender.com/backend/api/category/${category}`).then((res) => {
            setLoading(false);
            setFrames(res.data.data);
        });
    }
    async function fetchData2() {
      await axios.get(`https://gkdback.onrender.com/backend/api/gifts`).then((res) => {
          setLoading(false);
          setFrames(res.data);
      });
  }
  async function fetchData3() {
    await axios.get(`https://gkdback.onrender.com/backend/api/lights`).then((res) => {
        setLoading(false);
        setFrames(res.data);
    });
}
    if(category==="gift"){
      fetchData2()
    }else if(category==="light"){
      fetchData3()
    }else{
      fetchData()
    }
    

}, [value]);

const categoryClick = () =>{
  setValue(value+1)
  window.scroll(0,750)
}
  return (
    <>
      <div className="home">
        <div className="custom-banner">
          <img className="custom-banner-image" src={require('../Photos/banner-left.avif')} alt="Banner" />
          <img className="custom-banner-image" src={require('../Photos/banner-right.avif')} alt="Banner" />
        </div>
                    <div className="home-category">
                <Link onClick={categoryClick} className="link2" to="/customized-gifts?q=frame">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/gifts.png')} alt="Gifts" />

                        <p className="home-category-title">FRAMES</p>

                    </div>
                </Link>
                <Link onClick={categoryClick} className="link2" to="/customized-gifts?q=cushion">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/cushions.png')} alt="Gifts" />

                        <p className="home-category-title">CUSHIONS</p>

                    </div>
                </Link>
                <Link onClick={categoryClick} className="link2" to="/customized-gifts?q=bangle">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/bangles.png')} alt="Gifts" />
                        <p className="home-category-title">PHOTO BANGLES</p>
                    </div>
                </Link>
                <Link onClick={categoryClick} className="link2" to="/customized-gifts?q=neon">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/neon.png')} alt="Gifts" />
                        <p className="home-category-title">NEON LIGHTS</p>
                    </div>
                </Link>
                <Link onClick={categoryClick} className="link2" to="/customized-gifts?q=lamp">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/lamp.png')} alt="Gifts" />
                        <p className="home-category-title">PHOTO LAMPS</p>
                    </div>
                </Link>
                <Link onClick={categoryClick} className="link2" to="/customized-gifts?q=keyring">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/keyring.png')} alt="Gifts" />
                        <p className="home-category-title">KEY RINGS</p>
                    </div>
                </Link>
                <Link onClick={categoryClick} className="link2" to="/customized-gifts?q=tshirt">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/tshirts.png')} alt="Gifts" />
                        <p className="home-category-title">T-SHIRTS</p>
                    </div>
                </Link>
                <Link onClick={categoryClick} className="link2" to="/customized-gifts?q=clock">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/clock.png')} alt="Gifts" />
                        <p className="home-category-title">CLOCKS</p>
                    </div>
                </Link>
                <Link onClick={categoryClick} className="link2" to="/customized-gifts?q=bottle">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/bottle.png')} alt="Gifts" />
                        <p className="home-category-title">BOTTLE</p>
                    </div>
                </Link>
                <Link onClick={categoryClick} className="link2" to="/customized-gifts?q=cup">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/customized.png')} alt="Gifts" />
                        <p className="home-category-title">CUSTOMIZED GIFTS</p>
                    </div>
                </Link>
            </div>
        <p className="customized-title">Handpicked Personalised Gifts for You</p>
        <div className='premium-gift-container'>
          
          {/* <div className='premium-gift-item customized-card'> */}
          {loading ? "Loading......" : frames && frames.map((product) =>
                            <Link onClick={siteClick} className='premium-gift-item customized-card' to={`/selected-product?q=${product.id}`}>

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

export default CustomizedGifts