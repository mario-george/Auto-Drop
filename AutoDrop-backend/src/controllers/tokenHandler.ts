import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import User from "../models/userModel";
import AliExpressToken from "../models/AliExpressTokenModel";

export const saveTokenToUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken, userId } = req.body;
    if (!accessToken || !refreshToken || !userId) {
      return next(
        new AppError(
          "Please provide access token, refresh token and user id",
          400
        )
      );
    }
    // Create a new AliExpressToken document
    const aliExpressToken = new AliExpressToken({
      accessToken,
      refreshToken,
      userId,
    });
    await aliExpressToken.save();

    // Update the user's aliExpressToken field
    const user = await User.findByIdAndUpdate(
      userId,
      { aliExpressToken: aliExpressToken._id },
      { new: true }
    );
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
