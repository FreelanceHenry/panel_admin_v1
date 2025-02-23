import {  createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import axios from 'axios'
import { URL_HOST_DEV, URL_HOST_PROD  } from '../../lib/utils';

export interface ProductSliceState {
    list:  any[];

}
/* INITIAL STATE */
const initialState: ProductSliceState = {
    list: []
};
/* INITIAL STATE */

/* PARAMETERS STATE SLICE */
export const ProductSliceReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getAll: (state, action) => {
        state.list = action.payload;
      },
      addProduct : (state, action) => {
        state.list.push(action.payload);
      },
      refresh: (state, action) => {
        state.list = action.payload;
      },
  },
});
/* PARAMETERS STATE SLICE */

export const { getAll, addProduct, refresh } = ProductSliceReducer.actions;

/* SELECTOR */
export const getProducts = (state: RootState) => state.products.list
/* SELECTOR */


/* ACTIONS FUNCTIONS */
export const getAllProduct =
(): AppThunk =>
async (dispatch, getState ) => {

    try {
        const response = await axios.get(`${URL_HOST_PROD}/api/v1/Products`)
        dispatch(getAll(response.data));
    } catch (error) {
        console.log(error);
    }
};

export const createProducts = () : AppThunk => async (dispatch) => {
    try {
        await axios.post(`${URL_HOST_PROD}/api/v1/Products/add`)
    } catch (error) {
    console.log(error);
    }
}
/* ACTIONS FUNCTIONS */

export default ProductSliceReducer.reducer;
