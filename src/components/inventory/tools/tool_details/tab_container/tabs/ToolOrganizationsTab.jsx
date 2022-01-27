import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faBoxesAlt} from "@fortawesome/pro-light-svg-icons";

const ORGANIZATIONS_SUPPORTED_TOOL_IDENTIFIERS = [
  "terraform-cloud"
];

function ToolOrganizationsTab({ toolModel, handleTabClick, activeTab }) {
  if (!ORGANIZATIONS_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faBoxesAlt}
      tabName={"organizations"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Organizations"}
    />
  );
}

ToolOrganizationsTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolOrganizationsTab;


