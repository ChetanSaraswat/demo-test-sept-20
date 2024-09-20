// const Pusher = require("pusher");
// const { channels, events, pusherAction } = require("./libs/constants");

// var pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: process.env.PUSHER_CLUSTER,
// });

// exports.sendOrderUpdateInRealTime = async (senderId, receiverId, OrderUpdate, action) => {
//   try {
//     console.log('senderId: ', senderId);
//     const channelName = `${channels.REAL_TIME_Order_CHANNEL}`;
//     const eventName = `${events.REAL_TIME_OrderUpdate_SENT_EVENT}-${senderId}-${receiverId}`;
//     return await pusher.trigger(channelName, eventName, {OrderUpdate, action,senderId});
//   }
//   catch (error) {
//     throw error;
//   }
// };

// exports.updateOrderUpdateInRealTime = async (OrderUpdate_id, OrderUpdate, action) => {
//   try {
//     const channelName = `${channels.REAL_TIME_Order_CHANNEL}`;
//     const eventName = `${events.REAL_TIME_OrderUpdate_UPDATED_EVENT}-${OrderUpdate_id}`;
//     return await pusher.trigger(channelName, eventName, { OrderUpdate, action });
//   } catch (error) {
//     throw error;
//   }
// };

// exports.deleteOrderUpdateInRealTime = async (OrderUpdate_id, OrderUpdate, action) => {
//   try {
//     const channelName = `${channels.REAL_TIME_Order_CHANNEL}`;
//     const eventName = `${events.REAL_TIME_OrderUpdate_DELETED_EVENT}-${OrderUpdate_id}`;
//     return await pusher.trigger(channelName, eventName, { OrderUpdate, action });
//   } catch (error) {
//     throw error;
//   }
// };

// exports.deleteOrderInRealTime = async () => {
//   try {
//     const channelName = `${channels.REAL_TIME_Order_CHANNEL}`;
//     const eventName = `${events.REAL_TIME_Order_EVENT}-${senderId}-${receiverId}`;
//     return await pusher.trigger(channelName, eventName, { OrderUpdate, action });
//   } catch (error) {
//     throw error;
//   }
// };

// exports.sendInboxInRealTime = async (inboxList, user_uuid) => {
//   try {
//     console.log('inboxList: ', inboxList);
//     const channelName = `${channels.REAL_TIME_Order_CHANNEL}`;
//     const eventName = `${events.REAL_TIME_INBOX_EVENT}-${user_uuid}`;
//     return await pusher.trigger(channelName, eventName, { list: inboxList, action: pusherAction.Order_LIST });
//   } catch (error) {
//     throw error;
//   }
// };

// exports.faltukapusher = async ( OrderUpdate) => {
//   try {
//     console.log('OrderUpdate: ', OrderUpdate);
//     const channelName = 'hello-world';
//     console.log('channelName: ', channelName);
//     const eventName = 'hewwlo-to';
//     console.log('eventName: ', eventName);
//     return await pusher.trigger(channelName, eventName, {OrderUpdate});
//   }
//   catch (error) {
//     console.log('error: ', error);
//     throw error;
//   }
// };
