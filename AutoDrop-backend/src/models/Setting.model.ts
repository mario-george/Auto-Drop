import mongoose, { Document, Schema } from "mongoose";

interface ISetting extends Document{
syncProdPrices :boolean
syncProdQuantities :boolean
originalPriceShipping :"shippingIncluded" | "withoutShipping"
highestPriceUnion:boolean
walletAutoPay:boolean
shippingType:string
}     

const settingsSchema = new Schema<ISetting>({
    syncProdPrices:{type:Boolean,default:true},
    syncProdQuantities:{type:Boolean,default:true},
    originalPriceShipping:{type:String,enum:["shippingIncluded","withoutShipping"],default:'withoutShipping'},
    walletAutoPay:{type:Boolean,default:true},
    shippingType:{type:String,default:"withPackeging"},
    highestPriceUnion:{type:Boolean,default:true},


})

const Setting = mongoose.model<ISetting>("Setting",settingsSchema)
export default Setting