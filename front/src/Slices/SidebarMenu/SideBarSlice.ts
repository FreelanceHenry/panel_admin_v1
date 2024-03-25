import {  createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import { actionStorage, localStorage } from '../../lib/utils';

export interface SiderBarMenuState {
    currentPage: string | null;

}
/* INITIAL STATE */
const initialState: SiderBarMenuState = {
    currentPage: '' || null
};
/* INITIAL STATE */

/* PARAMETERS STATE SLICE */
export const SiderBarMenuReducer = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    activeSideBar: (state, action) => {
      const res  = localStorage('page', actionStorage.POST,action.payload ) as string
        state.currentPage =  res 
      },
  },
});
/* PARAMETERS STATE SLICE */

export const { activeSideBar } = SiderBarMenuReducer.actions;

/* SELECTOR */
export const currentPageActive = (state: RootState) => state.sideBar.currentPage
/* SELECTOR */


/* ACTIONS FUNCTIONS */
export const postCurrentPage =
(currentPage: string): AppThunk =>
(dispatch, getState ) => {
    dispatch(activeSideBar(currentPage));
};
/* ACTIONS FUNCTIONS */

export default SiderBarMenuReducer.reducer;
