import SendEmail from "../../features/email/send";
import { GenerateRandom, HashPassword } from "./handlers/generator";
import User from "../../models/user.model";
import { messages, NewAccountKeys } from "./handlers/data/messages";
import { Request, Response, NextFunction } from "express";
import { map, pick } from "lodash";
import generateOptions from "./handlers/generateOptions";
import {
  ImageType,
  OptionType,
  Product,
  ProductDocument,
  ValueType,
} from "../../models/product.model";
import { Order } from "../../models/Order.model";
import { CheckSubscription } from "./handlers/subscription";
import { Plan } from "../../models/Plan.model";
import {
  Subscription,
  SubscriptionDocument,
} from "../../models/Subscription.model";
import moment from "moment";
import { Transaction } from "../../models/Transaction.model";
import axios from "axios";
import SallaRequest from "../../utils/handlers/SallaRequest";
import AppError from "../../utils/appError";
import { UpdateOrderTracking } from "./handlers/order";
import { CheckTokenExpire } from "./handlers/data/authHandler";
import { GenerateToken } from "./handlers/token";

export default class WebHookEvents {
  async CreateNewApp(body: any, res: Response, next: NextFunction) {
    try {
      const { merchant, data } = pick(body, ["merchant", "data"]);

      const existed = await User.findOne({ merchantId: merchant }).exec();

      if (existed) return res.sendStatus(409);

      const user = new User({
        name: data.app_name,
        merchantId: merchant,
        meta: JSON.stringify(data),
        storeName: data.app_name,
        userType: "vendor",
      });
      await user.save();

      /*   user.save(function (err: any, result: any) {
        if (err) return console.log(err);
        res.sendStatus(201)
      }); */
      return res.sendStatus(201);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  async AuthorizeEvent(body: any, res: Response, next: NextFunction) {
    try {
      let password: string, hashed: string, token: string | undefined;
      const { merchant, data } = pick(body, ["merchant", "data"]);

      const account = await User.findOne({
        merchantId: merchant,
        tokens: {
          $eq: null,
        },
      }).exec();

      if (!account) return res.sendStatus(404);

      const { data: info } = await this.GetUserInfo(data.access_token);

      const { data: userInfo } = info;

      password = GenerateRandom(16);
      hashed = HashPassword(password);

      token = GenerateToken({
        merchant,
        token: JSON.stringify(data),
      });
      let checkEmail = async function (result: any) {
        function isValidEmail(email: string) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (emailRegex.test(email)) {
            return email;
          } else return false;
        }

        const clientEmail = isValidEmail(userInfo.email);
        if (clientEmail) {
          // send email to new partner with email and new password
          const options = generateOptions<NewAccountKeys>(
            clientEmail,
            // "frontdev0219@gmail.com",
            // process.env.EMAIL_USERNAME,
            messages["new-account"],
            {
              "{{_EMAIL_}}": clientEmail,
              "{{_NAME_}}": userInfo?.name,
              "{{_PASSWORD_}}": password,
            }
          );
          await SendEmail(options);
        }
      };
      let userDoc = User.findOneAndUpdate(
        {
          merchantId: merchant,
          tokens: {
            $eq: null,
          },
        },
        {
          password: hashed,
          name: userInfo?.name,
          email: userInfo?.email,
          mobile: userInfo?.mobile,
          userInfo: JSON.stringify(userInfo?.merchant),
          avatar: userInfo?.merchant?.avatar,
          website: userInfo?.merchant?.domain,
          tokens: JSON.stringify(data),
        },
        { new: true }
      );
      checkEmail(userDoc);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

 
}
