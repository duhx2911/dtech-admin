import { AppDispatch } from "..";
import { deleteAPI, getAPI, postAPI, putAPI } from "../../api";

const getListProduct = () => async (dispatch: AppDispatch) => {
  const response = await getAPI("/products");
  if (response.status) {
    dispatch({
      type: "SAVE_PRODUCTS",
      products: response.data.data || [],
    });
  }
};
const createProduct =
  (body: any, callback: any) => async (dispatch: AppDispatch) => {
    const response = await postAPI("/products", body);
    if (response.status === 200) {
      if (response.data.status === "success") {
        if (response.data)
          dispatch({
            type: "SAVE_LIST_PRODUCTS",
            product: response.data.data || [],
          });

        // console.log("test", response.data);
      }
    }
    if (callback) {
      callback(response.data.status);
    }
  };
const updateProduct =
  (body: any, callback: any) => async (dispatch: AppDispatch) => {
    const response = await putAPI(`/product/${body.id}`, body);
    if (response.status === 200) {
      if (response.data.status === "success") {
        if (response.data)
          dispatch({
            type: "UPDATE_LIST_PRODUCTS",
            product: response.data.data || [],
          });
      }
    }
    if (callback) {
      callback(response.data.status);
    }
  };
const deleteProduct =
  (id: number, callback: any) => async (dispatch: AppDispatch) => {
    const response = await deleteAPI(`/product/${id}`);
    if (response.status) {
      if (response.data.status === "success") {
        if (response.data) {
          dispatch({
            type: "DELETE_PRODUCT",
            id: response.data.data || [],
          });
        }
      }
    }
    if (callback) {
      callback(response.data.status);
    }
  };
export { createProduct, getListProduct, updateProduct, deleteProduct };
