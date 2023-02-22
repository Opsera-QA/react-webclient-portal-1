import React from "react";
import PropType from "prop-types";
import OrganizationSettingsInactivePlatformPipelineCatalogVisibilityPageLinkCard
  from "components/admin/organization_settings/details/policies/cards/pipelines/templates/public_marketplace/OrganizationSettingsInactivePlatformPipelineCatalogVisibilityPageLinkCard";
import OrganizationSettingsCustomerPolicyPageLinkCardBase
  from "components/admin/organization_settings/details/policies/OrganizationSettingsCustomerPolicyPageLinkCardBase";

export default function OrganizationSettingsPlatformPipelineCatalogVisibilityPageLinkCard(
  {
    platformPipelineCatalogVisibilityPolicy,
    organizationDomain,
    organizationAccountId,
  }) {
  if (platformPipelineCatalogVisibilityPolicy == null) {
    return (
      <OrganizationSettingsInactivePlatformPipelineCatalogVisibilityPageLinkCard
        organizationAccountId={organizationAccountId}
        organizationDomain={organizationDomain}
      />
    );
  }

  return (
    <OrganizationSettingsCustomerPolicyPageLinkCardBase
      policy={platformPipelineCatalogVisibilityPolicy}
      description={"No Users can utilize the Opsera Public Marketplace Pipeline Catalog"}
      organizationAccountId={organizationAccountId}
      organizationDomain={organizationDomain}
    />
  );
}

OrganizationSettingsPlatformPipelineCatalogVisibilityPageLinkCard.propTypes = {
  platformPipelineCatalogVisibilityPolicy: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
