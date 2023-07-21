import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Link,useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    const [user, setUser] = useState(false)
    const [value, setValue] = useState(1)
    function siteClick() {
        window.scrollTo(0, 0);
    }
    const [inpValue, setInpValue] = useState()
    const name = localStorage.getItem('name')
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }
    const userId = localStorage.getItem('id')

    useEffect(() => {
        if (userId !== null) {
            async function fetchData() {
                await axios.get(`https://gkdback.onrender.com/backend/user/user-cart/${userId}`).then((res) => {
                    setProduct(res.data)
                });
            }
            fetchData()
        }
    }, [userId]);


    useEffect(() => {
        if (name !== null) {
            setUser(true);
        } else {
            setUser(false);
        }
    }, [name]);
    const handleProductChange = (event, newValue) => {
        setInpValue(newValue);
      };
    //   const searchClick = () =>{
    //     window.scrollTo(0,0)
    //     window.location.href = window.location.href;
    //   }
    const handleChange = () => {
        setValue(value+1)
        navigate(`/search-product?q=${inpValue && inpValue?inpValue.label:""}`,{state:{value:value}})
    }

    return (
        <>
            <div className="navbar">
                <div className="navbar-left">
                    <Link onClick={siteClick} className="page-link" to="/">
                        <img className="navbar-logo" src={require('../Photos/logo.png')} alt="logo" />
                    </Link>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        onChange={handleProductChange}
                        options={allProducts}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Search Your Product" />}
                    />
                    <div onClick={handleChange} >
                    <img className='navbar-search' src={require('../Photos/search.png')} alt="serach" />
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="navbar-delivery-container">
                        <img className="navbar-delivery" src={require('../Photos/delivery.png')} alt="delivery" />
                        <div >
                            <p className="navbar-delivery-title">Delivery In </p>
                            <p className="navbar-delivery-day">24 Hours</p>
                        </div>
                    </div>
                    <div className="navbar-profile-container">
                        <img className="navbar-avatar" src={require('../Photos/user.png')} alt="Avatar" />
                        <div className="navbar-user-login" >
                            {user ? <div className="user-name-container">
                                <p className="user-name"><div className="profileClick">
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                {name}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}><Link className='menue-link' to="/order">Order</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link className='menue-link' to="/cart">Cart</Link></MenuItem>
                <MenuItem onClick={handleLogout} >Logout</MenuItem>
              </Menu>
            </div></p>
                                <button onClick={handleLogout} className="log-sign-btn">Logout</button>
                            </div> : <Link onClick={siteClick} to="/user-login"><button className="log-sign-btn">login/signup</button></Link>}
                        </div>
                    </div>
                    <Link onClick={siteClick} className="link-tag" to="/cart">
                        <div className='navbar-cart-container'>
                            <div className='navbar-mobile-number'>
                            <img className="navbar-cart" src={require('../Photos/cart.png')} alt="cart" />
                            <p className="navbar-cart-mobile">{product.length}</p>
                            </div>
                            <div>
                            
                                <p className='navbar-cart-title'>Cart</p>
                                <p className='navbar-delivery-day'>{product.length} items</p>

                            </div>

                        </div>
                    </Link>

                </div>
            </div>
            <div className="navbar-bottom-section">

                <div className="navbar-bottom-home">
                    <Link onClick={siteClick} className="page-link" to="/">
                        <img className="navbar-home" src={require('../Photos/home.png')} alt="Home" /> </Link>
                    <Link onClick={siteClick} className="page-link" to="/">
                        <p className="navbar-home-title">Home</p>
                    </Link>
                </div>

                <div className="navbar-bottom-delivery">
                    <img className="navbar-bottom-delivery" src={require('../Photos/delivery.png')} alt="delivery" />
                    <p className="navbar-bottom-delivery-title">Delivery in 24 Hours</p>
                </div>
                <div className="navbar-bottom-account">
                    <img className="navbar-bottom-account-image" src={require('../Photos/user.png')} alt="Avatar" />
                    {user ? <div className="user-name-container">
                        <p className="user-name"><div className="profileClick">
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                {name}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}><Link className='menue-link' to="/order">Order</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link className='menue-link' to="/cart">Cart</Link></MenuItem>
                <MenuItem onClick={handleLogout} >Logout</MenuItem>
              </Menu>
            </div></p>
                        <button onClick={handleLogout} className="log-sign-btn">Logout</button>
                    </div> : <Link onClick={siteClick} to="/user-login"><button className="log-sign-btn">login/signup</button></Link>}
                </div>
            </div>
        </>
    )
}

const allProducts = [
    { label: 'love' },
    { label: 'frame' },
    { label: 'sister' },
    { label: 'pendant' },
    { label: 'birthday' },
    { label: 'brother' },
    { label: 'clock' },
    { label: 'pillow' },
    { label: 'mother' },
    { label: 'family' },
    { label: 'neon' },
    { label: 'anniversary' },
    { label: 'friend' },
    { label: 'bottle' },
    { label: 'tshirt' },
    { label: 'acryclic' },
  ];
export default Navbar