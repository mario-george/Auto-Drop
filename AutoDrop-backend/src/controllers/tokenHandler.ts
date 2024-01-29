import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import User from "../models/userModel";
import AliExpressToken from "../models/AliExpressTokenModel";
import SallaToken from "../models/SallaTokenModel";

export const saveTokenToUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { accessToken, refreshToken, userId, tokenType } = req.body;
      if (!accessToken || !refreshToken || !userId || !tokenType) {
        return next(new AppError("Please provide access token, refresh token, user id and token type", 400));
      }
  
      let token;
      if (tokenType === 'AliExpress') {
        // Create a new AliExpressToken document
        token = new AliExpressToken({ accessToken, refreshToken, userId });
      } else if (tokenType === 'Salla') {
        // Create a new SallaToken document
        token = new SallaToken({ accessToken, refreshToken, userId });
      } else {
        return next(new AppError("Invalid token type", 400));
      }
  
      await token.save();
  
      // Update the user's token field
      const user = await User.findByIdAndUpdate(userId, { [tokenType + 'Token']: token._id }, { new: true });
      if (!user) {
        return next(new AppError("User not found", 404));
      }
  
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    }
  );