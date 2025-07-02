import axios from "axios";
import userService from "./userService";
import { toast } from "react-toastify";
import { clearSession, getSessionType, setSessionType } from "./sessionService";

const axiosJWT = axios.create({
  withCredentials: true,
});

axiosJWT.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await userService.refreshAccessToken();
        return axiosJWT(originalRequest);
      } catch (err) {
        if (getSessionType() !== "guest") {
          toast.info("Phiên đăng nhập đã hết hạn", {
            onClose: () => {
              window.location.href = "/";
            },
          });
          clearSession();
          setSessionType("guest");
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosJWT;
