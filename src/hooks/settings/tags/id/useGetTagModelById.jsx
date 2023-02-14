import {useEffect, useState} from "react";
import tagMetadata from "components/settings/tags/tag.metadata";
import useGetTagById from "hooks/settings/tags/id/useGetTagById";
import modelHelpers from "components/common/model/modelHelpers";

export default function useGetTagModelById(tagId, handleErrorFunction) {
  const [tagModel, setTagModel] = useState(undefined);
  const {
    tag,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetTagById(tagId, handleErrorFunction);

  useEffect(() => {
    setTagModel(undefined);

    if (tag) {
      setTagModel({...modelHelpers.parseObjectIntoModel(tag, tagMetadata)});
    }
  }, [tag]);

  return ({
    tagModel: tagModel,
    setTagModel: setTagModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
