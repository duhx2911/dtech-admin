import axios from "axios";
import { AppDispatch } from "..";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants";
import { ENV_BE } from "../../constants";

const login =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const response = await axios.post(`${ENV_BE}/auth/login`, {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        if (response.data.msg === "Đăng nhập thành công.") {
          dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });

          const userInfo = {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            username: response.data.user.username,
            fullname: response.data.user.fullname,
            email: response.data.user.email,
            avatar: response.data.user.avatar,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
      }
    } catch (error: any) {
      const message =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      dispatch({ type: USER_LOGIN_FAIL, payload: message });
    }
  };
const logout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export { login, logout };
