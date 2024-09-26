import "../../assets/scss/_show.scss";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import img1 from "../../assets/images/sample_image.webp";

const products = [
  { id: 1, name: "Product One", productID: "PR1234567890", image: img1 },
  { id: 2, name: "Product Two", productID: "PR1234567890", image: img1 },
  { id: 3, name: "Product Three", productID: "PR1234567890", image: img1 },
  { id: 4, name: "Product Four", productID: "PR1234567890", image: img1 },
  { id: 5, name: "Product One", productID: "PR1234567890", image: img1 },
  { id: 6, name: "Product Two", productID: "PR1234567890", image: img1 },
  { id: 7, name: "Product Three", productID: "PR1234567890", image: img1 },
  { id: 8, name: "Product Four", productID: "PR1234567890", image: img1 },
];

const ShowProduct: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.id.toString().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <p>{product.name}</p>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <p>{product.productID}</p>
            <button className="edit-button">Edit Product</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by ID or Name"
      />
      <IoIosSearch className="search-icon" />
    </div>
  );
};
