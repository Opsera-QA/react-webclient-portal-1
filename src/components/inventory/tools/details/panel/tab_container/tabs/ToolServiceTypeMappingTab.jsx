import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {toolIdentifierConstants} from "components/admin/tools/tool_identifier/toolIdentifier.constants";

export const SERVICE_MAPPING_SUPPORTED_TOOL_IDENTIFIERS = [
  toolIdentifierConstants.TOOL_IDENTIFIERS.INFORMATICA,
];

function ToolServiceTypeMappingTab({ toolModel, handleTabClick, activeTab }) {
  if (!SERVICE_MAPPING_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faBrowser}
      tabName={"mapping"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Validation Rules"}
      accessRestricted={!toolModel.canPerformAction("update_tool_applications")}
    />
  );
}

ToolServiceTypeMappingTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolServiceTypeMappingTab;


