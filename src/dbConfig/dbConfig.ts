import mongoose from "mongoose";


const MONGO_URL = process.env.MONGO_URL!;

if (!MONGO_URL) {
  throw new Error('Please add your MongoDB URL to .env.local');
}

let isConnected = false; // Track the connection status

export async function connect() {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(MONGO_URL, {
      // Add any options you may need, e.g., { useNewUrlParser: true }
    });

    mongoose.connection.on('connected', () => {
      isConnected = true;
      console.log('MongoDB Connected');
    });

    mongoose.connection.on('error', (err) => {
      console.log('MongoDB connection error:', err);
    });

  } catch (error) {
    console.error('Something went wrong connecting to MongoDB:', error);
    throw error; // Let the caller handle the error as needed
  }
}


// export async function connect() {
//     try{
//         // (!) means 100% we got the url
//         console.log("MongoDB URL:", process.env.MONGO_URL!);
//         mongoose.connect(process.env.MONGO_URL!)
//         const connection = mongoose.connection

//         connection.on('Connected', ()=>{
//             console.log('MongoDB Connected')
//         })

//         connection.on('error', (err)=>{
//             console.log('MongoDB Connection error, Please make sure db is up and runing: ' + err);
//             process.exit()
//         })
//     }
//     catch(error){
//         console.log("Somthing went wrong in connecting DB");
//         console.log(error)

//     }
// }