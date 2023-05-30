import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useTagActions from "hooks/settings/tags/useTagActions";
import liveMessageTopicConstants from "@opsera/definitions/constants/websocket/constants/liveMessageTopic.constants";
import useCollectionSubscriptionHelper from "core/websocket/hooks/useCollectionSubscriptionHelper";

export default function useGetCustomerTags(handleErrorFunction) {
  const tagActions = useTagActions();
  const [customerTags, setCustomerTags] = useState([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const onCreateFunction = (newTag) => {
    const parsedTag = DataParsingHelper.parseObject(newTag);

    if (parsedTag) {
      const tagIndex = customerTags.findIndex((tag) => tag._id === parsedTag._id);

      if (tagIndex === -1) {
        customerTags.push(parsedTag);
        setCustomerTags([...customerTags]);
      }
    }
  };

  const onUpdateFunction = (updatedTag) => {
    const parsedTag = DataParsingHelper.parseObject(updatedTag);

    if (parsedTag) {
      const tagIndex = customerTags.findIndex((tag) => tag._id === parsedTag._id);

      if (tagIndex !== -1) {
        customerTags[tagIndex] = parsedTag;
        setCustomerTags([...customerTags]);
      }
    }
  };

  const onDeleteFunction = (deletedTag) => {
    const parsedTag = DataParsingHelper.parseObject(deletedTag);

    if (parsedTag) {
      const parsedTagMongoDbId = DataParsingHelper.parseMongoDbId(parsedTag, "_id");
      const updatedTags = customerTags.filter((tag) => tag._id !== parsedTagMongoDbId);
      setCustomerTags([...updatedTags]);
    }
  };

  useCollectionSubscriptionHelper(
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
