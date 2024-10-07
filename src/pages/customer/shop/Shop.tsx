import "../../../assets/customer/sass/pages/_shop.scss";
import banner from "../../../assets/customer/images/products_banner.png";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/customer/breadcrumb/Breadcrumbs";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
  img: string;
  hoverImg: string;
  productName: string;
  rating: string;
  reviews: string;
  productId: string;
  productDescription: string;
  productMaterialType: string;
  productPattern: string;
  productStatus: string;
  stockQuantityResponseList: any[];
  images: Record<string, number>;
  video: string;
  offerPercent: number;
}

const filters = [
  {
    title: "STRETCH",
    options: ["Four Way Stretch", "Two Way Stretch", "No Stretch"],
  },
  { title: "PRODUCT TYPE", options: ["Formal Pants"] },
  {
    title: "FABRIC TYPE",
    options: ["Polyester Blend", "Cotton Blend", "Pure Cotton", "Linen"],
  },
];

const Shop: React.FC = () => {
  const breadcrumbData = [{ label: "Home", path: "/" }, { label: "Shop" }];
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) => {
      const newFilters = new Set(prev);
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      return newFilters;
    });
  };

  const handleRemoveFilter = (filter: string) => {
    setSelectedFilters((prev) => {
      const newFilters = new Set(prev);
      newFilters.delete(filter);
      return newFilters;
    });
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8085/api/product/getAllProducts"
      );

      const categoryResponses = response.data.categoryResponses;

      const formattedProducts: Product[] = [];

      categoryResponses.forEach((category: any) => {
        category.subCategoryResponses.forEach((subCategory: any) => {
          subCategory.productDataResponses.forEach((product: any) => {
            const images = product.images;
            const imageKeys = Object.keys(images);

            const img = imageKeys.find((key) => images[key] === 1);
            const hoverImg = imageKeys.find((key) => images[key] === 2);

            formattedProducts.push({
              img: img || "",
              hoverImg: hoverImg || "",
              productName: product.productName,
              rating: "4.9",
              reviews: "200 reviews",
              productId: product.productId,
              productDescription: product.productDescription,
              productMaterialType: product.productMaterialType,
              productPattern: product.productPattern,
              productStatus: product.productStatus,
              stockQuantityResponseList: product.stockQuantityResponseList,
              video: product.video,
              images,
              offerPercent: product.productOfferPercentage,
            });
          });
        });
      });

      setProducts(formattedProducts);
    } catch (error: any) {
      console.error("Error fetching products:", error.message || error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="shop-container">
      <div className="shop-header">
        <span>PRODUCTS</span>
        <Breadcrumbs crumbs={breadcrumbData} />
      </div>
      <img src={banner} alt="Products Banner" className="shop-banner" />
      <div className="shop-content">
        <Filter
          onFilterChange={handleFilterChange}
          onRemoveFilter={handleRemoveFilter}
          selectedFilters={selectedFilters}
        />
        <div className="content">
          <div className="selected-filters">
            {Array.from(selectedFilters).map((filter, index) => (
              <span key={index} className="selected-filter">
                {filter}
                <span>
                  {" "}
                  <CloseIcon
                    className="icon"
                    onClick={() => handleRemoveFilter(filter)}
                  />
                </span>
              </span>
            ))}
          </div>
          <div className="images-section">
            {products.map((product, index) => (
              <div key={index} className="product-card" onClick={() => navigate("/productinfo", { state: { product } })}>
                <div className="image-container">
                  <img
                    src={product.img}
                    alt={product.productName}
                    className="section-image"
                  />
                  <img
                    src={product.hoverImg}
                    alt={product.productName}
                    className="section-image-hover"
                  />
                  <span className="label">{product.productStatus}</span>
                </div>
                <div className="product-info">
                  <span className="product-title">{product.productName}</span>
                  <span className="product-price">Rs.{product.stockQuantityResponseList[0].productPrice}</span>
                  <div className="product-rating">
                    <StarIcon className="star-icon" />
                    <span className="rating">{product.rating}</span>
                    <span className="reviews">{product.reviews}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Shop;

interface FilterProps {
  onFilterChange: (filter: string) => void;
  selectedFilters: Set<string>;
  onRemoveFilter: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  onFilterChange,
  selectedFilters,
}) => {
  const [hiddenItems, setHiddenItems] = useState<string[]>([]);
  const [clickedSize, setClickedSize] = useState<number | null>(null);


  const handleSizeClick = (size: number) => {
    setClickedSize(size === clickedSize ? null : size);
    onFilterChange(size.toString());
  };

  const handleItemClick = (item: string) => {
    setHiddenItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
    onFilterChange(item);
  };

  const items = [32, 34, 36, 38];
  const colors = ["brown", "black", "gray", "#BA933E"];

  return (
    <div className="menu-section">
      {filters.map((filter, index) => (
        <div key={index} className="filter-section">
          <span className="filter-title">{filter.title}</span>
          <ul className="filter-list">
            {filter.options.map((option, i) => (
              <li
                key={i}
                onClick={() => onFilterChange(option)}
                className={selectedFilters.has(option) ? "clicked" : ""}
              >
                {option}
              </li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
      <div className="size-color-filter">
        <span className="filter-title">SIZE</span>
        <div className="size-list">
          {items.map((size) => (
            <div
              key={size}
              className={`size-item ${clickedSize === size ? "clicked" : ""}`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </div>
          ))}
        </div>
        <hr />
        <span className="filter-title">COLORS</span>
        <div className="color-list">
          {colors.map((color) => (
            <div
              key={color}
              className={`color-item ${hiddenItems.includes(color) ? "hidden" : ""
                }`}
              style={{
                backgroundColor: color,
                border: "none",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
              onClick={() => handleItemClick(color)}
            ></div>
          ))}
        </div>
      </div>
    </div >
  );
};