import modelHelpers from "components/common/model/modelHelpers";
import pipelineTemplateMetadata from "components/admin/pipeline_templates/pipelineTemplate.metadata";

export default function useGetCustomerPipelineTemplateModel() {
  const getCustomerPipelineTemplateModel = (pipelineTemplate, isNew) => {
    return modelHelpers.parseObjectIntoModel(pipelineTemplate, pipelineTemplateMetadata);
  };

  return ({
    getCustomerPipelineTemplateModel: getCustomerPipelineTemplateModel,
  });
}
