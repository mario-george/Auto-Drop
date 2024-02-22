import { NextFunction, Request, Response } from "express";
import { Product } from "../../../../models/product.model";

export default async function GetProductInfo(
  req: Request & any,
  res: Response,
  next: NextFunction
) {
  let { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  console.log(product.merchant);
  console.log(req.user._id);
  if (product.merchant !== ((req.user?._id).toString() as string)) {
    return res
      .status(403)
      .json({ message: "You are not authorized to view this product" });
  }
  return res.status(200).json({product});
}
