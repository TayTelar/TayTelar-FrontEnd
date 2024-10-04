interface Color {
  color: string;
  colorCode: string;
  quantity: number;
}

interface Stock {
  size: number;
  productPrice: number;
  colorQuantities: Color[];
}

export interface IAddProductRequest {
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
  stockQuantities: Stock[];
}
