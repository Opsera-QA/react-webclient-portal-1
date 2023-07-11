import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import featureFlagConstants
  from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.constants";
import OrganizationSettingsVnextSidebarLinkFeatureFlagPageLinkCard
  from "components/admin/organization_settings/details/features/analytics/vnext/OrganizationSettingsVnextSidebarLinkFeatureFlagPageLinkCard";
import OrganizationSettingsAiMlChatbotFeatureFlagPageLinkCard
  from "components/admin/organization_settings/details/features/ai_ml/OrganizationSettingsAiMlChatbotFeatureFlagPageLinkCard";
import OrganizationSettingsGitCustodianLandingPageFeatureFlagPageLinkCard
  from "components/admin/organization_settings/details/features/analytics/git_custodian/OrganizationSettingsGitCustodianLandingPageFeatureFlagPageLinkCard";

export default function OrganizationSettingsFeatureFlagsPanel(
  {
    organizationSettingsModel,
    organizationDomain,
    organizationAccountId,
  }) {
  const parsedFeatures = DataParsingHelper.parseArray(organizationSettingsModel?.getData("features"), []);
  const showInsightsVnextSidebarLinkFeatureFlag = parsedFeatures.find((featureFlag) => featureFlag.name === featureFlagConstants.FEATURE_FLAG_NAMES.SHOW_INSIGHTS_VNEXT_SIDEBAR_LINK);
  const enableGitCustodianLanding = parsedFeatures.find((featureFlag) => featureFlag.name === featureFlagConstants.FEATURE_FLAG_NAMES.ENABLE_GIT_CUSTODIAN_LANDING_PAGE);
  const enableAiMlChatbotFeatureFlag = parsedFeatures.find((featureFlag) => featureFlag.name === featureFlagConstants.FEATURE_FLAG_NAMES.AI_ML_CHATBOT);

  if (!parsedFeatures) {
    return null;
  }

  return (
    <div className={"mx-3"}>
      <OrganizationSettingsVnextSidebarLinkFeatureFlagPageLinkCard
        featureFlag={showInsightsVnextSidebarLinkFeatureFlag}
        organizationDomain={organizationDomain}
        organizationAccountId={organizationAccountId}
      />
      <OrganizationSettingsGitCustodianLandingPageFeatureFlagPageLinkCard
        featureFlag={enableGitCustodianLanding}
        organizationDomain={organizationDomain}
        organizationAccountId={organizationAccountId}
      />
      <OrganizationSettingsAiMlChatbotFeatureFlagPageLinkCard
        featureFlag={enableAiMlChatbotFeatureFlag}
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
