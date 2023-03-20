import React from "react";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import PropType from "prop-types";
import PolicyRoleHelper from "@opsera/know-your-role/roles/settings/policies/policyRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function InactivePipelineStepTagRequirementPolicyPageLinkCardBase({ onClickFunction, }) {
  const { userData } = useComponentStateReference();

  const getBody = () => {
    return (
      <div>
        <div className={"mb-2"}>The {policyConstants.POLICY_NAME_LABELS.PIPELINE_STEP_TAG_REQUIREMENT} Policy is an optional Policy that Site Administrators can enable.</div>
        <div className={"mb-2"}>By activating this Policy, you can prevent new Pipeline Steps from being created without a tag for improving Opsera Insights functionality.</div>
        <div className={"mb-2"}>Please note: Deploy type Pipeline Steps have unique tag rules, so this rule will not restrict those.</div>
      </div>
    );
  };

  const title = (
    <div className={"d-flex justify-content-between"}>
      <div>{policyConstants.POLICY_NAME_LABELS.PIPELINE_STEP_TAG_REQUIREMENT}</div>
    </div>
  );

  return (
    <SelectionCardBase
      className={"my-3"}
      titleText={title}
      inactive={true}
      body={getBody()}
      onClickFunction={onClickFunction}
      disabled={PolicyRoleHelper.canEditPolicies(userData) !== true}
    />
  );
}

InactivePipelineStepTagRequirementPolicyPageLinkCardBase.propTypes = {
  onClickFunction: PropType.func,
};
