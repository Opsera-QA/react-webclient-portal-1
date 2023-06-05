import React from "react";
import PropType from "prop-types";
import OrganizationSettingsEntitlementPageLinkCardBase
  from "components/admin/organization_settings/details/entitlements/OrganizationSettingsEntitlementPageLinkCardBase";
import EnableSalesforceFeaturesInactiveEntitlementPageLinkCard
  from "components/admin/organization_settings/details/entitlements/cards/salesforce_landing/EnableSalesforceFeaturesInactiveEntitlementPageLinkCard";

export default function EnableSalesforceFeaturesPageEntitlementPageLinkCard(
  {
    entitlement,
    organizationDomain,
    organizationAccountId,
  }) {
  if (entitlement == null) {
    return (
      <EnableSalesforceFeaturesInactiveEntitlementPageLinkCard
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

EnableSalesforceFeaturesPageEntitlementPageLinkCard.propTypes = {
  entitlement: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
