import Model from "core/data_model/model";

const modelHelpers = {};

// TODO: Rename getConfigurationModel
modelHelpers.getToolConfigurationModel = (toolConfiguration, metaData) => {
  if (Object.entries(toolConfiguration).length === 0) {
    return new Model({...metaData.newObjectFields}, metaData, true);
  }
  return new Model(toolConfiguration, metaData, false);
};

modelHelpers.getPipelineStepConfigurationModel = (pipelineStepConfiguration, pipelineStepMetadata) => {
  let configuration = pipelineStepConfiguration?.configuration;
  if (configuration == null || Object.entries(configuration).length === 0) {
    return new Model({...pipelineStepMetadata.newObjectFields}, pipelineStepMetadata, true);
  }
  return new Model({...configuration}, pipelineStepMetadata, false);
};

modelHelpers.getPipelineStepConfigurationThresholdModel = (pipelineStepConfiguration, thresholdMetadata) => {
  let threshold = pipelineStepConfiguration?.threshold;
  if (threshold == null || Object.entries(threshold).length === 0) {
    return new Model({...thresholdMetadata.newObjectFields}, thresholdMetadata, true);
  }
  return new Model(threshold, thresholdMetadata, false);
};


export default modelHelpers;