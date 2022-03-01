import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import {toolIdentifierConstants} from "components/admin/tools/tool_identifier/toolIdentifier.constants";

export const LOG_SUPPORTED_TOOL_IDENTIFIERS = [
  "jenkins",
  "octopus",
  "sfdc-configurator",
  toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO,
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


