import {useEffect, useState} from "react";
import useGetCustomerPipelineTemplateById from "hooks/workflow/catalog/customer/useGetCustomerPipelineTemplateById";
import useGetCustomerPipelineTemplateModel from "hooks/workflow/catalog/customer/useGetCustomerPipelineTemplateModel";

export default function useGetCustomerPipelineTemplateModelById(
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
  const {getCustomerPipelineTemplateModel} = useGetCustomerPipelineTemplateModel();
  const [pipelineTemplateModel, setPipelineTemplateModel] = useState(undefined);

  useEffect(() => {
    setPipelineTemplateModel(undefined);

    if (pipelineTemplate) {
      setPipelineTemplateModel(getCustomerPipelineTemplateModel(pipelineTemplate));
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
