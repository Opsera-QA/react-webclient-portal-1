import React from "react";
import PropType from "prop-types";
import OrganizationSettingsInactivePipelinePublishingPolicyPageLinkCard
  from "components/admin/organization_settings/details/policies/cards/pipelines/publishing/OrganizationSettingsInactivePipelinePublishingPolicyPageLinkCard";
import OrganizationSettingsCustomerPolicyPageLinkCardBase
  from "components/admin/organization_settings/details/policies/OrganizationSettingsCustomerPolicyPageLinkCardBase";

export default function OrganizationSettingsPipelinePublishingPolicyPageLinkCard(
  {
    pipelinePublishingRestrictionsPolicy,
    organizationDomain,
    organizationAccountId,
  }) {
  if (pipelinePublishingRestrictionsPolicy == null) {
    return (
      <OrganizationSettingsInactivePipelinePublishingPolicyPageLinkCard
        organizationDomain={organizationDomain}
        organizationAccountId={organizationAccountId}
      />
    );
  }

  return (
    <OrganizationSettingsCustomerPolicyPageLinkCardBase
      policy={pipelinePublishingRestrictionsPolicy}
      organizationDomain={organizationDomain}
      organizationAccountId={organizationAccountId}
    />
  );
}

OrganizationSettingsPipelinePublishingPolicyPageLinkCard.propTypes = {
  pipelinePublishingRestrictionsPolicy: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
