import mongoose from "mongoose";

let connected = false;

export const connectDB = async() =>{
    mongoose.set('strictQuery',true);

    if(connected){
        console.log('MongoDB Alread Connected')
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        connected = true
        console.log('MongoDB Connected....');
    }catch(e){
        console.log('====================================');
        console.log(e);
        console.log('====================================');
    }
}
