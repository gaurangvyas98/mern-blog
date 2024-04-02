const { timestampFormat } = require('concurrently/src/defaults');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    // blog: [{
    //     type: ObjectId, // will contain array of blogs
    //     ref: "BlogPost"
    // }],
}, 
{
    timestamps: true
});

// Model
const User = mongoose.model('User', UserSchema);

module.exports =  User; 