import {hasStringValue} from "components/common/helpers/string-helpers";

export const organizationSettingsHelper = {};

organizationSettingsHelper.getDetailViewLink = (
  organizationAccountId,
  ) => {
  if (hasStringValue(organizationAccountId) !== true) {
    return null;
  }

  return `/admin/organization-settings/details/${organizationAccountId}`;
};

organizationSettingsHelper.getManagementScreenLink = () => {
  return `/admin/organization-settings`;
};