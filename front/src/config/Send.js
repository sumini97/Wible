import axios from "axios";

const instance = axios.create({
  baseURL: "http://j6a303.p.ssafy.io/api",
  headers: {
    "Content-Type": "application/json",
    token: localStorage.getItem("idToken"),
  },
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
