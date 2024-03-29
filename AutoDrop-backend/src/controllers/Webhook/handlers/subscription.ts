import moment from "moment";
import AppError from '../../../utils/appError';
import {
  Subscription,
  SubscriptionDocument,
} from "../../../models/Subscription.model";

export async function CheckSubscription(
  user: string,
  key: string
): Promise<SubscriptionDocument | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const subscription:SubscriptionDocument&{ [key: string]: any,plan:any }|null  = await Subscription.findOne({ user })
        .populate("plan")
        .exec();

      if (!subscription)
        throw new AppError(
    "You do not have any subscription to be able to do this process, subscribe to one of our awesome plans then try again later.",
          403,
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
    "Your subscription has been ended, please upgrade it then try again later",403
        );

      // throw error when current subscription limit ended

      if (requiredSearchKey === 0)
        throw new AppError(
    "You cannot do this process at that moment, upgrade your subscription first.",403
        );

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
