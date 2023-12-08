import axios from "axios";
import { ACCESS_TOKEN, ENV_BE, REFRESH_TOKEN } from "../constants";
// console.log(getToken);

axios.defaults.headers.common["Authorization"] = "token";
axios.defaults.baseURL = ENV_BE;

export const getAPI = (path: string) => {
  return axios.get(path);
};

// POST
export const postAPI = (path: string, body: any) => {
  return axios.post(path, body);
};

export const putAPI = (path: string, body: any) => {
  return axios.put(path, body);
};

export const deleteAPI = (path: string) => {
  return axios.delete(path);
};

export const getAuthAPI = async ({
  path,
  params,
  query,
}: {
  path: string;
  params?: string;
  query?: string;
}) => {
  const getToken = localStorage.getItem(ACCESS_TOKEN);

  try {
    const response = await axios.get(`${path}`, {
      params,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    return response;
  } catch (error: any) {
    console.log(error);

    // check token expired - kiem tra token het han => refresh lai acccess new.
    if (error && error.response && error.response.status === 401) {
      if (localStorage.getItem(REFRESH_TOKEN)) {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        const refreshTokenResponse = await postAuthAPI({
          path: "auth/refresh-token",
          body: {
            refreshToken,
          },
        });
        localStorage.setItem(
          ACCESS_TOKEN,
          refreshTokenResponse.data.accessToken
        );
        return refreshTokenResponse;
      }
    }
    return error;
  }
};
// POST
export const postAuthAPI = ({ path, body }: { path: string; body: any }) => {
  const getToken = localStorage.getItem(ACCESS_TOKEN);
  return axios.post(path, body, {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });
};
