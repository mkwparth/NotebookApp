import mongoose, { models } from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    tag:{
        type:String,
        default:'General'
    },
    date:{
        type:Date,
        default:Date.now
    }

});

module.exports=mongoose.model('user',UserSchema );