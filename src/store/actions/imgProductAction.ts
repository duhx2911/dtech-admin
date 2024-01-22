import axios from "axios";
import { AppDispatch } from "..";
import { getAPI, postAPI } from "../../api";
import { DELETE_IMAGE, SAVE_IMAGES, SAVE_LIST_IMAGES } from "../constants";
import { ENV_BE } from "../../constants";

const getImageProduct = () => async (dispatch: AppDispatch) => {
  const response = await getAPI("/imageProduct");
  if (response.status) {
    dispatch({
      type: SAVE_IMAGES,
      images: response.data.data || [],
    });
  }
};
const getListProductImg = () => async (dispatch: AppDispatch) => {
  const response = await getAPI("/productimg");
  if (response.status) {
    dispatch({
      type: "SAVE_LIST_PRODUCT_DETAIL",
      productimgs: response.data.data || [],
    });
  }
};
const createImageProduct = (body: any) => async (dispatch: AppDispatch) => {
  const response = await postAPI("/imageProduct", body);
  if (response.status === 200) {
    if (response.data.status === "success") {
      if (response.data)
        dispatch({
          type: SAVE_LIST_IMAGES,
          image: response.data.data || [],
        });
    }
  }
};
const deleteImageProduct = (record: any) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${ENV_BE}/getPhoto/${record.imgUrl}`);
    const response = await axios.delete(`${ENV_BE}/imageProduct/${record.id}`);
    if (response.status === 200) {
      if (response.data.status === "success") {
        dispatch({
          type: DELETE_IMAGE,
          id: response.data.data,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export {
  getImageProduct,
  createImageProduct,
  getListProductImg,
  deleteImageProduct,
};
