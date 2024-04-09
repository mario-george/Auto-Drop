//@ts-nocheck

import { schedule } from "node-cron";

import fs from "fs";
import User from "../../../models/user.model";
import SallaToken from "../../../models/SallaTokenModel";
import AliExpressToken from "../../../models/AliExpressTokenModel";
import qs from "qs";
import axios from "axios";

const time: string = "* * */5 * *";
const TokenRefreshHandler = schedule(time, async function () {
  try {
    console.log("cron job started to refresh users token");
    
    
    

    let limit = 10;
    let page = 1;
    let options = {
      limit,
      page,
      populate: ["aliExpressToken", "sallaToken"],
    };
    let results;

    let users;


    do {
      results = await User.paginate({}, options);
      users = results.docs;
      for (const user of users) {
        let { aliExpressToken, sallaToken } = user;
        let sallaDoc = await SallaToken.findOne({
          _id: sallaToken,
          userId: "65bba87f61527f5f9ba1e7ea",
        });
        if (!sallaDoc) continue;
        let aliExpressDoc = await AliExpressToken.findById(aliExpressToken);
        if (sallaDoc) {
          let { accessToken, refreshToken } = sallaDoc;
          console.log("accessToken",accessToken)
          let url = `https://accounts.salla.sa/oauth2/token`;
          let sallaReqOpt = {
            method: "post",
            url: "https://accounts.salla.sa/oauth2/token",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Bearer " + accessToken,
            },
            data: qs.stringify({
              refresh_token: refreshToken,
              grant_type: "refresh_token",
              client_id: process.env.sallaClientId,
              client_secret: process.env.sallaClientSecret,
            }),
          };
          let sallaRefreshTokenRes = await axios(sallaReqOpt);
          console.log("sallaRefreshTokenRes",sallaRefreshTokenRes)
          let { access_token, refresh_token } = sallaRefreshTokenRes.data;

          fs.appendFile("sallaTokenCRON.json", JSON.stringify({ access_token, refresh_token }), () => {});

          sallaDoc.accessToken = access_token;
          sallaDoc.refreshToken = refresh_token;

          await sallaDoc.save();
        }
    }
    page++;
    options.page = page;
    } while (users.length == limit);
  } catch (error) {
    console.log("Error while refreshing user tokens..");
    console.log(error);
  }
});

export default TokenRefreshHandler;
