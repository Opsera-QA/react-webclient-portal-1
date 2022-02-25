import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import {TOOL_DETAIL_PANEL_TABS} from "components/inventory/tools/tool_details/tab_container/ToolDetailPanelTabContainer";

function ToolConnectionTab({ toolModel, handleTabClick, activeTab }) {
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


