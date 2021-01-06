import Model from "../../../core/data_model/model";

const modelHelpers = {};

// TODO: Rename getConfigurationModel
modelHelpers.getToolConfigurationModel = (toolConfiguration, metaData) => {
  if (Object.entries(toolConfiguration).length === 0) {
    return new Model({...metaData.newObjectFields}, metaData, true);
  }
  return new Model(toolConfiguration, metaData, false);
};

export default modelHelpers;