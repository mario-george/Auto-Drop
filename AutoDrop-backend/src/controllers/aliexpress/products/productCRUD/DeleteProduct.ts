import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../../utils/catchAsync";
import { Product } from "../../../../models/product.model";
export const DeleteProductById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params) {
      return res
        .status(400)
        .json({ message: "Missing productId in query parameters." });
    }
    //@ts-ignore
    let { productId }: { productId: string } = req.params;

    let product = await Product.findOne({
      //@ts-ignore
      merchant: req.user._id as any,
      _id: productId,
    });
    if (!product) {
      console.log("No product found");
      return res.status(404).json({ message: "Product Not Found." });
    }
    await Product.deleteOne({ _id: product._id });
    return res.json({ message: "Product deleted" });
  }
);
