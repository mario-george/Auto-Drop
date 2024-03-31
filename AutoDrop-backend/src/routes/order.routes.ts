import Authentication from "../assits/Authentication";

import { GetUserOrders } from "../controllers/orders/GetUserOrders";
const Router = require("express").Router;

const orderRoutes = Router();
orderRoutes.get("/getOrder", [Authentication()], GetUserOrders);
// orderRoutes.get("/getOrderDetails", [Authentication()], GetUserOrderDetails);




export default orderRoutes;
