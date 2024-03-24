
import { Router } from "express";
import { GetShippingProductIdCountryCode } from "../controllers/aliexpress/products/shipping/GetCountryShippping";
import Authentication from "../assits/Authentication";

const shippingRoutes = Router();



shippingRoutes.post("/country",[Authentication()],GetShippingProductIdCountryCode)





export default shippingRoutes;
