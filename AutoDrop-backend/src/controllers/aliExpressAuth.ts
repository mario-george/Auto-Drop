import axios from "axios";
import { Request, Response } from "express";
let aliexpressData = {
  callbackUrl: "https://auto-drop-rtxb.onrender.com/api/v1/auth/auth-aliexpress/callback/",
  appKey: "34271827",
  appSecret: "2c5bcc0958a9d9abd339232f1b31712e",
};
export const aliexpressAuth = (req: Request, res: Response) => {
  const url = `https://api-sg.aliexpress.com/oauth/authorize?client_id=${
    aliexpressData.appKey
  }&redirect_uri=${
    aliexpressData.callbackUrl
  }&state=1212&&response_type=code`;
  res.redirect(url);
};

export const aliexpressCallback = async (req: Request, res: Response) => {
  const code = req.query.code;
  const data = {
    appKey: aliexpressData.appKey,
    appSecret: aliexpressData.appSecret,
    code: req.query.code,
  };

  try {
    const response = await axios.post(
      "https://api-sg.aliexpress.com/auth/token/create",
      data
    );

    const respData= await response.data;
    console.log(data);

    res.status(200).json(respData);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
