import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faChartNetwork} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import useGetFeatureFlagModelByName
  from "hooks/settings/organization_settings/feature_flags/useGetFeatureFlagModelByName";
import featureFlagConstants
  from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.constants";
import SidebarSubheaderText from "components/sidebar/SidebarSubheaderText";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

const getVnextLink = () => {
  const nodeUrl = DataParsingHelper.parseString(`https://api.opsera-dev.opsera.io`, "");
  const parsedUrl = nodeUrl.substring(nodeUrl.indexOf(".") + 1);
  return `vnext.${parsedUrl}`;
};

export default function InnovationLabsNavigationLinks({ isSidebarCollapsed, }) {
  const {
    featureFlagModel,
  } = useGetFeatureFlagModelByName(featureFlagConstants.FEATURE_FLAG_NAMES.SHOW_INSIGHTS_VNEXT_SIDEBAR_LINK);

  if (featureFlagModel == null || featureFlagModel?.getData("active") !== true) {
    return null;
  }

  return (
    <>
      <SidebarSubheaderText
        isSidebarCollapsed={isSidebarCollapsed}
        subheaderText={"Innovation Labs"}
      />
      <SidebarNavigationLinkBase
        link={getVnextLink()}
        label={"Insights NxGen (Beta)"}
        icon={faChartNetwork}
        isSidebarCollapsed={isSidebarCollapsed}
      />
    </>
  );
}

InnovationLabsNavigationLinks.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
