import React from "react";
import PropType from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PolicyManagementPipelinePublishingPolicyPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/publishing/PolicyManagementPipelinePublishingPolicyPageLinkCard";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import PolicyManagementPlatformPipelineCatalogVisibilityPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/templates/public_marketplace/PolicyManagementPlatformPipelineCatalogVisibilityPageLinkCard";
import PolicyManagementPipelineStepTagRequirementPolicyPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/steps/tags/PolicyManagementPipelineStepTagRequirementPolicyPageLinkCard";

export default function PolicyManagementPageLinkCards({policies}) {
  const parsedPolicies = DataParsingHelper.parseArray(policies, []);
  const pipelinePublishingRestrictionsPolicy = parsedPolicies.find((siteRole) => siteRole.name === policyConstants.POLICY_NAMES.PIPELINE_PRIVATE_CATALOG_PUBLISHING_RESTRICTIONS);
  const platformPipelineCatalogVisibilityPolicy = parsedPolicies.find((siteRole) => siteRole.name === policyConstants.POLICY_NAMES.PLATFORM_PIPELINE_CATALOG_VISIBILITY);
  const pipelineStepTagRequirementPolicy = parsedPolicies.find((siteRole) => siteRole.name === policyConstants.POLICY_NAMES.PIPELINE_STEP_TAG_REQUIREMENT);

  if (!parsedPolicies) {
    return null;
  }

  return (
    <div className={"mx-3"}>
      <PolicyManagementPipelinePublishingPolicyPageLinkCard
        pipelinePublishingRestrictionsPolicy={pipelinePublishingRestrictionsPolicy}
      />
      <PolicyManagementPlatformPipelineCatalogVisibilityPageLinkCard
        platformPipelineCatalogVisibilityPolicy={platformPipelineCatalogVisibilityPolicy}
      />
      <PolicyManagementPipelineStepTagRequirementPolicyPageLinkCard
        pipelineStepTagRequirementPolicy={pipelineStepTagRequirementPolicy}
      />
    </div>
  );
}

PolicyManagementPageLinkCards.propTypes = {
  policies: PropType.array,
};
