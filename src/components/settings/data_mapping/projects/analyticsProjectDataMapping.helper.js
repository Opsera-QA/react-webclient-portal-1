import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

export const analyticsProjectDataMappingHelper = {};

analyticsProjectDataMappingHelper.getManagementScreenLink = () => {
  return `/settings/data_mapping`;
};

analyticsProjectDataMappingHelper.getDetailViewLink = (analyticsDataEntryId) => {
  if (isMongoDbId(analyticsDataEntryId) !== true) {
    return null;
  }

  return `/settings/data_mapping/projects/details/${analyticsDataEntryId}`;
};
