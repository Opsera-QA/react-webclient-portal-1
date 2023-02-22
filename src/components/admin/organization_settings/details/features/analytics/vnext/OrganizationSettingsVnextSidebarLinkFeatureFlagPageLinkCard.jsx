import React from "react";
import PropType from "prop-types";
import OrganizationSettingsInactiveVnextSidebarLinkFeatureFlagPageLinkCard
  from "components/admin/organization_settings/details/features/analytics/vnext/OrganizationSettingsInactiveVnextSidebarLinkFeatureFlagPageLinkCard";
import OrganizationSettingsFeatureFlagsPageLinkCardBase
  from "components/admin/organization_settings/details/features/OrganizationSettingsFeatureFlagsPageLinkCardBase";

export default function OrganizationSettingsVnextSidebarLinkFeatureFlagPageLinkCard(
  {
    featureFlag,
    organizationDomain,
    organizationAccountId,
  }) {
  if (featureFlag == null) {
    return (
      <OrganizationSettingsInactiveVnextSidebarLinkFeatureFlagPageLinkCard
        organizationDomain={organizationDomain}
        organizationAccountId={organizationAccountId}
      />
    );
  }

  return (
    <OrganizationSettingsFeatureFlagsPageLinkCardBase
      featureFlag={featureFlag}
      organizationDomain={organizationDomain}
      organizationAccountId={organizationAccountId}
    />
  );
}

OrganizationSettingsVnextSidebarLinkFeatureFlagPageLinkCard.propTypes = {
  pipelinePublishingRestrictionsPolicy: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
