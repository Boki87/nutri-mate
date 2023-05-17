import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

export interface UserState {
  user: null | User;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logout } = userSlice.actions;

export default userSlice.reducer;
