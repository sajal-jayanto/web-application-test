import axios from "axios";

const axios_client = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 3000,
});

axios_client.interceptors.request.use(
  (config) => { return config; },
  (error) => { console.log(error); Promise.reject(error) }
);

axios_client.interceptors.response.use(
  (response) => { return response.data },
  (error) => {
    return Promise.resolve({ data: error.response?.data || null });
  }
);

export { axios_client };