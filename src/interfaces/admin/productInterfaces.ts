export interface ColorQuantityResponse {
  color: string;
  colorCode: string;
  quantity: number;
}

export interface StockQuantityResponse {
  size: number;
  productPrice: number;
  colorQuantityResponses: ColorQuantityResponse[];
}

export interface ProductDataResponse {
  productId: string;
  productName: string;
  productStatus: string;
  productDescription: string;
  productMaterialType: string;
  productPattern: string;
  productOfferPercentage: number;
  stockQuantityResponseList: StockQuantityResponse[];
  images: { [key: string]: string };
  video: string | null;
  categoryId: string;
  subCategoryId: string;
  categoryName: string;
  categoryDescription: string;
  subCategoryName: string;
  subCategoryDescription: string;
}

export interface SubCategoryResponse {
  subCategoryId: string;
  subCategoryName: string;
  productDataResponses: ProductDataResponse[];
}

export interface CategoryResponse {
  categoryId: string;
  categoryName: string;
  subCategoryResponses: SubCategoryResponse[];
}

export interface Product {
  productID: string;
  productName: string;
  category: string;
  subcategory: string;
  image: string;
  price: number;
  size: number;
  color: string;
}

export interface UpdateItemProps {
  product: Product;
  onClose: () => void;
  productInfo?: ProductDataResponse;
  categoryName: string;
  categoryId: string;
  categoryDescription: string;
  subCategoryName: string;
  subCategoryId: string;
  subCategoryDescription: string;
  onRefreshProducts: () => void;
}
