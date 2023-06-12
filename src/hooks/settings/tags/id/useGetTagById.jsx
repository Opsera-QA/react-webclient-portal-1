import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useTagActions from "hooks/settings/tags/useTagActions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import {websocketLiveUpdateHelper} from "core/websocket/websocket.helper";
import useItemSubscriptionHelper from "core/websocket/hooks/useItemSubscriptionHelper";
import {useHistory} from "react-router-dom";
import liveMessageTopicConstants from "@opsera/definitions/constants/websocket/constants/liveMessageTopic.constants";
import {tagHelper} from "components/settings/tags/tag.helper";

export default function useGetTagById(
  tagId,
  handleErrorFunction,
  rerouteOnDeletion,
  ) {
  const {toastContext} = useComponentStateReference();
  const history = useHistory();
  const tagActions = useTagActions();
  const [tag, setTag] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  const onUpdateFunction = (newTag) => {
    websocketLiveUpdateHelper.handleSingleObjectLiveUpdate(tag, newTag, setTag);
  };

  const onDeleteFunction = (deletedTag) => {
    const parsedTagId = DataParsingHelper.parseNestedMongoDbId(deletedTag, "_id");

    if (parsedTagId === tagId) {
      toastContext.showSystemInformationToast("The Tag has been deleted.");

      if (rerouteOnDeletion !== false) {
        history.push(tagHelper.getManagementScreenLink());
      }
    }
  };

  useItemSubscriptionHelper(
    liveMessageTopicConstants.LIVE_MESSAGE_TOPICS.TAGS,
    tagId,
    onUpdateFunction,
    onDeleteFunction,
  );

  useEffect(() => {
    setTag(undefined);

    if (isMongoDbId(tagId) && loadData) {
      loadData(getCustomerTags, handleErrorFunction).catch(() => {});
    }
  }, [tagId]);

  const getCustomerTags = async () => {
    setTag(undefined);

    if (isMongoDbId(tagId) !== true) {
      return;
    }

    const response = await tagActions.getTagById(tagId);
    const tag = DataParsingHelper.parseNestedObject(response, "data.data");

    if (tag) {
      setTag(tag);
    }
  };

  return ({
    tag: tag,
    setTag: setTag,
    loadData: () => loadData(getCustomerTags, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
