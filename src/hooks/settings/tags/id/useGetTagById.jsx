import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useTagActions from "hooks/settings/tags/useTagActions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import {websocketLiveUpdateHelper} from "core/websocket/websocket.helper";
import useItemSubscription from "core/websocket/hooks/useItemSubscription";
import {useHistory} from "react-router-dom";
import {accountSettingsTrails} from "components/settings/accountSettings.trails";
import liveMessageTopicConstants from "@opsera/definitions/constants/websocket/constants/liveMessageTopic.constants";

export default function useGetTagById(tagId, handleErrorFunction) {
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

  const onDeleteFunction = (tagId) => {
    toastContext.showSystemInformationToast("The Tag has been deleted.");
    history.push(`/${accountSettingsTrails.tagManagement.path}`);
  };

  useItemSubscription(
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
