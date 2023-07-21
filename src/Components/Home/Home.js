import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom'
import { responsive, cardData, cardDataMob } from './SliderData'
import axios from 'axios';
import './home.css'

function Home() {
    const [loading, setLoading] = useState(true)
    const [frames, setFrames] = useState([])
    const responsive2 = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1400 },
            items: 4,
            slidesToSlide: 1,
        },
        desktop: {
            breakpoint: { max: 1400, min: 800 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
        },
    }
    function siteClick() {
        window.scrollTo(0, 0);
    }
    const teams = cardData.map((item) => (
        <img className="front-poster" src={require(`../Photos/${item.img}`)} alt="poster" />
    ));

    const teams2 = cardDataMob.map((item) => (
        <img className="front-poster" src={require(`../Photos/${item.img}`)} alt="poster" />
    ));
    const offer = [
        <img className="offer-poster" src={require('../Photos/4.avif')} alt="Offer" />,
        <img className="offer-poster" src={require('../Photos/5.avif')} alt="Offer" />,
    ]

    useEffect(() => {
        async function fetchData() {
            await axios.get('https://gkdback.onrender.com/backend/api/all-product').then((res) => {
                setLoading(false);
                setFrames(res.data);
            });

        }
        fetchData()
    }, []);

        const filteredData =frames && frames.filter(item => !["6464cb5aec4aea582b639b2c", "6464cc5eec4aea582b639b2e", "6464d3a2ec4aea582b639b3a", "6464d474ec4aea582b639b3c","6464d52cec4aea582b639b3e","6465c9ab6183fc317c0f758b","6465ca856183fc317c0f758d","6465cb396183fc317c0f758f","6465cda66183fc317c0f7593","6467478f3216f9e3b4fde157","646748313216f9e3b4fde159","646748b43216f9e3b4fde15b","646749133216f9e3b4fde15d","6467496b3216f9e3b4fde15f","646749d23216f9e3b4fde161","6482f9a5ba06b4a692bc2e3b","6482fbbcba06b4a692bc2e3d","6482fd49ba06b4a692bc2e55","64830417ba06b4a692bc2ebb","648304fcba06b4a692bc2ec3","6483068cba06b4a692bc2ed4","64830ae8ba06b4a692bc2ede","6486d0175e7bdd787941f3e7","6486d15b5e7bdd787941f3e9","6486aa95a3255a48017be0e5","6485c24a13aabfe6fcbaf22a","6485c31313aabfe6fcbaf22c","6485bbe313aabfe6fcbaf222","6485bcc113aabfe6fcbaf224","6485b1bd13aabfe6fcbaf214","6485b26b13aabfe6fcbaf216","648422402c3425eb44e98da1","64841fe42c3425eb44e98d87","64841e2d2c3425eb44e98d7b","64841bed2c3425eb44e98d76","648403c2c6ee5cffef60ac2e","648404aac6ee5cffef60ac30","64833c77e96679dbe08b5eb1","64833d23e96679dbe08b5eb3","64833a96e96679dbe08b5ead","648332a3e96679dbe08b5e9d","6485b9de13aabfe6fcbaf21e","648418a32c3425eb44e98d54"].includes(item.id));
return (
    <>
        <div className="home">
            <Carousel
                className='home-carousel'
                showDots={true}
                infinite={true}
                responsive={responsive}
                autoPlay={true}
                arrows={false}
            >

                {teams}
            </Carousel>

            <Carousel
                className='home-carousel-mobile'
                showDots={true}
                infinite={true}
                responsive={responsive}
                autoPlay={true}
                arrows={false}
            >

                {teams2}
            </Carousel>
            <div className="home-category">
                <Link onClick={siteClick} className="link2" to="/customized-gifts?q=frame">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/gifts.png')} alt="Gifts" />
                        <p className="home-category-title">FRAMES</p>
                    </div>
                </Link>
                <Link onClick={siteClick} className="link2" to="/customized-gifts?q=cushion">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/cushions.png')} alt="Gifts" />

                        <p className="home-category-title">PHOTO CUSHIONS</p>

                    </div>
                </Link>
                <Link onClick={siteClick} className="link2" to="/customized-gifts?q=bottle">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/bottle.png')} alt="Gifts" />
                        <p className="home-category-title">BOTTLE</p>
                    </div>
                </Link>
                <Link onClick={siteClick} className="link2" to="/customized-gifts?q=bangle">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/bangles.png')} alt="Gifts" />
                        <p className="home-category-title">PHOTO BANGLES</p>
                    </div>
                </Link>
                <Link onClick={siteClick} className="link2" to="/customized-gifts?q=neon">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/neon.png')} alt="Gifts" />
                        <p className="home-category-title">NEON LIGHTS</p>
                    </div>
                </Link>
                <Link onClick={siteClick} className="link2" to="/customized-gifts?q=lamp">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/lamp.png')} alt="Gifts" />
                        <p className="home-category-title">PHOTO LAMPS</p>
                    </div>
                </Link>
                <Link onClick={siteClick} className="link2" to="/customized-gifts?q=keyring">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/keyring.png')} alt="Gifts" />
                        <p className="home-category-title">KEY RINGS</p>
                    </div>
                </Link>
                <Link onClick={siteClick} className="link2" to="/customized-gifts?q=tshirt">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/tshirts.png')} alt="Gifts" />
                        <p className="home-category-title">T-SHIRTS</p>
                    </div>
                </Link>
                <Link onClick={siteClick} className="link2" to="/customized-gifts?q=clock">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/clock.png')} alt="Gifts" />
                        <p className="home-category-title">CLOCKS</p>
                    </div>
                </Link>
                
                <Link onClick={siteClick} className="link2" to="/customized-gifts?q=cup">
                    <div className="home-category-item">
                        <img className="home-category-image" src={require('../Photos/customized.png')} alt="Gifts" />
                        <p className="home-category-title">CUSTOMIZED GIFTS</p>
                    </div>
                </Link>
            </div>
            <div className="home-offer">
            <Link onClick={siteClick} className="link4" to="/customized-gifts?q=birthday">
                <img className="home-offer-image" src={require('../Photos/birthday.jpg')} alt="Birthday offer" />
                </Link>
                <Link onClick={siteClick} className="link4" to="/customized-gifts?q=bottle">
                <img className="home-offer-image" src={require('../Photos/best-seller.jpg')} alt="Bestseller" />
                </Link>
                <Link onClick={siteClick} className="link4" to="/customized-gifts?q=anniversary">
                <img className="home-offer-image" src={require('../Photos/anniversary-card.jpg')} alt="Anniversary card" />
                </Link>
                <Link onClick={siteClick} className="link4" to="/customized-gifts?q=birthday">
                <img className="home-offer-image" src={require('../Photos/family.jpg')} alt="deals card" />
                </Link>
            </div>
            <div className="offer-carousel">
                <Carousel
                    className='offer-carousel-image'
                    showDots={false}
                    infinite={true}
                    responsive={responsive}
                    autoPlay={true}
                    arrows={false}
                >
                    {offer}
                </Carousel>
            </div>


            <div className="page-title">
                <p className="page-title-heading">Personalized Gifts</p>
                <Link onClick={siteClick} className="page-link" to="/customized-gifts?q=gift">
                    <p className="page-title-view">VIEW ALL</p>
                </Link>
            </div>

                <Carousel
                    className='react-carousel'
                    showDots={false}
                    infinite={false}
                    responsive={responsive2}
                    autoPlay={false}
                    arrows={true}
                >   
                
                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/persomug.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Mugs</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=cup">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>
                

                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/persocushion.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Cushion</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=cushion">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/persoframe.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Photo Frames</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=frame">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/perolamp.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Lamps</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=light">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/persomug.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Mugs</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=cup">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>
                

                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/persocushion.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Cushion</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=cushion">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/persoframe.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Photo Frames</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=frame">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/perolamp.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Lamps</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=light">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>
            
                </Carousel>

                <div className="page-title">
                <p className="page-title-heading">Customized Gifts</p>
                <Link onClick={siteClick} className="page-link" to="/customized-gifts?q=gift">
                    <p className="page-title-view">VIEW ALL</p>
                </Link>
            </div>
            {/* <div className="personalised-gift-container"> */}

                <Carousel
                    className='react-carousel'
                    showDots={false}
                    infinite={false}
                    responsive={responsive2}
                    autoPlay={false}
                    arrows={true}
                >   
                
                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/persomug.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Mugs</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=cup">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>
                

                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/persocushion.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Cushion</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=cushion">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/persoframe.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Photo Frames</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=frame">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/perolamp.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Lamps</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=light">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/persomug.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Mugs</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=cup">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>
                

                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/persocushion.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Cushion</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=cushion">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/persoframe.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Photo Frames</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=frame">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className='personalised-gift-item'>
                    <img className='premium-gift-image' src={require('../Photos/perolamp.webp')} alt="Gifts" />
                    <div className='gift-inside-card-left'>
                        <div>
                            <p className='premium-gift-heading'>Lamps</p>
                            <p className='personalised-gift-new-rate'>Starting from ₹ 499 </p>
                        </div><div>
                            <Link onClick={siteClick} className="link3" to="/customized-gifts?q=light">
                                <p className='gift-inside-card-arrow'>➞</p>
                            </Link>
                        </div>
                    </div>
                </div>
            
                </Carousel>
            {/* </div> */}
            <div className='for-him-her'>
                <Link onClick={siteClick} className="link" to="/customized-gifts?q=love">
                    <img className='for-him-her-image' src={require('../Photos/forher.jpg')} alt="For Her Gifts" />
                </Link>
                <Link onClick={siteClick} className="link" to="/customized-gifts?q=love">
                    <img className='for-him-her-image' src={require('../Photos/forhim.jpg')} alt="For Him Gifts" />
                </Link>
            </div>
            <div className="page-title page-title-2">
                <p className="page-title-heading">Corporate Gifts</p>
               
            </div>
            <div className='premium-gift-container'>
                {loading ? "Loading......" : filteredData && [...filteredData].reverse().slice(-12).map((product) =>
                    <Link onClick={siteClick} className='premium-gift-item' to={`/selected-product?q=${product.id}`}>
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
            <div className="page-title page-title-2">
                <p className="page-title-heading">All Products</p>
                {/* <Link onClick={siteClick} className="link" to="/customized-gifts?q=light">
                    <p className="page-title-view">VIEW ALL</p>
                </Link> */}
            </div>

            <div className='premium-gift-container'>
                {loading ? "Loading......" : filteredData && [...filteredData].reverse().map((product) =>
                    <Link onClick={siteClick} className='premium-gift-item' to={`/selected-product?q=${product.id}`}>
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
           <div className='home-about'>
                <div className='home-about-item'>
                    <img className="home-about-image" src={require('../Photos/milion-people.png')} alt="Services" />
                    <p className="home-about-title">Safe & Hygienic<br /><span className="span-down">Gifts</span></p>
                </div>
                <div className='home-about-item'>
                    <img className="home-about-image" src={require('../Photos/delivery2.png')} alt="Services" />
                    <p className="home-about-title">Delivery In 700+<br /><span className="span-down">Cities</span></p>
                </div>
                <div className='home-about-item'>
                    <img className="home-about-image" src={require('../Photos/gift.png')} alt="Services" />
                    <p className="home-about-title">20 Million People<br /><span className="span-down">Trust Us</span></p>
                </div>
                <div className='home-about-item'>
                    <img className="home-about-image" src={require('../Photos/address.png')} alt="Services" />
                    <p className="home-about-title">18000+ Pincodes<br /><span className="span-down">Serviced Till Date</span></p>
                </div>
            </div>
        </div>
    </>
)
}

export default Home