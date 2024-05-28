import { createSlice, createAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store";
import { URL_HOST_DEV, URL_HOST_PROD } from "../../lib/utils";
import { ModalSlice } from "./types";

/* INITIAL STATE */
const initialState: ModalSlice = {
  isOpen: false,
  dataInputs: [],
  data: [],
  endpoint: "",
  reducerName: ""
};
/* INITIAL STATE */

/* PARAMETERS STATE SLICE */
export const ModalSliceReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeStatusModal: (state, action) => {
      state.isOpen = action.payload;
    },
    changeDataInputsModal: (state, action) => {
      state.dataInputs = action.payload;
    },
    changeDataModal: (state, action) => {
      state.data = action.payload;
    },
    changeEndpoint: (state, action) => {
      state.endpoint = action.payload;
    },
    changeReducerName: (state, action) => {
      state.reducerName = action.payload;
    },
  },
});
/* PARAMETERS STATE SLICE */

export const {
   changeStatusModal, 
  changeDataInputsModal, 
  changeEndpoint,
  changeReducerName
   } =
  ModalSliceReducer.actions;

/* SELECTOR */
export const isOpenModal = (state: RootState) => state.modal.isOpen;
export const isOpenData = (state: RootState) => state.modal.dataInputs;
export const endpointModal = (state: RootState) => state.modal.endpoint;
export const reducerNameModal = (state: RootState) => state.modal.reducerName;
/* SELECTOR */

/* ACTIONS FUNCTIONS */

export const isDataInputsAction =
  (data: Array<any>): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(changeDataInputsModal(data));
    } catch (error) {
      console.log(error);
    }
  };

export const isOpenAction =
  (active: boolean): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(changeStatusModal(active));
    } catch (error) {
      console.log(error);
    }
  };

export const isCloseAction =
  (active: boolean): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(changeStatusModal(active));
    } catch (error) {
      console.log(error);
    }
  };

export const addEndpointAction =
  (endpoint: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(changeEndpoint(endpoint));
    } catch (error) {
      console.log(error);
    }
  };
  
export const reducerNameAction =
  (endpoint: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(changeReducerName(endpoint));
    } catch (error) {
      console.log(error);
    }
  };
  

/* ACTIONS FUNCTIONS */

export default ModalSliceReducer.reducer;
