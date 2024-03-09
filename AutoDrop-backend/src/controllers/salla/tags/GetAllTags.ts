import { NextFunction, Request, Response } from "express";
import SallaToken from "../../../models/SallaTokenModel";
import catchAsync from "../../../utils/catchAsync";
import axios from "axios";

export const GetAllTags = catchAsync(
  async (req: Request & any, res: Response, next: NextFunction) => {
    const salla = await SallaToken.findById(req.user.sallaToken);
    if (!salla) {
        return res.status(404).json({ message: 'Salla token not found' });
      }
  
    const { accessToken } = salla;
    const tagsFetch = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      url: "https://api.salla.dev/admin/v2/products/tags",
    };
    const tags = await axios.request(tagsFetch);
    console.log(tags.data);
    // let tagsData= tags.data.data.map((tag: any) => {let{title,description,keywords,url}=tag;return {title,description,keywords,url}});
    res.status(200).json({
      status: "success",
      data:tags.data.data,
    });
  }
);
