import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    }
  ]
}, { timestamps: true });

const Followers = mongoose.models.Followers || mongoose.model("Followers", followerSchema);
export default Followers;
