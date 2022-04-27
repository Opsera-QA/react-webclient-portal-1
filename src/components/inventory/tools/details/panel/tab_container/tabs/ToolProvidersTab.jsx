import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faBoxesAlt} from "@fortawesome/pro-light-svg-icons";

export const PROVIDERS_SUPPORTED_TOOL_IDENTIFIERS = [
  "terraform-cloud"
];

function ToolProvidersTab({ toolModel, handleTabClick, activeTab }) {
  if (!PROVIDERS_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faBoxesAlt}
      tabName={"providers"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Providers"}
    />
  );
}

ToolProvidersTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolProvidersTab;
