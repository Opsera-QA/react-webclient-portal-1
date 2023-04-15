import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import featureFlagConstants
  from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.constants";
import OrganizationSettingsVnextSidebarLinkFeatureFlagPageLinkCard
  from "components/admin/organization_settings/details/features/analytics/vnext/OrganizationSettingsVnextSidebarLinkFeatureFlagPageLinkCard";

export default function OrganizationSettingsEntitlementsPanel(
  {
    organizationSettingsModel,
    organizationDomain,
    organizationAccountId,
  }) {
  const parsedFeatures = DataParsingHelper.parseArray(organizationSettingsModel?.getData("features"), []);
  const showInsightsVnextSidebarLinkFeatureFlag = parsedFeatures.find((featureFlag) => featureFlag.name === featureFlagConstants.FEATURE_FLAG_NAMES.SHOW_INSIGHTS_VNEXT_SIDEBAR_LINK);

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
    </div>
  );
}

OrganizationSettingsEntitlementsPanel.propTypes = {
  organizationSettingsModel: PropTypes.object,
  organizationDomain: PropTypes.string,
  organizationAccountId: PropTypes.string,
};
