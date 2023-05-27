import useComponentStateReference from "hooks/useComponentStateReference";
import {useEffect} from "react";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import liveMessageTypeConstants from "@opsera/definitions/constants/websocket/constants/liveMessageType.constants";

export default function useItemSubscriptionHelper(
  topicName,
  recordId,
  onUpdateFunction,
  onDeleteFunction,
) {
  const { websocketClient } = useComponentStateReference();

  const handleLiveUpdateFunction = (type, liveMessageData) => {
    const parsedObjectId = DataParsingHelper.parseNestedMongoDbId(liveMessageData, "_id");

    if (parsedObjectId === recordId) {
      if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.UPDATED_RECORD) {
        onUpdateFunction(liveMessageData.data);
      } else if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.DELETED_RECORD) {
        onDeleteFunction(liveMessageData.data);
      }
    }
  };

  useEffect(() => {
    if (isMongoDbId(recordId) === true && hasStringValue(topicName) === true) {
      websocketClient?.subscribeToTopic(topicName, handleLiveUpdateFunction);
    }

    return () => {
      websocketClient?.unsubscribeFromTopic(topicName);
    };
  }, [topicName, recordId]);
}