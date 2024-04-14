import axios from "axios"
import { SubscriptionDocument } from "../../../models/Subscription.model"
import { PlanDocument } from "../../../models/Plan.model";



export const  sendSubscription = async(subscription:SubscriptionDocument,plan:PlanDocument,userId:string,clients:any,WebSocket:any)=>{
    const subscriptionJSON = subscription.toJSON()
    subscriptionJSON.planName = plan.name
    subscriptionJSON.eventType = "subscription"
    subscriptionJSON.subscriptionStart= subscriptionJSON.start_date
    subscriptionJSON.subscriptionExpiry= subscriptionJSON.expiry_date
    subscriptionJSON.subscriptionOrdersLimit= subscriptionJSON.orders_limit
    subscriptionJSON.subscriptionProductsLimit= subscriptionJSON.products_limit
    
    
    subscriptionJSON.totalOrdersLimit= plan.orders_limit
    subscriptionJSON.totalProductsLimit= plan.products_limit
    // let dataToBeSent = subscriptionJSON
    // const subscriptionParam =JSON.stringify(subscriptionJSON)
    const client = clients[userId];
    const sendClient = ()=>{
  
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(subscriptionJSON));
              return true
      } else {
        console.error('Failed to send message: client not connected');
        return false
      }  
    }
 
  sendClient()
    return 
    }