import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import PolicyActivationConfirmationOverlay
  from "components/settings/organization_settings/policies/cards/inactive/PolicyActivationConfirmationOverlay";
import InactivePipelineStepTagRequirementPolicyPageLinkCardBase
  from "temp-library-components/cards/policies/pipelines/steps/tags/InactivePipelineStepTagRequirementPolicyPageLinkCardBase";

export default function OrganizationSettingsInactivePipelineStepTagRequirementPolicyPageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <PolicyActivationConfirmationOverlay
        policyName={policyConstants.POLICY_NAMES.PIPELINE_STEP_TAG_REQUIREMENT}
      />
    );
  };

  return (
    <InactivePipelineStepTagRequirementPolicyPageLinkCardBase
      onClickFunction={launchActivationConfirmationOverlay}
    />
  );
}
