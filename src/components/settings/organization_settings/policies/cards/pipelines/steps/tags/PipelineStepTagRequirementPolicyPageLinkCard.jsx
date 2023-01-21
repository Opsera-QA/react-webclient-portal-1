import React from "react";
import PropType from "prop-types";
import PolicyManagementPageLinkCardBase
  from "components/settings/organization_settings/policies/cards/PolicyManagementPageLinkCardBase";
import InactivePipelineStepTagRequirementPolicyPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/steps/tags/InactivePipelineStepTagRequirementPolicyPageLinkCard";

export default function PipelineStepTagRequirementPolicyPageLinkCard({ pipelineStepTagRequirementPolicy, }) {
  if (pipelineStepTagRequirementPolicy == null) {
    return (
      <InactivePipelineStepTagRequirementPolicyPageLinkCard />
    );
  }

  return (
    <PolicyManagementPageLinkCardBase
      policy={pipelineStepTagRequirementPolicy}
    />
  );
}

PipelineStepTagRequirementPolicyPageLinkCard.propTypes = {
  pipelineStepTagRequirementPolicy: PropType.object,
};
