import { AppDispatch } from "..";
import { getAPI, putAPI } from "../../api";
import { SAVE_ORDER, UPDATE_ORDER } from "../constants";

const getOrder = () => async (dispatch: AppDispatch) => {
  const response = await getAPI("/order");
  if (response.status) {
    if (response.data.status === "success") {
      dispatch({
        type: SAVE_ORDER,
        orders: response.data.data || [],
      });
    }
  }
};
const updateOrder =
  (body: any, notify: any, closeDrawer: any) =>
  async (dispatch: AppDispatch) => {
    const response = await putAPI(`/order/${body.id}`, body);
    if (response.status === 200) {
      if (response.data.status === "success") {
        dispatch({
          type: UPDATE_ORDER,
          order: response.data.data,
        });
        closeDrawer();
        notify();
      }
    }
  };
export { getOrder, updateOrder };
