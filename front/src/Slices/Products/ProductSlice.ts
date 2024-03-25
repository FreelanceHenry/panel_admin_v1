import {  createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import axios from 'axios'
import { Products } from '../../pages/Products';
import { URL_HOST } from '../../lib/utils';

export interface ProductSliceState {
    list:  Products[];

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
  },
});
/* PARAMETERS STATE SLICE */

export const { getAll } = ProductSliceReducer.actions;

/* SELECTOR */
export const getProducts = (state: RootState) => state.products.list
/* SELECTOR */


/* ACTIONS FUNCTIONS */
export const getAllProduct =
(): AppThunk =>
async (dispatch, getState ) => {

    try {
        const response = await axios.get(`${URL_HOST}/api/products`)
 
        dispatch(getAll(response.data));
    } catch (error) {
        console.log(error);
    }
};
/* ACTIONS FUNCTIONS */

export default ProductSliceReducer.reducer;
