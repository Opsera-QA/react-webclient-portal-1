import React from "react";
import PropType from "prop-types";
import OrganizationSettingsInactivePlatformPipelineCatalogVisibilityPageLinkCard
  from "components/admin/organization_settings/details/policies/cards/pipelines/templates/public_marketplace/OrganizationSettingsInactivePlatformPipelineCatalogVisibilityPageLinkCard";
import OrganizationSettingsCustomerPolicyPageLinkCardBase
  from "components/admin/organization_settings/details/policies/OrganizationSettingsCustomerPolicyPageLinkCardBase";

export default function OrganizationSettingsPlatformPipelineCatalogVisibilityPageLinkCard({ platformPipelineCatalogVisibilityPolicy }) {
  if (platformPipelineCatalogVisibilityPolicy == null) {
    return (
      <OrganizationSettingsInactivePlatformPipelineCatalogVisibilityPageLinkCard />
    );
  }

  return (
    <OrganizationSettingsCustomerPolicyPageLinkCardBase
      policy={platformPipelineCatalogVisibilityPolicy}
      description={"No Users can utilize the Opsera Public Marketplace Pipeline Catalog"}
    />
  );
}

OrganizationSettingsPlatformPipelineCatalogVisibilityPageLinkCard.propTypes = {
  platformPipelineCatalogVisibilityPolicy: PropType.object,
};
