import React from "react";
import PropType from "prop-types";
import OrganizationSettingsInactivePipelineStepTagRequirementPolicyPageLinkCard
  from "components/admin/organization_settings/details/policies/cards/pipelines/steps/tags/OrganizationSettingsInactivePipelineStepTagRequirementPolicyPageLinkCard";
import OrganizationSettingsCustomerPolicyPageLinkCardBase
  from "components/admin/organization_settings/details/policies/OrganizationSettingsCustomerPolicyPageLinkCardBase";

export default function OrganizationSettingsPipelineStepTagRequirementPolicyPageLinkCard(
  {
    pipelineStepTagRequirementPolicy,
    organizationDomain,
    organizationAccountId,
  }) {
  if (pipelineStepTagRequirementPolicy == null) {
    return (
      <OrganizationSettingsInactivePipelineStepTagRequirementPolicyPageLinkCard
        organizationAccountId={organizationAccountId}
        organizationDomain={organizationDomain}
      />
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
    <OrganizationSettingsCustomerPolicyPageLinkCardBase
      policy={pipelineStepTagRequirementPolicy}
      description={getDescription()}
      organizationAccountId={organizationAccountId}
      organizationDomain={organizationDomain}
    />
  );
}

OrganizationSettingsPipelineStepTagRequirementPolicyPageLinkCard.propTypes = {
  pipelineStepTagRequirementPolicy: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
