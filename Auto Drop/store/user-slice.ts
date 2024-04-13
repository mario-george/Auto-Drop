import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    token: "",
    id: "",
    name: "",
    storeName: "",
    storeLink: "",
    email: "",
    role: "",
    image: "",
    phone: "",
    sallaToken: "",
    aliExpressToken: "",
    country: "",
    createdAt: "",planName:""
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.storeName = action.payload.storeName;
      state.storeLink = action.payload.storeLink;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.image = action.payload.image;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.phone = action.payload.phone;
      state.sallaToken = action.payload.sallaToken;
      state.aliExpressToken = action.payload.aliExpressToken;
      state.country = action.payload.country;
      state.createdAt = action.payload.createdAt;
      state.planName = action.payload.planName;

      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.name = "";
      state.storeName = "";
      state.storeLink= "";
      state.email = "";
      state.role = "";
      state.image = "";
      state.token = "";
      state.id = "";
      state.phone = "";
      state.sallaToken = "";
      state.aliExpressToken = "";
      state.country = "";
      state.createdAt = "";
      state.planName = "";
    },
    updateToken(state, action) {
      const { tokenType, token } = action.payload;

      if (tokenType === "Salla") {
        state.sallaToken = token;
      } else if (tokenType === "AliExpress") {
        state.aliExpressToken = token;
      }
    },changeSubscription:(state,action)=>{
      state.planName = action.payload.planName;
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice;
