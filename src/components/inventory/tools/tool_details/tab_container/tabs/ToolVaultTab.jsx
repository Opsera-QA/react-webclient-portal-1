import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faKey,} from "@fortawesome/pro-light-svg-icons";

export const VAULT_SUPPORTED_TOOL_IDENTIFIERS = [
  "jenkins",
  "gitlab",
  "github",
  "sonar",
  "kafka_connect",
];

function ToolVaultTab({ toolModel, handleTabClick, activeTab }) {
  if (!VAULT_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faKey}
      tabName={"vault"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Vault"}
      accessRestricted={!toolModel?.canPerformAction("update_tool_vault")}
    />
  );
}

ToolVaultTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolVaultTab;


