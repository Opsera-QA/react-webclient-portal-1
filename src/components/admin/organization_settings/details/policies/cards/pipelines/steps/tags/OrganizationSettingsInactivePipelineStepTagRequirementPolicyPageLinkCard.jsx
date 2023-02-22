import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import InactivePipelineStepTagRequirementPolicyPageLinkCardBase
  from "temp-library-components/cards/policies/pipelines/steps/tags/InactivePipelineStepTagRequirementPolicyPageLinkCardBase";
import OrganizationSettingsPolicyActivationConfirmationOverlay
  from "components/admin/organization_settings/details/policies/inactive/OrganizationSettingsPolicyActivationConfirmationOverlay";
import PropType from "prop-types";

export default function OrganizationSettingsInactivePipelineStepTagRequirementPolicyPageLinkCard(
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
        policyName={policyConstants.POLICY_NAMES.PIPELINE_STEP_TAG_REQUIREMENT}
        organizationDomain={organizationDomain}
        organizationAccountName={organizationAccountId}
      />
    );
  };

  return (
    <InactivePipelineStepTagRequirementPolicyPageLinkCardBase
      onClickFunction={launchActivationConfirmationOverlay}
    />
  );
}

OrganizationSettingsInactivePipelineStepTagRequirementPolicyPageLinkCard.propTypes = {
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};