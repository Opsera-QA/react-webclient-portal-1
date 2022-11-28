import {useEffect, useState} from "react";
import useGetCustomerPipelineTemplateById from "hooks/workflow/catalog/customer/useGetCustomerPipelineTemplateById";
import useGetPlatformPipelineTemplateModel from "hooks/workflow/catalog/platform/useGetPlatformPipelineTemplateModel";

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
  } = useGetCustomerPipelineTemplateById(id, handleErrorFunction);
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
