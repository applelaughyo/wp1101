const Subscription = {
  message: {
    subscribe(parent, { chatBoxName }, { db, pubsub }, info) {
      const chatBox = db.ChatBoxModel.findOne({name: chatBoxName});
      console.log(chatBox);
      if (!chatBox) {
        throw new Error('ChatBox not found');
      }

      return pubsub.asyncIterator(`chatBox ${chatBoxName}`);
    },
  },
};

export default Subscription;
