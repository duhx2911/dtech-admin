import axios from "axios";
import { AppDispatch } from "..";
import { deleteAPI, getAPI } from "../../api";
import { ENV_BE } from "../../constants";

const getListStaff = () => async (dispatch: AppDispatch) => {
  const response = await getAPI("/staff");
  if (response.status) {
    dispatch({
      type: "SAVE_STAFF",
      staffs: response.data.data || [],
    });
  }
};
const createStaff =
  (body: any, callback?: any) => async (dispatch: AppDispatch) => {
    const res = await axios.post(`${ENV_BE}/auth/register`, body);
    if (res.status === 200) {
      if (res.data.status === "success") {
        dispatch({
          type: "SAVE_LIST_STAFF",
          staff: res.data.data || [],
        });
        if (callback) {
          callback();
        }
      }
    }
  };
const updateStaff =
  (body: any, callback?: any) => async (dispatch: AppDispatch) => {
    const res = await axios.post(`${ENV_BE}/auth/update-user`, body);
    if (res.status === 200) {
      if (res.data.status === "success") {
        dispatch({
          type: "UPDATE_LIST_STAFF",
          staff: res.data.data || [],
        });
        if (callback) {
          callback();
        }
      }
    }
  };
const deleteStaff =
  (id: number, callback?: any) => async (dispatch: AppDispatch) => {
    const response = await deleteAPI(`/user/${id}`);
    if (response.status) {
      if (response.data.status === "success") {
        if (response.data) {
          dispatch({
            type: "DELETE_STAFF",
            id: response.data.data || [],
          });
        }
      }
    }
    if (callback) {
      callback(response.data.status);
    }
  };
export { getListStaff, createStaff, deleteStaff, updateStaff };
