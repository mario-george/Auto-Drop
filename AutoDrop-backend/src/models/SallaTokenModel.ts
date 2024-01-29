import mongoose from "mongoose";

const SallaTokenSchema = new mongoose.Schema({
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const SallaToken = mongoose.model("SallaToken", SallaTokenSchema);

export default SallaToken;
