import { Router } from "express";
import { GetRecommendedProductsByCategory, GetRecommendedProductsByImage, GetRecommendedProductsByURL } from "../controllers/aliexpress/products/Category/SeachAliexpressProducts";
import multer from "multer";
const upload = multer();

const searchRoutes = Router();
searchRoutes.post("/getRandomProducts/",GetRecommendedProductsByURL)
searchRoutes.post("/getRandomProductsImage/", upload.single('file'), GetRecommendedProductsByImage);
searchRoutes.post("/getRandomProductsCategory/",GetRecommendedProductsByCategory)


export default searchRoutes;