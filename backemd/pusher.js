const Pusher = require("pusher");
const { channels, events, pusherAction } = require("./libs/constants");

var pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
});

exports.sendMessageInRealTime = async (senderId, receiverId, message, action) => {
  try {
    console.log('senderId: ', senderId);
    const channelName = `${channels.REAL_TIME_CHAT_CHANNEL}`;
    const eventName = `${events.REAL_TIME_MESSAGE_SENT_EVENT}-${senderId}-${receiverId}`;
    return await pusher.trigger(channelName, eventName, {message, action,senderId});
  }
  catch (error) {
    throw error;
  }
};

exports.updateMessageInRealTime = async (message_id, message, action) => {
  try {
    const channelName = `${channels.REAL_TIME_CHAT_CHANNEL}`;
    const eventName = `${events.REAL_TIME_MESSAGE_UPDATED_EVENT}-${message_id}`;
    return await pusher.trigger(channelName, eventName, { message, action });
  } catch (error) {
    throw error;
  }
};

exports.deleteMessageInRealTime = async (message_id, message, action) => {
  try {
    const channelName = `${channels.REAL_TIME_CHAT_CHANNEL}`;
    const eventName = `${events.REAL_TIME_MESSAGE_DELETED_EVENT}-${message_id}`;
    return await pusher.trigger(channelName, eventName, { message, action });
  } catch (error) {
    throw error;
  }
};

exports.deleteChatInRealTime = async () => {
  try {
    const channelName = `${channels.REAL_TIME_CHAT_CHANNEL}`;
    const eventName = `${events.REAL_TIME_CHAT_EVENT}-${senderId}-${receiverId}`;
    return await pusher.trigger(channelName, eventName, { message, action });
  } catch (error) {
    throw error;
  }
};

exports.sendInboxInRealTime = async (inboxList, user_id) => {
  try {
    console.log('inboxList: ', inboxList);
    const channelName = `${channels.REAL_TIME_CHAT_CHANNEL}`;
    const eventName = `${events.REAL_TIME_INBOX_EVENT}-${user_id}`;
    return await pusher.trigger(channelName, eventName, { list: inboxList, action: pusherAction.CHAT_LIST });
  } catch (error) {
    throw error;
  }
};
