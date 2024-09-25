import { useState, useEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import Slider from "react-slick";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { CustomPrevArrow, CustomNextArrow } from "./customArrows";
import image1 from "../../assets/images/pant1.webp";
import image2 from "../../assets/images/pant5.webp";
import image3 from "../../assets/images/pant2.webp";
import image4 from "../../assets/images/pant3.jpg";
import image5 from "../../assets/images/pant4.jpg";
import "../../assets/sass/pages/_productInfo.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from "./Product";
import { useReviews } from "./contexts/ReviewContext";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Breadcrumbs from "../../components/breadcrumb/Breadcrumbs";
import ImageModal from "./ImageModal";


const images = [image1, image2, image3, image4, image5];
const colors: string[] = ["black", "white", "grey", "blue"];
const sizes: string[] = ["30", "32", "34", "36"];
const limitedSize = "34";
const ProductInfo = () => {
  const location = useLocation(); 
  const params = new URLSearchParams(location.search);
  const exchange = params.get('exchange') === 'true';
  console.log(exchange); // Access location to get query parameters

  const [price, setPrice] = useState<number>(2675);
  
    useEffect(() => {
      // Scroll to the top of the page when the component mounts
      window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
      // Check if the price should be Rs. 0 based on query parameters or state
      const params = new URLSearchParams(location.search);
      if (params.get('exchange') === 'true') {
        setPrice(0);
      } else {
        setPrice(2675);
      }
    }, [location.search]);
  
const breadcrumbData = [{ label: "Home", path: "/" }, { label: "Shop",path:"/shop" },{label:"Blog",path:'/'},{label:"Contact Us",path:'/contactUs'}];

  const { reviews, averageRating } = useReviews();
  const [_rating, setRating] = useState<number>(averageRating);
  const navigate=useNavigate();
  useEffect(() => {
    setRating(averageRating); // Update local state when context changes
  }, [averageRating]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there is a fractional part
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <StarRoundedIcon key={`full-${i}`} className="star-inner" />
        ))}
        {hasHalfStar && <StarHalfIcon key="half" className="star-inner" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarBorderIcon key={`empty-${i}`} className="star-inner" />
        ))}
      </>
    );
  };

  const [activeImage, setActiveImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>("grey");
  const [selectSize, setselectSize] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const [animationClass, setAnimationClass] = useState<string>("slide-active");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  

  
  const handleImageChange = (index: number) => {
    if (index !== activeImage) {
      setAnimationClass("slide-out"); // Start slide out animation

      setTimeout(() => {
        setActiveImage(index); // Change the image
        setAnimationClass("slide-in"); // Start slide in animation
      }, 200); // Wait for slide-out to complete

      setTimeout(() => {
        setAnimationClass("slide-active"); // Reset to active state
      }, 200); // Wait for slide-in to complete
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className={`main-container ${isModalOpen ? "blur-background" : ""}`}>
      <div className="
      -crumbs">
      <Breadcrumbs crumbs={breadcrumbData}/>
      </div>
      
      <div className="secondary-container">
      
        <div className="slider-container">
          <Slider {...settings}>
            {images.map((image, index) => (
              <img
                src={image}
                key={index}
                alt={`Image ${index + 1}`}
                className={`stacked-images ${
                  activeImage === index ? "active" : ""
                }`}
                onClick={() => {handleImageChange(index);console.log(index)}}
              />
            ))}

            
          </Slider>
        </div>
        <div className="primary-image-container">
        <img
            src={images[activeImage]}
            alt="main-image"
            className={`primary-image ${animationClass}`}
            onClick={()=>{toggleModal(),console.log(activeImage)}}
          />

          
        </div>
        <div className="content">
        
          <h1 className="product-name">Came Stretch Pants</h1>
          <div className="star">
            {renderStars(averageRating)}
            <pre className="review">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </pre>
          </div>
          <div className="information">
            Most of us are familiar with the iconic design of the egg shaped
            chair floating in the air. The Hanging Egg Chair is a critically
            acclaimed design that has enjoyed praise world wide ever since the
            distinctive sculptural shape was created. The Hanging Egg Chair is a
            critically acclaimed design that has enjoyed praise world wide.
          </div>
          <div>
            <div className="header">
              Color :
              <span
                className="js-swatch-display-text"
                style={{ fontWeight: "400", marginLeft: "0.6rem" }}
              >
                {selectedColor}
              </span>
            </div>
            <div className="color-shade">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`color ${
                    selectedColor === color ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>
          <div className="price">
        <h4 className="rupees">Rs. {price}</h4>
        {price === 0 ? <h5 className="discount">Exchange Offer</h5>:<h5 className="discount">60% OFF</h5>}
            
          </div>
          <div className="Mrp">M.R.P. Incl. of all taxes</div>
          <div className="size">
            <span className="size-label">SELECT SIZE</span>
            <div className="size-num">
              {sizes.map((size) => (
                <div
                  key={size}

                  
                  className={`num ${selectSize === size ? "sizeselected" : ""}`}
                  onClick={() => setselectSize(size)}
                >
                  {size}
                  {size === limitedSize && (
                    <div className="limited-text">2 left</div>
                  )}
                </div>
              ))}
              <div className="num unavailable-size">
                <span className="crossed-size">38</span>
              </div>
            </div>
          </div>
          <div className="blocks">
            <div className="add-sub">
              <span
                className="sub"
                onClick={() =>
                  count !== 1 ? setCount(count - 1) : setCount(1)
                }
              >
                -
              </span>
              <span>{count}</span>
              <span className="add" onClick={() => setCount(count + 1)}>
                +
              </span>
            </div>
            <button className="cart" onClick={()=>{navigate('/cart')}}>
              <ShoppingBagOutlinedIcon className="shopping-bag" />
              ADD TO CART
            </button>
            <button className="buy" onClick={()=>{navigate("/checkout", { state: { exchange } })}}>BUY NOW</button>
          </div>
          <div className="info-container">
            <div className="info-item">
              <span className="info-label">Availability</span>
              <span className="info-value" style={{ color: "green" }}>
                In Stock
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Product Type</span>
              <span className="info-value">Stretch Pants</span>
            </div>
            <div className="info-item">
              <span className="info-label">Brand</span>
              <span className="info-value">Came</span>
            </div>
          </div>
        </div>
        <ImageModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          images={images}
          activeImage={activeImage} 
          
        />
      
        
      </div>
      

      <div className="video-container">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/Jg0X4OkKOd0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="product-info-container">
        <Product />
      </div>
    </div>
  );
};

export default ProductInfo;