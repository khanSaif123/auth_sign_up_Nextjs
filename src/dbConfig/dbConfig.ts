import mongoose from "mongoose";

export async function connect() {
    try{
        // (!) means 100% we got the url
        console.log("MongoDB URL:", process.env.MONGO_URL!);
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('Connected', ()=>{
            console.log('MongoDB Connected')
        })

        connection.on('error', (err)=>{
            console.log('MongoDB Connection error, Please make sure db is up and runing: ' + err);
            process.exit()
        })
    }
    catch(error){
        console.log("Somthing went wrong in connecting DB");
        console.log(error)

    }
}