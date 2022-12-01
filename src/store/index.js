import { configureStore } from "@reduxjs/toolkit";
import CheckoutSlice from "./reducers/checkoutSlice";
import OrderSlice from "./reducers/orderSlice";
import UserSlice from "./reducers/userSlice";
import ProductSlice from "./reducers/productSlice";
import CategorySlice from "./reducers/categorySlice";

const store = configureStore({
  reducer: {
    checkout: CheckoutSlice.reducer,
    user: UserSlice.reducer,
    orders: OrderSlice.reducer,
    products: ProductSlice.reducer,
    categories: CategorySlice.reducer,
  },
  devTools: true,
});

export default store;
