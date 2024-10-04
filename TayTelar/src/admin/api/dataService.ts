import axios from "axios";
import { IAddProductRequest } from "../types/add product/request.type";
import { IUpdateProduct } from "../types/update product/request.type";

const BASE_URL = "http://localHost:8085";

const http = axios.create({
  baseURL: BASE_URL,
});

export const addProduct = async (data: IAddProductRequest) => {
  const res = await http.post("/api/product/addProduct", data);
  return res.data;
};

export const uploadImages = async (data: FormData) => {
  console.log("Uploading images...", data);
  const res = await http.post("/api/product/uploadFiles", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getProducts = async () => {
  const res = await http.get("/api/product/getAllProducts");
  return res.data;
};

export const getProductByID = async (id: string) => {
  const res = await http.get(
    `/api/product/getProductByProductId?productId=${id}`
  );
  return res.data;
};

export const updateProduct = async (data: IUpdateProduct) => {
  const res = await http.put("/api/product/updateProduct", data);
  return res.data;
};
