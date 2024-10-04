import { useState, useEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import Slider from "react-slick";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { CustomPrevArrow, CustomNextArrow } from "./customArrows";
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
import SuccessModal from "../../components/modal/SuccessModal";
import ErrorModal from "../../components/modal/ErrorModal";
import axios from "axios";

const ProductInfo = () => {
  const breadcrumbData = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Blog", path: "/" },
    { label: "Contact Us", path: "/contactUs" },
  ];

  const { reviews, averageRating } = useReviews();
  const [_rating, setRating] = useState<number>(averageRating);

  const location = useLocation();
  const { product } = location.state || {};
  const video = product.video || {};
  const images: string[] = product.images ? Object.keys(product.images) : [];

  if (!product) {
    return <div>No product details available.</div>;
  }

  const [activeImage, setActiveImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [selectSize, setSelectSize] = useState<string>(sizes[0]);
  const [count, setCount] = useState<number>(1);
  const [animationClass, setAnimationClass] = useState<string>("slide-active");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

  const [colors, setColors] = useState<{
    colorCode: string; color: string, quantity: number
  }[]>([]);

  const [limitedSizeData, setLimitedSizeData] = useState<{ [key: string]: number }>({});
  const [selectedSizePrice, setSelectedSizePrice] = useState<number>(product.stockQuantityResponseList[0].productPrice);
  const [originalPrice, setOriginalPrice] = useState<number>(selectedSizePrice);

  useEffect(() => {
    setRating(averageRating);
  }, [averageRating]);

  const navigate = useNavigate();


  const navigateToCheckout = () => {
    const selectedProduct = {
      productID: product.productId,
      name: product.productName,
      color: selectedColor || colors[0]?.color,
      quantity: count,
      size: selectSize || sizes[0],
      price: selectedSizePrice,
      image: images[activeImage],
      originalPrice: originalPrice, 
    };
  
    const selectedProducts = [selectedProduct];
  
    const totalMRP = selectedProducts.reduce(
      (acc, item) => acc + item.originalPrice * item.quantity,
      0
    );
  
    const totalDiscount = selectedProducts.reduce(
      (acc, item) => acc + (item.originalPrice - item.price) * item.quantity,
      0
    );
  
    const totalAmount = selectedProducts.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  
    navigate("/checkout", {
      state: {
        selectedProducts,
        pricingDetails: {
          totalMRP: totalMRP.toFixed(2),
          totalDiscount: totalDiscount.toFixed(2),
          totalAmount: totalAmount.toFixed(2),
        },
      },
    });
  };
  

  const handleImageChange = (index: number) => {
    if (index !== activeImage) {
      setAnimationClass("slide-out");

      setTimeout(() => {
        setActiveImage(index);
        setAnimationClass("slide-in");
      }, 200);

      setTimeout(() => {
        setAnimationClass("slide-active");
      }, 200);
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectSize(size);
    
    const selectedSizeData = product.stockQuantityResponseList.find(
      (sizeData: any) => sizeData.size === parseInt(size)
    );
  
    if (selectedSizeData) {
      const availableColors = selectedSizeData.colorQuantityResponses.map(
        (colorData: any) => ({
          color: colorData.color,
          colorCode: colorData.colorCode,
          quantity: colorData.quantity,
        })
      );
      setColors(availableColors);
  
      const discountedPrice = selectedSizeData.productPrice;
      setSelectedSizePrice(discountedPrice);
  
      const offerPercentage = product.offerPercent || 0; 
      let originalPrice = discountedPrice;
  
      if (offerPercentage > 0) {
        originalPrice = discountedPrice / (1 - (offerPercentage / 100));
      }
  
      setOriginalPrice(parseFloat(originalPrice.toFixed(2)));
  
      const firstAvailableColor = availableColors.find(
        (colorData: { quantity: number }) => colorData.quantity > 0
      );
      setSelectedColor(firstAvailableColor ? firstAvailableColor.color : "");
    } else {
      setColors([]);
    }
  };
  
  

  useEffect(() => {
    if (product && product.stockQuantityResponseList) {
      const availableSizes = product.stockQuantityResponseList.map(
        (sizeData: any) => sizeData.size.toString()
      );

      setSizes(availableSizes);

      if (availableSizes.length > 0) {
        setSelectSize(availableSizes[0]);
        handleSizeChange(availableSizes[0]);
      }

      const limitedData: { [key: string]: number } = {};

      product.stockQuantityResponseList.forEach((sizeData: any) => {
        let totalQuantity = 0;

        sizeData.colorQuantityResponses.forEach((colorData: any) => {
          totalQuantity += colorData.quantity;
        });

        if (totalQuantity < 6) {
          limitedData[sizeData.size] = totalQuantity;
        }
      });
      setLimitedSizeData(limitedData);
    }
  }, [product]);

  
  const userId = localStorage.getItem("userId") ?? "";

  const getGuestCart = () => {
    const cart = localStorage.getItem("guestCart");
    return cart ? JSON.parse(cart) : [];
  };


  const updateGuestCart = (updatedCart: any) => {
    localStorage.setItem("guestCart", JSON.stringify(updatedCart));
  };

  const addToCart = async () => {
    const defaultSize = sizes[0] || "N/A";
    const defaultColor = colors[0]?.color || "N/A";
    const defaultColorCode = colors[0]?.colorCode || "#FFFFFF";

    const selectedSize = selectSize || defaultSize;
    const selectedColorCode = selectedColor
      ? colors.find((c) => c.color === selectedColor)?.colorCode
      : defaultColorCode;

    const cartItem = {
      cartItemId: "",
      productId: product.productId,
      productName: product.productName,
      productSize: selectedSize,
      productColor: selectedColor || defaultColor,
      productColorCode: selectedColorCode,
      quantity: count,
      price: selectedSizePrice,
      productOfferPercentage:product.offerPercent,
    };

    const guestCartItem = {
      ...cartItem,
      isChecked: true,
      originalPrice,
      description: product.productDescription,
      discount: product.offerPercent,
      image: images[0],
      cartItemId: Date.now().toString(),
    };

    if (userId) {
      const requestBody = {
        userId,
        cartItemRequests: [cartItem],
      };

      try {
        const response = await axios.post("http://localhost:8085/api/cart/addToCart", requestBody);
        if (response.data.statusCode === 200) {
          setIsSuccessModalOpen(true);
          console.log("Product added to cart successfully", response.data);
        } else {
          setIsErrorModalOpen(true);
        }
      } catch (error: any) {
        setIsErrorModalOpen(true);
        console.log("Couldn't add the product to cart", error);
      }
    } else {
      const guestCart = getGuestCart();
      guestCart.push(guestCartItem);
      updateGuestCart(guestCart);
      setIsSuccessModalOpen(true);
      console.log("Product added to guest cart",guestCart);
    }
  };

  const mergeCartAfterLogin = async () => {
    const guestCart = getGuestCart();

    if (guestCart.length === 0) return;

    const requestBody = {
      userId, 
      cartItemRequests: guestCart,
    };

    try {
      const response = await axios.post("http://localhost:8085/api/cart/addToCart", requestBody);
      if (response.data.statusCode === 200) {
        console.log("Cart merged successfully");
        localStorage.removeItem("guestCart");
      } else {
        console.log("Failed to merge guest cart");
      }
    } catch (error: any) {
      console.log("Error merging guest cart", error);
    }
  };

  useEffect(() => {
    if (userId) {
      mergeCartAfterLogin();
    }
  }, [userId]);



  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

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
      <div className="bread-crumbs">
        <Breadcrumbs crumbs={breadcrumbData} />
      </div>

      <div className="secondary-container">

        <div className="slider-container">
          <Slider {...settings}>
            {images.map((image: string, index: number) => (
              <img
                src={image}
                key={index}
                alt={`Image ${index + 1}`}
                className={`stacked-images ${activeImage === index ? "active" : ""}`}
                onClick={() => handleImageChange(index)}
              />
            ))}

            
          </Slider>
        </div>
        <div className="primary-image-container">
          <img
            src={images[activeImage]}
            alt="main-image"
            className={`primary-image ${animationClass}`}
            onClick={() => { toggleModal(), console.log(activeImage) }}
          />
        </div>
        <div className="content">

          <h1 className="product-name">{product.productName}</h1>
          <div className="star">
            {renderStars(averageRating)}
            <pre className="review">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </pre>
          </div>
          <div className="information">
            {product.productDescription}
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
              {colors.map((colorData) => (
                <div
                  key={colorData.color}
                  className={`color ${selectedColor === colorData.color ? "selected" : ""}`}
                  style={{
                    backgroundColor: colorData.colorCode,
                    cursor: colorData.quantity === 0 ? "not-allowed" : "pointer",
                    opacity: colorData.quantity === 0 ? 0.5 : 1,
                  }}
                  onClick={() => colorData.quantity > 0 && setSelectedColor(colorData.color)}
                ></div>
              ))}
            </div>
          </div>
          <div className="price">
            <h4 className="rupees">Rs {selectedSizePrice}</h4>
            <h5 className="discount">{product.offerPercent}% OFF</h5>
            <div className="original-price">Original Price: Rs {originalPrice}</div>
          </div>
          <div className="Mrp">M.R.P. Incl. of all taxes</div>
          <div className="size">
            <span className="size-label">SELECT SIZE</span>
            <div className="size-num">
              {sizes.map((size) => {
                const isUnavailable = limitedSizeData[size] === 0;
                return (
                  <div
                    key={size}
                    className={`num ${selectSize === size ? "sizeselected" : ""} ${isUnavailable ? "unavailable-size" : ""
                      }`}
                    onClick={() => !isUnavailable && handleSizeChange(size)}
                  >
                    {isUnavailable ? (
                      <span className="crossed-size">{size}</span>
                    ) : (
                      size
                    )}
                    {limitedSizeData[size] !== undefined && limitedSizeData[size] > 0 && (
                      <div className="limited-text">{limitedSizeData[size]} left</div>
                    )}

                  </div>
                );
              })}
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
            <button className="cart" onClick={addToCart}>
              <ShoppingBagOutlinedIcon className="shopping-bag" />
              ADD TO CART
            </button>
            <button className="buy" onClick={navigateToCheckout}>
              BUY NOW
            </button>
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
      <SuccessModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Success!"
        content="The item has been successfully added to your cart."
        buttonText="Go to Cart"
        navigateTo="/cart"
      />
      <ErrorModal
        open={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Error!"
        content="Something went wrong. Please try again later."
        buttonText="Close"
      />
      <div className="video-container">
        <video src={video} autoPlay controls></video>
      </div>
      <div className="product-info-container">
        <Product />
      </div>
    </div>
  );
};

export default ProductInfo;
