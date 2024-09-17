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
    EMPLOYEE_UPDATES_CHANNEL:'employee-updates-channel',
    LEAVE_POLICY_CHANNEL: 'leave-policy-channel',
    LEAVE_REQUEST_CHANNEL: 'leave-request-channel',
    ROLE_PERMISSION_CHANNEL: 'role-permission-channel',
    DEPARTMENT_UPDATES_CHANNEL: 'department-updates-channel',
    REAL_TIME_CHAT_CHANNEL: 'real-time-chat-channel'
  }
  
  const events = {
    EMPLOYEE_UPDATES_EVENT:'employee-updates-event',
    LEAVE_POLICY_EVENT: 'leave-policy-event',
    LEAVE_REQUEST_EVENT: 'leave-request-event',
    ROLES_PERMISSIONS_EVENT: 'role-permission-event',
    DEPARTMENT_UPDATES_EVENT: 'department-updates-event',
    REAL_TIME_MESSAGE_SENT_EVENT: 'real-time-message-sent-event',
    REAL_TIME_MESSAGE_UPDATED_EVENT : 'real-time-message-updated-event',
    REAL_TIME_INBOX_EVENT : 'real-time-inbox-event',
    REAL_TIME_MESSAGE_DELETED_EVENT : 'real-time-message-deleted-event'
  }
  
  const pusherAction = {
    EMPLOYEE_REGISTERED : 'employeee-registered',
    EMPLOYEE_DELETED : 'employeee-deleted',
    EMPLOYEE_UPDATED :'employee-updated',
    NEW_ROLE_PERMISSION_ADDED : 'new-role-permission-added',
    ROLE_UPDATED: 'role-updated',
    DEPARTMENT_REGISTERED: 'department-registered',
    DEPARTMENT_UPDATED: 'department-updated',
    DEPARTMENT_REMOVED: 'department-removed',
    LEAVE_REQUEST_ADDED: 'leave-request_added',
    LEAVE_REQUEST_REMOVED: 'leave-request-removed',
    LEAVE_REQUEST_UPDATED: 'leave-request-updated',
    UPDATED_APPROVER: 'updated-approver',
    LEAVE_TYPE_ADDED: 'leave-type-added',
    LEAVE_TYPE_REMOVED: 'leave-type-removed',
    LEAVE_TYPE_UPDATED: 'leave-type_updated',
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
  