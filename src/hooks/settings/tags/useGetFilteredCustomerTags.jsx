import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useTagActions from "hooks/settings/tags/useTagActions";
import useComponentStateReference from "hooks/useComponentStateReference";
import liveMessageTopicConstants from "@opsera/definitions/constants/websocket/constants/liveMessageTopic.constants";
import {TagFilterModel} from "components/settings/tags/tag.filter.model";
import useItemListSubscriptionHelper from "core/websocket/hooks/useItemListSubscriptionHelper";
import {tagHelper} from "components/settings/tags/tag.helper";

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
  const {toastContext} = useComponentStateReference();

  const onCreateFunction = (newTag) => {
    const parsedTag = DataParsingHelper.parseObject(newTag);

    if (parsedTag) {
      const tagIndex = customerTags.findIndex((tag) => tag._id === parsedTag._id);

      if (tagIndex === -1) {
        toastContext.showInformationToast(
          `A new Tag has been created: [${parsedTag.type}: ${parsedTag.value}]`,
          15,
          undefined,
          tagHelper.getDetailViewLink(parsedTag._id),
        );
      }
    }
  };

  const onUpdateFunction = (updatedTag) => {
    const parsedTag = DataParsingHelper.parseObject(updatedTag);

    if (parsedTag) {
      const tagIndex = customerTags.findIndex((tag) => tag._id === parsedTag._id);

      if (tagIndex !== -1) {
        const foundTag = customerTags[tagIndex];
        customerTags[tagIndex] = parsedTag;
        setCustomerTags([...customerTags]);
        toastContext.showInformationToast(
          `The Tag [${foundTag.type}: ${foundTag.value}] has been updated`,
          15,
          undefined,
          tagHelper.getDetailViewLink(parsedTag._id),
        );
      }
    }
  };

  const onDeleteFunction = (deletedTag) => {
    const parsedTag = DataParsingHelper.parseObject(deletedTag);

    if (parsedTag) {
      const parsedTagMongoDbId = DataParsingHelper.parseMongoDbId(parsedTag, "_id");
      const updatedTags = customerTags.filter((tag) => tag._id !== parsedTagMongoDbId);
      setCustomerTags([...updatedTags]);
      toastContext.showInformationToast(
        `The Tag [${parsedTag.type}: ${parsedTag.value}] has been deleted`,
        15,
        undefined,
      );
    }
  };

  useItemListSubscriptionHelper(
    liveMessageTopicConstants.LIVE_MESSAGE_TOPICS.TAGS,
    onCreateFunction,
    onUpdateFunction,
    onDeleteFunction,
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
