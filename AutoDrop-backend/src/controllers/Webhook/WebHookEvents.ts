import SendEmail from "../../features/email/send";
import { GenerateRandom, HashPassword } from "./handlers/generator";
import User from "../../models/user.model";
import { messages, NewAccountKeys } from "./handlers/data/messages";
import { Request, Response, NextFunction } from "express";
import { map, pick } from "lodash";
import generateOptions from "./handlers/generateOptions";
import {
  ImageType,
  OptionType,
  Product,
  ProductDocument,
  ValueType,
} from "../../models/product.model";
import { Order } from "../../models/Order.model";
import { CheckSubscription } from "./handlers/subscription";
import { Plan } from "../../models/Plan.model";
import {
  Subscription,
  SubscriptionDocument,
} from "../../models/Subscription.model";
import moment from "moment";
import { Transaction } from "../../models/Transaction.model";
import axios from "axios";
import SallaRequest from "../../utils/handlers/SallaRequest";
import AppError from "../../utils/appError";
import { UpdateOrderTracking } from "./handlers/order";
import { CheckTokenExpire } from "./handlers/data/authHandler";
import { GenerateToken } from "./handlers/token";

export default class WebHookEvents {
  async CreateNewApp(body: any, res: Response, next: NextFunction) {
    try {
      const { merchant, data } = pick(body, ["merchant", "data"]);

      const existed = await User.findOne({ merchantId: merchant }).exec();

      if (existed) return res.sendStatus(409);

      const user = new User({
        name: data.app_name,
        merchantId: merchant,
        meta: JSON.stringify(data),
        storeName: data.app_name,
        userType: "vendor",
      });
      await user.save();

      /*   user.save(function (err: any, result: any) {
        if (err) return console.log(err);
        res.sendStatus(201)
      }); */
      return res.sendStatus(201);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  async AuthorizeEvent(body: any, res: Response, next: NextFunction) {
    try {
      let password: string, hashed: string, token: string | undefined;
      const { merchant, data } = pick(body, ["merchant", "data"]);

      const account = await User.findOne({
        merchantId: merchant,
        tokens: {
          $eq: null,
        },
      }).exec();

      if (!account) return res.sendStatus(404);

      const { data: info } = await this.GetUserInfo(data.access_token);

      const { data: userInfo } = info;

      password = GenerateRandom(16);
      hashed = HashPassword(password);

      token = GenerateToken({
        merchant,
        token: JSON.stringify(data),
      });
      let checkEmail = async function (result: any) {
        function isValidEmail(email: string) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (emailRegex.test(email)) {
            return email;
          } else return false;
        }

        const clientEmail = isValidEmail(userInfo.email);
        if (clientEmail) {
          // send email to new partner with email and new password
          const options = generateOptions<NewAccountKeys>(
            clientEmail,
            // "frontdev0219@gmail.com",
            // process.env.EMAIL_USERNAME,
            messages["new-account"],
            {
              "{{_EMAIL_}}": clientEmail,
              "{{_NAME_}}": userInfo?.name,
              "{{_PASSWORD_}}": password,
            }
          );
          await SendEmail(options);
        }
      };
      let userDoc = User.findOneAndUpdate(
        {
          merchantId: merchant,
          tokens: {
            $eq: null,
          },
        },
        {
          password: hashed,
          name: userInfo?.name,
          email: userInfo?.email,
          mobile: userInfo?.mobile,
          userInfo: JSON.stringify(userInfo?.merchant),
          avatar: userInfo?.merchant?.avatar,
          website: userInfo?.merchant?.domain,
          tokens: JSON.stringify(data),
        },
        { new: true }
      );
      checkEmail(userDoc);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async RemoveApp(body: any, res: Response, next: NextFunction) {
    try {
      const { merchant } = pick(body, ["merchant"]);
      const user = await User.findOne({ merchantId: merchant });
      if (!user) throw new AppError("User Not Found", 404);
      await Subscription.deleteMany({ user: user.id });
      res.sendStatus(200);
      // User.findOneAndDelete(
      //   {
      //     merchantId: merchant,
      //   },
      //   {},
      //   function (err: any, result: any) {
      //     if (err) {
      //       console.log(err);
      //       return;
      //     }

      //     console.log("uninstall app: ", result);
      //   }
      // );
    } catch (error) {
      next(error);
    }
  }

  GetUserInfo(token: string): Promise<any> {
    return SallaRequest({ url: "oauth2/user/info", method: "get", token });
  }

  async DeleteSelectedProduct(body: any, res: Response, next: NextFunction) {
    try {
      const { id } = pick(body.data, ["id"]);
      await Product.findOneAndDelete({
        salla_product_id: id,
      }).then(() => res.sendStatus(200));
    } catch (error) {
      next(error);
    }
  }

  async DeleteSelectedOrder(body: any, res: Response, next: NextFunction) {
    try {
      const { id } = pick(body.data, ["id"]);
      await Order.findOneAndDelete(
        {
          order_id: id,
        },
        {}
        /*         ,
        function (err: any, result: any) {
          if (err) console.log(err);
        } */
      );
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async CreateNewOrder(body: any, res: Response, next: NextFunction) {
    try {
      let total: number = 0,
        sub_total: number = 0,
        commission: number = 0,
        meta: any = {};
      const { data: orderData } = pick(body, ["data"]);
      const data = pick(orderData, [
        "payment_method",
        "id",
        "order_id",
        "reference_id",
        "items",
        "shipping",
        "customer",
        "status",
      ]);
      // console.log(data.items[0])
      const orderExisted = await Order.findOne({ order_id: data.id }).exec();

      if (orderExisted) return res.sendStatus(409);

      const itemIds = map(data.items, "product.id");

      const products: any[] | null = await Product.find({
        salla_product_id: {
          $in: itemIds,
        },
      })
        .select(
          "name salla_product_id price main_price vendor_commission vendor_price merchant sku options"
        )
        .exec();

      if (!(products as any[])?.length) return res.sendStatus(409);

      const findProductIds = map(products, "salla_product_id");
      const filterItems = data.items?.filter((obj: any) => {
        return findProductIds.includes(obj?.product?.id?.toString());
      });

      const mapItems = await Promise.all(
        filterItems.map((item: any, i: number) => {
          const productId = item?.product?.id;
          const product = products.find(
            (ev: ProductDocument) => ev.salla_product_id == productId
          );
          const jsonProduct = product.toJSON();
          const options = item.options?.map((option: any, idx: number) => {
            const productOption = jsonProduct.options[idx]?.values;
            const variant = productOption.find(
              (pd: any) => pd.salla_value_id == option.value.id
            );
            const value = {
              price: {
                amount: variant.original_price || product.main_price,
              },
            };

            const result = {
              ...option,
              value: Object.assign({}, option?.value || {}, value),
            };

            return result;
          });

          sub_total += options[0]?.value.price.amount || product.main_price;
          meta[productId] = {
            vendor_commission: product?.vendor_commission,
            vendor_price: product?.vendor_price,
          };
          return {
            sku: item?.sku,
            quantity: item?.quantity,
            thumbnail: item?.product?.thumbnail,
            product: {
              ...product,
            },
            options,
          };
        })
      );
      // commission = Math.ceil((+sub_total * +(APP_COMMISSION as string)) / 100);
      // total = +sub_total + commission;
      total = +sub_total;
      const merchant = products?.[0]?.merchant;

      const subscription: SubscriptionDocument | null = await CheckSubscription(
        merchant,
        "orders_limit"
      );

      if (subscription && subscription.orders_limit)
        subscription.orders_limit = subscription.orders_limit - 1;

      const order = new Order({
        ...data,
        amounts: {
          total: {
            amount: total,
          },
          // app_commission: {
          //   amount: commission,
          //   percentage: parseInt(APP_COMMISSION as string, 10) || 0,
          // },
        },
        meta,
        merchant,
        order_id: data.id,
        items: mapItems,
        status: "created",
        status_track: [],
      });

      const status_track = UpdateOrderTracking("created", order);
      order.status_track = status_track;

      await Promise.all([
        subscription?.save(),
        /*    order.save(function (err, result) {
          if (err) return console.log(err);
        }), */
        order.save(),
      ]);

      return res.status(200).send("order stored");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

}
