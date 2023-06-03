import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import PolicyManagementPolicyActivationConfirmationOverlay
  from "components/settings/organization_settings/policies/cards/inactive/PolicyManagementPolicyActivationConfirmationOverlay";
import InactivePipelineStepTagRequirementPolicyPageLinkCardBase
  from "temp-library-components/cards/policies/pipelines/steps/tags/InactivePipelineStepTagRequirementPolicyPageLinkCardBase";

export default function PolicyManagementInactiveSalesforceDataMigrationPolicyPageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const getDescription = () => {
    return (
      <span>
        Enabling this rule would allow users to use Opsera to migrate data from one Salesforce instance to another. Where required, the mocking of data will be applied and the same can be leverage by users while seeding data into sandboxes.’
      </span>
    )
  };

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <PolicyManagementPolicyActivationConfirmationOverlay
        policyName={policyConstants.POLICY_NAMES.PIPELINE_STEP_TAG_REQUIREMENT}
        description={getDescription()}
      />
    );
  };

  return (
    <InactivePipelineStepTagRequirementPolicyPageLinkCardBase
      onClickFunction={launchActivationConfirmationOverlay}
    />
  );
}
