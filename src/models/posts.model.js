import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({  
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
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
            },
            commentContent: {
                type: String,
                required: true,
            }
        }
    ]
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);  

export default Post;
