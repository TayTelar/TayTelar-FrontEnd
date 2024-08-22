import category1 from '../../assets/images/category1.webp'
import category2 from '../../assets/images/category2.webp'
import category3 from '../../assets/images/category3.webp'
import category4 from '../../assets/images/category4.webp'
import category5 from '../../assets/images/category5.webp'
import prod1 from '../../assets/images/prod1.webp'
import prod11 from '../../assets/images/prod11.webp'
import prod2 from '../../assets/images/prod2.webp'
import prod22 from '../../assets/images/prod22.webp'
import prod3 from '../../assets/images/prod3.webp'
import prod33 from '../../assets/images/prod33.webp'
import prod4 from '../../assets/images/prod4.avif'
import prod44 from '../../assets/images/prod44.webp'
import prod5 from '../../assets/images/prod5.webp'
import prod55 from '../../assets/images/prod55.webp'
import prod6 from '../../assets/images/prod6.webp'
import prod66 from '../../assets/images/prod66.webp'
import '../../assets/sass/pages/_home.scss'
import img from '../../assets/images/Screenshot (2).png'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../../assets/images/banner_image1.webp'
import banner2 from '../../assets/images/banner_image2.webp'
import banner3 from '../../assets/images/banner_image3.webp'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='home'>
            <div className="home_container">
                <div className="home_container_section">

                    <Carousel
                        showThumbs={false}
                        showStatus={false}
                        infiniteLoop={true}
                        autoPlay={true}
                        interval={4000}
                        renderArrowPrev={(onClickHandler, hasPrev, label) =>
                            hasPrev && (
                                <button type="button" onClick={onClickHandler} className="carousel-prev">
                                    <ArrowBackIosSharpIcon />
                                </button>
                            )
                        }
                        renderArrowNext={(onClickHandler, hasNext, label) =>
                            hasNext && (
                                <button type="button" onClick={onClickHandler} className="carousel-next">
                                    <ArrowForwardIosSharpIcon />
                                </button>
                            )
                        }
                    >
                        <div className='banner1'>
                            <img src={banner1} alt="Banner 1" />
                            <div className="content">
                                <h4>Quick parcel delivery, 
                                    <span className="text-primary"> from $25</span>
                                </h4>
                                <h1>
                                    New Season Women’s Fashion
                                    <br />
                                    Up to 70% off now!
                                </h1>
                                <Link to={"/aboutus"}>
                                <button>Start Shopping <NavigateNextSharpIcon /></button>
                                </Link>
                            </div>

                        </div>
                        <div className='banner2'>
                            <img src={banner2} alt="Banner 2" />
                            <div className="content">
                                <h4>Quick parcel delivery, 
                                    <span className="text-primary"> from $25</span>
                                </h4>
                                <h1>
                                    Cover Up! Spring is coming
                                    <br />
                                    Extra 40% off now.
                                </h1>
                                <Link to={"/aboutus"}>
                                <button>Start Shopping <NavigateNextSharpIcon /></button>
                                </Link>
                            </div>

                        </div>
                        <div className='banner3'>
                            <img src={banner3} alt="Banner 3" />
                            <div className="content">
                                <h4>Quick parcel delivery, 
                                    <span className="text-primary"> from $25</span>
                                </h4>
                                <h1>
                                    Everyone’s Talking About
                                    <br />
                                    Collection AW 2020.
                                </h1>
                                <Link to={"/aboutus"}>
                                <button>Start Shopping <NavigateNextSharpIcon /></button>
                                </Link>
                            </div>

                        </div>
                    </Carousel>


                    {/* category section */}

                    <div className="home_container_section_category">
                        <div className="heading">
                            <h3>Shop by Categories</h3>
                            <p>Top categories in this week</p>
                        </div>
                        <div className="items">
                            <div className="item1">
                                <img src={category1} alt="" width='auto' height='auto' />
                                <div className="details">
                                    <p>Accessories</p>
                                    <span>(17 Items)</span>
                                </div>
                                <div className="hover-overlay"></div>
                            </div>
                            <div className="item2">
                                <img src={category2} alt="" />
                                <div className="details">
                                    <p>Shoes</p>
                                    <span>(6 Items)</span>
                                </div>
                            </div>
                            <div className="item3">
                                <img src={category3} alt="" />
                                <div className="details">
                                    <p>Mens</p>
                                    <span>(17 Items)</span>
                                </div>
                            </div>
                            <div className="item4">
                                <img src={category4} alt="" />
                                <div className="details">
                                    <p>Womens</p>
                                    <span>(17 Items)</span>
                                </div>
                            </div>
                            <div className="item5">
                                <img src={category5} alt="" />
                                <div className="details">
                                    <p>Womens</p>
                                    <span>(17 Items)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* product section */}

                    <div className="home_container_section_product">
                        <div className="heading">
                            <h3>Trending Products</h3>
                            <p>Top view in this week</p>
                        </div>
                        <div className="product_container">
                            <div className="products">
                                <div className="product1">
                                    <img src={prod1} alt="" className='img1' />
                                    <img src={prod11} alt="" className='img2' />
                                </div>
                                <div className="details">
                                    <h3>Petit Piqué Backpack</h3>
                                    <p>$79.00</p>
                                </div>
                            </div>
                            <div className="products">
                                <div className="product2">
                                    <img src={prod2} alt="" className='img1' />
                                    <img src={prod22} alt="" className='img2' />


                                </div>
                                <div className="details">
                                    <h3>Black Silicone Strap</h3>
                                    <p>$79.00</p>
                                </div>
                            </div>

                            <div className="products">
                                <div className="product3">
                                    <img src={prod3} alt="" className='img1' />
                                    <img src={prod33} alt="" className='img2' />



                                </div>
                                <div className="details">
                                    <h3>Gabardine Bermuda Shorts</h3>
                                    <p>$79.00</p></div>
                            </div>

                            <div className="products">
                                <div className="product4">
                                    <img src={prod4} alt="" className='img1' />
                                    <img src={prod44} alt="" className='img2' />
                                </div>
                                <div className="details"><h3>Crew Neck T-shirt</h3>
                                    <p>$79.00</p></div>
                            </div>

                            <div className="products">
                                <div className="product5">
                                    <img src={prod5} alt="" className='img1' />
                                    <img src={prod55} alt="" className='img2' />

                                </div>
                                <div className="details">
                                    <h3>Checked Cotton Shirt</h3>
                                    <p>$79.00</p>
                                </div>
                            </div>

                            <div className="products">
                                <div className="product6">
                                    <img src={prod6} alt="" className='img1' />
                                    <img src={prod66} alt="" className='img2' />

                                </div>
                                <div className="details">
                                    <h3>Oversize Cotton Polo</h3>
                                    <p>$79.00</p>
                                </div>
                            </div>

                            <div className="products">
                                <div className="product7">
                                    <img src={prod5} alt="" className='img1' />
                                    <img src={prod55} alt="" className='img2' />

                                </div>
                                <div className="details">
                                    <h3>Petit Piqué Backpack</h3>
                                    <p>$79.00</p>
                                </div>
                            </div>

                            <div className="products">
                                <div className="product8">
                                    <img src={prod3} alt="" className='img1' />
                                    <img src={prod33} alt="" className='img2' />

                                </div>
                                <div className="details">
                                    <h3>Oversize Cotton Polo</h3>
                                    <p>$79.00</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <img src={img} alt="" />
                    {/*news letter */}
                    <div className="newsletter">
                        <div className="newsletter_container">
                            <div className="newsletter_container_section">
                                <div className="heading">
                                    <h3>Subcribe To Our Newsletter</h3>
                                    <span>Sign up for the weekly newsletter and build better ecommerce stores.</span>
                                </div>
                                <form>
                                    <div className="input_form">
                                        <input type="email" placeholder='Your email address...' />
                                        <span>
                                            <button type='submit'>Subscribe</button>
                                        </span>
                                    </div>
                                </form>
                                <p>We respect your privacy, so we never share your info.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home