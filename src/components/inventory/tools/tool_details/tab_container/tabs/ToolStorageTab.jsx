import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faBoxesAlt} from "@fortawesome/pro-light-svg-icons";

export const STORAGE_SUPPORTED_TOOL_IDENTIFIERS = [
  "aws_account",
  "azure",
];

function ToolStorageTab({ toolModel, handleTabClick, activeTab }) {
  if (!STORAGE_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faBoxesAlt}
      tabName={"storage"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Storage"}
    />
  );
}

ToolStorageTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolStorageTab;


