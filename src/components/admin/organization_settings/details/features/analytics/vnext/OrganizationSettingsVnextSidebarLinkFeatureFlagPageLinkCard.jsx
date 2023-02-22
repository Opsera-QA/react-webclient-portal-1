import React from "react";
import PropType from "prop-types";
import OrganizationSettingsInactivePipelinePublishingPolicyPageLinkCard
  from "components/admin/organization_settings/details/policies/cards/pipelines/publishing/OrganizationSettingsInactivePipelinePublishingPolicyPageLinkCard";
import OrganizationSettingsCustomerPolicyPageLinkCardBase
  from "components/admin/organization_settings/details/policies/OrganizationSettingsCustomerPolicyPageLinkCardBase";

export default function OrganizationSettingsVnextSidebarLinkFeatureFlagPageLinkCard(
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

OrganizationSettingsVnextSidebarLinkFeatureFlagPageLinkCard.propTypes = {
  pipelinePublishingRestrictionsPolicy: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
