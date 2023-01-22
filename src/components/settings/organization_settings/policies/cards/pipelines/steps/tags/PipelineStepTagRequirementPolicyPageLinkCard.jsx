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

  const getDescription = () => {
    return (
      <div>
        Pipeline Step definitions of non-deploy types can no longer be saved without tags.
      </div>
    );
  };

  return (
    <PolicyManagementPageLinkCardBase
      policy={pipelineStepTagRequirementPolicy}
      description={getDescription()}
    />
  );
}

PipelineStepTagRequirementPolicyPageLinkCard.propTypes = {
  pipelineStepTagRequirementPolicy: PropType.object,
};
