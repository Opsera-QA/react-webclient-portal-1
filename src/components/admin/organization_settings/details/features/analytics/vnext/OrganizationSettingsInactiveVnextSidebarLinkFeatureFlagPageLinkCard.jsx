import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import InactivePipelinePublishingPolicyPageLinkCardBase
  from "temp-library-components/cards/policies/pipelines/publishing/InactivePipelinePublishingPolicyPageLinkCardBase";
import PropType from "prop-types";
import featureFlagConstants
  from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.constants";
import OrganizationSettingsFeatureFlagActivationConfirmationOverlay
  from "components/admin/organization_settings/details/features/inactive/OrganizationSettingsFeatureFlagActivationConfirmationOverlay";
import OrganizationSettingsVnextSidebarLinkFeatureFlagPageLinkCard
  from "components/admin/organization_settings/details/features/analytics/vnext/OrganizationSettingsVnextSidebarLinkFeatureFlagPageLinkCard";

export default function OrganizationSettingsInactiveVnextSidebarLinkFeatureFlagPageLinkCard(
  {
    organizationDomain,
   organizationAccountId,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <OrganizationSettingsFeatureFlagActivationConfirmationOverlay
        policyName={featureFlagConstants.FEATURE_FLAG_NAMES.SHOW_INSIGHTS_VNEXT_SIDEBAR_LINK}
        organizationDomain={organizationDomain}
        organizationAccountName={organizationAccountId}
      />
    );
  };

  return (
    <OrganizationSettingsVnextSidebarLinkFeatureFlagPageLinkCard
      onClickFunction={launchActivationConfirmationOverlay}
    />
  );
}

OrganizationSettingsInactiveVnextSidebarLinkFeatureFlagPageLinkCard.propTypes = {
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
