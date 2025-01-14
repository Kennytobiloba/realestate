import mongoose from "mongoose";

let intialized = false;

export const connect = async () => {
    mongoose.set("strictQuery", true)
    return

     try {
         await mongoose.connect(process.env.MONGODB, {
            dbName:"real-estate",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            

         })
        intialized = true
        console.log("mongodb connected")
     } catch (error) {
        console.log("failed to connect", error)   
     }

}