import {useEffect, useState} from "react";
import tagMetadata from "components/settings/tags/tag.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import {websocketLiveUpdateHelper} from "core/websocket/websocket.helper";
import useGetPipelineActivityLogById from "hooks/workflow/pipelines/logs/useGetPipelineActivityLogById";

export default function useGetPipelineActivityLogModelById(pipelineActivityLogId, handleErrorFunction) {
  const [pipelineActivityLogModel, setPipelineActivityLogModel] = useState(undefined);
  const {
    pipelineActivityLog,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetPipelineActivityLogById(pipelineActivityLogId, handleErrorFunction);

  const getTagModel = (tag) => {
    return modelHelpers.parseObjectIntoModel(tag, tagMetadata);
  };

  useEffect(() => {
    if (!pipelineActivityLog) {
      setPipelineActivityLogModel(undefined);
    } else {
      websocketLiveUpdateHelper.handleModelLiveUpdate(
        pipelineActivityLogModel,
        setPipelineActivityLogModel,
        getTagModel,
        pipelineActivityLog,
      );
    }
  }, [pipelineActivityLog]);

  return ({
    pipelineActivityLogModel: pipelineActivityLogModel,
    setPipelineActivityLogModel: setPipelineActivityLogModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
