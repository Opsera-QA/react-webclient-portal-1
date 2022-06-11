import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faUsers} from "@fortawesome/pro-light-svg-icons";

export const LICENSE_SUPPORTED_TOOL_IDENTIFIERS = [
  "provar",
];

function ToolLicenseTab({ toolModel, handleTabClick, activeTab }) {
  if (!LICENSE_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faUsers}
      tabName={"license"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"License"}
      accessRestricted={!toolModel.canPerformAction("update_tool_license")}
    />
  );
}

ToolLicenseTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolLicenseTab;


