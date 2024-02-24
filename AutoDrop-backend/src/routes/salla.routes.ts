import Authentication from "../assits/Authentication";
import { GetAllCategories } from "../controllers/salla/categories/GetAllCategories";

const Router = require("express").Router;

const sallaRoutes = Router();
sallaRoutes.get("/categories", [Authentication()], GetAllCategories);
export default sallaRoutes;
