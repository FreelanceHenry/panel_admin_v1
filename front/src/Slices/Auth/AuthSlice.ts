import { createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store";
import axios from "axios";
import {
  actionStorage,
  localStorage,
  URL_HOST_DEV,
  URL_HOST_PROD,
} from "../../lib/utils";

export interface AuthSlice {
  token: string | null;
}
/* INITIAL STATE */
const initialState: AuthSlice = {
  token: null || window.localStorage.getItem("token"),
};
/* INITIAL STATE */

/* PARAMETERS STATE SLICE */
export const AuthSliceReducer = createSlice({
  name: "User",
  initialState,
  reducers: {
    login(state, action) {
      localStorage("token", actionStorage.POST, action?.payload?.token);

      state.token = action.payload.token;
    },
    logout(state) {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      state.token = null;
    },
  },
});
/* PARAMETERS STATE SLICE */

export const { login, logout } = AuthSliceReducer.actions;

/* SELECTOR */
export const token = (state: RootState) => state.User.token;
/* SELECTOR */

/* ACTIONS FUNCTIONS */
export const isLogin =
  (username: string, password: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const res = await axios.post(`${URL_HOST_PROD}/api/v1/Auth/login`, {
        username,
        password,
      });

      console.log(res);
      dispatch(login(res.data));
    } catch (error) {
      console.log(error);
    }
  };

export const Logout = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(logout());
  } catch (error) {
    console.log(error);
  }
};

/* ACTIONS FUNCTIONS */

export default AuthSliceReducer.reducer;
