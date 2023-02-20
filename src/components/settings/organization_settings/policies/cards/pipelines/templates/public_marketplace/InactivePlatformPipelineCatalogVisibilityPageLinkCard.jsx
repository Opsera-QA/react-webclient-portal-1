import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import PolicyActivationConfirmationOverlay
  from "components/settings/organization_settings/policies/cards/inactive/PolicyActivationConfirmationOverlay";
import InactivePlatformPipelineCatalogVisibilityPageLinkCardBase
  from "temp-library-components/cards/policies/pipelines/templates/public_marketplace/InactivePlatformPipelineCatalogVisibilityPageLinkCardBase";

export default function InactivePlatformPipelineCatalogVisibilityPageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <PolicyActivationConfirmationOverlay
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
