import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import OrganizationSettingsPipelinePublishingPolicyPageLinkCard
  from "components/admin/organization_settings/details/policies/cards/pipelines/publishing/OrganizationSettingsPipelinePublishingPolicyPageLinkCard";

// TODO: Make constants
export default function OrganizationSettingsFeatureFlagsPanel(
  {
    organizationSettingsModel,
    organizationDomain,
    organizationAccountId,
  }) {
  const parsedFeatures = DataParsingHelper.parseArray(organizationSettingsModel?.getData("features"), []);
  const pipelinePublishingRestrictionsPolicy = parsedFeatures.find((siteRole) => siteRole.name === policyConstants.POLICY_NAMES.PIPELINE_PRIVATE_CATALOG_PUBLISHING_RESTRICTIONS);

  if (!parsedFeatures) {
    return null;
  }

  return (
    <div className={"mx-3"}>
      <OrganizationSettingsPipelinePublishingPolicyPageLinkCard
        pipelinePublishingRestrictionsPolicy={pipelinePublishingRestrictionsPolicy}
        organizationDomain={organizationDomain}
        organizationAccountId={organizationAccountId}
      />
    </div>
  );
}

OrganizationSettingsFeatureFlagsPanel.propTypes = {
  organizationSettingsModel: PropTypes.object,
  organizationDomain: PropTypes.string,
  organizationAccountId: PropTypes.string,
};
