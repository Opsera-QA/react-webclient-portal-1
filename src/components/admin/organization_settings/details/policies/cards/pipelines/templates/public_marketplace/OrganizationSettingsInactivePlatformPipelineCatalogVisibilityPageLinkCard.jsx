import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import InactivePlatformPipelineCatalogVisibilityPageLinkCardBase
  from "temp-library-components/cards/policies/pipelines/templates/public_marketplace/InactivePlatformPipelineCatalogVisibilityPageLinkCardBase";
import OrganizationSettingsPolicyActivationConfirmationOverlay
  from "components/admin/organization_settings/details/policies/inactive/OrganizationSettingsPolicyActivationConfirmationOverlay";
import PropType from "prop-types";

export default function OrganizationSettingsInactivePlatformPipelineCatalogVisibilityPageLinkCard(
  {
    organizationDomain,
    organizationAccountId,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <OrganizationSettingsPolicyActivationConfirmationOverlay
        policyName={policyConstants.POLICY_NAMES.PLATFORM_PIPELINE_CATALOG_VISIBILITY}
        organizationAccountId={organizationAccountId}
        organizationDomain={organizationDomain}
      />
    );
  };

  return (
    <InactivePlatformPipelineCatalogVisibilityPageLinkCardBase
      onClickFunction={launchActivationConfirmationOverlay}
      organizationAccountId={organizationAccountId}
      organizationDomain={organizationDomain}
    />
  );
}

OrganizationSettingsInactivePlatformPipelineCatalogVisibilityPageLinkCard.propTypes = {
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};