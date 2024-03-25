import { createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store";
import axios from "axios";
import { User } from "@/pages/Products";
import { actionStorage, localStorage } from "@/lib/utils";

export interface AuthSlice {
  user: User | null;
  token: string | null;
}
/* INITIAL STATE */
const initialState: AuthSlice = {
  user: null || localStorage("user", actionStorage.GET),
  token: null || localStorage("token", actionStorage.GET),
};
/* INITIAL STATE */

/* PARAMETERS STATE SLICE */
export const AuthSliceReducer = createSlice({
  name: "User",
  initialState,
  reducers: {
    login(state, action) {
      localStorage(
        "user",
        actionStorage.POST,
        action?.payload?.userWithoutPassword
      );

      localStorage("token", actionStorage.POST, action?.payload?.token);
      (state.user = action?.payload?.userWithoutPassword),
        (state.token = action.payload.token);
    },
    logout(state) {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
});
/* PARAMETERS STATE SLICE */

export const { login, logout } = AuthSliceReducer.actions;

/* SELECTOR */
export const session = (state: RootState) => state.User.user;
export const token = (state: RootState) => state.User.token;
/* SELECTOR */

/* ACTIONS FUNCTIONS */
export const isLogin =
  (username: string, password: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/Auth/login`, {
        username,
        password,
      });

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
