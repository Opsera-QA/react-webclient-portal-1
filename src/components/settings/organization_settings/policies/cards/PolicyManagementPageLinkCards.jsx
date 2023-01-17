import React from "react";
import PropType from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PipelinePublishingPolicyPageLinkCard
  from "components/settings/organization_settings/policies/cards/PipelinePublishingPolicyPageLinkCard";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import PlatformPipelineCatalogVisibilityPageLinkCard
  from "components/settings/organization_settings/policies/cards/PlatformPipelineCatalogVisibilityPageLinkCard";

export default function PolicyManagementPageLinkCards({policies}) {
  const parsedPolicies = DataParsingHelper.parseArray(policies, []);
  const pipelinePublishingRestrictionsPolicy = parsedPolicies.find((siteRole) => siteRole.name === policyConstants.POLICY_NAMES.PIPELINE_PRIVATE_CATALOG_PUBLISHING_RESTRICTIONS);
  const platformPipelineCatalogVisibilityPolicy = parsedPolicies.find((siteRole) => siteRole.name === policyConstants.POLICY_NAMES.PLATFORM_PIPELINE_CATALOG_VISIBILITY);

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
    </div>
  );
}

PolicyManagementPageLinkCards.propTypes = {
  policies: PropType.array,
};
