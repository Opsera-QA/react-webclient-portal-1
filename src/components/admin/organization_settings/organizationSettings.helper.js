import {hasStringValue} from "components/common/helpers/string-helpers";

export const organizationSettingsHelper = {};

organizationSettingsHelper.getDetailViewLink = (
    organizationDomain,
    organizationAccountId,
  ) => {
  if (hasStringValue(organizationAccountId) !== true || hasStringValue(organizationDomain) !== true) {
    return null;
  }

  return `/admin/organization-settings/details/${organizationDomain}/${organizationAccountId}`;
};

organizationSettingsHelper.getManagementScreenLink = () => {
  return `/admin/organization-settings`;
};