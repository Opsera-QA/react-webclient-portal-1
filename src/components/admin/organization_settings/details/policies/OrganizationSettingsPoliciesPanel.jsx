import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import OrganizationSettingsPipelinePublishingPolicyPageLinkCard
  from "components/admin/organization_settings/details/policies/cards/pipelines/publishing/OrganizationSettingsPipelinePublishingPolicyPageLinkCard";
import OrganizationSettingsPlatformPipelineCatalogVisibilityPageLinkCard
  from "components/admin/organization_settings/details/policies/cards/pipelines/templates/public_marketplace/OrganizationSettingsPlatformPipelineCatalogVisibilityPageLinkCard";
import OrganizationSettingsPipelineStepTagRequirementPolicyPageLinkCard
  from "components/admin/organization_settings/details/policies/cards/pipelines/steps/tags/OrganizationSettingsPipelineStepTagRequirementPolicyPageLinkCard";

export default function OrganizationSettingsPoliciesPanel(
  {
    organizationSettingsModel,
  }) {
  const parsedPolicies = DataParsingHelper.parseArray(organizationSettingsModel?.getData("policies"), []);
  const pipelinePublishingRestrictionsPolicy = parsedPolicies.find((siteRole) => siteRole.name === policyConstants.POLICY_NAMES.PIPELINE_PRIVATE_CATALOG_PUBLISHING_RESTRICTIONS);
  const platformPipelineCatalogVisibilityPolicy = parsedPolicies.find((siteRole) => siteRole.name === policyConstants.POLICY_NAMES.PLATFORM_PIPELINE_CATALOG_VISIBILITY);
  const pipelineStepTagRequirementPolicy = parsedPolicies.find((siteRole) => siteRole.name === policyConstants.POLICY_NAMES.PIPELINE_STEP_TAG_REQUIREMENT);

  if (!parsedPolicies) {
    return null;
  }

  return (
    <div className={"mx-3"}>
      <OrganizationSettingsPipelinePublishingPolicyPageLinkCard
        pipelinePublishingRestrictionsPolicy={pipelinePublishingRestrictionsPolicy}
      />
      <OrganizationSettingsPlatformPipelineCatalogVisibilityPageLinkCard
        platformPipelineCatalogVisibilityPolicy={platformPipelineCatalogVisibilityPolicy}
      />
      <OrganizationSettingsPipelineStepTagRequirementPolicyPageLinkCard
        pipelineStepTagRequirementPolicy={pipelineStepTagRequirementPolicy}
      />
    </div>
  );
}

OrganizationSettingsPoliciesPanel.propTypes = {
  organizationSettingsModel: PropTypes.object,
};
