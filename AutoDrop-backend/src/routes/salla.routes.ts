import Authentication from "../assits/Authentication";
import { GetAllCategories } from "../controllers/salla/categories/GetAllCategories";
import { DeleteSallaProduct } from "../controllers/salla/products/DeleteSallaProduct";
import { RefreshTokenHandler } from "../controllers/salla/RefreshAccessToken";

const Router = require("express").Router;

const sallaRoutes = Router();
sallaRoutes.get("/categories", [Authentication()], GetAllCategories);
sallaRoutes.delete(
  "/deleteProduct/:sallaProductId",
  [Authentication()],
  DeleteSallaProduct
);

sallaRoutes.patch(
  "/refreshToken/:accessToken",
  [Authentication()],
  RefreshTokenHandler
);
export default sallaRoutes;
