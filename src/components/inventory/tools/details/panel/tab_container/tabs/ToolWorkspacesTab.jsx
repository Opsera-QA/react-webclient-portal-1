import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faBoxesAlt} from "@fortawesome/pro-light-svg-icons";

export const WORKSPACES_SUPPORTED_TOOL_IDENTIFIERS = [
  "terraform-cloud"
];

function ToolWorkspacesTab({ toolModel, handleTabClick, activeTab }) {
  if (!WORKSPACES_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faBoxesAlt}
      tabName={"workspaces"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Workspaces"}
    />
  );
}

ToolWorkspacesTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolWorkspacesTab;
