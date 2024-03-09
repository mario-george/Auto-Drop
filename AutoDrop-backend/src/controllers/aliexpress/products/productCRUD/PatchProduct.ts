import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../../utils/catchAsync";
import { Product } from "../../../../models/product.model";
import axios from "axios";
import SallaToken from "../../../../models/SallaTokenModel";

const variantsCheckHandler = (variants: any,checkboxes:boolean[]|boolean[][]) => {
  
}



const tagsSallaHandler = async (
  sallaAccessToken: string,
  selectedTags: string[]
) => {
  console.log("selectedTags", selectedTags);
  const promises = selectedTags.map((tag: string) => {
    const sallaOpt = {
      url: `https://api.salla.dev/admin/v2/products/tags?tag_name=${tag}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ` + sallaAccessToken,
        "Content-Type": "application/json",
      },
    };
    return axios.request(sallaOpt);
  });
  let promisesSettled = await Promise.allSettled(promises);
  let tagsSalla = promisesSettled.map((promise: any) => {
    if (promise.status === "rejected") {
      console.log(promise.reason);
      console.log(promise);
      return null;
    }
    console.log(promise);
    // [{id,name}]
    return promise.value.data.data;
  });
  console.log("tagsSalla", tagsSalla);
  return tagsSalla;
};
const PatchProduct = catchAsync(
  async (req: Request & any, res: Response, next: NextFunction) => {
    if (!req.params) {
      return res
        .status(400)
        .json({ message: "Missing productId in query parameters." });
    }
    //@ts-ignore
    let { productId }: { productId: string } = req.params;

    let sallaToken = await SallaToken.findById(req.user?.sallaToken);
    if (!sallaToken) {
      return res.status(404).json({ message: "SallaToken Not Found." });
    }
    let { accessToken: sallaAccessToken } = sallaToken;
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
      categoriesSalla,
      require_shipping,
      choosenQuantity,
      selectedTags,   checkboxesSelected,
      choosenShippingIndex,
      shippingIncludedChoice,
      shippingIncludedChoiceIndex,
      ...body
    } = req.body;
    let sallaTags;
    if (selectedTags && selectedTags.length > 0) {
      sallaTags = await tagsSallaHandler(sallaAccessToken, selectedTags);
    }
    let containsFalse = false;
for (let i = 0; i < checkboxesSelected.length; i++) {
  if (checkboxesSelected[i].includes(false)) {
    containsFalse = true;
    break;
  }
}
if (containsFalse){


}
    if (sallaTags && sallaTags.length > 0) {
      product.sallaTags = sallaTags;
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
    if (showDiscountPrice) {
      product.showDiscountPrice = showDiscountPrice;
    }
    product.vendor_commission = vendor_commission;
    product.commissionPercentage = commissionPercentage;
    if (categoriesSalla) {
      product.categoriesSalla = categoriesSalla;
    }
    if (choosenQuantity) {
      product.choosenQuantity = choosenQuantity;
    }
    if (require_shipping) {
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
