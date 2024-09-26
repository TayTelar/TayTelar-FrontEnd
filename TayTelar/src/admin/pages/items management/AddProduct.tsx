import React, { useState } from "react";
import "../../assets/scss/_add.scss";

const AddProduct = () => {
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    sku: "",
    regularPrice: "",
    salesPrice: "",
    stockQuantity: "",
    stockStatus: "In Stock",
    sizeOptions: "",
    colorOptions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="add-product-container">
      <div className="section">
        <p>Product Information</p>
        <div className="section__input">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productInfo.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={productInfo.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="sku"
            placeholder="Stock Keeping Unit"
            value={productInfo.sku}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="section pricing">
        <p>Pricing Section</p>
        <div className="section__input">
          <input
            type="text"
            name="regularPrice"
            placeholder="Regular Price"
            value={productInfo.regularPrice}
            onChange={handleChange}
          />
          <input
            type="text"
            name="salesPrice"
            placeholder="Sales Price"
            value={productInfo.salesPrice}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="section inventory">
        <p>Inventory Section</p>
        <div className="section__input">
          <input
            type="text"
            name="stockQuantity"
            placeholder="Stock Quantity"
            value={productInfo.stockQuantity}
            onChange={handleChange}
          />
          <select
            name="stockStatus"
            value={productInfo.stockStatus}
            onChange={handleChange}
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Pre-Order">Pre-Order</option>
          </select>
        </div>
      </div>

      <div className="section attributes">
        <p>Attribute Section</p>
        <div className="section__input">
          <select
            name="sizeOptions"
            value={productInfo.sizeOptions}
            onChange={handleChange}
          >
            <option value="">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
          <input
            type="text"
            name="colorOptions"
            placeholder="Color Options"
            value={productInfo.colorOptions}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="section images">
        <p>Product Images</p>
        <div className="section__input">
          <div className="image-upload">
            <label>Choose first image to upload</label>
            <input type="file" />
          </div>
          <div className="image-upload">
            <label>Choose thumbnail image to upload</label>
            <input type="file" />
          </div>
          <div className="image-upload">
            <label>Choose hover image to upload</label>
            <input type="file" />
          </div>
        </div>
      </div>

      <button className="upload-button">Save Product</button>
    </div>
  );
};

export default AddProduct;
