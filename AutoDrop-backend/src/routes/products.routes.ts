import { Router } from "express";
import {
  GetProductByName,
  GetProductDetails,
  GetRecommendedProducts,
  GetRecommendedProductsPost,
} from "../controllers/aliexpress/GetProducts.controller";
const router = Router();
router.get("/products", GetRecommendedProducts);
router.post("/products", GetRecommendedProductsPost);
router.get("/productsByName", GetProductByName);
router.post("/getProductDetails", GetProductDetails);


export default router;
