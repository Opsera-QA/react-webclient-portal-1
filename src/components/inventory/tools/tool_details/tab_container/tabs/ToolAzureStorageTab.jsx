import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import { faCloud } from "@fortawesome/pro-regular-svg-icons";

const AZURE_STORAGE_SUPPORTED_TOOL_IDENTIFIERS = [
  "azure",
];

function ToolAzureStorageTab({ toolModel, handleTabClick, activeTab }) {
  if (!AZURE_STORAGE_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faCloud}
      tabName={"azure_storage"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Azure Storage"}
    />
  );
}

ToolAzureStorageTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolAzureStorageTab;


