import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    token: "",
    id: "",
    name: "",
    email: "",
    role: "",
    image: "",
    phone: "",
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.image = action.payload.image;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.phone = action.payload.phone;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.role = "";
      state.image = "";
      state.token = "";
      state.id = "";
      state.phone = "";
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
