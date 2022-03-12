import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faLink,} from "@fortawesome/pro-light-svg-icons";
import {TOOL_DETAIL_PANEL_TABS} from "components/inventory/tools/details/panel/tab_container/ToolDetailPanelTabContainer";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

export const ENDPOINTS_TAB_SUPPORTED_TOOL_IDENTIFIERS = [
  toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_API_INTEGRATOR,
];

function ToolEndpointsTab({ toolModel, handleTabClick, activeTab }) {
  if (!ENDPOINTS_TAB_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faLink}
      tabName={TOOL_DETAIL_PANEL_TABS.ENDPOINTS}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Endpoints"}
      accessRestricted={!toolModel?.canPerformAction("update_tool_endpoints")}
    />
  );
}

ToolEndpointsTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolEndpointsTab;


