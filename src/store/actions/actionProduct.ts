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
const getProductDetail = () => async (dispatch: AppDispatch) => {
  const response = await getAPI("/productdetail");
  if (response.status) {
    dispatch({
      type: "SAVE_PRODUCT_DETAIL",
      productdetails: response.data.data || [],
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
const createProductDetail =
  (body: any, callback: any) => async (dispatch: AppDispatch) => {
    const response = await postAPI("/productdetail", body);
    if (response.status === 200) {
      if (response.data.status === "success") {
        if (response.data)
          dispatch({
            type: "SAVE_LIST_PRODUCT_DETAIL",
            productdetail: response.data.data || [],
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
    const response = await putAPI(`/products/${body.id}`, body);
    console.log(response);
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
const updateProductDetail =
  (body: any, callback: any) => async (dispatch: AppDispatch) => {
    const response = await putAPI(`/productdetail/${body.id}`, body);
    console.log(response);
    if (response.status === 200) {
      if (response.data.status === "success") {
        if (response.data)
          dispatch({
            type: "UPDATE_PRODUCT_DETAIL",
            productdetail: response.data.data || [],
          });
      }
    }
    if (callback) {
      callback(response.data.status);
    }
  };
const deleteProduct =
  (id: number, callback: any) => async (dispatch: AppDispatch) => {
    const response = await deleteAPI(`/products/${id}`);
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
const deleteProductDetail =
  (id: number, callback: any) => async (dispatch: AppDispatch) => {
    const response = await deleteAPI(`/productdetail/${id}`);
    if (response.status) {
      if (response.data.status === "success") {
        if (response.data) {
          dispatch({
            type: "DELETE_PRODUCT_DETAIL",
            id: response.data.data || [],
          });
        }
      }
    }
    if (callback) {
      callback(response.data.status);
    }
  };
export {
  createProduct,
  getListProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  createProductDetail,
  updateProductDetail,
  deleteProductDetail,
};
