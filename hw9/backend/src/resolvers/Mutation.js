import { PubSub } from 'graphql-yoga';
import {makeName,checkUser ,checkChatBox,checkMessage, newChatBox , newUser,newMessage} from './utility';
const Mutation = {
  async createChatBox(parent, args, { db }, info) {
    if(!args.name1 | !args.name2){
      throw new Error("Missing chatBox name for CreateChatBox");
    }
    if(!await checkUser(db, args.name1,"createChatBox")){
      console.log("User does not exist for CreateChatBox: "+ args.name1);
      await newUser(db,args.name1);
    }
    if(!await checkUser(db, args.name2,"createChatBox")){
      console.log("User does not exist for CreateChatBox: "+ args.name2);
      await newUser(db,args.name2);
    }
    const chatBoxName = makeName(args.name1,args.name2);
    let chatBox = await checkChatBox(db,chatBoxName, "createChatBox");
    if(!chatBox)
      chatBox = await newChatBox(db, chatBoxName);
    return chatBox;
  },
  async createMessage(parent,args,{db,pubsub},info){
    if(!args.from | !args.to | !args.message){
      throw new Error("Missing sender or receiver or message for CreateChatBox");
    }
    const  {chatBox , sender , receiver} = await checkMessage(db , args.from , args.to , args.message , "createMessage");
    if(! chatBox){
      throw new Error("ChatBox not found for createMessage");
    }
    if(! sender){
      throw new Error("User not found:" + args.from);
    }
    if(! receiver){
      throw new Error("User not found:" + args.to);
    }
    const chatBoxName = makeName(args.from,args.to);
    const newMsg = await newMessage(db,sender, args.message);
    chatBox.messages.push(newMsg);
    await chatBox.save();
    pubsub.publish(`chatBox ${chatBoxName}`,{
      message: {
        mutation: 'CREATED',
        data: newMsg
      },
    });
    return newMsg;
  },
  async createUser(parent, args, { db }, info) {
    if(!args.name){
      throw new Error("Missing userName for createUser");
    }
    const nameTaken = await db.UserModel.findOne({name: args.name});
    if (nameTaken) {
      throw new Error('Name taken');
    }

    const user = newUser(db,args.name);
    return user;
  },
};

export default Mutation;
