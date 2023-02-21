import React from "react";
import PropType from "prop-types";
import OrganizationSettingsPolicyEditorPanelOverlay
  from "components/admin/organization_settings/details/policies/OrganizationSettingsPolicyEditorPanelOverlay";
import OrganizationSettingsInactivePipelinePublishingPolicyPageLinkCard
  from "components/admin/organization_settings/details/policies/cards/pipelines/publishing/OrganizationSettingsInactivePipelinePublishingPolicyPageLinkCard";

export default function OrganizationSettingsPipelinePublishingPolicyPageLinkCard({ pipelinePublishingRestrictionsPolicy, }) {
  if (pipelinePublishingRestrictionsPolicy == null) {
    return (
      <OrganizationSettingsInactivePipelinePublishingPolicyPageLinkCard />
    );
  }

  return (
    <OrganizationSettingsPolicyEditorPanelOverlay
      policy={pipelinePublishingRestrictionsPolicy}
    />
  );
}

OrganizationSettingsPipelinePublishingPolicyPageLinkCard.propTypes = {
  pipelinePublishingRestrictionsPolicy: PropType.object,
};
