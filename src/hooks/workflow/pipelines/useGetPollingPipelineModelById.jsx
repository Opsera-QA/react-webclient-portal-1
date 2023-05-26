import {useEffect, useState} from "react";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import useGetPollingPipelineById from "hooks/workflow/pipelines/useGetPollingPipelineById";
import useGetPipelineModel from "hooks/workflow/pipelines/model/useGetPipelineModel";

export default function useGetPollingPipelineModelById(
  id,
  handleErrorFunction,
) {
  const [pipelineModel, setPipelineModel] = useState(undefined);
  const { getPipelineModel } = useGetPipelineModel();
  const {
    pipeline,
    loadData,
    isLoading,
    error,
    setError,
    status,
    updatedAt,
    runCount,
    isQueued,
    lastStep,
    restingStepId,
  } = useGetPollingPipelineById(id, handleErrorFunction);

  useEffect(() => {
    if (ObjectHelper.areObjectsEqualLodash(pipeline, pipelineModel?.getOriginalData()) !== true) {
      setPipelineModel({...getPipelineModel(pipeline, false)});
    }
  }, [pipeline]);

  return ({
    pipelineModel: pipelineModel,
    setPipelineModel: setPipelineModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
    status: status,
    updatedAt: updatedAt,
    runCount: runCount,
    isQueued: isQueued,
    lastStep: lastStep,
    restingStepId: restingStepId,
  });
}
