import Model from "core/data_model/model";
import ModelBase from "core/data_model/model.base";
import {kpiSettingsMetadata} from "components/insights/marketplace/charts/kpi-configuration-metadata";

const modelHelpers = {};

// TODO: Rename getConfigurationModel
modelHelpers.getToolConfigurationModel = (toolConfiguration, metaData) => {
  if (toolConfiguration == null || Object.entries(toolConfiguration).length === 0) {
    return new Model({...metaData.newObjectFields}, metaData, true);
  }
  return new Model(toolConfiguration, metaData, false);
};

modelHelpers.parseObjectIntoModel = (object, metaData) => {
  if (object == null || Object.entries(object).length === 0) {
    return new Model({...metaData.newObjectFields}, metaData, true);
  }

  return new Model(object, metaData, false);
};

modelHelpers.parseObjectIntoModelBase = (object, metaData) => {
  if (object == null || Object.entries(object).length === 0) {
    return new ModelBase({...metaData.newObjectFields}, metaData, true);
  }

  return new ModelBase(object, metaData, false);
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

// TODO: Tejas, you need to write newObjectFields for each passed in metadata
modelHelpers.getDashboardFilterModel = (kpiConfiguration, type, dashboardFilterMetadata) => {
  let dashboardFilters = kpiConfiguration?.filters;
  let index = dashboardFilters?.findIndex((filter) => filter.type === type);

  if (index == null || index === -1) {
    return new Model({...dashboardFilterMetadata?.newObjectFields}, dashboardFilterMetadata, true);
  }

  return new Model({...dashboardFilters[index]}, dashboardFilterMetadata, false);
};

modelHelpers.setDashboardFilterModelField = (kpiConfiguration, type, newValue) => {
  let dashboardFilters = kpiConfiguration.getArrayData("filters");
  let index = dashboardFilters?.findIndex((filter) => filter.type === type);

  if (index == null || index === -1) {
    dashboardFilters.push({ type: type, value: newValue});
  }
  else {
    dashboardFilters[index].value = newValue;
  }

  kpiConfiguration.setData("filters", dashboardFilters);

  return kpiConfiguration;
};

modelHelpers.getDashboardSettingsModel = (kpiConfiguration, metadata = kpiSettingsMetadata) => {
  let dashboardSettings = kpiConfiguration?.settings;

  if (dashboardSettings) {
    return new Model(dashboardSettings, metadata, true);
  }

  return new Model({...metadata?.newObjectFields}, metadata, true);
};

export default modelHelpers;