import React from "react";
import PropType from "prop-types";
import PolicyManagementInactivePipelinePublishingPolicyPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/publishing/PolicyManagementInactivePipelinePublishingPolicyPageLinkCard";
import PolicyManagementPageLinkCardBase
  from "components/settings/organization_settings/policies/cards/PolicyManagementPageLinkCardBase";

export default function OrganizationSettingsPipelinePublishingPolicyPageLinkCard({ pipelinePublishingRestrictionsPolicy, }) {
  if (pipelinePublishingRestrictionsPolicy == null) {
    return (
      <PolicyManagementInactivePipelinePublishingPolicyPageLinkCard />
    );
  }

  return (
    <PolicyManagementPageLinkCardBase
      policy={pipelinePublishingRestrictionsPolicy}
    />
  );
}

OrganizationSettingsPipelinePublishingPolicyPageLinkCard.propTypes = {
  pipelinePublishingRestrictionsPolicy: PropType.object,
};
