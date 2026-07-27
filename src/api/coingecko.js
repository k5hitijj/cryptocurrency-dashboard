import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

api.interceptors.request.use((config) => {
  config.params = {
    ...(config.params || {}),
    x_cg_demo_api_key: process.env.REACT_APP_COINGECKO_API_KEY,
  };

  return config;
});

export default api;