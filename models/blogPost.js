const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    blogContent:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:true
    },
    date: {
        type: String,
        default: Date.now()
    },
    author: {
        type: ObjectId, // likes will contain array of id of the users
        ref: "User"
    },
});

// Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports =  BlogPost; 