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
    sallaToken: "",
    aliExpressToken: "",
    country:""
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
      state.sallaToken = action.payload.sallaToken;
      state.aliExpressToken = action.payload.aliExpressToken;
      state.country = action.payload.country;
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
      state.sallaToken = "";
      state.aliExpressToken = "";
      state.country = "";
    },
    updateToken(state, action) {
      const { tokenType, token } = action.payload;
      console.log("here");
      console.log(token);
      console.log(tokenType);
      if (tokenType === "Salla") {
        state.sallaToken = token;
      } else if (tokenType === "AliExpress") {
        state.aliExpressToken = token;
      }
      console.log(state.aliExpressToken);
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
