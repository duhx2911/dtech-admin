import { CREATE_DISCOUNT } from "../constants";

const promotionReducer = (
  state: { discounts: any } = {
    discounts: [],
  },
  action: {
    discounts: any;
    discount: any;
    type: string;
  }
) => {
  switch (action.type) {
    case "SAVE_PROMOTION": {
      return {
        ...state,
        discounts: action.discounts || [],
      };
    }
    case CREATE_DISCOUNT: {
      let listDiscount = state.discounts;
      if (action.discount) {
        listDiscount = [...listDiscount, action.discount];
      }
      return {
        ...state,
        discounts: listDiscount,
      };
    }
    default:
      return state;
  }
};
export { promotionReducer };
