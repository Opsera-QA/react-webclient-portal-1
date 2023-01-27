import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

export const analyticsDataEntryHelper = {};

analyticsDataEntryHelper.getManagementScreenLink = () => {
  return `/settings/analytics-data-entries`;
};

analyticsDataEntryHelper.getDetailViewLink = (analyticsDataEntryId) => {
  if (isMongoDbId(analyticsDataEntryId) !== true) {
    return null;
  }

  return `/settings/analytics-data-entries/details/${analyticsDataEntryId}`;
};
