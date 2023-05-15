import useComponentStateReference from "hooks/useComponentStateReference";
import {useEffect} from "react";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import LiveMessageConstants from "@opsera/definitions/constants/websocket/constants/liveMessage.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function useItemSubscription(
  topicName,
  recordId,
  onUpdateFunction,
  onDeleteFunction,
) {
  const { websocketClient } = useComponentStateReference();

  const handleLiveUpdateFunction = (type, liveMessageData) => {
    console.log("got update in handleLiveUpdateFunction: " + JSON.stringify(liveMessageData));
    const parsedObjectId = DataParsingHelper.parseNestedMongoDbId(liveMessageData, "_id");

    if (parsedObjectId === recordId) {
      if (type === LiveMessageConstants.LIVE_MESSAGE_TYPES.UPDATED_RECORD) {
        onUpdateFunction(liveMessageData.data);
      } else if (type === LiveMessageConstants.LIVE_MESSAGE_TYPES.DELETED_RECORD) {
        onDeleteFunction(parsedObjectId);
      }
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