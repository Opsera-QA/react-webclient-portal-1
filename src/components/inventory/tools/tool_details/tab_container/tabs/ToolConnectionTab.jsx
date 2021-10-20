import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";

function ToolConnectionTab({ toolModel, handleTabClick, activeTab }) {
  return (
    <CustomTab
      icon={faClipboardList}
      tabName={"configuration"}
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


