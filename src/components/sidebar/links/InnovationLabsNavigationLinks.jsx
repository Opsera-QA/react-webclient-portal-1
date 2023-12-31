import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import {faChartArea} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import SidebarSubheaderText from "components/sidebar/SidebarSubheaderText";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

const getVnextLink = () => {
  const nodeUrl = DataParsingHelper.parseString(`https://api.opsera-dev.opsera.io`, "");
  const parsedUrl = nodeUrl.substring(nodeUrl.indexOf(".") + 1);
  return `https://vnext.${parsedUrl}`;
};

export default function InnovationLabsNavigationLinks({ isSidebarCollapsed, }) {
  return (
    <>
      <SidebarSubheaderText
        isSidebarCollapsed={isSidebarCollapsed}
        subheaderText={"Innovation Labs"}
      />
      <SidebarNavigationLinkBase
        link={getVnextLink()}
        label={"Insights 2.0 (Beta)"}
        icon={faChartArea}
        isSidebarCollapsed={isSidebarCollapsed}
        isExternalLink={true}
      />
    </>
  );
}

InnovationLabsNavigationLinks.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
