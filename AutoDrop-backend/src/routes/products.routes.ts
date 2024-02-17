import { Router } from "express";
import {
  GetProductByName,
  GetProductDetails,
  GetRecommendedProducts,
  GetRecommendedProductsPost,
} from "../controllers/aliexpress/GetProducts.controller";
import { GetProductShippingDetailsByID } from "../controllers/aliexpress/products/shipping/GetProductsShipping";
import Authentication from "../assits/Authentication";
import { CreateProductController } from "../controllers/aliexpress/products/productCRUD/CRUD";
import { CheckValidationSchema } from "../validate/CheckValidation";
import { CreateProduct } from "../validate/products";
const router = Router();
router.get("/products", GetRecommendedProducts);
router.post("/products", GetRecommendedProductsPost);
router.get("/productsByName", GetProductByName);
router.post("/getProductDetails", GetProductDetails);
router.post("/getShippingDetails", GetProductShippingDetailsByID);
router.post(
  "/product/create",
  [Authentication(), ...CreateProduct, CheckValidationSchema],
  CreateProductController
);

export default router;
