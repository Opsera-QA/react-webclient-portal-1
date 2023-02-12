import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

export const analyticsPipelineDataMappingHelper = {};

analyticsPipelineDataMappingHelper.getManagementScreenLink = () => {
  return `/settings/data_mapping`;
};

analyticsPipelineDataMappingHelper.getDetailViewLink = (analyticsDataEntryId) => {
  if (isMongoDbId(analyticsDataEntryId) !== true) {
    return null;
  }

  return `/settings/data_mapping/pipeline/details/${analyticsDataEntryId}`;
};
