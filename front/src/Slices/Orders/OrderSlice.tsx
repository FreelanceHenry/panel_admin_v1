import {  createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import axios from 'axios'
import { URL_HOST_DEV, URL_HOST_PROD  } from '../../lib/utils';
import { InfoOrder, Order } from './type';

export interface OrderSliceState {
    list: Order[]
    orderInfo: InfoOrder,
    loading: boolean
}
/* INITIAL STATE */
const initialState: OrderSliceState = {
    list: [],
    orderInfo: {
        products: [],
        quotes: []
    },
    loading: false
};
/* INITIAL STATE */

/* PARAMETERS STATE SLICE */
export const OrderSliceReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLoading: (state, action) => {
        state.loading = action.payload
    },
    getAllOrderForOrganization: (state, action) => {
        state.list = action.payload;
      },
    getProductsAndQuotes : (state, action) => {
        state.orderInfo = action.payload;
    }
  },
});
/* PARAMETERS STATE SLICE */

export const { getAllOrderForOrganization , getProductsAndQuotes, setLoading} = OrderSliceReducer.actions;

/* SELECTOR */
export const getOrders = (state: RootState) => state.order.list
export const getOrdersInfo = (state: RootState) => state.order.orderInfo
export const loadingOrderInfo = (state: RootState) => state.order.loading

/* SELECTOR */


/* ACTIONS FUNCTIONS */
export const getAllOrders =
(): AppThunk =>
async (dispatch, getState ) => {
        const token = window.localStorage.getItem('token')
    try {
        const response = await axios.get(`${URL_HOST_PROD}/api/v1/Order`, {
            headers: { Authorization:`Bearer ${token}`}
        })
 
        dispatch(getAllOrderForOrganization(response.data));
    } catch (error) {
        console.log(error);
    }
};


export const getProductAndQuotes =
(orderId:number): AppThunk =>
async (dispatch, getState ) => {
        const token = window.localStorage.getItem('token')
        dispatch(setLoading(true))
    try {
        const response = await axios.get(`${URL_HOST_DEV}/api/v1/Order/${orderId}`, {
            headers: { Authorization:`Bearer ${token}`}
        })
 
        dispatch(getProductsAndQuotes(response.data));
        dispatch(setLoading(false))
    } catch (error) {
        
        console.log(error);
    }
};
/* ACTIONS FUNCTIONS */

export default OrderSliceReducer.reducer;
