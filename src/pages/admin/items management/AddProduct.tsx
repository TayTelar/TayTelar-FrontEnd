import React, { useState, useRef } from "react";
import "../../../assets/admin/scss/_add.scss";
import { addProduct } from "../../../services/data.service";
import { uploadImages } from "../../../services/data.service";
import { IoIosClose } from "react-icons/io";
import toast from "react-hot-toast";
import tinycolor from "tinycolor2";
interface ColorEntry {
  size: number;
  regularPrice: string;
  color: string;
  code: string;
  quantity: number;
}

const AddProduct = () => {
  const [productInfo, setProductInfo] = useState({
    category: "",
    subcategory: "",
    name: "",
    description: "",
    status: "",
    material: "",
    pattern: "",
    percentage: 0.0,
    regularPrice: "",
    size: 0,
    color: "",
    code: "",
    quantity: 0,
  });

  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const imageInputRefs = useRef<(HTMLInputElement | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "color") {
      const hexColor = tinycolor(value).isValid()
        ? tinycolor(value).toHexString()
        : "";
      setProductInfo((prevState) => ({
        ...prevState,
        color: value,
        code: hexColor,
      }));
    } else {
      setProductInfo({
        ...productInfo,
        [name]: value,
      });
    }
  };

  const getSubcategories = () => {
    switch (productInfo.category) {
      case "Select Subcategory":
        return [];
      case "Pants":
        return ["Formal Pants", "Cargo Pants", "Jeans"];
      case "Shirts":
        return ["T-shirts", "Formal Shirts", "Casual Shirts"];
      default:
        return [];
    }
  };

  const [open, setOpen] = useState(false);

  const handleAddColors = () => {
    setOpen(true);
  };

  const [colorEntries, setColorEntries] = useState<ColorEntry[]>([]);

  const handleSaveColor = () => {
    if (
      productInfo.size &&
      productInfo.regularPrice &&
      productInfo.color &&
      productInfo.code &&
      productInfo.quantity > 0
    ) {
      const newColorEntry = {
        size: productInfo.size,
        regularPrice: productInfo.regularPrice,
        color: productInfo.color,
        code: productInfo.code,
        quantity: productInfo.quantity,
      };

      setColorEntries([...colorEntries, newColorEntry]);

      setProductInfo({
        ...productInfo,
        size: 0,
        regularPrice: "",
        color: "",
        code: "",
        quantity: 0,
      });
    } else {
      alert("Please fill in all fields correctly before saving.");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [images, setImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = [...images];
      newImages[index] = e.target.files[0];
      setImages(newImages);

      const newPreviews = [...previews];
      newPreviews[index] = URL.createObjectURL(e.target.files[0]);
      setPreviews(newPreviews);

      setCurrentStep(currentStep + 1);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];

    newImages[index] = null;
    newPreviews[index] = "";

    setImages(newImages);
    setPreviews(newPreviews);

    if (imageInputRefs.current[index]) {
      imageInputRefs.current[index].value = "";
    }

    if (currentStep > index) {
      setCurrentStep(index);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0]);
    }
  };

  const imageLabels = [
    "Choose first image to upload",
    "Choose second image to upload",
    "Choose third image to upload",
    "Choose fourth image to upload",
    "Choose fifth image to upload",
  ];

  /* API INTEGRATION */
  const handleSubmit = async (productID: string) => {
    const filteredImages = images.filter((img): img is File => img !== null);

    const requestBody = new FormData();
    requestBody.append("productId", productID);

    filteredImages.forEach((image, index) => {
      requestBody.append("images", image);
      requestBody.append("imagePriorities", String(index + 1));
    });

    if (video) {
      requestBody.append("video", video);
    }

    try {
      const response = await uploadImages(requestBody);
      console.log("Upload successful", response.data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  const handleAddProduct = async () => {
    const stockQuantities = colorEntries.reduce((acc: any[], entry) => {
      let sizeEntry = acc.find((item) => item.size === entry.size);
      if (!sizeEntry) {
        sizeEntry = {
          size: entry.size,
          productPrice: parseFloat(entry.regularPrice),
          colorQuantities: [],
        };
        acc.push(sizeEntry);
      }
      sizeEntry.colorQuantities.push({
        color: entry.color,
        colorCode: entry.code,
        quantity: entry.quantity,
      });
      return acc;
    }, []);

    const request = {
      categoryName: productInfo.category,
      categoryDescription: "Apparel including various types of pants",
      subCategoryName: productInfo.subcategory,
      subCategoryDescription: "Different types of formal pants.",
      productName: productInfo.name,
      productStatus: productInfo.status,
      productDescription: productInfo.description,
      productMaterialType: productInfo.material,
      productPattern: productInfo.pattern,
      productOfferPercentage: productInfo.percentage,
      stockQuantities: stockQuantities,
    };
    try {
      const res = await addProduct(request);
      console.log(res);
      if (res.productId) {
        await handleSubmit(res.productId);
      }
      toast.success("Product Successfully Added", {
        style: {
          fontSize: "12px",
        },
      });

      setProductInfo({
        category: "",
        subcategory: "",
        name: "",
        description: "",
        status: "",
        material: "",
        pattern: "",
        percentage: 0.0,
        regularPrice: "",
        size: 0,
        color: "",
        code: "",
        quantity: 0,
      });
      setColorEntries([]);
      setImages([null, null, null, null, null]);
      setPreviews([]);
      setVideo(null);

      if (videoInputRef.current) {
        videoInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error adding product", error);
      toast.error("Error in Adding Product", {
        style: {
          fontSize: "12px",
        },
      });
    }
  };

  return (
    <div className="add-product-container">
      <div className="section">
        <p>Category Information</p>
        <div className="section__input">
          <select
            name="category"
            value={productInfo.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Pants">Pants</option>
            <option value="Shirts">Shirts</option>
          </select>
          <select
            name="subcategory"
            value={productInfo.subcategory}
            onChange={handleChange}
            disabled={!productInfo.category}
          >
            <option value="">Select Subcategory</option>
            {getSubcategories().map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>
      </div>

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
          <select
            name="status"
            value={productInfo.status}
            onChange={handleChange}
          >
            <option value="status">Select Status</option>
            <option value="Trending">Trending</option>
            <option value="Limited">Limited</option>
          </select>
        </div>
        <div className="section__input">
          <select
            name="material"
            value={productInfo.material}
            onChange={handleChange}
          >
            <option value="material">Select Material Type</option>
            <option value="Wool">Wool</option>
            <option value="Swade">Swade</option>
            <option value="Nylon">Nylon</option>
          </select>
          <select
            name="pattern"
            value={productInfo.pattern}
            onChange={handleChange}
          >
            <option value="pattern">Select Pattern</option>
            <option value="Plain">Plain</option>
            <option value="Strips">Strips</option>
          </select>
          <input
            type="number"
            name="percentage"
            placeholder={productInfo.percentage == 0 ? "Offer Percentage" : ""}
            value={productInfo.percentage !== 0 ? productInfo.percentage : ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="section pricing">
        <p>Stock Quantity Section</p>
        <div className="section__input">
          <select name="size" value={productInfo.size} onChange={handleChange}>
            <option value="status">Select Size</option>
            <option value="30">30</option>
            <option value="32">32</option>
            <option value="34">34</option>
            <option value="36">36</option>
            <option value="38">38</option>
            <option value="40">40</option>
          </select>
          <input
            type="text"
            name="regularPrice"
            placeholder="Regular Price"
            value={productInfo.regularPrice}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleAddColors}>+ Add Colors</button>
        {open && (
          <>
            <div className="section__input">
              <input
                type="text"
                name="color"
                placeholder="Color Name"
                value={productInfo.color}
                onChange={handleChange}
              />
              <input
                type="text"
                name="code"
                placeholder="Color Code"
                value={productInfo.code}
                readOnly
              />
              <input
                type="number"
                name="quantity"
                placeholder={productInfo.quantity == 0 ? "Stock Quantity" : ""}
                value={productInfo.quantity !== 0 ? productInfo.quantity : ""}
                onChange={handleChange}
              />
            </div>
            <div className="actionbuttons">
              <button onClick={handleSaveColor}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </>
        )}
        {/* Display Added Colors */}
        {colorEntries.length > 0 && (
          <div className="section color-table">
            <p className="__p">Added Colors</p>
            <table>
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Color</th>
                  <th>Code</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {colorEntries.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.size}</td>
                    <td>{entry.regularPrice}</td>
                    <td>{entry.color}</td>
                    <td>{entry.code}</td>
                    <td>{entry.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="section images">
        <p>Product Images</p>
        <div className="section__input">
          {imageLabels.map((label, index) => (
            <div
              key={index}
              className="image-upload"
              style={{ display: currentStep === index ? "block" : "none" }}
            >
              <label className="label">{label}</label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, index)}
                ref={(el) => (imageInputRefs.current[index] = el)} 
              />
            </div>
          ))}
        </div>

        <div className="image-previews">
          {previews.map(
            (preview, index) =>
              preview && (
                <div
                  key={index}
                  className="image-preview"
                  style={{
                    position: "relative",
                    display: "inline-block",
                    margin: "10px",
                  }}
                >
                  <img
                    src={preview}
                    alt={`Uploaded ${index + 1}`}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <IoIosClose
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      position: "absolute",
                      right: "5px",
                      cursor: "pointer",
                      color: "#1a1a1a",
                      fontSize: "24px",
                    }}
                  />
                  <p className="label">{`Image ${index + 1}`}</p>
                </div>
              )
          )}
        </div>
        <div className="video-upload">
          <label className="label">Upload a video</label>
          <input type="file" onChange={handleVideoUpload} ref={videoInputRef} />
        </div>
      </div>
      <button className="upload-button" onClick={handleAddProduct}>
        Save Product
      </button>
    </div>
  );
};

export default AddProduct;
