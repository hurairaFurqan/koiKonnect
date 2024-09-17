import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        index: true,
    },
    fName: {
        type: String,
        required: [true, "Please provide a firsName"],
        index: true,
    },
    lName: {
        type: String,
        required: [true, "Please provide a Last Name"],
        index: true,
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

    userBio: {
        type: String,
        default: ""
    },
    userType: {
        type: String,
        enum: ['Student', 'Teacher', 'Graduate'],
        default: 'Student'
    },

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    }],
    coverPhoto: {
        type: String,
        required: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    localProfileImageUrl: String,
}, { timestamps: true });

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;