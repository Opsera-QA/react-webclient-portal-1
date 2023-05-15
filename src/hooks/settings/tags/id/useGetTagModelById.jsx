import {useEffect, useState} from "react";
import tagMetadata from "components/settings/tags/tag.metadata";
import useGetTagById from "hooks/settings/tags/id/useGetTagById";
import modelHelpers from "components/common/model/modelHelpers";
import {websocketLiveUpdateHelper} from "core/websocket/websocket.helper";

export default function useGetTagModelById(tagId, handleErrorFunction) {
  const [tagModel, setTagModel] = useState(undefined);
  const {
    tag,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetTagById(tagId, handleErrorFunction);

  const getTagModel = (tag) => {
    return modelHelpers.parseObjectIntoModel(tag, tagMetadata);
  };

  useEffect(() => {
    console.log("updating tag: " + JSON.stringify(tag));

    if (!tag) {
      setTagModel(undefined);
    } else {
      websocketLiveUpdateHelper.handleModelLiveUpdate(tagModel, setTagModel, getTagModel, tag);
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
