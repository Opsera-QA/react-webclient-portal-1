import React from "react";
import PropType from "prop-types";
import OrganizationSettingsFeatureFlagsPageLinkCardBase from "components/admin/organization_settings/details/features/OrganizationSettingsFeatureFlagsPageLinkCardBase";
import OrganizationSettingsInactiveGitCustodianLandingPageFeatureFlagPageLinkCard from "components/admin/organization_settings/details/features/analytics/git_custodian/OrganizationSettingsInactiveGitCustodianLandingPageFeatureFlagPageLinkCard";

export default function OrganizationSettingsGitCustodianLandingPageFeatureFlagPageLinkCard(
  {
    featureFlag,
    organizationDomain,
    organizationAccountId,
  }) {
  if (featureFlag == null) {
    return (
      <OrganizationSettingsInactiveGitCustodianLandingPageFeatureFlagPageLinkCard
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

OrganizationSettingsGitCustodianLandingPageFeatureFlagPageLinkCard.propTypes = {
  featureFlag: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
