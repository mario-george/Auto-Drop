import moment from "moment";
import AppError from "../appError";
import {
  Subscription,
  SubscriptionDocument,
} from "../../models/Subscription.model";
import { sendSubscription } from "../../controllers/Webhook/utils/sendSubscription";
import axios from "axios";
import { WebSocketSender } from "./WebSocketSender";
interface PopulatedSubscription extends SubscriptionDocument {
  plan: {
    products_limit: number;
    orders_limit: number;
    _id: string;
  };
}
type IPopulatedSubscription = PopulatedSubscription | null;
export async function CheckSubscription(
  user: string,
  key: "products_limit" | "orders_limit"
): Promise<SubscriptionDocument | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const subscription: any = await Subscription.findOne({ user })
        .populate("plan")
        .exec();

      if (!subscription)
        throw new AppError(
          "You do not have any subscription to be able to do this process, subscribe to one of our awesome plans then try again later.",
          400
        );

      const requiredSearchKey = subscription[key];
      const requiredPlanSearch = subscription.plan[key];
      const remainingFromExpire = moment(subscription.expiry_date).diff(
        moment(),
        "days",
        true
      );

      // throw error when current subscription expired
      if (!remainingFromExpire)
        throw new AppError(
          "Your subscription has been ended, please upgrade it then try again later",
          400
        );

      // throw error when current subscription limit ended

      if (requiredSearchKey === 0)
        throw new AppError(
          "You cannot do this process at that moment, upgrade your subscription first.",
          400
        );

 /*      let webSocketReq = {
        url: `${process.env.Backend_Link}websocketHandler`,
        data: {
          event: "app.subscription.renewed",
          subscription: subscription,
        },
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      };
      axios.request(webSocketReq); */
      WebSocketSender(subscription); 
      // sendSubscription(subscription, null, user, clients, WebSocket);
      // unlimited items
      if (requiredSearchKey === null && requiredPlanSearch === null)
        return resolve(subscription);

      resolve(subscription);

      // if(subscription[])
    } catch (error) {
      reject(error);
    }
  });
}
