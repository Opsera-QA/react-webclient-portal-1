import React from "react";
import PropType from "prop-types";
import InactivePipelinePublishingPolicyPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/publishing/InactivePipelinePublishingPolicyPageLinkCard";
import PolicyManagementPageLinkCardBase
  from "components/settings/organization_settings/policies/cards/PolicyManagementPageLinkCardBase";

export default function OrganizationSettingsPipelinePublishingPolicyPageLinkCard({ pipelinePublishingRestrictionsPolicy, }) {
  if (pipelinePublishingRestrictionsPolicy == null) {
    return (
      <InactivePipelinePublishingPolicyPageLinkCard />
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
