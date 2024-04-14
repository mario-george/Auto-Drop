import Authentication from "../assits/Authentication";

import { GetUserOrders,GetUserOrderDetails } from "../controllers/orders/GetUserOrders";
import { SendOrder } from "../controllers/orders/PlaceOrder";
const Router = require("express").Router;

const orderRoutes = Router();
orderRoutes.get("/getOrder", [Authentication()], GetUserOrders);
orderRoutes.post("/getOrderDetails", [Authentication()], GetUserOrderDetails);
orderRoutes.post("/placeOrder", [Authentication()], SendOrder);




export default orderRoutes;
