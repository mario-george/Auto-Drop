import axios from "axios";
import { Request, Response } from "express";
import crypto from "crypto";
import CryptoJS from "crypto-js";

let aliexpressData = {
  callbackUrl:
    "https://auto-drop-rtxb.onrender.com/api/v1/auth/auth-aliexpress/callback/",
  appKey: "34271827",
  appSecret: "2c5bcc0958a9d9abd339232f1b31712e",
};
export const aliexpressAuth = (req: Request, res: Response) => {
  const url = `https://api-sg.aliexpress.com/oauth/authorize?client_id=${aliexpressData.appKey}&redirect_uri=${aliexpressData.callbackUrl}&state=1212&&response_type=code`;
  res.redirect(url);
};

export const aliexpressCallback = async (req: Request, res: Response) => {
  const aliexpressData = {
    appKey: "34271827",
    appSecret: "2c5bcc0958a9d9abd339232f1b31712e",
  };

  const code = req.query.code;
  const timestamp = Date.now(); // Unix timestamp in seconds

  // Sort parameters and values according to the parameter name in ASCII table
  const sortedParams = {
    app_key: aliexpressData.appKey,
    code,
    sign_method: "sha256",
    timestamp,
  };

  // Concatenate the sorted parameters and their values into a string
  let signString = "/auth/token/create";
  for (const [key, value] of Object.entries(sortedParams)) {
    signString += key + value;
  }

  // Generate signature
  const sign = crypto.createHash("sha256").update(signString).digest("hex");

  const data = {
    ...sortedParams,
    sign,
    uuid: "uuid", 
  };

  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    if (value) formData.append(key, value.toString());
  }

  try {
    const response = await axios.post(
      "https://api-sg.aliexpress.com/rest/auth/token/create",
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    const respData = response.data;
    console.log(respData);

    res.status(200).json(respData);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
