import {  createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import axios from 'axios'
import { URL_HOST_DEV, URL_HOST_PROD  } from '../../lib/utils';
import { Order } from './type';

export interface OrderSliceState {
    list: Order[]

}
/* INITIAL STATE */
const initialState: OrderSliceState = {
    list: []
};
/* INITIAL STATE */

/* PARAMETERS STATE SLICE */
export const OrderSliceReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getAllOrderForOrganization: (state, action) => {
        state.list = action.payload;
      },
  },
});
/* PARAMETERS STATE SLICE */

export const { getAllOrderForOrganization } = OrderSliceReducer.actions;

/* SELECTOR */
export const getOrders = (state: RootState) => state.order.list
/* SELECTOR */


/* ACTIONS FUNCTIONS */
export const getAllOrders =
(): AppThunk =>
async (dispatch, getState ) => {
        const token = window.localStorage.getItem('token')
        console.log(token);
    try {
        const response = await axios.get(`${URL_HOST_PROD}/api/v1/Order`, {
            headers: { Authorization:`Bearer ${token}`}
        })
 
        console.log(response);
        dispatch(getAllOrderForOrganization(response.data));
    } catch (error) {
        console.log(error);
    }
};
/* ACTIONS FUNCTIONS */

export default OrderSliceReducer.reducer;
