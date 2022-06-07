import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import {TOOL_DETAIL_PANEL_TABS} from "components/inventory/tools/details/panel/tab_container/ToolDetailPanelTabContainer";

const CONNECTION_UNSUPPORTED_TOOL_IDENTIFIERS = ["provar"];

function ToolConnectionTab({ toolModel, handleTabClick, activeTab }) {

  if (CONNECTION_UNSUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }


  return (
    <CustomTab
      icon={faClipboardList}
      tabName={TOOL_DETAIL_PANEL_TABS.CONNECTION}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Connection"}
      accessRestricted={!toolModel.canPerformAction("update_tool_connection")}
    />
  );
}

ToolConnectionTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolConnectionTab;


