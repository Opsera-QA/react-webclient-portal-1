import React from "react";
import PropType from "prop-types";
import PolicyManagementInactivePipelinePublishingPolicyPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/publishing/PolicyManagementInactivePipelinePublishingPolicyPageLinkCard";
import PolicyManagementPageLinkCardBase
  from "components/settings/organization_settings/policies/cards/PolicyManagementPageLinkCardBase";

export default function PolicyManagementPipelinePublishingPolicyPageLinkCard({ pipelinePublishingRestrictionsPolicy, }) {
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

PolicyManagementPipelinePublishingPolicyPageLinkCard.propTypes = {
  pipelinePublishingRestrictionsPolicy: PropType.object,
};
