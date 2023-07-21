import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './delivery.css'
import Autocomplete from '@mui/material/Autocomplete';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useLocation} from 'react-router-dom'

export default function Delivery() {
    const navigate = useNavigate()
    const location = useLocation()
    const toastOptions = {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [product, setProduct] = React.useState()
    const [phone, setPhone] = React.useState("")
    const [name, setName] = React.useState("")
    const [mobile, setMobile] = React.useState("")
    const [pin, setPin] = React.useState("")
    const [locality, setLocality] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [city, setCity] = React.useState("")
    const [state, setState] = React.useState("")
    const [landmark, setLandmark] = React.useState("")
    const [userAddress, setUserAddress] = React.useState()
    const [selectedAddress, setSelectedAddress] = React.useState("");
    const [loading,setLoading] = React.useState(false)
    // const [token,setToken] = React.useState()
    // const [orderId,setOrderId] = React.useState()
    // const [shipmentId,setShipmentId] = React.useState()
    React.useEffect(() => {
        const userid = localStorage.getItem("id")
        axios.get(`https://gkdback.onrender.com/backend/user/user-address-find/${userid}`).then((res) => {
            setUserAddress(res.data)
        })
    }, [])
    let search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("q")
    React.useEffect(() => {
        axios.get(`https://gkdback.onrender.com/backend/api/product/${id}`)
            .then(response => {
                setProduct(response.data)
            }
            )
    }, [id]);
    const top100Films = [
        { label: 'Andhra Pradesh' },
        { label: 'Arunachal Pradesh' },
        { label: 'Assam' },
        { label: 'Bihar' },
        { label: 'Chhattisgarh' },
        { label: 'Goa' },
        { label: 'Gujarat' },
        { label: 'Haryana' },
        { label: 'Himachal Pradesh' },
        { label: 'Jharkhand' },
        { label: 'Karnataka' },
        { label: 'Kerala' },
        { label: '	Madhya Pradesh' },
        { label: 'Maharashtra' },
        { label: 'Manipur' },
        { label: 'Meghalaya' },
        { label: 'Mizoram' },
        { label: 'Nagaland' },
        { label: 'Odisha' },
        { label: 'Punjab' },
        { label: 'Rajasthan' },
        { label: 'Sikkim' },
        { label: 'Tamil Nadu' },
        { label: 'Telangana' },
        { label: 'Tripura' },
        { label: 'Uttar Pradesh' },
        { label: 'Uttarakhand' },
        { label: 'West Bengal' },
        { label: 'Andaman and Nicobar Island' },
        { label: 'Chandigarh' },
        { label: 'Dadra and Nagar Haveli and Daman and Diu' },
        { label: 'Delhi' },
        { label: 'Ladakh' },
        { label: 'Lakshadweep' },
        { label: 'Jammu and Kashmir' },
        { label: 'Puducherry' },

    ];
    const handleAutoChange = (event, value) => {
        setState(value && value.label);
    };
    const initPayment = (data) => {
        const options = {
            key: "rzp_live_aPNNDXtHz8zZEY",
            amount: 1,
            currency: data.currency,
            name: product.title,
            description: "Test Transaction",
            image: product.image1,
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyUrl = "https://gkdback.onrender.com/backend/payment/verify";
                    const { data } = await axios.post(verifyUrl, response);
                    const imageData = location.state.image.map((item)=>{
                        return(item.originFileObj.name)
                    })
                    const orderData = {
                        userId:localStorage.getItem("id"),
                        productId:params.get("q"),
                        productCode:product.code,
                        razorpayId:response.razorpay_payment_id,
                        userNumber:selectedAddress==="newAddress"?mobile:selectedAddress.mobile,
                        userAddress:selectedAddress==="newAddress"?address:selectedAddress.address,
                        productAmount:1,
                        image:imageData,
                        name:location.state.name,
                        areaCode:selectedAddress==="newAddress"?pin:selectedAddress.pin,
                    }
                    if(data.message==="Payment verified successfully"){
                        location.state.image.map((item)=>{
                            const parsedData1={
                              image:item.originFileObj
                            }
                            axios.post('https://gkdback.onrender.com/backend/aws/userImage',parsedData1,{headers:{'Content-Type':'multipart/form-data'}})
                          })
                        setLoading(true)
                    axios.post('https://gkdback.onrender.com/backend/order/order-add',orderData).then((res)=>{
                    }).catch((err)=>{
                        console.log(err,"Error from backend");
                    })
                   
                    const uniqueNumber = Date.now() + Math.floor(Math.random() * 1000);
                    axios.get("https://gkdback.onrender.com/backend/payment/ship-verified").then((res)=>{
                        const parsedData = {
                            "order_id":uniqueNumber,
                            "order_date": new Date().toLocaleString(),
                            "pickup_location": "Store",
                            "channel_id": "",
                            "comment": "",
                            "reseller_name": "",
                            "company_name": "",
                            "billing_customer_name":selectedAddress==="newAddress"?name:selectedAddress.name,
                            "billing_last_name": selectedAddress==="newAddress"?name:selectedAddress.name,
                            "billing_address": selectedAddress==="newAddress"?address:selectedAddress.address,
                            "billing_address_2": "",
                            "billing_city": selectedAddress==="newAddress"?city:selectedAddress.city,
                            "billing_pincode": parseInt(selectedAddress==="newAddress"?pin:selectedAddress.pin),
                            "billing_state": selectedAddress==="newAddress"?state:selectedAddress.state,
                            "billing_country": "India",
                            // "billing_email": "ravi@gmail.com",
                            "billing_phone": parseInt(selectedAddress==="newAddress"?mobile:selectedAddress.mobile),
                            "billing_alternate_phone":"",
                            "shipping_is_billing": true,
                            "shipping_customer_name": "",
                            "shipping_last_name": "",
                            "shipping_address": "",
                            "shipping_address_2": "",
                            "shipping_city": "",
                            "shipping_pincode": "",
                            "shipping_country": "",
                            "shipping_state": "",
                            "shipping_email": "",
                            "shipping_phone": "",
                            "order_items": [
                                {
                                    "name": product && product.title,
                                    "sku": product && product.code,
                                    "units": 1,
                                    "selling_price": 1,
                                    "discount": "",
                                    "tax": "",
                                    "hsn": ""
                                }
                            ],
                            "payment_method": "Prepaid",
                            "shipping_charges": "",
                            "giftwrap_charges": "",
                            "transaction_charges": "",
                            "total_discount": "",
                            "sub_total": 1,
                            "length": 10,
                            "breadth": 20,
                            "height": 20,
                            "weight": 1
                        }
                       const token = res.data.token
                        axios.post('https://gkdback.onrender.com/backend/payment/ship-order', {parsedData, token}).then((res)=>{
                            const userOrder = {
                                id:product && product._id,
                                image:product && product.image1,
                                qty:1,
                                rate:product && product.rate,
                                title:product && product.title,
                                orderId:res.data.order_id,
                                shipmentId:res.data.shipment_id
                            }
                            setLoading(false)
                            axios.post(`https://gkdback.onrender.com/backend/user/user-order-add/${localStorage.getItem("id")}`,userOrder).then((res)=>{
                                navigate('/order')
                            }).catch((error)=>{
                                console.log("Not Added To User",error)
                            })
                          }).catch((err)=>{
                            console.log("error While adding",err)
                          })
                    }).catch((err)=>{
                        console.log("error while ship sign",err)
                    })

                }else{
                    setLoading(false)
                    console.log("Not Verified")
                }
                   
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    const handleNewAddressClick = async () => {
        if (name === "") {
            toast.error(
                "Please insert your name.",
                toastOptions
            );
        } else if (mobile === "") {
            toast.error(
                "Please insert your mobile.",
                toastOptions
            )
        } else if (pin === "") {
            toast.error(
                "Please insert your pin.",
                toastOptions
            )
        } else if (locality === "") {
            toast.error(
                "Please insert your locality.",
                toastOptions
            )
        } else if (address === "") {
            toast.error(
                "Please insert your address.",
                toastOptions
            )
        } else if (mobile.length !== 10) {
            toast.error(
                "Please insert a valid number.",
                toastOptions
            )
        } else if (state === "") {
            toast.error(
                "Please insert your state.",
                toastOptions
            )
        } else if (city === "") {
            toast.error(
                "Please insert your city.",
                toastOptions
            )
        } else if (landmark === "") {
            toast.error(
                "Please insert your landmark.",
                toastOptions
            )
        } else {
            setLoading(true)
            const data = {
                name, mobile, pin, state, locality, city, phone, address, landmark
            }
            const userid = localStorage.getItem("id")
            axios.post(`https://gkdback.onrender.com/backend/user/user-address-add/${userid}`, data).then((res) => {
            }).catch(error => {
                console.log(error)
            })
            try {
                const orderUrl = "https://gkdback.onrender.com/backend/payment/order";
                const { data } = await axios.post(orderUrl, { amount: 1 });
                initPayment(data.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false)
        }
    }

    const handleBuyClick = async() => {
        setLoading(true)
        try {
            const orderUrl = "https://gkdback.onrender.com/backend/payment/order";
            const { data } = await axios.post(orderUrl, { amount: 1 });
            initPayment(data.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    console.log(location.state.image)
    return (
        <>
            <div className="delivery">
                {loading?<Box className='loading' sx={{ display: 'flex' }}>
                    <CircularProgress className='circular-loading'  />
                </Box>:""}
                
                <div className="delivery-container">
                    <p className="delivery-title">Delivery Address</p>
                    {userAddress && userAddress.map((address, key) => (
                        <div key={address.id}>
                            <input
                                type="radio"
                                name="address"
                                value={address}
                                checked={selectedAddress === address}
                                onChange={(e) => setSelectedAddress(address)}
                            />
                            <label className="label">{address.name} {address.mobile}
                                <p className="label-address">{address.address} {address.state}-{address.pin}</p>
                            </label>

                            <div className={selectedAddress === address ? "delivery-cancel" : "hide"}>
                                <button onClick={handleBuyClick} className="deliver-btn">DELIVERY HERE</button>
                                <button className="cancel-btn">CANCEL</button>

                            </div>
                            <hr className="line" />
                        </div>
                    ))}
                    <input
                        type="radio"
                        name="address"
                        value="newAddress"
                        checked={selectedAddress === "newAddress"}
                        onChange={(e) => setSelectedAddress("newAddress")}
                    />
                    <label><span className='delivery-add-address'>ADD A NEW ADDRESS</span></label>

                    <div className={selectedAddress === "newAddress" ? "delivery-flex" : "hide"}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="filled-basic" value={name} onChange={(e) => setName(e.target.value)} label="name" variant="filled" />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField type="number" id="filled-basic" value={mobile} onChange={(e) => setMobile(e.target.value)} label="10-digit mobile nimber" variant="filled" />
                        </Box>
                    </div>
                    <div className={selectedAddress === "newAddress" ? "delivery-flex" : "hide"}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField type="number" id="filled-basic" value={pin} onChange={(e) => setPin(e.target.value)} label="Pin Code" variant="filled" />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="filled-basic" value={locality} onChange={(e) => setLocality(e.target.value)} label="Locality" variant="filled" />
                        </Box>
                    </div>
                    <Box
                        className={selectedAddress === "newAddress" ? "delivery-flex" : "hide"}
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '98%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="filled-basic" value={address} onChange={(e) => setAddress(e.target.value)} label="Addresss" variant="filled" />
                    </Box>
                    <div className={selectedAddress === "newAddress" ? "delivery-flex" : "hide"}>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="filled-basic" value={city} onChange={(e) => setCity(e.target.value)} label="City/District/Town" variant="filled" />
                        </Box>
                        <Autocomplete
                            className={selectedAddress === "newAddress" ? "delivery-flex" : "hide"}
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            onChange={handleAutoChange}
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            renderInput={(params) => <TextField id="filled-basic" {...params} label="State" />}
                        />
                    </div>

                    <div className={selectedAddress === "newAddress" ? "delivery-flex" : "hide"}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="filled-basic" value={landmark} onChange={(e) => setLandmark(e.target.value)} label="Landmark" variant="filled" />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField type="number" id="filled-basic" value={phone} onChange={(e) => setPhone(e.target.value)} label="Alt. Phone" variant="filled" />
                        </Box>
                    </div>
                    <div className={selectedAddress === "newAddress" ? "delivery-cancel" : "hide"}>
                        <button onClick={handleNewAddressClick} className="deliver-btn">SAVE AND DELIVERY HERE</button>
                        <button className="cancel-btn">CANCEL</button>
                    </div>
                    <ToastContainer />
                </div>
            </div>

        </>
    );
}