import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import Setting from "../../models/Setting.model";
export const getUserSettings = catchAsync(
  async (req: Request & any, res: Response, next: NextFunction) => {
    if (!req.user.setting) {
      throw new Error("User settings not found");
    }
    const setting = await Setting.findById(req.user.setting);

    return res.json({
      status: "success",
      data: setting,
    });
  }
);
export const updateUserSettings = catchAsync(
    async (req: Request & any, res: Response, next: NextFunction) => {
        if (!req.user.setting) {
            throw new Error("User settings not found");
          }
        const setting = await Setting.findByIdAndUpdate(req.user.setting, req.body, {
        new: true,
        });
    
        return res.json({
        status: "success",
        data: setting,
        });
    }
 
)