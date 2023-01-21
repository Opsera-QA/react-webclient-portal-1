import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import PolicyActivationConfirmationOverlay
  from "components/settings/organization_settings/policies/cards/inactive/PolicyActivationConfirmationOverlay";

export default function InactivePipelineStepTagRequirementPolicyPageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const getBody = () => {
    return (
      <div>
        <div className={"mb-2"}>The {policyConstants.POLICY_NAME_LABELS.PIPELINE_STEP_TAG_REQUIREMENT} Policy is an optional Policy that Site Administrators can enable.</div>
        <div className={"mb-2"}>By activating this Policy, you can restrict publishing pipelines to specific Site Roles.</div>
      </div>
    );
  };

  const title = (
    <div className={"d-flex justify-content-between"}>
      <div>{policyConstants.POLICY_NAME_LABELS.PIPELINE_STEP_TAG_REQUIREMENT}</div>
    </div>
  );

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <PolicyActivationConfirmationOverlay
        policyName={policyConstants.POLICY_NAMES.PIPELINE_STEP_TAG_REQUIREMENT}
      />
    );
  };

  return (
    <SelectionCardBase
      className={"my-3"}
      titleText={title}
      inactive={true}
      body={getBody()}
      onClickFunction={launchActivationConfirmationOverlay}
    />
  );
}
