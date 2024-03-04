"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { userActions } from "@/store/user-slice";
import axiosInstance from "../_components/shared/AxiosInstance";

const TokenExtractor: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    // Send a request to the API when the component mounts
    // Get the user token from the Redux store

    // Get the access token and refresh token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    const tokenType = urlParams.get("tokenType");
    const sendData = async () => {
      try {
        const resp = await axiosInstance.post("/auth/saveToken", {
          tokenType,
          accessToken,
          refreshToken,
          userId,
        });
        console.log("resp", resp);
      /*   const response = await fetch(
          process.env.NEXT_PUBLIC_BACK_URL + "auth/saveToken",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accessToken,
              refreshToken,
              userId,
              tokenType,
            }),
          }
        ); */

      /*   if (resp.status >= 200 && resp.status < 300)  {
          throw new Error("Network response was not ok");
        } */

        const data = resp
        console.log("tokenType", tokenType);
        console.log("data.sallaToken", data.data.user.sallaToken);
        console.log("data.aliExpressToken", data.data.user.aliExpressToken);
        console.log("data", data);
        if (tokenType === "Salla") {
          dispatch(
            userActions.updateToken({
              tokenType: "Salla",
              token: data.data.user.sallaToken,
            })
          );
        } else if (tokenType === "AliExpress") {
          dispatch(
            userActions.updateToken({
              tokenType: "AliExpress",
              token: data.data.user.aliExpressToken,
            })
          );
        }
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation: ",
          error
        );
      }
    };

    sendData();
    // window.location.href = "/";
  }, []);

  return <div></div>;
};

export default TokenExtractor;
