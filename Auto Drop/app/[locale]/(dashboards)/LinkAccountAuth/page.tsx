"use client"
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const TokenExtractor: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.id);
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
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACK_URL + "/auth/save/token",
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
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation: ",
          error
        );
      }
    };

    sendData();
    window.location.href = "/";
  }, []);

  return <div>hi</div>;
};

export default TokenExtractor;