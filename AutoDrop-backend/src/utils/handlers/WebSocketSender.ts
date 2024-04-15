import axios from "axios";
import { SubscriptionDocument, SubscriptionSchema } from "../../models/Subscription.model";

export const WebSocketSender = (subscription:SubscriptionSchema | SubscriptionDocument) => {
    if(!subscription) return console.error("Subscription not found");
    let webSocketReq = {
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
      axios.request(webSocketReq);
}