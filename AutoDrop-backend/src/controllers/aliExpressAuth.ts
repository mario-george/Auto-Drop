import axios from "axios";
import { Request, Response } from "express";
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
  const code = req.query.code;
  const data = {
    app_key: aliexpressData.appKey,
    timestamp: "1706227916858",
    sign_method: "sha256",
    sign: "D13F2A03BE94D9AAE9F933FFA7B13E0A5AD84A3DAEBC62A458A3C382EC2E91EC",
    code: code,
    uuid: "uuid",
  };

  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value as string);
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

    const respData = await response.data;
    console.log(respData);

    res.status(200).json(respData);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
