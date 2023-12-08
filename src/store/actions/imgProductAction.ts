import { AppDispatch } from "..";
import { getAPI, postAPI } from "../../api";
import { SAVE_IMAGES, SAVE_LIST_IMAGES } from "../constants";

const getImageProduct = () => async (dispatch: AppDispatch) => {
  const response = await getAPI("/imageProduct");
  if (response.status) {
    dispatch({
      type: SAVE_IMAGES,
      images: response.data.data || [],
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

      // console.log("test", response.data);
    }
  }
};
export { getImageProduct, createImageProduct };
