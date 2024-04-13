import mongoose from "mongoose";
import User from "../src/models/user.model";
import {Plan} from "../src/models/Plan.model";
import dotenv from 'dotenv';
dotenv.config({ path: ".env" });
const handler = async()=>{
      await mongoose.connect(process.env.DB_URL!);

    const users = await User.find();
    for (const user of users) {
        let planId = await Plan.findOne({name:"Basic"})
        if(planId){
            user.plan = planId._id
            await user.save()
        }
    }
    await mongoose.connection.close()
}
handler().then(()=>console.log("Success")).catch((err)=>console.log(err))
