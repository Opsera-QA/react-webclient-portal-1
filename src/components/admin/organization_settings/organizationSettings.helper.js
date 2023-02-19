import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const organizationSettingsHelper = {};

organizationSettingsHelper.getDetailViewLink = (
  tagId,
  ) => {
  if (isMongoDbId(tagId) !== true) {
    return null;
  }

  return `/settings/tags/${tagId}`;
};

organizationSettingsHelper.getManagementScreenLink = () => {
  return `/settings/tags/`;
};