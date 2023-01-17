import React from "react";
import PropType from "prop-types";
import PolicyManagementPageLinkCardBase
  from "components/settings/organization_settings/policies/cards/PolicyManagementPageLinkCardBase";
import InactivePlatformPipelineCatalogVisibilityPageLinkCard
  from "components/settings/organization_settings/policies/cards/inactive/InactivePlatformPipelineCatalogVisibilityPageLinkCard";

export default function PlatformPipelineCatalogVisibilityPageLinkCard({ platformPipelineCatalogVisibilityPolicy }) {
  if (platformPipelineCatalogVisibilityPolicy == null) {
    return (
      <InactivePlatformPipelineCatalogVisibilityPageLinkCard />
    );
  }

  return (
    <PolicyManagementPageLinkCardBase
      policy={platformPipelineCatalogVisibilityPolicy}
      description={"No Users can utilize the Opsera Public Marketplace Pipeline Catalog"}
    />
  );
}

PlatformPipelineCatalogVisibilityPageLinkCard.propTypes = {
  platformPipelineCatalogVisibilityPolicy: PropType.object,
};
