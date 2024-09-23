import axios from "axios";

const BASE_URL = "https://your-api-base-url.com/";

const http = axios.create({
  baseURL: BASE_URL,
});
