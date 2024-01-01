import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "redux";
import { productReducer } from "./reducers/productReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { staffReducer } from "./reducers/staffReducer";
import { userLoginReducer } from "./reducers/loginReducer";
import { imageProductReducer } from "./reducers/imgProductReducer";
import { orderReducer } from "./reducers/orderReducer";
import { promotionReducer } from "./reducers/promotionReducer";
// import thunk from "redux-thunk";

const reducer = combineReducers({
  // User
  userLogin: userLoginReducer,
  productReducer: productReducer,
  categoryReducer: categoryReducer,
  staffReducer: staffReducer,
  imageProductReducer: imageProductReducer,
  order: orderReducer,
  promotionReducer: promotionReducer,
});
// Login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};
// const middleware = [thunk];
const store = configureStore({
  reducer,
  preloadedState: initialState,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
