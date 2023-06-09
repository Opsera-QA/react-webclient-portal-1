import useComponentStateReference from "hooks/useComponentStateReference";
import {useCallback, useEffect} from "react";
import {hasStringValue} from "components/common/helpers/string-helpers";
import liveMessageTypeConstants from "@opsera/definitions/constants/websocket/constants/liveMessageType.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

// TODO: Make new subscription type for better handling of live updates?
export default function useTaskActivityLogCollectionSubscriptionHelper(
  topicName,
  collection,
  setCollection,
  taskId,
  currentRunNumber,
) {
  const {
    websocketClient,
  } = useComponentStateReference();

  const onCreateFunction = (newDocument) => {
    const parsedDocument = DataParsingHelper.parseObject(newDocument);
    const parsedPipelineId = DataParsingHelper.parseNestedMongoDbId(parsedDocument, "task_id");

    if (parsedDocument && parsedPipelineId === taskId) {
      const documentIndex = collection.findIndex((document) => document._id === parsedDocument._id);

      if (
        documentIndex === -1 &&
        (currentRunNumber === "latest" || parsedDocument.run_count === currentRunNumber)
      ) {
        if (setCollection) {
          collection.unshift(parsedDocument);
          setCollection([...collection]);
        }
      }
    }
  };

  const onUpdateFunction = (updatedDocument) => {
    const parsedDocument = DataParsingHelper.parseObject(updatedDocument);
    const parsedPipelineId = DataParsingHelper.parseNestedMongoDbId(parsedDocument, "task_id");

    if (parsedDocument && parsedPipelineId === taskId) {
      const documentIndex = collection.findIndex((document) => document._id === parsedDocument._id);

      if (documentIndex !== -1) {
        collection[documentIndex] = parsedDocument;
        setCollection([...collection]);
      }
    }
  };

  const onDeleteFunction = (deletedDocument) => {
    console.debug("Received a delete message for activity log: ", deletedDocument);
    const parsedDocument = DataParsingHelper.parseObject(deletedDocument);
    const parsedPipelineId = DataParsingHelper.parseNestedMongoDbId(parsedDocument, "task_id");

    if (parsedDocument && parsedPipelineId === taskId) {
      if (setCollection) {
        const parsedDocumentMongoDbId = DataParsingHelper.parseMongoDbId(parsedDocument, "_id");
        const updatedDocuments = collection.filter((document) => document._id !== parsedDocumentMongoDbId);
        setCollection([...updatedDocuments]);
      }
    }
  };

  const handleLiveUpdateFunction = useCallback((type, liveMessageData) => {
    if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.NEW_RECORD) {
      onCreateFunction(liveMessageData.data);
    } else if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.UPDATED_RECORD) {
      onUpdateFunction(liveMessageData.data);
    } else if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.DELETED_RECORD) {
      onDeleteFunction(liveMessageData.data);
    }
  }, [collection, taskId, currentRunNumber]);

  useEffect(() => {
    if (hasStringValue(topicName) === true) {
      websocketClient?.subscribeToCollectionUpdates(topicName, handleLiveUpdateFunction);
    }

    return () => {
      websocketClient?.unsubscribeFromTopic(topicName);
    };
  }, [topicName]);

  useEffect(() => {
    websocketClient?.updateLiveUpdateHandlerFunction(topicName, handleLiveUpdateFunction);
  }, [topicName, collection]);
}