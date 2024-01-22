import { ProductDetails, Products } from "../../constants";

const productReducer = (
  state: { products: Products[]; productdetails: ProductDetails[] } = {
    products: [],
    productdetails: [],
  },
  action: {
    products: Products[];
    product: Products;
    productdetails: ProductDetails[];
    productdetail: ProductDetails;
    id: number;
    type: string;
  }
) => {
  switch (action.type) {
    case "SAVE_PRODUCTS": {
      return { ...state, products: action.products || [] };
    }
    case "SAVE_PRODUCT_DETAIL": {
      return { ...state, productdetails: action.productdetails || [] };
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
    case "SAVE_LIST_PRODUCT_DETAIL": {
      let lstProductDetail = state.productdetails;
      if (action.productdetail) {
        lstProductDetail = [...lstProductDetail, action.productdetail];
      }
      return {
        ...state,
        productdetails: lstProductDetail,
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
    case "UPDATE_PRODUCT_DETAIL": {
      let lstProductDetail = state.productdetails;
      let newLstProductDetail;
      if (action.productdetail) {
        newLstProductDetail = lstProductDetail.map((item: ProductDetails) => {
          if (item.id === action.productdetail.id) {
            return action.productdetail;
          }
          return item;
        });
      }

      return {
        ...state,
        productdetails: newLstProductDetail,
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
    case "DELETE_PRODUCT_DETAIL": {
      let lstProductDetail = state.productdetails;
      let newLstProductDetail;
      if (action.id) {
        newLstProductDetail = lstProductDetail.filter(
          (item: ProductDetails) => item.id !== Number(action.id)
        );
      }
      return {
        ...state,
        productdetails: newLstProductDetail,
      };
    }
    default:
      return state;
  }
};

export { productReducer };
