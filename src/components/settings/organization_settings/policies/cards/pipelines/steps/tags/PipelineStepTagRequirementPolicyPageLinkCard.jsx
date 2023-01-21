import React from "react";
import PropType from "prop-types";
import InactivePipelinePublishingPolicyPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/publishing/InactivePipelinePublishingPolicyPageLinkCard";
import PolicyManagementPageLinkCardBase
  from "components/settings/organization_settings/policies/cards/PolicyManagementPageLinkCardBase";

export default function PipelineStepTagRequirementPolicyPageLinkCard({ pipelineStepTagRequirementPolicy, }) {
  if (pipelineStepTagRequirementPolicy == null) {
    return (
      <InactivePipelinePublishingPolicyPageLinkCard />
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
