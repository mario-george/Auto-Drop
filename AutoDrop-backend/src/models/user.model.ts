import { hash, compare } from "bcrypt";
import mongoose, { Document, ObjectId, PaginateModel } from "mongoose";
import mongoosePaginateV2 from "mongoose-paginate-v2";
import { Plan } from "./Plan.model";
import { Subscription } from "./Subscription.model";
import moment from "moment";
export interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
  image: string;
  phone: string;
  country: string;
  merchantID: number;
  storeName: string;
  storeLink: string;
  aliExpressToken: ObjectId;
  sallaToken: ObjectId;
  active: boolean;
  OTP: string;
  code: string;
  comparePassword: (pw: string) => Promise<boolean>;
  setting: mongoose.Schema.Types.ObjectId;
  tokens: any;
  // plan: mongoose.Schema.Types.ObjectId;
  planName?: string;
  subscription: mongoose.Schema.Types.ObjectId;
}
export interface IUserDocument extends Document, IUserSchema {}
const userModel = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 40 },
    email: { type: String, required: true, maxLength: 40, unique: true },
    password: { type: String, required: true, maxLength: 150 },
    role: { type: String, default: "client", enum: ["admin", "client"] },
    image: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg",
    },
    phone: { type: String, default: null, maxLength: 25 },
    country: { type: String, default: null, maxLength: 25 },
    merchantID: { type: Number, default: null, maxLength: 25 },
    storeName: { type: String, default: null, maxLength: 50 },
    storeLink: { type: String, default: null, maxLength: 50 },
    OTP: { type: String, maxLength: 10 },
    aliExpressToken: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AliExpressToken",
      unique: true,
    },
    sallaToken: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SallaToken",
      unique: true,
    },
    code: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    tokens: {
      type: Array,
      default: [],
    },
    setting: { type: mongoose.Schema.Types.ObjectId, ref: "Setting" },
    // plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    planName: {
      type: String,
      default: "Basic",
    },
  },
  { timestamps: true }
);

userModel.pre("save", async function (next: (err?: Error) => void) {
  let user = this as any;
 /*  if (user.isModified("password")) {
    user.password = await hash(user.password, 12);
  } */
  if (this.isNew) {
    let plan = await Plan.findOne({ name: "Basic" });
    if (plan) {
      const subscription = await Subscription.create({
        start_date: moment().toDate(),
        expiry_date: null,
        plan: plan.id,
        user: user.id,
        orders_limit: plan.orders_limit,
        products_limit: plan.products_limit,
      });
      // this.plan = plan._id;
      this.subscription = subscription._id;
    }
/*     if (this.isModified("subscription") && this.subscription == null) {
      this.plan = null;
      this.planName = "Basic";
    } */
  }
  next();
});

userModel.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await compare(password, this.password);
};

userModel.plugin(mongoosePaginateV2);
const User = mongoose.model<IUserSchema, PaginateModel<IUserDocument>>(
  "User",
  userModel
);

export default User;
