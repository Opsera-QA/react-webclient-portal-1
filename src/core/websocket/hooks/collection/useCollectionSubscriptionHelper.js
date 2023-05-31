import useComponentStateReference from "hooks/useComponentStateReference";
import {useCallback, useEffect} from "react";
import {hasStringValue} from "components/common/helpers/string-helpers";
import liveMessageTypeConstants from "@opsera/definitions/constants/websocket/constants/liveMessageType.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function useCollectionSubscriptionHelper(
  topicName,
  type,
  textField,
  collection,
  setCollection,
  getDetailLinkFunction,
  showToasts,
) {
  const {
    websocketClient,
    toastContext,
  } = useComponentStateReference();

  const getFormattedItemLabel = (document) => {
    const parsedDocument = DataParsingHelper.parseObject(document, {});

    if (textField === "string") {
      return parsedDocument[textField];
    } else if (textField === "function") {
      return textField(parsedDocument);
    }
  };

  const onCreateFunction = (newDocument) => {
    const parsedDocument = DataParsingHelper.parseObject(newDocument);

    if (parsedDocument) {
      const documentIndex = collection.findIndex((document) => document._id === parsedDocument._id);

      if (documentIndex === -1) {
        if (setCollection) {
          collection.push(parsedDocument);
          setCollection([...collection]);
        }

        if (typeof getDetailLinkFunction === "function" && showToasts !== false) {
          toastContext.showInformationToast(
            `A new ${type} has been created: [${getFormattedItemLabel(parsedDocument)}]`,
            15,
            undefined,
            getDetailLinkFunction(parsedDocument._id),
          );
        }
      }
    }
  };

  const onUpdateFunction = (updatedDocument) => {
    const parsedDocument = DataParsingHelper.parseObject(updatedDocument);

    if (parsedDocument) {
      const documentIndex = collection.findIndex((document) => document._id === parsedDocument._id);

      if (documentIndex !== -1) {
        const foundDocument = collection[documentIndex];
        collection[documentIndex] = parsedDocument;
        setCollection([...collection]);

        if (showToasts !== false) {
          toastContext.showInformationToast(
            `The ${type} [${getFormattedItemLabel(foundDocument)}] has been updated`,
            15,
            undefined,
            getDetailLinkFunction(parsedDocument._id),
          );
        }
      }
    }
  };

  const onDeleteFunction = (deletedDocument) => {
    const parsedDocument = DataParsingHelper.parseObject(deletedDocument);

    if (parsedDocument) {

      if (setCollection) {
        const parsedDocumentMongoDbId = DataParsingHelper.parseMongoDbId(parsedDocument, "_id");
        const updatedDocuments = collection.filter((document) => document._id !== parsedDocumentMongoDbId);
        setCollection([...updatedDocuments]);
      }

      if (showToasts !== false) {
        toastContext.showInformationToast(
          `The ${type} [${getFormattedItemLabel(parsedDocument)}] has been deleted`,
          15,
          undefined,
        );
      }
    }
  };

  const handleLiveUpdateFunction = useCallback((type, liveMessageData) => {
    console.log("collection: " + JSON.stringify(collection));
    if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.NEW_RECORD) {
      onCreateFunction(liveMessageData.data);
    } else if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.UPDATED_RECORD) {
      onUpdateFunction(liveMessageData.data);
    } else if (type === liveMessageTypeConstants.LIVE_MESSAGE_TYPES.DELETED_RECORD) {
      onDeleteFunction(liveMessageData.data);
    }
  }, [collection]);

  useEffect(() => {
    if (hasStringValue(topicName) === true) {
      websocketClient?.subscribeToCollectionUpdates(topicName, handleLiveUpdateFunction);
    }

    return () => {
      websocketClient?.unsubscribeFromTopic(topicName);
    };
  }, [topicName]);

  useEffect(() => {
    console.log("collection update");
  }, [collection]);
}