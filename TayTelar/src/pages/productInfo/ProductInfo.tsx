import React, { useState, useRef, MouseEvent } from 'react';
import Slider from 'react-slick';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { CustomPrevArrow, CustomNextArrow } from './customArrows';
import image1 from '../../assets/images/image-1.webp';
import image2 from '../../assets/images/image-2.jpg';
import image3 from '../../assets/images/image-3.webp';
import image4 from '../../assets/images/image-4.webp';
import image5 from '../../assets/images/image-5.webp';
import '../../assets/sass/pages/_productInfo.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from './Product';

const images = [image1, image2, image3, image4, image5];
const colors: string[] = ['black', 'white', 'grey', 'blue'];
const sizes: string[] = ['30', '32', '34', '36'];
const limitedSize = '34'; 

const ProductInfo = () => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>("grey");
  const [selectSize, setselectSize] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  const [animationClass, setAnimationClass] = useState<string>('slide-active');
  const [previewShow, setPreviewShow] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageChange = (index: number) => {
    if (index !== activeImage) {
      setAnimationClass('slide-out'); // Start slide out animation

      setTimeout(() => {
        setActiveImage(index); // Change the image
        setAnimationClass('slide-in'); // Start slide in animation
      }, 200); // Wait for slide-out to complete

      setTimeout(() => {
        setAnimationClass('slide-active'); // Reset to active state
      }, 200); // Wait for slide-in to complete
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    if (imageRef.current && canvasRef.current) {
      const { offsetX, offsetY } = e.nativeEvent;
      const img = imageRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx && img) {
        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;

        const cropWidth = 150;
        const cropHeight = 150;

        const cropX = offsetX * scaleX - cropWidth / 2;
        const cropY = offsetY * scaleY - cropHeight / 2;

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        ctx.drawImage(
          img,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight
        );

        setPreview(canvas.toDataURL());
      }
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: function (currentSlide: any, nextSlide: any) {
      console.log('before change', currentSlide, nextSlide);
    },
    afterChange: function (currentSlide: any) {
      console.log('after change', currentSlide);
    },
  };

  return (
    <div className="main-container">
      <div className="secondary-container">
        <div className="image-container">
          <div className="slider-container">
            <Slider {...settings}>
              {images.map((image, index) => (
                <img
                  src={image}
                  key={index}
                  alt={`Image ${index + 1}`}
                  className={`stacked-images ${
                    activeImage === index ? 'active' : ''
                  }`}
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
              onMouseEnter={() => setPreviewShow(true)}
              onMouseLeave={() => setPreviewShow(false)}
              onMouseMove={handleMouseMove}
              ref={imageRef}
              style={{ cursor: 'crosshair' }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        </div>
        <div className="content">
          <h1 className="product-name">Came Stretch Pants</h1>
          <div className="star">
            {[...Array(4)].map((_, i) => (
              <StarPurple500OutlinedIcon key={i} className="star-inner" />
            ))}
            <pre className="review">1 review</pre>
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
                style={{ fontWeight: '400', marginLeft:"0.6rem" }}
              >
                {selectedColor}
              </span>
            </div>
            <div className="color-shade">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`color ${
                    selectedColor === color ? 'selected' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>
          <div className="price">
            <h4 className="rupees">$ 2,999</h4>
            <h5 className="discount">60% OFF</h5>
          </div>
          <div className="Mrp">M.R.P. Incl. of all taxes</div>
          <div className="size">
            <span className="size-label">SELECT SIZE</span>
            
            <div className="size-num">
              {sizes.map((size) => (
                <div
                  key={size}
                  className={`num ${selectSize === size ? 'sizeselected' : ''}`}
                  onClick={() => setselectSize(size)}
                 
                >
                  {size}
                  {size === limitedSize && (
                  <div className="limited-text">Only 2 left</div>
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
                onClick={() => (count !== 1 ? setCount(count - 1) : setCount(1))}
              >
                -
              </span>
              <span>{count}</span>
              <span className="add" onClick={() => setCount(count + 1)}>
                +
              </span>
            </div>
            <button className="cart">
              <ShoppingBagOutlinedIcon className="shopping-bag" />
              ADD TO CART
            </button>
            <button className="buy">BUY NOW</button>
          </div>
          <div className="info-container">
            <div className="info-item">
              <span className="info-label">Availability</span>
              <span className="info-value" style={{ color: 'green' }}>
                In Stock
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Product Type</span>
              <span className="info-value">Demo Type</span>
            </div>
            <div className="info-item">
              <span className="info-label">Fit Type</span>
              <span className="info-value">Straight Fit</span>
            </div>
            <div className="info-item">
              <span className="info-label">Length</span>
              <span className="info-value">Regular</span>
            </div>
            <div className="info-item">
              <span className="info-label">Wash</span>
              <span className="info-value">Hand Wash</span>
            </div>
          </div>
        </div>
        {previewShow && preview && (
          <div className="preview">
            <img  className="preview-image" src={preview} alt="Zoom Preview" />
          </div>
        )}
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
<div className='product-info-container'>
<Product/>
</div>
    </div>
  );
};

export default ProductInfo;
