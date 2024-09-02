
import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    postCaption: String,
    location: String,
    imageURL: String,
    commentPermission: Boolean,
    privacyPermission: Boolean,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },

    likesCount: Number,
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    ]
},
    { timestamps: true }
)

const Post = mongoose.models.Posts || mongoose.model("Posts", postSchema);

export default Post;
