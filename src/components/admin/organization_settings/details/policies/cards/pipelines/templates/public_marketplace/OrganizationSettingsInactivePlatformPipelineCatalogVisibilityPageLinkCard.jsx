import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import InactivePlatformPipelineCatalogVisibilityPageLinkCardBase
  from "temp-library-components/cards/policies/pipelines/templates/public_marketplace/InactivePlatformPipelineCatalogVisibilityPageLinkCardBase";
import OrganizationSettingsPolicyActivationConfirmationOverlay
  from "components/admin/organization_settings/details/policies/inactive/OrganizationSettingsPolicyActivationConfirmationOverlay";

export default function OrganizationSettingsInactivePlatformPipelineCatalogVisibilityPageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <OrganizationSettingsPolicyActivationConfirmationOverlay
        policyName={policyConstants.POLICY_NAMES.PLATFORM_PIPELINE_CATALOG_VISIBILITY}
      />
    );
  };

  return (
    <InactivePlatformPipelineCatalogVisibilityPageLinkCardBase
      onClickFunction={launchActivationConfirmationOverlay}
    />
  );
}
