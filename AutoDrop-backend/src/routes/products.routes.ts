import { Router } from "express";
import {
  GetProductByName,
  GetProductDetails,
  GetRecommendedProducts,
  GetRecommendedProductsPost,
} from "../controllers/aliexpress/GetProducts.controller";
import { GetProductShippingDetailsByID } from "../controllers/aliexpress/products/shipping/GetProductsShipping";
const router = Router();
router.get("/products", GetRecommendedProducts);
router.post("/products", GetRecommendedProductsPost);
router.get("/productsByName", GetProductByName);
router.post("/getProductDetails", GetProductDetails);
router.post("/getShippingDetails", GetProductShippingDetailsByID);

export default router;
