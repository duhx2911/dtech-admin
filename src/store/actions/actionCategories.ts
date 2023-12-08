import { AppDispatch } from "..";
import { deleteAPI, getAPI, postAPI, putAPI } from "../../api";

const getListCategory = () => async (dispatch: AppDispatch) => {
  const response = await getAPI("/categories");
  if (response.status) {
    dispatch({
      type: "SAVE_CATEGORIES",
      categories: response.data.data || [],
    });
  }
};
const createCategory =
  (body: any, callback: any) => async (dispatch: AppDispatch) => {
    const response = await postAPI("/categories", body);
    if (response.status === 200) {
      if (response.data.status === "success") {
        if (response.data)
          dispatch({
            type: "SAVE_LIST_CATEGORIES",
            category: response.data.data || [],
          });

        // console.log("test", response.data);
      }
    }
    if (callback) {
      callback(response.data.status);
    }
  };
const updateCategory =
  (body: any, id: number, callback: any) => async (dispatch: AppDispatch) => {
    const response = await putAPI(`/category/${id}`, body);
    if (response.status === 200) {
      if (response.data.status === "success") {
        if (response.data)
          dispatch({
            type: "UPDATE_LIST_CATEGORIES",
            category: response.data.data || [],
          });
      }
    }
    if (callback) {
      callback(response.data.status);
    }
  };
const deleteCategory =
  (id: number, callback: any) => async (dispatch: AppDispatch) => {
    const response = await deleteAPI(`/category/${id}`);
    if (response.status) {
      if (response.data.status === "success") {
        if (response.data) {
          dispatch({
            type: "DELETE_CATEGORY",
            id: response.data.data || [],
          });
        }
      }
    }
    if (callback) {
      callback(response.data.status);
    }
  };
export { getListCategory, createCategory, updateCategory, deleteCategory };
