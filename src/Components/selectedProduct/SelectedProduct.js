import React, { useEffect, useState } from 'react'
import './selectedproduct.css'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom'
import ReplyIcon from '@mui/icons-material/Reply';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { Upload } from 'antd'

function SelectedProduct() {
    const toastOptions = {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    const [image, setImage] = useState()
    const [largeImage, setLargeImage] = useState("")
    const [name, setName] = useState("")
    const [hclick, setHClick] = useState(true)
    const [mclick, setMClick] = useState(false)
    const [data, setData] = useState(true)
    const [frames, setFrames] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sendImage, setSendImage] = useState()
    const [value, setValue] = useState(1)
    const [send, setSend] = useState()
    const [aws, setAws] = useState()



    let search = window.location.search;
    const params = new URLSearchParams(search);
    useEffect(() => {
        let search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get("q")
        axios.get(`https://gkdback.onrender.com/backend/api/product/${id}`)
            .then(response => {
                setProduct(response.data)
                setLargeImage(response.data.image1)
                import(`${response.data.image1}`)
                    .then(image => {
                        // Image is imported successfully
                        console.log('Image imported:', image);
                        setSendImage(image.default); // Store the imported image
                    })
                    .catch(error => {
                        // Error occurred while importing image
                        console.error('Image import error:', error);
                    });
            }
            )
            .catch(error => console.error(error));
    }, [value]);
    const handleSizeClick = (e) => {
        const pId = e.target.id
        axios.get(`https://gkdback.onrender.com/backend/api/product/${pId}`)
            .then(response => {
                setProduct(response.data)
                setLargeImage(response.data.image1)
            }
            )
            .catch(error => console.error(error));
    }

    const img1Click = () => {
        setLargeImage(product === [] ? "Loading" : product.image1)
    }
    const img2Click = () => {
        setLargeImage(product === [] ? "Loading" : product.image2)
    }
    const img3Click = () => {
        setLargeImage(product === [] ? "Loading" : product.image3)
    }
    const img4Click = () => {
        setLargeImage(product === [] ? "Loading" : product.image4)
    }
    function convertToBase64(e) {
        var reader = new FileReader();
        setSend(e.target.files[0])
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result)
        };
        reader.onerror = error => {
            console.log("Error:-", error)
        }
    }
    const highlightsClick = () => {
        setHClick(true)
        setMClick(false)
        setData(true);
    }
    const moreClick = () => {
        setHClick(false)
        setMClick(true)
        setData(false)
    }
    const handleChange = () => {
        window.scroll(0, 0)
        setValue(value + 1)
    }
    useEffect(() => {
        async function fetchData() {
            await axios.get(`https://gkdback.onrender.com/backend/api/category/${product && (product.subcategory === "metalstud" || product.subcategory === "acryclic") ? "frame" : product.subcategory}`).then((res) => {
                setLoading(false);
                setFrames(res.data.data);
                // setId(res.data.data.id)
            });
        }
        fetchData()

    }, [product]);

    const addToCart = async () => {
        window.scroll(0, 0)
        const localUser = localStorage.getItem('id')
        if (localUser !== null) {


            const data = {
                id: product._id,
                image: product.image1,
                rate: product.rate,
                qty: 1,
                title: product.title

            }
            const userId = localStorage.getItem('id')
            await axios.post(`https://gkdback.onrender.com/backend/user/user-cart-add/${userId}`, data).then((res) => {

                navigate('/cart')

            });
        } else {
            window.scrollTo(0, 0);
            navigate('/user-login')
        }
    }
    const handleBuyNow = () => {
        const localUser = localStorage.getItem('id')
        if (localUser !== null) {
            if (image === '' || image === null || name === '') {
                toast.error('Please insert image and name.', toastOptions);
            } else {
                window.scrollTo(0, 0);
                navigate(`/delivery?q=${product._id}`, { state: { name: name, image: aws } });
            }
        } else {
            window.scrollTo(0, 0);
            navigate('/user-login')
        }
    };
    const encodedMedia = encodeURIComponent(sendImage);

    const handleImageUpload = (info) => {
        const fileList = info.fileList;
        // console.log(fileList[0].originFileObj);
        setAws(fileList)
    }
    return (
        <>
            <div className="selected-product-container">
                {loading ? <Box className='loading' sx={{ display: 'flex' }}>
                    <CircularProgress className='circular-loading' />
                </Box> : ""}
                <div className="product-image-container">
                    <div className="user-select-left-container">
                        <div className="product-left-image-container">
                            {(product && product.image1) ? <img onClick={img1Click} className="product-left-image-card" src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${product.image1}`} alt="Product " /> : ""}
                            {(product && product.image2) ? <img onClick={img2Click} className="product-left-image-card" src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${product.image2}`} alt="Product " /> : ""}
                            {(product && product.image3) ? <img onClick={img3Click} className="product-left-image-card" src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${product.image3}`} alt="Product " /> : ""}
                            {(product && product.image4) ? <img onClick={img4Click} className="product-left-image-card" src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${product.image4}`} alt="Product " /> : ""}
                        </div>
                        <div>

                            {largeImage === "" ? "loading" : <img className='product-large-image' src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${largeImage}`} alt="Product" />}

                            <div className="product-large-imagedescription">
                                <p onClick={addToCart} className='product-large-image-add-to-cart'>Add to cart</p>
                                <button onClick={handleBuyNow} className='product-large-image-add-to-cart'
                                >
                                    Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className='product-description'>
                        <a target='_blanl' rel='nofollow' href={`https://api.whatsapp.com/send?text=${product && product.image1 ? `https://giftkidukaan.s3.ap-south-1.amazonaws.com/${product.image1}` : ""},  ${product && product.image2 ? `https://giftkidukaan.s3.ap-south-1.amazonaws.com/${product.image2}` : ""},  ${product && product.image3 ? `https://giftkidukaan.s3.ap-south-1.amazonaws.com/${product.image3}` : ""},  ${product && product.image4 ? `https://giftkidukaan.s3.ap-south-1.amazonaws.com/${product.image4}` : ""}`} className="share-opt">
                            <WhatsAppIcon />
                            <span className='share-title'>share</span>

                        </a>
                        <p className='selected-product-title'>{product === [] ? "Loading" : product.title}</p>
                        <p className='selected-product-rate'>₹{product === [] ? "Loading" : product.rate}</p>
                        <p className='selected-product-rate-title'>inclusive of all taxes</p>
                        <div className='product-offer-rate'>
                            <p className='selected-product-original-rate'>₹{product === [] ? "Loading" : product.original}</p> <p className='selected-product-offer'>&nbsp;&nbsp;&#40;{product === [] ? "Loading" : product.offer}% Off&#41;</p>
                        </div>
                        <p className='selected-product-requirement'>
                            {(product === [] ? "Loading" : product.requirement !== "photo") ? <div className="">
                                <p className="">Please Enter your name</p>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="" name="description" placeholder="Please Enter your name" />
                            </div> : <div className='product-image-upload'>
                                <p className="product-image-title">Please upload your image</p>
                                {image === "" || image == null ? "" : <img className="admin-image" src={image} alt="Upload" />}
                                <Upload.Dragger multiple listType='picture' showUploadList={{ showRemoveIcon: true }} onChange={handleImageUpload}>
                                    <button>Upload</button>
                                </Upload.Dragger>
                                <div className="">
                                    <p className="">Please Enter your name</p>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="" name="description" placeholder="Please Enter your name" />
                                </div>
                            </div>}

                        </p>
                        <div className={((product && product.code === "GKD0001") || (product && product.subcategory === "acryclic")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6464b5cfec4aea582b639afe">6 X 9</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6464cb5aec4aea582b639b2c">6 X 12</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6464cc5eec4aea582b639b2e">9 X 12</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6464d3a2ec4aea582b639b3a">12 X 12</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6464d474ec4aea582b639b3c">12 X 18</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6464d52cec4aea582b639b3e">12 X 24</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6465c9ab6183fc317c0f758b">18 X 24</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6465ca856183fc317c0f758d">24 X 36</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6465cb396183fc317c0f758f">24 X 24</p>
                        </div>
                        <div className={((product && product.code === "GKD0069") || (product && product.subcategory === "metalstud")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick} className="similar-product-size" id="646746e43216f9e3b4fde155">6 X 9</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6467478f3216f9e3b4fde157">6 X 12</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="646748313216f9e3b4fde159">9 X 12</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="646748b43216f9e3b4fde15b">12 X 12</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="646749133216f9e3b4fde15d">12 X 18</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6467496b3216f9e3b4fde15f">12 X 24</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="646749d23216f9e3b4fde161">18 X 24</p>
                        </div>
                        <div className={((product && product.title === "Natural Wood Frame")) ? "similar-product-different-sizes" : "hide"}>
                            <p  onClick={handleSizeClick} className="similar-product-size" id="6486ceb35e7bdd787941f3e5">8 X 6</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6486d0175e7bdd787941f3e7">8 X 8</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6486d15b5e7bdd787941f3e9">11 X 8</p>

                        </div>
                        <div className={((product && product.title === "Neon Wall Photo Frame")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick}  className="similar-product-size" id="6486a946a3255a48017be0e3">12 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6486aa95a3255a48017be0e5">16 Inches</p>
                        </div>
                        <div className={((product && product.title === "Wooden Table Calendar")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick}  className="similar-product-size" id="6485c0a513aabfe6fcbaf228">8 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6485c24a13aabfe6fcbaf22a">12 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6485c31313aabfe6fcbaf22c">16 Inches</p>
                        </div>
                        <div className={((product && product.title === "Neon Sign")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick}  className="similar-product-size" id="6485baf613aabfe6fcbaf220">6 x 6 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6485bbe313aabfe6fcbaf222">6 x 24 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6485bcc113aabfe6fcbaf224">6 x 36 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6485bcc113aabfe6fcbaf224">6 x 12 Inches</p>
                        </div>
                        <div className={((product && product.title === "Acrylic Name Plate ")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick}  className="similar-product-size" id="6485b0ce13aabfe6fcbaf212">12 x 16 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6485b1bd13aabfe6fcbaf214">16 x 16 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="6485b26b13aabfe6fcbaf216">16 x 24 Inches</p>
                        </div>
                        <div className={((product && product.title === "Led Magic Acrylic Table Frames")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick}  className="similar-product-size" id="648402dcc6ee5cffef60ac2c">6 x 9 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="648403c2c6ee5cffef60ac2e">8 x 11 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="648404aac6ee5cffef60ac30">12 x 16 Inches</p>
                        </div>
                        <div className={((product && product.title === "Mini Frame Sister")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick}  className="similar-product-size" id="648421bf2c3425eb44e98d9f">8 x 15 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="648422402c3425eb44e98da1">12 x 16 Inches</p>
                        </div>
                        <div className={((product && product.title === "Mini Frame King")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick}  className="similar-product-size" id="64841f1c2c3425eb44e98d7d">8 x 15 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="64841fe42c3425eb44e98d87">12 x 16 Inches</p>
                        </div>
                        <div className={((product && product.title === "Mini Frame Brother")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick}  className="similar-product-size" id="64841d752c3425eb44e98d79">8 x 15 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="64841e2d2c3425eb44e98d7b">12 x 16 Inches</p>
                        </div>
                        <div className={((product && product.title === "Mini Frame Birthday")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick}  className="similar-product-size" id="64841b222c3425eb44e98d56">8 x 15 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="64841bed2c3425eb44e98d76">12 x 16 Inches</p>
                        </div>
                        <div className={((product && product.title === "Mini Frame Anniversary")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick}  className="similar-product-size" id="648417c82c3425eb44e98d52">8 x 15 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="648418a32c3425eb44e98d54">12 x 16 Inches</p>
                        </div>
                        <div className={((product && product.title === "Led Acrylic Table Frames")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick}  className="similar-product-size" id="6483398ce96679dbe08b5eab">8 x 6 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="64833a96e96679dbe08b5ead">11 x 8 Inches</p>
                        </div>
                        <div className={((product && product.title === "Hd Slim Arcylic Heart Clock")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick}  className="similar-product-size" id="6483318de96679dbe08b5e9b">12 x 16 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="648332a3e96679dbe08b5e9d">16 x 16 Inches</p>
                        </div>
                        <div className={((product && product.title === "Led Blinking Frame")) ? "similar-product-different-sizes" : "hide"}>
                            <p onClick={handleSizeClick}  className="similar-product-size" id="64833bc6e96679dbe08b5eaf">9 x 6 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="64833c77e96679dbe08b5eb1">11 x 8 Inches</p>
                            <p onClick={handleSizeClick} className="similar-product-size" id="64833d23e96679dbe08b5eb3">12 x 16 Inches</p>
                        </div>
                        <div className="product-highlights-container">
                            <p onClick={highlightsClick} className={hclick ? "highlights-click" : "default-click"}>Highlights</p>
                            <p onClick={moreClick} className={mclick ? "highlights-click" : "default-click"}>More Details</p>
                        </div>
                        <div className="selected-product-descriptions">
                            {data ? <div className="highlight-points">
                                <p>Product details</p>
                                <ul>
                                    {(product && product.point1) ? <li>{product === [] ? "Loading" : product.point1}</li> : ""}
                                    {(product && product.point2) ? <li>{product === [] ? "Loading" : product.point2}</li> : ""}
                                    {(product && product.point3) ? <li>{product === [] ? "Loading" : product.point3}</li> : ""}
                                    {(product && product.point4) ? <li>{product === [] ? "Loading" : product.point4}</li> : ""}
                                    {(product && product.point5) ? <li>{product === [] ? "Loading" : product.point5}</li> : ""}
                                    {(product && product.point6) ? <li>{product === [] ? "Loading" : product.point6}</li> : ""}
                                </ul>
                            </div> : <div className="selected-description">
                                {product === [] ? "Loading" : product.description}
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="related-product">
                    <p className="related-product-title">
                        Related Products
                    </p>
                    <div className='premium-gift-container'>
                        {loading ? "Loading......" : frames && frames.slice(0, 6).map((product) =>
                            <Link onClick={handleChange} className='premium-gift-item' to={`/selected-product?q=${product.id}`}>
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
                <ToastContainer />
            </div >
        </>
    )
}

export default SelectedProduct