import mongoose from "mongoose";

const followingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Reference to the User model
    required: true
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users" // Refers to users that this user is following
    }
  ]
}, { timestamps: true });

const Following = mongoose.models.Following || mongoose.model("Following", followingSchema);
export default Following;
