import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useTagActions from "hooks/settings/tags/useTagActions";
import liveMessageTopicConstants from "@opsera/definitions/constants/websocket/constants/liveMessageTopic.constants";
import {TagFilterModel} from "components/settings/tags/tag.filter.model";
import {tagHelper} from "components/settings/tags/tag.helper";
import useCollectionSubscriptionHelper from "core/websocket/hooks/collection/useCollectionSubscriptionHelper";

export default function useGetFilteredCustomerTags(handleErrorFunction) {
  const tagActions = useTagActions();
  const [tagFilterModel, setTagFilterModel] = useState(new TagFilterModel());
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
  );

  useEffect(() => {
    setCustomerTags([]);

    if (loadData) {
      loadData(getCustomerTags, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getCustomerTags = async (filterModel = tagFilterModel) => {
    setCustomerTags([]);
    const response = await tagActions.getTags(
      filterModel,
    );
    const tags = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setCustomerTags([...tags]);
    filterModel.setData("totalCount", response?.data?.count);
    filterModel.setData("activeFilters", filterModel?.getActiveFilters());
    setTagFilterModel({...filterModel});
  };

  return ({
    customerTags: customerTags,
    setCustomerTags: setCustomerTags,
    tagFilterModel: tagFilterModel,
    setTagFilterModel: setTagFilterModel,
    loadData: () => loadData(getCustomerTags, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
