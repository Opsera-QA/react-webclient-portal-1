import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useTagActions from "hooks/settings/tags/useTagActions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

export default function useGetTagById(tagId, handleErrorFunction) {
  const tagActions = useTagActions();
  const [tag, setTag] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setTag(undefined);

    if (isMongoDbId(tagId) && loadData) {
      loadData(getCustomerTags, handleErrorFunction).catch(() => {});
    }
  }, [tagId]);

  const getCustomerTags = async () => {
    setTag(undefined);
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
