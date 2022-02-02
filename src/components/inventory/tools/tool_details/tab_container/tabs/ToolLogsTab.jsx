import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faTable} from "@fortawesome/pro-light-svg-icons";

export const LOG_SUPPORTED_TOOL_IDENTIFIERS = [
  "jenkins",
  "octopus",
  "sfdc-configurator",
  "argo",
  "azure",
];

function ToolLogsTab({ toolModel, handleTabClick, activeTab }) {
  if (!LOG_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faTable}
      tabName={"logs"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Logs"}
    />
  );
}

ToolLogsTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolLogsTab;


