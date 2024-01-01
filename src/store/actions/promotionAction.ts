import { message } from "antd";
import { AppDispatch } from "..";
import { getAPI, postAPI } from "../../api";
import { CREATE_DISCOUNT } from "../constants";

const getListPromotion = () => async (dispatch: AppDispatch) => {
  const response = await getAPI("/discount");
  if (response.status) {
    dispatch({
      type: "SAVE_PROMOTION",
      discounts: response.data.data || [],
    });
  }
};
const createPromotion =
  (body: any, callback?: any) => async (dispatch: AppDispatch) => {
    const response = await postAPI("/discount", body);
    if (response.status === 200) {
      if (response.data.status === "success") {
        if (response.data)
          dispatch({
            type: CREATE_DISCOUNT,
            discount: response.data.data || [],
          });
        if (callback) {
          callback();
        }
      }
    }
  };

export { getListPromotion, createPromotion };
