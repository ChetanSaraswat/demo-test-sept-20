const httpStatusCode = {
    CREATED: 201,
    OK: 200,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER: 500,
  };
  
  const channels = {
    REAL_TIME_CHAT_CHANNEL: 'real-time-chat-channel'
  }
  
  const events = {
    REAL_TIME_MESSAGE_SENT_EVENT: 'real-time-message-sent-event',
    REAL_TIME_MESSAGE_UPDATED_EVENT : 'real-time-message-updated-event',
    REAL_TIME_INBOX_EVENT : 'real-time-inbox-event',
    REAL_TIME_MESSAGE_DELETED_EVENT : 'real-time-message-deleted-event'
  }
  
  const pusherAction = {
    MESSAGE_SENT: 'message-sent',
    MESSAGE_UPDATE: 'message-update',
    DELETE_MESSAGE: "delete-message",
    CHAT_LIST: "chat-list"
  }
  
  module.exports = {
    httpStatusCode,
    channels,
    events,
    pusherAction
  };
  