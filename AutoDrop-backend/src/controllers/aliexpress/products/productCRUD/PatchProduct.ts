import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../../utils/catchAsync";
import { Product } from "../../../../models/product.model";
import axios from "axios";

const PatchProduct = catchAsync(
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

    let {
      name,
      description,
      commissionPercentage,
      showDiscountPrice,
      vendor_commission,
      productQuantity,
      metadata_description,
      metadata_title,
      categoriesSalla,require_shipping,
      ...body
    } = req.body;

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

      if (deleteResp.status !== "success") {
        return res.status(400).json({
          status: "failed",
        });
      }
      product.salla_product_id = undefined;
    }

    product.metadata_description = metadata_description;
    product.description = description;
    product.metadata_title = metadata_title;
    product.name = name;
    product.commissionPercentage = commissionPercentage;
    if(showDiscountPrice){

      product.showDiscountPrice = showDiscountPrice;
    }
    product.vendor_commission = vendor_commission;
    product.commissionPercentage = commissionPercentage;
if(categoriesSalla){
  product.categoriesSalla = categoriesSalla;

}
if(require_shipping){
  product.require_shipping = require_shipping;
}
    // console.log(product);
    await product.save();
    const opt2 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers["authorization"],
      },
      url: `${process.env.Backend_Link}/aliexpress/product/linkProductSalla/v2`,
      data: {
        productId: product._id,
      },
    };
    let { data: response } = await axios.request(opt2);

    if (response.status === "failed") {
      return res.status(400).json({
        status: "failed",
      });
    }

    return res.json({ message: "Product Patched Successfully" });
  }
);
export default PatchProduct;
