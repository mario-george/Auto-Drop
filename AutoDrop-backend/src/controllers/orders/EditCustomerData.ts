import { Order } from "../../models/Order.model";
import AppError from "../../utils/appError";
import catchAsync from "../../utils/catchAsync";
import { NextFunction, Response } from "express";


export const EditCustomerData = catchAsync(
    async (req: any, res: Response, next: NextFunction) => {
      let { order_id, CustomerData } = req.body;
      const order = await Order.findOne({ order_id });
      if (!order) {
        return next(new AppError("Order Not Found", 404));
      }
      if (CustomerData) {
        let {firstName:first_name,lastName:last_name,mobile,mobile_code,email,country,address,postalCode:postal_code} = CustomerData;
        // order.order_memo = order_memo;
        order.customer.first_name = first_name
        order.customer.last_name = last_name
        order.customer.mobile = mobile
        order.customer.mobile_code = mobile_code
        order.customer.country = country
        order.customer.address = address
        order.customer.postal_code = postal_code
        await order.save();
      }
      // const placeOrderResult = await PlaceOrder(order, order_memo);
      return res.json({ message: "update user data success" });
    }
  );
  