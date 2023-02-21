import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import InactivePipelinePublishingPolicyPageLinkCardBase
  from "temp-library-components/cards/policies/pipelines/publishing/InactivePipelinePublishingPolicyPageLinkCardBase";
import OrganizationSettingsPolicyActivationConfirmationOverlay
  from "components/admin/organization_settings/details/policies/inactive/OrganizationSettingsPolicyActivationConfirmationOverlay";

export default function OrganizationSettingsInactivePipelinePublishingPolicyPageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <OrganizationSettingsPolicyActivationConfirmationOverlay
        policyName={policyConstants.POLICY_NAMES.PIPELINE_PRIVATE_CATALOG_PUBLISHING_RESTRICTIONS}
      />
    );
  };

  return (
    <InactivePipelinePublishingPolicyPageLinkCardBase
      onClickFunction={launchActivationConfirmationOverlay}
    />
  );
}
