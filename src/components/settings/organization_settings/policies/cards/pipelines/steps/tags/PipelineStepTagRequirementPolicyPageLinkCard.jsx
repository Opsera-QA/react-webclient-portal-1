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
        This Policy rule prevents new Pipeline Steps from being created without a tag for improving Opsera Insights functionality.
        Please note: Deploy type Pipeline Steps have unique tag rules, so this rule will not restrict those.
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
