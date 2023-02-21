import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import InactivePipelineStepTagRequirementPolicyPageLinkCardBase
  from "temp-library-components/cards/policies/pipelines/steps/tags/InactivePipelineStepTagRequirementPolicyPageLinkCardBase";
import OrganizationSettingsPolicyActivationConfirmationOverlay
  from "components/admin/organization_settings/details/policies/inactive/OrganizationSettingsPolicyActivationConfirmationOverlay";

export default function OrganizationSettingsInactivePipelineStepTagRequirementPolicyPageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <OrganizationSettingsPolicyActivationConfirmationOverlay
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
