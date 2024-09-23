import React, { useState } from "react";
import img2 from "../assets/images/products1.avif";
import img3 from "../assets/images/products2.avif";
import "../assets/sass/products/_products.scss";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

interface Product {
  id: number;
  image: string;
  description: string;
  percentage: string;
}

const products: Product[] = [
  {
    id: 1,
    image: img3,
    description: "Product 1 Description",
    percentage: "20%",
  },
  {
    id: 2,
    image: img2,
    description: "Product 2 Description",
    percentage: "10%",
  },
  {
    id: 3,
    image: img3,
    description: "Product 3 Description",
    percentage: "10%",
  },
  {
    id: 4,
    image: img3,
    description: "Product 1 Description",
    percentage: "20%",
  },
  {
    id: 5,
    image: img2,
    description: "Product 2 Description",
    percentage: "5%",
  },
  {
    id: 6,
    image: img3,
    description: "Product 3 Description",
    percentage: "20%",
  },
  {
    id: 7,
    image: img3,
    description: "Product 1 Description",
    percentage: "10%",
  },
  {
    id: 8,
    image: img2,
    description: "Product 2 Description",
    percentage: "20%",
  },
  {
    id: 9,
    image: img3,
    description: "Product 3 Description",
    percentage: "20%",
  },
];

const Products: React.FC = () => {
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);

  const handleShare = (product: Product) => {
    const link = `https://yourwebsite.com/products/${product.id}`;
    setShareLink(link);
    setShowShareOptions(true);
  };

  const handleCloseShareOptions = () => {
    setShowShareOptions(false);
    setShareLink(null);
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.image}
            alt={`Product ${product.id}`}
            className="product-image"
          />
          <div className="product-info">
            <p className="product-description">{product.description}</p>
            <p className="product-percentage">
              Percentage {product.percentage}
            </p>
            <div className="product-buttons">
              <button disabled className="btn value-btn">
                Buy
              </button>
              <button
                className="btn share-btn"
                onClick={() => handleShare(product)}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      ))}
      {showShareOptions && shareLink && (
        <div className="share-modal">
          <div className="share-modal-content">
            <button className="close-btn" onClick={handleCloseShareOptions}>
              &times;
            </button>
            <p>Share this link</p>
            <input type="text" value={shareLink} readOnly />
            <div className="share-buttons">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareLink
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn share-twitter"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareLink
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn share-facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href={`https://www.instagram.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareLink
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn share-instagram"
              >
                <FaInstagram />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                  shareLink
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn share-linkedin"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
