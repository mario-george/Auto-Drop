import mongoose from "mongoose";

const SallaTokenSchema = new mongoose.Schema({
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

const SallaToken = mongoose.model(
  "SallaToken",
  SallaTokenSchema
);

export default SallaToken;
