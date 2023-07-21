import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import './admin.css'
import {Link} from 'react-router-dom'

function Admin() {
    const toastOptions = {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("")
    const [image3, setImage3] = useState("")
    const [image4, setImage4] = useState("")
    const [title, setTitle] = useState("")
    const [rate, setRate] = useState("")
    const [original, setOriginal] = useState("")
    const [offer, setOffer] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [requirement, setRequirement] = useState('')
    const [point1, setPoint1] = useState()
    const [point2, setPoint2] = useState()
    const [point3, setPoint3] = useState()
    const [point4, setPoint4] = useState()
    const [point5, setPoint5] = useState()
    const [point6, setPoint6] = useState()
    const [code, setCode] = useState("")
    const [length, setLength] = useState()
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState()
    const [loadings, setLoadings] = useState(false)
    const [sendImage1, setSendImage1] = useState('')
    const [sendImage2, setSendImage2] = useState('')
    const [sendImage3, setSendImage3] = useState('')
    const [sendImage4, setSendImage4] = useState('')

    function handleImage1(e){
        const file = e.target.files[0];
        setSendImage1(file)
        setImage1(file.name);
    }
    function handleImage2(e){
        const file = e.target.files[0];
        setSendImage2(file)
        setImage2(file.name);
    }
    function handleImage3(e){
        const file = e.target.files[0];
        setSendImage3(file)
        setImage3(file.name);
    }
    function handleImage4(e){
        const file = e.target.files[0];
        setSendImage4(file)
        setImage4(file.name);
    }
    const adminSubmit = () =>{
        if(image1===""){
            toast.error(
                "Please insert an Image.",
                toastOptions
              );
        }else if(title===""){
            toast.error(
                "Please insert Title.",
                toastOptions
              );
        }else if(requirement===""){
            toast.error(
                "Please fill requirement field.",
                toastOptions
              );
        }
        else if(rate===""){
            toast.error(
                "Please insert Rate.",
                toastOptions
              );
        }else if(original===""){
            toast.error(
                "Please insert Original Rate.",
                toastOptions
              );
        }else if(offer===""){
            toast.error(
                "Please insert Offer.",
                toastOptions
              );
        }else if(description===""){
            toast.error(
                "Please insert Description.",
                toastOptions
              );
        }else if(category===""){
            toast.error(
                "Please insert either `gift` or `light` only in Category",
                toastOptions
              );
        }else if(code===""){
            toast.error(
                "Please enter product code",
                toastOptions
              );
        }
        else if(length===""){
            toast.error(
                "Please enter product length",
                toastOptions
              );
        }
        else if(width===""){
            toast.error(
                "Please enter product width",
                toastOptions
              );
        }
        else if(height===""){
            toast.error(
                "Please enter product height",
                toastOptions
              );
        }
        else if(weight===""){
            toast.error(
                "Please enter product weight",
                toastOptions
              );
        }
        else if(subcategory===""){
            toast.error(
                "Please insert either `gift` or `light` only in Category",
                toastOptions
              );
        }else{
            setLoadings(true)
            const parsedData ={
                image1,
                image2,
                image3,
                image4,
                title,
                rate,
                original,
                offer,
                description,
                category,
                subcategory,
                requirement,
                code,
                point1,
                point2,
                point3,
                point4,
                point5,
                point6,
                length,
                width,
                height,
                weight
            }

            const parsedData1 = {
                image: sendImage1
              }
              const parsedData2 = {
                image: sendImage2
              }
              const parsedData3 = {
                image: sendImage3
              }
              const parsedData4 = {
                image: sendImage4
              }
              if(sendImage1 !==''){
                axios.post('https://gkdback.onrender.com/backend/aws/post',parsedData1,{headers:{'Content-Type':'multipart/form-data'}})
              }
              if (sendImage2 !==''){
                axios.post('https://gkdback.onrender.com/backend/aws/post',parsedData2,{headers:{'Content-Type':'multipart/form-data'}})
              }
            if(sendImage3 !==''){
                axios.post('https://gkdback.onrender.com/backend/aws/post',parsedData3,{headers:{'Content-Type':'multipart/form-data'}})
            }
                 if(sendImage4 !==''){
                    axios.post('https://gkdback.onrender.com/backend/aws/post',parsedData4,{headers:{'Content-Type':'multipart/form-data'}})
                 } 
             axios.post("https://gkdback.onrender.com/backend/api/admin",parsedData).then((res)=>{
                alert("Added successfully")
                setLoadings(false)
                setImage1("")
                setImage2("")
                setImage3("")
                setImage4("")
                setTitle("")
                setRate("")
                setOriginal("")
                setOffer("")
                setCategory("")
                setDescription("")
                setSubcategory("")
                setRequirement("")
                setPoint1("")
                setPoint2("")
                setPoint3("")
                setPoint4("")
                setPoint5("")
                setPoint6("")
                setCode("")
                setLength("")
                setWeight("")
                setHeight("")
                setWeight("")
            }).catch(function (error) {
                toast.error(
                    "Error from backend",
                    toastOptions
                  );
                console.log(error);
            })
        }
    }
    return (
        <>
            <div className="admin">
                <div className="admin-navbar">
                <Link to='/admin-edit' className='adminlink'>
                    <p to='/admin-edit' className="admin-navbar-item">
                        Edit Product
                    </p>
                    </Link>
                    <p className="admin-navbar-item">
                        Add Product
                    </p>
                    <Link to='/admin-order' className='adminlink'>
                    <p className="admin-navbar-item">
                        Order Details
                    </p>
                    </Link>
                </div>
                <div className="admin-input-card">
                <div className="admin-style-div">
                <p className="admin-title">Image1</p>
                <input type="file" accept="image/*"  onChange={handleImage1} className="admin-input" name="title" placeholder="Type Your image name:" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">Image2</p>
                <input type="file" accept="image/*"  onChange={handleImage2} className="admin-input" name="title" placeholder="Type Your image name:" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">Image3</p>
                <input type="file" accept="image/*"  onChange={handleImage3} className="admin-input" name="title" placeholder="Type Your image name:" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">Image4</p>
                <input type="file" accept="image/*"  onChange={handleImage4} className="admin-input" name="title" placeholder="Type Your image name:" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">Title</p>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="admin-input" name="title" placeholder="Type Your Title:" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">Product Code</p>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="admin-input" name="title" placeholder="Type Product Code:" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">Current rate</p>
                <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="admin-input" name="rate" placeholder="rate" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">Original price</p>
                <input type="number" value={original} onChange={(e) => setOriginal(e.target.value)} className="admin-input" name="original" placeholder="original" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">offer</p>
                <input type="number" value={offer} onChange={(e) => setOffer(e.target.value)} className="admin-input" name="offer" placeholder="offer" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">description</p>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="admin-input" name="description" placeholder="description" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">category</p>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="admin-input" name="category" placeholder="Please type either `gift` or `light` only" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">sub-category</p>
                <input type="text" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="admin-input" name="category" placeholder="Please enter sub category" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">Requirement</p>
                <input type="text" value={requirement} onChange={(e) => setRequirement(e.target.value)} className="admin-input" name="category" placeholder="Please give requirement for user" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">point1</p>
                <input type="text" value={point1} onChange={(e) => setPoint1(e.target.value)} className="admin-input" name="point1" placeholder="point1" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">point2</p>
                <input type="text" value={point2} onChange={(e) => setPoint2(e.target.value)} className="admin-input" name="point2" placeholder="point2" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">point3</p>
                <input type="text" value={point3} onChange={(e) => setPoint3(e.target.value)} className="admin-input" name="point3" placeholder="point3" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">point4</p>
                <input type="text" value={point4} onChange={(e) => setPoint4(e.target.value)} className="admin-input" name="point4" placeholder="point4" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">point5</p>
                <input type="text" value={point5} onChange={(e) => setPoint5(e.target.value)} className="admin-input" name="point5" placeholder="point5" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">point6</p>
                <input type="text" value={point6} onChange={(e) => setPoint6(e.target.value)} className="admin-input" name="point6" placeholder="point6" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">Length</p>
                <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="admin-input" name="length" placeholder="Length in CM" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">Width</p>
                <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="admin-input" name="width" placeholder="Width in CM" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">Height</p>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="admin-input" name="width" placeholder="Height in CM" />
                </div>
                <div className="admin-style-div">
                <p className="admin-title">Weight</p>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="admin-input" name="width" placeholder="Weight in KG" />
                </div>
                </div>
                <button onClick={adminSubmit} className="admin-submit-btn">{loadings?"Uploading...":"Submit"}</button>
                <ToastContainer/>
            </div>
        </>
    )
}

export default Admin