const Query = {
  user(parent, args, { db }, info){
    return db.UserModel.findOne({name: args.userName});
  },
  chatBox(parent, args, { db }, info){
    return db.ChatBoxModel.findOne({name: args.chatBoxName});
  }
};

export default Query;
