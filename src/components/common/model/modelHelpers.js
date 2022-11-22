import Model from "core/data_model/model";
import ModelBase from "core/data_model/model.base";
import {kpiSettingsMetadata} from "components/insights/marketplace/charts/kpi-configuration-metadata";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import _ from "lodash";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {pipelineStepMetadataConstants} from "components/workflow/pipelines/pipelineStepMetadata.constants";

const modelHelpers = {};

// TODO: migrate to parseObjectIntoModel and remove
modelHelpers.getToolConfigurationModel = (toolConfiguration, metaData) => {
  if (metaData == null) {
    return null;
  }

  const clonedMetadata = dataParsingHelper.cloneDeep(metaData);

  if (toolConfiguration == null || Object.entries(toolConfiguration).length === 0) {
    return new Model({...clonedMetadata.newObjectFields}, clonedMetadata, true);
  }

  return new Model(toolConfiguration, clonedMetadata, false);
};

modelHelpers.getNewModelForMetadata = (metaData, isNew = true) => {
  if (metaData == null) {
    return null;
  }

  const clonedMetadata = dataParsingHelper.cloneDeep(metaData);
  return new Model({...clonedMetadata.newObjectFields}, clonedMetadata, isNew);
};

modelHelpers.parseObjectIntoModel = (object, metaData) => {
  if (metaData == null) {
    return null;
  }

  const clonedMetadata = dataParsingHelper.cloneDeep(metaData);

  if (object == null || Object.entries(object).length === 0) {
    return new Model({...clonedMetadata.newObjectFields}, clonedMetadata, true);
  }

  return new Model(object, clonedMetadata, false);
};

modelHelpers.parseFilterModel = (metaData) => {
  if (metaData == null) {
    return null;
  }

  const clonedMetadata = _.cloneDeep(metaData);
  return new Model({...clonedMetadata.newObjectFields}, clonedMetadata, false);
};

modelHelpers.parseObjectIntoModelBase = (object, metaData) => {
  if (metaData == null) {
    return null;
  }

  const clonedMetadata =dataParsingHelper.cloneDeep(metaData);

  if (object == null || Object.entries(object).length === 0) {
    return new ModelBase({...clonedMetadata.newObjectFields}, clonedMetadata, true);
  }

  return new ModelBase(object, clonedMetadata, false);
};

// TODO: Migrate to using modelHelpers.parseObjectIntoModel and remove
modelHelpers.getPipelineStepConfigurationModel = (pipelineStepConfiguration, pipelineStepMetadata) => {
  let configuration = pipelineStepConfiguration?.configuration;
  if (configuration == null || Object.entries(configuration).length === 0) {
    return new Model({...pipelineStepMetadata.newObjectFields}, pipelineStepMetadata, true);
  }
  return new Model({...configuration}, pipelineStepMetadata, false);
};

modelHelpers.getPipelineStepModelForToolIdentifier = (toolIdentifier, pipelineStep) => {
  const metadata = pipelineStepMetadataConstants.getMetadataForIdentifier(toolIdentifier);
  const configuration = DataParsingHelper.parseNestedObject(pipelineStep, "tool.configuration");

  if (!metadata) {
    return undefined;
  }

  return modelHelpers.parseObjectIntoModel(configuration, metadata);
};

// TODO: Migrate to using modelHelpers.parseObjectIntoModel and remove OR hardcode threshold metadata
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
  const newModel = {...kpiConfiguration};
  let dashboardFilters = newModel.getArrayData("filters");
  let index = dashboardFilters?.findIndex((filter) => filter.type === type);

  if (index == null || index === -1) {
    dashboardFilters.push({ type: type, value: newValue});
  }
  else {
    dashboardFilters[index].value = newValue;
  }

  newModel.setData("filters", dashboardFilters);

  return newModel;
};

modelHelpers.getDashboardSettingsModel = (kpiConfiguration, metadata = kpiSettingsMetadata) => {
  let dashboardSettings = kpiConfiguration?.settings;

  if (dashboardSettings) {
    return new Model(dashboardSettings, metadata, true);
  }

  return new Model({...metadata?.newObjectFields}, metadata, true);
};

modelHelpers.isDataValid = (data, metadata) => {
  const parsedData = DataParsingHelper.parseObject(data);
  const parsedMetadata = DataParsingHelper.parseObject(metadata);

  if (!parsedData || !parsedMetadata) {
    return false;
  }

  return modelHelpers.parseObjectIntoModel(data, metadata)?.checkCurrentValidity() === true;
};

export default modelHelpers;