import {useEffect, useState} from "react";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import useGetPipelineModel from "hooks/workflow/pipelines/model/useGetPipelineModel";
import useGetPipelineById from "hooks/workflow/pipelines/useGetPipelineById";

export default function useGetPipelineModelById(
  id,
  handleErrorFunction,
) {
  const [pipelineModel, setPipelineModel] = useState(undefined);
  const { getPipelineModel } = useGetPipelineModel();
  const {
    pipeline,
    loadData,
    error,
    isLoading,
  } = useGetPipelineById(id, handleErrorFunction);

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
  });
}
