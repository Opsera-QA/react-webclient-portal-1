import useComponentStateReference from "hooks/useComponentStateReference";
import {useEffect} from "react";
import {hasStringValue} from "components/common/helpers/string-helpers";
import liveMessageTypeConstants from "@opsera/definitions/constants/websocket/constants/liveMessageType.constants";

export default function useCollectionSubscriptionHelperBase(
  topicName,
  onCreateFunction,
  onUpdateFunction,
  onDeleteFunction,
) {
  const {
    websocketClient,
  } = useComponentStateReference();

  const handleLiveUpdateFunction = (type, liveMessageData) => {

    if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.NEW_RECORD) {
      onCreateFunction(liveMessageData.data);
    } else if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.UPDATED_RECORD) {
      onUpdateFunction(liveMessageData.data);
    } else if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.DELETED_RECORD) {
      onDeleteFunction(liveMessageData.data);
    }
  };

  useEffect(() => {
    if (hasStringValue(topicName) === true) {
      websocketClient?.subscribeToCollectionUpdates(topicName, handleLiveUpdateFunction);
    }

    return () => {
      websocketClient?.unsubscribeFromTopic(topicName);
    };
  }, [topicName]);
}