import { NextFunction, Request, Response } from "express";
import SallaToken from "../../../models/SallaTokenModel";
import catchAsync from "../../../utils/catchAsync";
import axios from "axios";
import { Product } from "../../../models/product.model";

export const GetAllProductsCategories = catchAsync(
  async (req: Request & any, res: Response, next: NextFunction) => {
  /*   const salla = await SallaToken.findById(req.user.sallaToken);
    if (!salla) {
        return res.status(404).json({ message: 'Salla token not found' });
      } */
  
    // const { accessToken } = salla;
   /*  const categoriesFetch = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      url: "https://api.salla.dev/admin/v2/categories",
    }; */
    // const categories = await axios.request(categoriesFetch);
    // console.log(categories.data);
    // let categoriesData= categories.data.data.map((category: any) => {let{id,name}=category;return {name,id}})

 let productsCategories = await Product.find({merchant:req.user._id.toString()}).select("categoriesSalla")    
    res.status(200).json({
      status: "success",
      data: productsCategories,
    });
  }
);
