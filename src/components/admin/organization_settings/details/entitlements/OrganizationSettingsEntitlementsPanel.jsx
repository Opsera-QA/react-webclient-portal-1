import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import OrganizationSettingsEntitlementTestPageLinkCard
  from "components/admin/organization_settings/details/entitlements/cards/test/OrganizationSettingsEntitlementTestPageLinkCard";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";

export default function OrganizationSettingsEntitlementsPanel(
  {
    organizationSettingsModel,
    organizationDomain,
    organizationAccountId,
  }) {
  const parsedEntitlements = DataParsingHelper.parseArray(organizationSettingsModel?.getData("entitlements"), []);
  const testEntitlement = parsedEntitlements.find((entitlement) => entitlement.name === entitlementConstants.ENTITLEMENT_NAMES.TEST_ENTITLEMENT);

  if (!parsedEntitlements) {
    return null;
  }

  return (
    <div className={"mx-3"}>
      <OrganizationSettingsEntitlementTestPageLinkCard
        entitlement={testEntitlement}
        organizationDomain={organizationDomain}
        organizationAccountId={organizationAccountId}
      />
    </div>
  );
}

OrganizationSettingsEntitlementsPanel.propTypes = {
  organizationSettingsModel: PropTypes.object,
  organizationDomain: PropTypes.string,
  organizationAccountId: PropTypes.string,
};
