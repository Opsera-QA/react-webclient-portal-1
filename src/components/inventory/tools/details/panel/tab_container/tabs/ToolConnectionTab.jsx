import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";

export const CONNECTION_SUPPORTED_TOOL_IDENTIFIERS = [
  "jenkins",
  "github",
  "gitlab",
  "bitbucket",
  "octopus",
  "azure",
  "jfrog_artifactory_maven",
  "sfdc-configurator",
  "terraform-cloud",
  "jira",
  "aws_account",
  "sonar",
  "kafka_connect",
];

function ToolConnectionTab({ toolModel, handleTabClick, activeTab }) {
  if (!CONNECTION_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faClipboardList}
      tabName={"connection"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Connection"}
      accessRestricted={!toolModel.canPerformAction("update_tool_connection")}
    />
  );
}

ToolConnectionTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolConnectionTab;


