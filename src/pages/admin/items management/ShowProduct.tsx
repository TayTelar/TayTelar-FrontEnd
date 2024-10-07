import "../../../assets/admin/scss/_show.scss";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { getProducts, getProductByID } from "../../../services/data.service";
import UpdateItem from "./UpdateItem";
import {
  Product,
  ProductDataResponse,
  CategoryResponse,
  SubCategoryResponse,
} from "../../../interfaces/admin/productInterfaces";

const ShowProduct: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<Record<string, string[]>>(
    {}
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [info, setInfo] = useState<ProductDataResponse>();

  const filterProducts = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = allProducts.filter(
      (product) =>
        (product.productName.toLowerCase().includes(lowercasedQuery) ||
          product.productID.toString().includes(lowercasedQuery)) &&
        (selectedCategory === "All" || product.category === selectedCategory) &&
        (selectedSubcategory === "" ||
          product.subcategory === selectedSubcategory)
    );

    setFilteredProducts(filtered);
  };

  const handleGetProducts = async () => {
    try {
      const res = await getProducts();
      initializeProducts(res);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const initializeProducts = (res: any) => {
    const extractedCategories = res.categoryResponses.map(
      (category: CategoryResponse) => category.categoryName
    );

    const extractedSubcategories = res.categoryResponses.reduce(
      (acc: { [x: string]: string[] }, category: CategoryResponse) => {
        acc[category.categoryName] = category.subCategoryResponses.map(
          (subCategory) => subCategory.subCategoryName
        );
        return acc;
      },
      {} as Record<string, string[]>
    );

    const productSet = new Set<string>();
    const products: Product[] = [];

    res.categoryResponses.forEach((category: CategoryResponse) => {
      category.subCategoryResponses.forEach(
        (subCategory: SubCategoryResponse) => {
          subCategory.productDataResponses.forEach(
            (productData: ProductDataResponse) => {
              productData.stockQuantityResponseList.forEach((stock) => {
                stock.colorQuantityResponses.forEach((color) => {
                  const productID = productData.productId;
                  if (!productSet.has(productID)) {
                    productSet.add(productID);
                    const imageUrls = Object.keys(productData.images);
                    products.push({
                      productID,
                      productName: productData.productName,
                      category: category.categoryName,
                      subcategory: subCategory.subCategoryName,
                      image: imageUrls.length > 0 ? imageUrls[0] : "",
                      price: stock.productPrice,
                      size: stock.size,
                      color: color.color,
                    });
                  }
                });
              });
            }
          );
        }
      );
    });

    setCategories(extractedCategories);
    setSubcategories(extractedSubcategories);
    setAllProducts(products);
    setFilteredProducts(products);
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [subCategoryName, setSubCategoryName] = useState<string>("");
  const [subCategoryId, setSubCategoryId] = useState<string>("");
  const [subCategoryDescription, setSubCategoryDescription] =
    useState<string>("");

  const getProductDetailsById = (productId: string) => {
    const cachedProducts = localStorage.getItem("products");

    if (!cachedProducts) {
      console.error("No products found in local storage.");
      return null;
    }

    const res = JSON.parse(cachedProducts);

    for (const category of res.categoryResponses) {
      for (const subCategory of category.subCategoryResponses) {
        for (const productData of subCategory.productDataResponses) {
          if (productData.productId === productId) {
            return {
              categoryName: category.categoryName,
              categoryId: category.categoryId,
              categoryDescription: category.categoryDescription,
              subCategoryName: subCategory.subCategoryName,
              subCategoryId: subCategory.subCategoryId,
              subCategoryDescription: subCategory.subCategoryDescription,
            };
          }
        }
      }
    }

    console.warn("Product ID not found:", productId);
    return null;
  };

  useEffect(() => {
    filterProducts();
  }, [allProducts, selectedCategory, selectedSubcategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleEditProduct = async (product: Product) => {
    try {
      const res = await getProductByID(product.productID);
      setInfo(res);
      setSelectedProduct(product);

      const details = getProductDetailsById(product.productID);
      if (details) {
        setCategoryName(details.categoryName);
        setCategoryId(details.categoryId);
        setCategoryDescription(details.categoryDescription);
        setSubCategoryName(details.subCategoryName);
        setSubCategoryId(details.subCategoryId);
        setSubCategoryDescription(details.subCategoryDescription);
      }
    } catch (e) {
      console.error("Error updating product:", e);
    }
  };

  return (
    <div className="show-product-container">
      {selectedProduct ? (
        <div className="edit-section">
          <UpdateItem
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            productInfo={info}
            categoryName={categoryName}
            categoryId={categoryId}
            categoryDescription={categoryDescription}
            subCategoryName={subCategoryName}
            subCategoryId={subCategoryId}
            subCategoryDescription={subCategoryDescription}
            onRefreshProducts={handleGetProducts}
          />
        </div>
      ) : (
        <>
          <CategoryTabs
            categories={["All", ...categories]}
            onChange={handleCategoryChange}
            selectedCategory={selectedCategory}
          />
          <SearchBar onSearch={handleSearch} />
          {selectedCategory !== "All" && subcategories[selectedCategory] && (
            <SubcategoryList
              subcategories={subcategories[selectedCategory]}
              onSubcategoryChange={handleSubcategoryChange}
              selectedSubcategory={selectedSubcategory}
            />
          )}
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.productID} className="product-item">
                <p>{product.productName}</p>
                <img
                  src={product.image}
                  alt={product.productName}
                  className="product-image"
                />
                <p>{product.productID}</p>
                <p>${product.price.toFixed(2)}</p>
                <button
                  className="edit-button"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit Product
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

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

interface CategoryTabsProps {
  categories: string[];
  onChange: (category: string) => void;
  selectedCategory: string;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  onChange,
  selectedCategory,
}) => {
  return (
    <div className="category-tabs">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`tab ${selectedCategory === category ? "active" : ""}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

const SubcategoryList: React.FC<{
  subcategories: string[];
  onSubcategoryChange: (subcategory: string) => void;
  selectedSubcategory: string;
}> = ({ subcategories, onSubcategoryChange, selectedSubcategory }) => {
  return (
    <div className="subcategory-list">
      {subcategories.map((subcategory) => (
        <button
          key={subcategory}
          onClick={() => onSubcategoryChange(subcategory)}
          className={`subcategory-item ${
            selectedSubcategory === subcategory ? "active" : ""
          }`}
        >
          {subcategory}
        </button>
      ))}
    </div>
  );
};

export default ShowProduct;
