import useComponentStateReference from "hooks/useComponentStateReference";
import {useEffect} from "react";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import liveMessageTypeConstants from "@opsera/definitions/constants/websocket/constants/liveMessageType.constants";

export default function useItemListSubscriptionHelper(
  topicName,
  recordId,
  onCreateFunction,
  onUpdateFunction,
  onDeleteFunction,
) {
  const { websocketClient } = useComponentStateReference();

  const handleLiveUpdateFunction = (type, liveMessageData) => {
    console.log("got update in handleLiveUpdateFunction: " + JSON.stringify(liveMessageData));

    if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.NEW_RECORD) {
      onCreateFunction(liveMessageData.data);
    } else if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.UPDATED_RECORD) {
      onUpdateFunction(liveMessageData.data);
    } else if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.DELETED_RECORD) {
      onDeleteFunction(liveMessageData._id);
    }
  };

  useEffect(() => {
    if (isMongoDbId(recordId) === true && hasStringValue(topicName) === true) {
      console.log("subscribing to tags topic");
      websocketClient?.subscribeToTopic(topicName, handleLiveUpdateFunction);
    }

    return () => {
      console.log("unsubscribing from  tags topic");
      websocketClient?.unsubscribeFromTopic(topicName);
    };
  }, [topicName, recordId]);
}