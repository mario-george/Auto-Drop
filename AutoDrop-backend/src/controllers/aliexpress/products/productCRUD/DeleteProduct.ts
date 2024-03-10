import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../../utils/catchAsync";
import {
  Product,
  ProductDocument,
  ProductSchema,
} from "../../../../models/product.model";
import axios from "axios";
export const DeleteProductById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params) {
      return res
        .status(400)
        .json({ message: "Missing productId in query parameters." });
    }
    //@ts-ignore
    let { productId }: { productId: string } = req.params;

    let product: ProductDocument | null = await Product.findOne({
      //@ts-ignore
      merchant: req.user._id as any,
      _id: productId,
    });
    if (!product) {
      console.log("No product found");
      return res.status(404).json({ message: "Product Not Found." });
    }
    if (product?.salla_product_id) {
      let axiosOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers["authorization"],
        },
        url: `  ${process.env.Backend_Link}/salla/deleteProduct/${product.salla_product_id}`,
      };
      let { data: deleteResp } = await axios.request(axiosOptions);

      if (!res.headersSent && deleteResp.status !== "success") {
        return res.status(400).json({
          status: "failed",
        });
      }
      product.salla_product_id = undefined;
    }
    await Product.deleteOne({ _id: product._id });
    if (!res.headersSent) {
      return res.json({ message: "Product deleted" });
    }
  }
);
