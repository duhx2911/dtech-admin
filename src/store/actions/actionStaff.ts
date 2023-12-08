import { AppDispatch } from "..";
import { getAPI } from "../../api";

const getListStaff = () => async (dispatch: AppDispatch) => {
  const response = await getAPI("/staff");
  if (response.status) {
    dispatch({
      type: "SAVE_STAFF",
      staffs: response.data.data || [],
    });
  }
};
export { getListStaff };
