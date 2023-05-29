import React from "react";
import SidebarNavigationLinkBase from "components/common/links/sidebar/SidebarNavigationLinkBase";
import { faChartArea } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import SidebarSubheaderText from "components/sidebar/SidebarSubheaderText";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

const getVnextLink = () => {
  return "/vnext/insights/marketplace-dashboard";
};

export default function InnovationLabsNavigationLinks({ isSidebarCollapsed }) {
  return (
    <>
      {/*<SidebarSubheaderText*/}
      {/*  isSidebarCollapsed={isSidebarCollapsed}*/}
      {/*  subheaderText={"Innovation Labs"}*/}
      {/*/>*/}
      <SidebarNavigationLinkBase
        link={getVnextLink()}
        label={"Insights 2.0 (Beta)"}
        icon={faChartArea}
        isSidebarCollapsed={isSidebarCollapsed}
        onClick={() =>
          (window.location.href = "/vnext/insights/marketplace-dashboard")
        }
        // isExternalLink={true}
      />
    </>
  );
}

InnovationLabsNavigationLinks.propTypes = {
  isSidebarCollapsed: PropTypes.bool,
};
