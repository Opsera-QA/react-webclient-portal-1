import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useTagActions from "hooks/settings/tags/useTagActions";
import useComponentStateReference from "hooks/useComponentStateReference";
import liveMessageTopicConstants from "@opsera/definitions/constants/websocket/constants/liveMessageTopic.constants";
import {TagFilterModel} from "components/settings/tags/tag.filter.model";

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
  const {websocketClient} = useComponentStateReference();

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
    websocketClient.subscribeToTopic(liveMessageTopicConstants.LIVE_MESSAGE_TOPICS.TAGS);
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
