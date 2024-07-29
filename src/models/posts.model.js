import mongoose from  'mongoose';
const postSchema = mongoose.Schema({
    postCaption : String,
    location : String,
    imageURL: String,
    commentPermission: Boolean
})
