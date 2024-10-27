import mongoose from "mongoose";


// here creating schema for users
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please provide a username"],
        unique: true
    },

    email:{
        type:String,
        required:[true, "Please provide an email"],
        unique: true
    },

    password:{
        type:String,
        required:[true, "Please provide a password"],
    },

    isVerified:{
        type: Boolean,
        default: false
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

// next js is an edge time frame work he doesn't know we interact to the database for the first time 
// or not for that we have to handle it manually that if first time create it otherwise give me the
// refrence of that database

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User


