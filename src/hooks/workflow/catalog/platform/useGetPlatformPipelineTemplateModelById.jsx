import {useEffect, useState} from "react";
import useGetPlatformPipelineTemplateModel from "hooks/workflow/catalog/platform/useGetPlatformPipelineTemplateModel";
import useGetPlatformPipelineTemplateById from "hooks/workflow/catalog/platform/useGetPlatformPipelineTemplateById";

export default function useGetPlatformPipelineTemplateModelById(
  id,
  handleErrorFunction,
) {
  const {
    pipelineTemplate,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetPlatformPipelineTemplateById(id, handleErrorFunction);
  const {getPlatformPipelineTemplateModel} = useGetPlatformPipelineTemplateModel();
  const [pipelineTemplateModel, setPipelineTemplateModel] = useState(undefined);

  useEffect(() => {
    setPipelineTemplateModel(undefined);

    if (pipelineTemplate) {
      setPipelineTemplateModel(getPlatformPipelineTemplateModel(pipelineTemplate));
    }
  }, [pipelineTemplate]);

  return ({
    pipelineTemplateModel: pipelineTemplateModel,
    setPipelineTemplateModel: setPipelineTemplateModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
