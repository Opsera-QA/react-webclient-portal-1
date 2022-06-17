import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import { CONNECTION_SUPPORTED_TOOL_IDENTIFIERS } from "components/inventory/tools/tool_details/ToolConnectionPanel";

function ToolConnectionTab({ toolModel, handleTabClick, activeTab }) {
  if (!CONNECTION_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faClipboardList}
      tabName={"connection"}
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


