import React from "react";
import PropType from "prop-types";
import OrganizationSettingsInactivePipelinePublishingPolicyPageLinkCard
  from "components/admin/organization_settings/details/policies/cards/pipelines/publishing/OrganizationSettingsInactivePipelinePublishingPolicyPageLinkCard";
import OrganizationSettingsCustomerPolicyPageLinkCardBase
  from "components/admin/organization_settings/details/policies/OrganizationSettingsCustomerPolicyPageLinkCardBase";

export default function OrganizationSettingsPipelinePublishingPolicyPageLinkCard({ pipelinePublishingRestrictionsPolicy, }) {
  if (pipelinePublishingRestrictionsPolicy == null) {
    return (
      <OrganizationSettingsInactivePipelinePublishingPolicyPageLinkCard />
    );
  }

  return (
    <OrganizationSettingsCustomerPolicyPageLinkCardBase
      policy={pipelinePublishingRestrictionsPolicy}
    />
  );
}

OrganizationSettingsPipelinePublishingPolicyPageLinkCard.propTypes = {
  pipelinePublishingRestrictionsPolicy: PropType.object,
};
