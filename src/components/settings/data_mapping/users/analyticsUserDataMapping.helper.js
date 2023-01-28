import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

export const analyticsUserDataMappingHelper = {};

analyticsUserDataMappingHelper.getManagementScreenLink = () => {
  return `/settings/data_mapping`;
};

analyticsUserDataMappingHelper.getDetailViewLink = (analyticsDataEntryId) => {
  if (isMongoDbId(analyticsDataEntryId) !== true) {
    return null;
  }

  return `/settings/data_mapping/user_mapping/details/${analyticsDataEntryId}`;
};
