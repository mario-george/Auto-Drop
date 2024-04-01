import { Product } from "../src/models/product.model";
import axios from "axios";
import { createAccessToken } from "../src/utils/authHelperFunction";
import User from "../src/models/user.model";
import fs from "fs";

async function UnLinkAllUsersProducts() {
  const pageSize = 100;
  let page = 1;
  let products;

  do {
    // Get 100 products
    const result = await Product.paginate({}, { page, limit: pageSize });
    products = result.docs;

    // Loop through each product
    for (const product of products) {
      let user = await User.findById(product.merchant);
      if (!user) {
        return;
      }
      let token = createAccessToken(user.id);
      let options = {
        url: `/product/deleteProduct/${product._id}`,
        baseUrl: "http://localhost:10000/api/v1",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      let res = await axios.request(options);
      fs.appendFile(
        "deleteAllProducts.txt",
        `Product ${product._id} deleted with status ${res.status}\n`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }

    // Wait for 5 minutes
    await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));

    page++;
  } while (products.length === pageSize);
}

UnLinkAllUsersProducts()
  .then(() => {
    console.log("Success");
  })
  .catch((error) => console.error("Error"));