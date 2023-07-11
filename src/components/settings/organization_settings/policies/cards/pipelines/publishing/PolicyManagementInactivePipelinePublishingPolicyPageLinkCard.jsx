import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import PolicyManagementPolicyActivationConfirmationOverlay from "components/settings/organization_settings/policies/cards/inactive/PolicyManagementPolicyActivationConfirmationOverlay";
import InactivePipelinePublishingPolicyPageLinkCardBase from "temp-library-components/cards/policies/pipelines/publishing/InactivePipelinePublishingPolicyPageLinkCardBase";

export default function PolicyManagementInactivePipelinePublishingPolicyPageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <PolicyManagementPolicyActivationConfirmationOverlay
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
