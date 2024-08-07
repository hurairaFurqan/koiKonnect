import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    fName: {
        type: String,
        required: [true, "Please provide a firsName"],

    },
    lName: {
        type: String,
        required: [true, "Please provide a Last Name"],

    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        enum: ['student', 'teacher', 'graduate'],
        default: 'student'
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    cloudinaryProfileImageUrl: String,
})


const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;