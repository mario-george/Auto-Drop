import axios from "axios";
import { Request, Response } from "express";
import crypto from "crypto";
import CryptoJS from "crypto-js";
import { spawn } from "child_process";

let aliexpressData = {
  callbackUrl:
    "https://auto-drop-rtxb.onrender.com/api/v1/auth/auth-aliexpress/callback/",
  appKey: "34271827",
  appSecret: "2c5bcc0958a9d9abd339232f1b31712e",
};
export const aliexpressAuth = (req: Request, res: Response) => {
  const url = `https://api-sg.aliexpress.com/oauth/authorize?client_id=${aliexpressData.appKey}&redirect_uri=${aliexpressData.callbackUrl}&response_type=code&force_auth=true`;
  res.redirect(url);
};

export const aliexpressCallback = async (req: Request, res: Response) => {
  const aliexpressData = {
    appkey: "34271827",
    appSecret: "2c5bcc0958a9d9abd339232f1b31712e",
    uuid: "uuid",
    code: req.query.code,
    url: "https://api-sg.aliexpress.com/",
  };
  let dataToSend: any;

  const python = spawn("python", ["./src/controllers/python/mytest.py"]);
  python.stdout.on("data", (data) => {
    console.log("Pipe data from python script ...");
    console.log(data.toString());
    dataToSend = data.toString();
  });

  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.send(dataToSend);
  });

  python.stdin.write(JSON.stringify(aliexpressData));
  python.stdin.end();
};

/* 
export const aliexpressCallback = async (req: Request, res: Response) => {
  const aliexpressData = {
    appKey: "34271827",
    appSecret: "2c5bcc0958a9d9abd339232f1b31712e",
  };

  const code = req.query.code;
  const timestamp = Date.now();
  function computeSha256Hash(secret: string, message: string): string {
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(message);
    return hmac.digest("hex");
  }
  let params = {
    app_key: aliexpressData.appKey,
    code,
    sign_method: "sha256",
    timestamp: timestamp,
  };
  const sortedParams = Object.fromEntries(Object.entries(params).sort());
  console.log(sortedParams);

  let signString = "/auth/token/create";
  for (const [key, value] of Object.entries(sortedParams)) {
    signString += key + value;
  }
  console.log("here");
  console.log(
    computeSha256Hash(
      "helloworld",
      "/auth/token/createapp_key12345678code3_500102_JxZ05Ux3cnnSSUm6dCxYg6Q26sign_methodsha256timestamp1517820392000"
    )
  );
  console.log("here");
  console.log("there");
  console.log(signString);
  console.log("there");
  // Assemble HTTP request
  let url = `https://api-sg.aliexpress.com/rest/auth/token/create?app_key=${
    aliexpressData.appKey
  }&code=${code}&uuid=uuid&timestamp=${timestamp}&sign_method=sha256&sign=${computeSha256Hash(
    aliexpressData.appSecret,
    signString
  )}`;
  console.log(url);
  try {
    const response = await axios.post(
      url,

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
 */
