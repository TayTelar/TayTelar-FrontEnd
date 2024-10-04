import tinycolor from "tinycolor2";
import { updateProduct } from "../../api/dataService";
import { IUpdateProduct } from "../../types/update product/request.type";
import toast from "react-hot-toast";
import { useState } from "react";
import "../../assets/scss/_show.scss";
import {
  ProductDataResponse,
  UpdateItemProps,
  StockQuantityResponse,
} from "../../interface/productInterfaces";
import { MdOutlineDelete } from "react-icons/md";

const UpdateItem: React.FC<UpdateItemProps> = ({
  onClose,
  productInfo,
  categoryName,
  categoryId,
  categoryDescription,
  subCategoryName,
  subCategoryId,
  subCategoryDescription,
  onRefreshProducts,
}) => {
  const [updatedProduct, setUpdatedProduct] = useState<ProductDataResponse>(
    productInfo || {
      productId: "",
      productName: "",
      productStatus: "",
      productDescription: "",
      productMaterialType: "",
      productPattern: "",
      productOfferPercentage: 0,
      stockQuantityResponseList: [],
      images: {},
      video: "",
      categoryId: "",
      categoryDescription: "",
      categoryName: "",
      subCategoryName: "",
      subCategoryId: "",
      subCategoryDescription: "",
    }
  );

  const [newStockSize, setNewStockSize] = useState<number>(0);
  const [newStockColor, setNewStockColor] = useState<string>("");
  const [newStockQuantity, setNewStockQuantity] = useState<number>(0);
  const [newStockPrice, setNewStockPrice] = useState<number>(0);
  const [newColorCode, setNewColorCode] = useState<string>("");

  const handleAddStock = () => {
    if (newStockSize && newStockColor && newStockQuantity && newStockPrice) {
      const newStock: StockQuantityResponse = {
        size: newStockSize,
        productPrice: newStockPrice,
        colorQuantityResponses: [
          {
            color: newStockColor,
            colorCode: newColorCode,
            quantity: newStockQuantity,
          },
        ],
      };

      setUpdatedProduct((prev) => ({
        ...prev,
        stockQuantityResponseList: [
          ...prev.stockQuantityResponseList,
          newStock,
        ],
      }));

      setNewStockSize(0);
      setNewStockColor("");
      setNewStockQuantity(0);
      setNewStockPrice(0);
      setNewColorCode("");
    } else {
      alert("Please fill all fields to add stock.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: name === "productOfferPercentage" ? Number(value) : value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorValue = e.target.value;
    setNewStockColor(colorValue);

    const color = tinycolor(colorValue);
    setNewColorCode(color.isValid() ? color.toHexString() : "");
  };

  const handleSubmit = () => {
    handleUpdateProduct();
  };

  const [showStockQuantity, setShowStockQuantity] = useState<Boolean>(false);

  /* API INTEGRATION */
  const handleUpdateProduct = async () => {
    const data: IUpdateProduct = {
      categoryId: categoryId,
      subCategoryId: subCategoryId,
      productId: updatedProduct.productId,
      addProductRequest: {
        categoryName: categoryName,
        categoryDescription: categoryDescription,
        subCategoryName: subCategoryName,
        subCategoryDescription: subCategoryDescription,
        productName: updatedProduct.productName,
        productStatus: updatedProduct.productStatus,
        productDescription: updatedProduct.productDescription,
        productMaterialType: updatedProduct.productMaterialType,
        productPattern: updatedProduct.productPattern,
        productOfferPercentage: updatedProduct.productOfferPercentage,
        stockQuantities: updatedProduct.stockQuantityResponseList.map(
          (stock) => ({
            size: stock.size,
            productPrice: stock.productPrice,
            colorQuantities: stock.colorQuantityResponses.map((color) => ({
              color: color.color,
              colorCode: color.colorCode,
              quantity: color.quantity,
            })),
          })
        ),
      },
    };

    try {
      console.log("Request Body:", data);
      const res = await updateProduct(data);
      console.log("Product updated successfully:", res);
      toast.success("Product updated successfully", {
        style: {
          fontSize: "12px",
        },
      });
      onRefreshProducts();
      onClose();
    } catch (e) {
      console.error("Error updating product:", e);
    }
  };

  const handleDeleteStock = (sizeIndex: number, colorIndex: number) => {
    setUpdatedProduct((prev) => {
      const newStockList = [...prev.stockQuantityResponseList];

      if (sizeIndex < newStockList.length) {
        const colorResponses = newStockList[sizeIndex]?.colorQuantityResponses;

        if (colorResponses && colorIndex < colorResponses.length) {
          colorResponses.splice(colorIndex, 1);

          if (colorResponses.length === 0) {
            newStockList.splice(sizeIndex, 1);
          }
        }
      }

      return { ...prev, stockQuantityResponseList: newStockList };
    });
  };

  return (
    <div className="update-item">
      <p className="id">
        <span>Product ID</span>
        <span>{productInfo?.productId}</span>
      </p>
      <div className="input-group">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={updatedProduct.productName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="productStatus"
            value={updatedProduct.productStatus}
            onChange={handleSelectChange}
          >
            <option value="">Select Status</option>
            <option value="Trending">Trending</option>
            <option value="Limited">Limited</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            name="productDescription"
            value={updatedProduct.productDescription}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="form-group">
          <label>Material Type</label>
          <select
            name="productMaterialType"
            value={updatedProduct.productMaterialType}
            onChange={handleSelectChange}
          >
            <option value="">Select Material</option>
            <option value="Wool">Wool</option>
            <option value="Suede">Suede</option>
            <option value="Cotton">Cotton</option>
          </select>
        </div>

        <div className="form-group">
          <label>Pattern</label>
          <select
            name="productPattern"
            value={updatedProduct.productPattern}
            onChange={handleSelectChange}
          >
            <option value="">Select Pattern</option>
            <option value="Plain">Plain</option>
            <option value="Stripes">Stripes</option>
          </select>
        </div>

        <div className="form-group">
          <label>Offer Percentage</label>
          <input
            type="number"
            name="productOfferPercentage"
            value={updatedProduct.productOfferPercentage}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Conditionally render stock quantity table */}
      {updatedProduct.stockQuantityResponseList.length > 0 && (
        <div className="table">
          <p>Stock Quantity</p>
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Color</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {updatedProduct.stockQuantityResponseList.map((stock, sizeIndex) =>
                stock.colorQuantityResponses.map((color, colorIndex) => (
                  <tr key={`${sizeIndex}-${colorIndex}`}>
                    <td>{stock.size}</td>
                    <td>{color.color}</td>
                    <td>{color.quantity}</td>
                    <td>{stock.productPrice}</td>
                    <td>
                      <MdOutlineDelete
                        onClick={() => handleDeleteStock(sizeIndex, colorIndex)}
                        className="icon delete"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div>
        {showStockQuantity ? (
          <div className="showStockQuantity">
            <div className="input-group-update">
              <div className="form-group">
                <label>Size</label>
                <select
                  value={newStockSize}
                  onChange={(e) => setNewStockSize(Number(e.target.value))}
                >
                  <option value="">Select Size</option>
                  <option value="30">30</option>
                  <option value="32">32</option>
                  <option value="34">34</option>
                  <option value="36">36</option>
                  <option value="40">40</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  value={newStockPrice}
                  onChange={(e) => setNewStockPrice(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label>Color</label>
                <input
                  type="text"
                  value={newStockColor}
                  onChange={handleColorChange}
                />
              </div>
            </div>
            <div className="input-group-update">
              <div className="form-group">
                <label>Color Code</label>
                <input type="text" value={newColorCode} readOnly />
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  value={newStockQuantity}
                  onChange={(e) => setNewStockQuantity(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="save__cancel">
              <button onClick={handleAddStock}>Add Stock</button>
              <button onClick={() => setShowStockQuantity(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowStockQuantity(true)}
            className="add-stock"
          >
            + Add Stock Quantity
          </button>
        )}
      </div>

      <hr />

      <div className="actionbuttons">
        <button onClick={handleSubmit}>Save Changes</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UpdateItem;
