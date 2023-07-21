import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './adminselect.css'
import { Link } from 'react-router-dom'
function AdminSelect() {
    const [product, setProduct] = useState([])
    const [code, setCode] = useState()
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("")
    const [image3, setImage3] = useState("")
    const [image4, setImage4] = useState("")
    const [title, setTitle] = useState()
    const [rate, setRate] = useState()
    const [offer, setOffer] = useState()
    const [original, setOriginal] = useState()
    const [description, setDescription] = useState()
    const [point1, setPoint1] = useState()
    const [point2, setPoint2] = useState()
    const [point3, setPoint3] = useState()
    const [point4, setPoint4] = useState()
    const [point5, setPoint5] = useState()
    const [point6, setPoint6] = useState()
    const [length, setLength] = useState()
    const [width,setWidth] = useState()
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState()
    let search = window.location.search;
    const params = new URLSearchParams(search);
    const [id, setId] = useState(params.get("q"))
    useEffect(() => {
        if (id.length > 9) {
            axios.get(`https://gkdback.onrender.com/backend/api/product/${id}`)
                .then((response) => {
                    setProduct(response.data)
                    setCode(response.data.code)
                    setTitle(response.data.title)
                    setRate(response.data.rate)
                    setOffer(response.data.offer)
                    setOriginal(response.data.original)
                    setDescription(response.data.description)
                    setPoint1(response.data.point1)
                    setPoint2(response.data.point2)
                    setPoint3(response.data.point3)
                    setPoint4(response.data.point4)
                    setPoint5(response.data.point5)
                    setPoint6(response.data.point6)
                    setImage1(response.data.image1)
                    setImage2(response.data.image2)
                    setImage3(response.data.image3)
                    setImage4(response.data.image4)
                    length(response.data.length)
                    width(response.data.width)
                    height(response.data.height)
                    weight(response.data.weight)
                }
                )
                .catch(error => console.error(error));
        } else {
            axios.get(`https://gkdback.onrender.com/backend/api/product-code/${id}`)
                .then((response) => {
                    setId(response.data._id)
                    setProduct(response.data)
                    setCode(response.data.code)
                    setTitle(response.data.title)
                    setRate(response.data.rate)
                    setOffer(response.data.offer)
                    setOriginal(response.data.original)
                    setDescription(response.data.description)
                    setPoint1(response.data.point1)
                    setPoint2(response.data.point2)
                    setPoint3(response.data.point3)
                    setPoint4(response.data.point4)
                    setPoint5(response.data.point5)
                    setPoint6(response.data.point6)
                    setImage1(response.data.image1)
                    setImage2(response.data.image2)
                    setImage3(response.data.image3)
                    setImage4(response.data.image4)
                    setLength(response.data.length)
                    setWidth(response.data.width)
                    setHeight(response.data.height)
                    setWeight(response.data.weight)
                }
                )
                .catch(error => console.error(error));
        }
    }, [id]);

    const handleSubmit = () => {
        const data = {
            code: code,
            title: title,
            rate: rate,
            offer: offer,
            original: original,
            description: description,
            point1: point1,
            point2: point2,
            point3: point3,
            point4: point4,
            point5: point5,
            point6: point6,
            length:length,
            width:width,
            height:height,
            weight:weight,
        }
        axios.post(`https://gkdback.onrender.com/backend/api/admin/products/${id}`, data).then((res) => {
            setProduct(res.data)
            alert("Update Success")
            setCode("")
            setTitle("")
            setRate("")
            setOffer("")
            setOriginal("")
            setDescription("")
            setPoint1("")
            setPoint2("")
            setPoint3("")
            setPoint4("")
            setPoint5("")
            setPoint6("")
            length("")
            width("")
            height("")
            weight("")
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <div className="admin">
                <div className="admin-navbar">
                    <Link className="adminlink" to='/admin-edit'>
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
                {product === [] ? "" : <><div className="admin-selected-image-container">
                    {image1 === "" ? "" : <img className="admin-selected-image" src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${image1}`} alt="Product" />}
                    {image2 === "" ? "" : <img className="admin-selected-image" src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${image2}`} alt="Product" />}
                    {image3 === "" ? "" : <img className="admin-selected-image" src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${image3}`} alt="Product" />}
                    {image4 === "" ? "" : <img className="admin-selected-image" src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${image4}`} alt="Product" />}
                </div>
                    <div className="admin-selected-product-desc">
                        <div className="admin-selected-code-container new-admin-container">
                            <p className="admin-selected-code titleee">Product Code</p>
                            <input className="admin-selected-input inputt" value={code} onChange={(e) => setCode(e.target.value)} placeholder={product && product.code} />
                        </div>
                        <div className="admin-selected-title-container new-admin-container">
                            <p className="admin-selected-code titleee">Product Name</p>
                            <input className="admin-selected-input inputt" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={product && product.title} />
                        </div>
                        <div className="admin-selected-price-container new-admin-container">
                            <p className="admin-selected-code titleee">Product Current Price</p>
                            <input className="admin-selected-input inputt" value={rate} onChange={(e) => setRate(e.target.value)} placeholder={product && product.rate} />
                        </div>
                        <div className="admin-selected-offer-container new-admin-container">
                            <p className="admin-selected-code titleee">Product Offer</p>
                            <input className="admin-selected-input inputt" value={offer} onChange={(e) => setOffer(e.target.value)} placeholder={product && product.offer} />
                        </div>
                        <div className="admin-selected-original-container new-admin-container">
                            <p className="admin-selected-code titleee">Product Original Price</p>
                            <input className="admin-selected-input inputt" value={original} onChange={(e) => setOriginal(e.target.value)} placeholder={product && product.code} />
                        </div>
                        <div className="admin-selected-desc-container new-admin-container">
                            <p className="admin-selected-code titleee">Product Description</p>
                            <textarea rows="6" className="admin-selected-input inputt" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={product && product.code} />
                        </div>
                        <div className="admin-selected-point-container new-admin-container">
                            <p className="admin-selected-code titleee">Product Highlights 1</p>
                            <input className="admin-selected-input inputt" value={point1} onChange={(e) => setPoint1(e.target.value)} placeholder={product && product.point1} />
                        </div>
                        <div className="admin-selected-point-container new-admin-container">
                            <p className="admin-selected-code titleee">Product Highlights 2</p>
                            <input className="admin-selected-input inputt" value={point2} onChange={(e) => setPoint2(e.target.value)} placeholder={product && product.point2} />
                        </div>
                        <div className="admin-selected-point-container new-admin-container">
                            <p className="admin-selected-code titleee">Product Highlights 3</p>
                            <input className="admin-selected-input inputt" value={point3} onChange={(e) => setPoint3(e.target.value)} placeholder={product && product.point3} />
                        </div>
                        <div className="admin-selected-point-container new-admin-container">
                            <p className="admin-selected-code titleee">Product Highlights 4</p>
                            <input className="admin-selected-input inputt" value={point4} onChange={(e) => setPoint4(e.target.value)} placeholder={product && product.point4} />
                        </div>
                        <div className="admin-selected-point-container new-admin-container">
                            <p className="admin-selected-code titleee">Product Highlights 5</p>
                            <input className="admin-selected-input inputt" value={point5} onChange={(e) => setPoint5(e.target.value)} placeholder={product && product.point5} />
                        </div>
                        <div className="admin-selected-point-container new-admin-container">
                            <p className="admin-selected-code titleee">Product Highlights 6</p>
                            <input className="admin-selected-input inputt" value={point6} onChange={(e) => setPoint6(e.target.value)} placeholder={product && product.point6} />
                        </div>
                        <div className="admin-selected-point-container new-admin-container">
                            <p className="admin-selected-code titleee">Length</p>
                            <input type="number" className="admin-selected-input inputt" value={length} onChange={(e) => setLength(e.target.value)} placeholder={product && product.length} />
                        </div>
                        <div className="admin-selected-point-container new-admin-container">
                            <p className="admin-selected-code titleee">Width</p>
                            <input type="number" className="admin-selected-input inputt" value={width} onChange={(e) => setWidth(e.target.value)} placeholder={product && product.width} />
                        </div>
                        <div className="admin-selected-point-container new-admin-container">
                            <p className="admin-selected-code titleee">Height</p>
                            <input type="number" className="admin-selected-input inputt" value={height} onChange={(e) => setHeight(e.target.value)} placeholder={product && product.height} />
                        </div>
                        <div className="admin-selected-point-container new-admin-container">
                            <p className="admin-selected-code titleee">Weight</p>
                            <input type="number" className="admin-selected-input inputt" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={product && product.weight} />
                        </div>
                    </div></>}
                <button onClick={handleSubmit} className="admin-submit-btn">Submit Your Change</button>
            </div>
        </>
    )
}

export default AdminSelect