import { Order } from "../../constants";
import { SAVE_ORDER, UPDATE_ORDER } from "../constants";

export const orderReducer = (
  state: { orders: Order[] } = { orders: [] },
  action: { type: string; orders: Order[]; order: Order }
) => {
  switch (action.type) {
    case SAVE_ORDER:
      return { ...state, orders: action.orders || [] };
    case UPDATE_ORDER: {
      let listOrder = state.orders;
      let newListOrder;
      if (action.order) {
        newListOrder = listOrder.map((item: Order) => {
          if (item.id === action.order.id) {
            return action.order;
          }
          return item;
        });
      }

      return {
        ...state,
        orders: newListOrder,
      };
    }

    default:
      return state;
  }
};
