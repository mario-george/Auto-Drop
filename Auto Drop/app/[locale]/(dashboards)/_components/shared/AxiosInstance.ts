import { store } from "@/store";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { userActions } from "@/store/user-slice";
const { BASE_URL } = {
  BASE_URL: "http://localhost:10000/api/v1/",
};
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(function (
  request: InternalAxiosRequestConfig<AxiosRequestConfig>
) {
  const token = localStorage.getItem("token");

  if (token) request.headers.Authorization = "Bearer " + token;

  return request;
});

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response && error.response.status === 401) {
      // Dispatch logout action
      store.dispatch(userActions.logout());
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
