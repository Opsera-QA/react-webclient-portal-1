import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useTagActions from "hooks/settings/tags/useTagActions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import LiveMessageConstants from "@opsera/definitions/constants/websocket/constants/liveMessage.constants";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import {websocketLiveUpdateHelper} from "core/websocket/websocket.helper";

export default function useGetTagById(tagId, handleErrorFunction) {
  const tagActions = useTagActions();
  const [tag, setTag] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const {websocketClient} = useComponentStateReference();

  useEffect(() => {
    setTag(undefined);

    if (isMongoDbId(tagId) && loadData) {
      loadData(getCustomerTags, handleErrorFunction).catch(() => {});
    }
  }, [tagId]);

  const updateTagState = (type, newTag) => {
    console.log("got new update type: " + JSON.stringify(type));
    console.log("got new update: " + JSON.stringify(newTag));
    websocketLiveUpdateHelper.handleSingleObjectLiveUpdate(tag, newTag, setTag);
  };

  const getCustomerTags = async () => {
    setTag(undefined);

    if (isMongoDbId(tagId) !== true) {
      return;
    }

    websocketClient.subscribeToTopic(LiveMessageConstants.LIVE_MESSAGE_TOPICS.TAGS, updateTagState);

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
