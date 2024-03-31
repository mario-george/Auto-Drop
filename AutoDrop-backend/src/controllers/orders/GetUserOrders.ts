import catchAsync from '../../utils/catchAsync';
import { Request,Response,NextFunction } from 'express';
import AppError from '../../utils/appError';
import {Order} from '../../models/Order.model';
const GetUserOrders = catchAsync(async (req:Request&any, res:Response,next:NextFunction) => {
    let merchant = req.user._id.toString()
    console.log("req.user",req.user)
    if(!merchant){
        return next(new AppError('You are not authorized to perform this action', 403))
    }
    let userOrders = await Order.find({merchant})
    // .select()
    if(!userOrders || userOrders.length == 0){

        return res.status(404).json({
            status: 'fail',
            message: 'No orders found'
        })
    }
    return res.status(200).json({
        status: 'success',
        data: userOrders
    })
})

export  {GetUserOrders}