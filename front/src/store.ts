import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import SideBarReducer from "./Slices/SidebarMenu/SideBarSlice";
import ProductSliceReducer from "./Slices/Products/ProductSlice";
import AuthSliceReducer from "./Slices/Auth/AuthSlice";
import OrderSliceReducer from "./Slices/Orders/OrderSlice";
import ModalSliceReducer from "./Slices/Modal/ModalSlice";

export const store = configureStore({
  reducer: {
    sideBar: SideBarReducer,
    products: ProductSliceReducer,
    User: AuthSliceReducer,
    order: OrderSliceReducer,
    modal: ModalSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
