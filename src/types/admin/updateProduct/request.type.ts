interface ColorQuantity {
  color: string;
  colorCode: string;
  quantity: number;
}

interface StockQuantity {
  size: number;
  productPrice: number;
  colorQuantities: ColorQuantity[];
}

interface AddProductRequest {
  categoryName: string;
  categoryDescription: string;
  subCategoryName: string;
  subCategoryDescription: string;
  productName: string;
  productStatus: string;
  productDescription: string;
  productMaterialType: string;
  productPattern: string;
  productOfferPercentage: number;
  stockQuantities: StockQuantity[];
}

export interface IUpdateProduct {
  categoryId: string;
  subCategoryId: string;
  productId: string;
  addProductRequest: AddProductRequest;
}
