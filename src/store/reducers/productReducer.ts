import { Products } from "../../constants";

const productReducer = (
  state: { products: Products[] } = {
    products: [],
  },
  action: { products: Products[]; product: Products; id: number; type: string }
) => {
  switch (action.type) {
    case "SAVE_PRODUCTS": {
      return { ...state, products: action.products || [] };
    }
    case "SAVE_LIST_PRODUCTS": {
      let lstProduct = state.products;
      if (action.product) {
        lstProduct = [...lstProduct, action.product];
      }
      return {
        ...state,
        products: lstProduct,
      };
    }
    case "UPDATE_LIST_PRODUCTS": {
      let lstProduct = state.products;
      let newLstProduct;
      if (action.product) {
        newLstProduct = lstProduct.map((item: Products) => {
          if (item.id === action.product.id) {
            return action.product;
          }
          return item;
        });
      }

      return {
        ...state,
        products: newLstProduct,
      };
    }
    case "DELETE_PRODUCT": {
      let lstProduct = state.products;
      let newLstProduct;
      if (action.id) {
        newLstProduct = lstProduct.filter(
          (item: Products) => item.id !== Number(action.id)
        );
      }
      return {
        ...state,
        products: newLstProduct,
      };
    }
    default:
      return state;
  }
};

export { productReducer };
