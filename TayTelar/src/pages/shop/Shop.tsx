import "../../assets/sass/pages/_shop.scss";
import banner from "../../assets/images/products_banner.png";
import img1 from "../../assets/images/image_1 (1).png";
import hover_1 from "../../assets/images/hover_img_1.webp";
import hover_2 from "../../assets/images/hover_img_2.webp";
import hover_4 from "../../assets/images/hover_img_4.webp";
import img2 from "../../assets/images/image_1 (2).png";
import img3 from "../../assets/images/image_1 (3).png";
import img4 from "../../assets/images/image_1 (4).png";
import img5 from "../../assets/images/image_1 (1).png";
import img6 from "../../assets/images/image_1 (2).png";
import img7 from "../../assets/images/image_1 (3).png";
import img8 from "../../assets/images/image_1 (4).png";
import hover_3 from "../../assets/images/hover_img_3webp.webp";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import Breadcrumbs from "../../components/breadcrumb/Breadcrumbs";
import CloseIcon from "@mui/icons-material/Close";

interface Product {
  img: string;
  hoverImg: string;
  title: string;
  price: string;
  rating: string;
  reviews: string;
}

const products: Product[] = [
  {
    img: img1,
    hoverImg: hover_2,
    title: "Ebony Black Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "303 reviews",
  },
  {
    img: img2,
    hoverImg: hover_3,
    title: "Mineral Gray Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "673 reviews",
  },
  {
    img: img3,
    hoverImg: hover_1,
    title: "Eco Navy Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "543 reviews",
  },
  {
    img: img4,
    hoverImg: hover_4,
    title: "Camel Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "500 reviews",
  },
  {
    img: img5,
    hoverImg: hover_2,
    title: "Ebony Black Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "387 reviews",
  },
  {
    img: img6,
    hoverImg: hover_3,
    title: "Mineral Gray Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "309 reviews",
  },
  {
    img: img7,
    hoverImg: hover_1,
    title: "Eco Navy Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "783 reviews",
  },
  {
    img: img8,
    hoverImg: hover_4,
    title: "Camel Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "129 reviews",
  },
  {
    img: img1,
    hoverImg: hover_2,
    title: "Ebony Black Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "303 reviews",
  },
  {
    img: img2,
    hoverImg: hover_3,
    title: "Mineral Gray Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "673 reviews",
  },
  {
    img: img3,
    hoverImg: hover_1,
    title: "Eco Navy Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "543 reviews",
  },
  {
    img: img4,
    hoverImg: hover_4,
    title: "Camel Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "500 reviews",
  },
  {
    img: img5,
    hoverImg: hover_2,
    title: "Ebony Black Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "387 reviews",
  },
  {
    img: img6,
    hoverImg: hover_3,
    title: "Mineral Gray Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "309 reviews",
  },
  {
    img: img7,
    hoverImg: hover_1,
    title: "Eco Navy Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "783 reviews",
  },
  {
    img: img8,
    hoverImg: hover_4,
    title: "Camel Stretch Pants",
    price: "Rs. 2,990",
    rating: "4.9",
    reviews: "129 reviews",
  },
];

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
              <div key={index} className="product-card">
                <div className="image-container">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="section-image"
                  />
                  <img
                    src={product.hoverImg}
                    alt={product.title}
                    className="section-image-hover"
                  />
                  {Math.floor(index / 4) === 0 && (
                    <span className="label">New Arrival</span>
                  )}
                  {Math.floor(index / 4) === 1 && (
                    <span className="label">Limited Edition</span>
                  )}
                  {Math.floor(index / 4) === 2 && (
                    <span className="label">Trending</span>
                  )}
                </div>
                <div className="product-info">
                  <span className="product-title">{product.title}</span>
                  <span className="product-price">{product.price}</span>
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
              className={`color-item ${
                hiddenItems.includes(color) ? "hidden" : ""
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
    </div>
  );
};
