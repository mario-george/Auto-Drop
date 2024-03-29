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

  
}
