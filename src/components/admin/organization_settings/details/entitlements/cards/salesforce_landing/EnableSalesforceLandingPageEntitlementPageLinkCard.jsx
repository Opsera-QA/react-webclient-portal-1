import React from "react";
import PropType from "prop-types";
import OrganizationSettingsEntitlementPageLinkCardBase
  from "components/admin/organization_settings/details/entitlements/OrganizationSettingsEntitlementPageLinkCardBase";
import EnableSalesforceLandingPageInactiveEntitlementPageLinkCard
  from "components/admin/organization_settings/details/entitlements/cards/salesforce_landing/EnableSalesforceLandingPageInactiveEntitlementPageLinkCard";

export default function EnableSalesforceLandingPageEntitlementPageLinkCard(
  {
    entitlement,
    organizationDomain,
    organizationAccountId,
  }) {
  if (entitlement == null) {
    return (
      <EnableSalesforceLandingPageInactiveEntitlementPageLinkCard
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

EnableSalesforceLandingPageEntitlementPageLinkCard.propTypes = {
  entitlement: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
