import Authentication from "../assits/Authentication";

import { GetUserOrders,GetUserOrderDetails } from "../controllers/orders/GetUserOrders";
const Router = require("express").Router;

const orderRoutes = Router();
orderRoutes.get("/getOrder", [Authentication()], GetUserOrders);
orderRoutes.post("/getOrderDetails", [Authentication()], GetUserOrderDetails);




export default orderRoutes;
