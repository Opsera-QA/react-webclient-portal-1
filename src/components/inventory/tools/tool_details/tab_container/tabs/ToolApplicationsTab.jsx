import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";

export const APPLICATION_SUPPORTED_TOOL_IDENTIFIERS = [
  "argo",
  "octopus",
  "azure",
];

function ToolApplicationsTab({ toolModel, handleTabClick, activeTab }) {
  if (!APPLICATION_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faBrowser}
      tabName={"applications"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Applications"}
      accessRestricted={!toolModel.canPerformAction("update_tool_applications")}
    />
  );
}

ToolApplicationsTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolApplicationsTab;


