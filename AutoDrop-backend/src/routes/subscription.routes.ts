import Authentication from "../assits/Authentication";
import { GetRemainingProducts } from "../controllers/subscriptionInquiry";

const Router = require("express").Router;

const subscriptionRoutes = Router();
subscriptionRoutes.get("/getOrder", [Authentication()], GetRemainingProducts);




export default subscriptionRoutes;
