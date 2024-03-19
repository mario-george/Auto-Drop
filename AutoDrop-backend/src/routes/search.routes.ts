import { Router } from "express";
import { GetRecommendedProductsByCategory, GetRecommendedProductsByImage, GetRecommendedProductsByURL } from "../controllers/aliexpress/products/Category/SeachAliexpressProducts";

const searchRoutes = Router();
searchRoutes.post("/getRandomProducts/",GetRecommendedProductsByURL)
searchRoutes.post("/getRandomProductsImage/",GetRecommendedProductsByImage)
searchRoutes.post("/getRandomProductsCategory/",GetRecommendedProductsByCategory)


export default searchRoutes;
