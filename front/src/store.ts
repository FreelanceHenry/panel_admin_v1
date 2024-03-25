import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import  SideBarReducer  from './Slices/SidebarMenu/SideBarSlice';
import  ProductSliceReducer  from './Slices/Products/ProductSlice';
import  AuthSliceReducer  from './Slices/Auth/AuthSlice';


export const store = configureStore({
  reducer: {
   sideBar:  SideBarReducer,
   products: ProductSliceReducer,
   User: AuthSliceReducer
  }
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;