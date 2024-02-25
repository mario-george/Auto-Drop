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
import { CreateAndSaveProduct } from "../controllers/aliexpress/products/productCRUD/createProduct";
import { getUserProducts } from "../controllers/aliexpress/products/productCRUD/getUserProducts";
import { LinkProductSalla ,LinkProductSalla2} from "../controllers/aliexpress/products/productCRUD/LinkProduct";
import { DeleteProductById } from "../controllers/aliexpress/products/productCRUD/DeleteProduct";
import GetProductInfo from "../controllers/aliexpress/products/productCRUD/GetProductInfo";
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

router.post(
  "/product/createProduct",
  [Authentication(), ...CreateProduct, CheckValidationSchema],
  CreateAndSaveProduct
);
router.post("/product/linkProductSalla", [Authentication()], LinkProductSalla);
router.post("/product/linkProductSalla/v2", [Authentication()], LinkProductSalla2);
router.get("/product/getProducts", [Authentication()], getUserProducts);
router.delete(
  "/product/deleteProduct/:productId",
  [Authentication()],
  DeleteProductById
);
router.get(
  "/product/getProductInfo/:productId",
  [Authentication()],
  GetProductInfo
);
export default router;
