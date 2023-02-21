import React from "react";
import PropType from "prop-types";
import PolicyManagementPageLinkCardBase
  from "components/settings/organization_settings/policies/cards/PolicyManagementPageLinkCardBase";
import PolicyManagementInactivePipelineStepTagRequirementPolicyPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/steps/tags/PolicyManagementInactivePipelineStepTagRequirementPolicyPageLinkCard";

export default function OrganizationSettingsPipelineStepTagRequirementPolicyPageLinkCard({ pipelineStepTagRequirementPolicy, }) {
  if (pipelineStepTagRequirementPolicy == null) {
    return (
      <PolicyManagementInactivePipelineStepTagRequirementPolicyPageLinkCard />
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

OrganizationSettingsPipelineStepTagRequirementPolicyPageLinkCard.propTypes = {
  pipelineStepTagRequirementPolicy: PropType.object,
};
