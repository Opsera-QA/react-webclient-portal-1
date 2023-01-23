import React from "react";
import PropType from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PipelinePublishingPolicyPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/publishing/PipelinePublishingPolicyPageLinkCard";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import PlatformPipelineCatalogVisibilityPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/templates/public_marketplace/PlatformPipelineCatalogVisibilityPageLinkCard";
import PipelineStepTagRequirementPolicyPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/steps/tags/PipelineStepTagRequirementPolicyPageLinkCard";

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
      <PipelinePublishingPolicyPageLinkCard
        pipelinePublishingRestrictionsPolicy={pipelinePublishingRestrictionsPolicy}
      />
      <PlatformPipelineCatalogVisibilityPageLinkCard
        platformPipelineCatalogVisibilityPolicy={platformPipelineCatalogVisibilityPolicy}
      />
      <PipelineStepTagRequirementPolicyPageLinkCard
        pipelineStepTagRequirementPolicy={pipelineStepTagRequirementPolicy}
      />
    </div>
  );
}

PolicyManagementPageLinkCards.propTypes = {
  policies: PropType.array,
};
