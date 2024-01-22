import { ImageProduct } from "../../constants";
import {
  DELETE_IMAGE,
  SAVE_IMAGES,
  SAVE_LIST_IMAGES,
  UPDATE_LIST_IMAGE,
} from "../constants";

const imageProductReducer = (
  state: { images: ImageProduct[]; productimgs: any } = {
    images: [],
    productimgs: [],
  },
  action: {
    images: ImageProduct[];
    image: ImageProduct;
    productimgs: any;
    id: number;
    type: string;
  }
) => {
  switch (action.type) {
    case SAVE_IMAGES: {
      return { ...state, images: action.images || [] };
    }
    case "SAVE_LIST_PRODUCT_DETAIL": {
      return { ...state, productimgs: action.productimgs || [] };
    }
    case SAVE_LIST_IMAGES: {
      let listImage = state.images;
      if (action.image) {
        listImage = [...listImage, action.image];
      }
      return {
        ...state,
        images: listImage,
      };
    }
    case UPDATE_LIST_IMAGE: {
      let listImage = state.images;
      let newListImage;
      if (action.image) {
        newListImage = listImage.map((item: ImageProduct) => {
          if (item.id === action.image.id) {
            return action.image;
          }
          return item;
        });
      }

      return {
        ...state,
        images: newListImage,
      };
    }
    case DELETE_IMAGE: {
      let listImage = state.images;
      let newListImage;
      if (action.id) {
        newListImage = listImage.filter(
          (item: ImageProduct) => item.id !== Number(action.id)
        );
      }
      return {
        ...state,
        images: newListImage,
      };
    }
    default:
      return state;
  }
};

export { imageProductReducer };
