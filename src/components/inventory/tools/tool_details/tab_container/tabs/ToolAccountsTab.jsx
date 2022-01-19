import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faUsers} from "@fortawesome/pro-light-svg-icons";

const ACCOUNT_SUPPORTED_TOOL_IDENTIFIERS = [
  "jenkins",
  "github",
  "gitlab",
  "bitbucket",
];

function ToolAccountsTab({ toolModel, handleTabClick, activeTab }) {
  if (!ACCOUNT_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faUsers}
      tabName={"accounts"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Accounts"}
      accessRestricted={!toolModel.canPerformAction("update_tool_accounts")}
    />
  );
}

ToolAccountsTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolAccountsTab;


