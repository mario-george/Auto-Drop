import Authentication from "../assits/Authentication";
import { GetAllCategories } from "../controllers/salla/categories/GetAllCategories";
import { DeleteSallaProduct } from "../controllers/salla/products/DeleteSallaProduct";

const Router = require("express").Router;

const sallaRoutes = Router();
sallaRoutes.get("/categories", [Authentication()], GetAllCategories);
sallaRoutes.delete(
  "/deleteProduct/:sallaProductId",
  [Authentication()],
  DeleteSallaProduct
);
export default sallaRoutes;
