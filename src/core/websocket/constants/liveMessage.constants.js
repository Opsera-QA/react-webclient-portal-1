export const LIVE_MESSAGE_TYPES = {
  SUBSCRIPTION_REQUEST: "SUBSCRIPTION_REQUEST",
  UNSUBSCRIPTION_REQUEST: "UNSUBSCRIPTION_REQUEST",
  NEW_RECORD: "NEW_RECORD",
  UPDATED_RECORD: "UPDATED_RECORD",
  DELETED_RECORD: "DELETED_RECORD",
};

// TODO: Pick better names/Should these match the DB Collection Names?
//  We should probably make an ENUM of all DB Collection Names and map them here if they support live messages
export const LIVE_MESSAGE_TOPICS = {
  TAGS: "TAGS",
};