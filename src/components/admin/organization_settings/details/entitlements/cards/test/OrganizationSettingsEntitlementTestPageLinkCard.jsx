import React from "react";
import PropType from "prop-types";
import OrganizationSettingsEntitlementPageLinkCardBase
  from "components/admin/organization_settings/details/entitlements/OrganizationSettingsEntitlementPageLinkCardBase";
import OrganizationSettingsInactiveTestEntitlementPageLinkCard
  from "components/admin/organization_settings/details/entitlements/cards/test/OrganizationSettingsInactiveTestEntitlementPageLinkCard";

export default function OrganizationSettingsEntitlementTestPageLinkCard(
  {
    entitlement,
    organizationDomain,
    organizationAccountId,
  }) {
  if (entitlement == null) {
    return (
      <OrganizationSettingsInactiveTestEntitlementPageLinkCard
        organizationDomain={organizationDomain}
        organizationAccountId={organizationAccountId}
      />
    );
  }

  return (
    <OrganizationSettingsEntitlementPageLinkCardBase
      entitlement={entitlement}
      organizationDomain={organizationDomain}
      organizationAccountId={organizationAccountId}
    />
  );
}

OrganizationSettingsEntitlementTestPageLinkCard.propTypes = {
  entitlement: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
