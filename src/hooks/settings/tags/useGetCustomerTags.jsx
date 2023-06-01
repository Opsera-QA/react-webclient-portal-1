import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useTagActions from "hooks/settings/tags/useTagActions";
import liveMessageTopicConstants from "@opsera/definitions/constants/websocket/constants/liveMessageTopic.constants";
import useCollectionSubscriptionHelper from "core/websocket/hooks/collection/useCollectionSubscriptionHelper";
import {tagHelper} from "components/settings/tags/tag.helper";

export default function useGetCustomerTags(handleErrorFunction) {
  const tagActions = useTagActions();
  const [customerTags, setCustomerTags] = useState([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useCollectionSubscriptionHelper(
    liveMessageTopicConstants.LIVE_MESSAGE_TOPICS.TAGS,
    "Tag",
    (tag) => `${tag?.type}: ${tag?.value}`,
    customerTags,
    setCustomerTags,
    (tagId) => tagHelper.getDetailViewLink(tagId),
    false,
  );


  useEffect(() => {
    setCustomerTags([]);

    if (loadData) {
      loadData(getCustomerTags, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getCustomerTags = async () => {
    setCustomerTags([]);
    const response = await tagActions.getAllTagsV2(false);
    setCustomerTags(DataParsingHelper.parseArray(response?.data?.data, []));
  };

  return ({
    customerTags: customerTags,
    setCustomerTags: setCustomerTags,
    loadData: () => loadData(getCustomerTags, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
