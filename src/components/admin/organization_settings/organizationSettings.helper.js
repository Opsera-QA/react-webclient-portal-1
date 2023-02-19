import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const organizationSettingsHelper = {};

organizationSettingsHelper.getDetailViewLink = (
  organizationAccountId,
  ) => {
  if (isMongoDbId(organizationAccountId) !== true) {
    return null;
  }

  return `admin/organization-settings/details/${organizationAccountId}`;
};

organizationSettingsHelper.getManagementScreenLink = () => {
  return `admin/organization-settings`;
};