// TODO: Keep aligned with Node's version until we can split this into a generic javascript version in external library
// TODO: Should there be separate helpers for areas with RBAC?
import {LIVE_MESSAGE_TYPES} from "core/websocket/constants/liveMessage.constants";

export const WebsocketHelper = {};

WebsocketHelper.generateLiveMessageForSubscriptionRequest = (
  topic,
) => {
  return JSON.stringify({
    topic: topic,
    type: LIVE_MESSAGE_TYPES.SUBSCRIPTION_REQUEST,
  });
};

WebsocketHelper.generateLiveMessageForUnsubscriptionRequest = (
  topic,
) => {
  return JSON.stringify({
    topic: topic,
    type: LIVE_MESSAGE_TYPES.UNSUBSCRIPTION_REQUEST,
  });
};