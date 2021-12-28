import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ChatBoxSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  messages: [{type: mongoose.Types.ObjectId,ref: "Message"}],
});

const MessageSchema = new Schema({
  sender: {type: mongoose.Types.ObjectId,ref: "User"},
  body: {type: String,required: true},
});

const UserSchema = new Schema({
  name: {type: String,required: true},
});
// Creating a table within database with the defined schema
const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);
const MessageModel = mongoose.model('Message', MessageSchema);
const UserModel = mongoose.model('User', UserSchema);
// Exporting table for querying and mutating

export {ChatBoxModel , MessageModel , UserModel};