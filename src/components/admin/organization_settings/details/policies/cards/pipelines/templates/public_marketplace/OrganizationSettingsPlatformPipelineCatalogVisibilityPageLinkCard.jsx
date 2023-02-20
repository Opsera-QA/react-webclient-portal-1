import React from "react";
import PropType from "prop-types";
import PolicyManagementPageLinkCardBase
  from "components/settings/organization_settings/policies/cards/PolicyManagementPageLinkCardBase";
import PolicyManagementInactivePlatformPipelineCatalogVisibilityPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/templates/public_marketplace/PolicyManagementInactivePlatformPipelineCatalogVisibilityPageLinkCard";

export default function OrganizationSettingsPlatformPipelineCatalogVisibilityPageLinkCard({ platformPipelineCatalogVisibilityPolicy }) {
  if (platformPipelineCatalogVisibilityPolicy == null) {
    return (
      <PolicyManagementInactivePlatformPipelineCatalogVisibilityPageLinkCard />
    );
  }

  return (
    <PolicyManagementPageLinkCardBase
      policy={platformPipelineCatalogVisibilityPolicy}
      description={"No Users can utilize the Opsera Public Marketplace Pipeline Catalog"}
    />
  );
}

OrganizationSettingsPlatformPipelineCatalogVisibilityPageLinkCard.propTypes = {
  platformPipelineCatalogVisibilityPolicy: PropType.object,
};
