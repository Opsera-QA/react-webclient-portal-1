import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import jiraConfigurationMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/jiraConfigurationMetadata";
import JiraProjectSelectInput
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraProjectSelectInput";
import JiraSprintInput
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraSprintInput";
import JiraBoardInput
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraBoardInput";
import JiraParentTicketInput
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraParentTicketInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";

function JiraProjectConfigurationPanel({ toolData, jiraProjectData, jiraConfigurationDto, setJiraConfigurationDto }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(jiraProjectData.getData("configuration"), jiraConfigurationMetadata );
    configurationData.setData("jiraToolId", toolData.getData("_id"));
    setJiraConfigurationDto({...configurationData});
  };

  if (toolData == null || jiraConfigurationDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div>
      <ConnectToToolMessage toolFriendlyName={"Jira"} />
      <JiraProjectSelectInput
        jiraToolId={toolData.getData("_id")}
        setModel={setJiraConfigurationDto}
        model={jiraConfigurationDto}
      />
      <JiraBoardInput jiraToolId={toolData.getData("_id")} jiraProjectKey={jiraConfigurationDto.getData("jiraProject")} setDataObject={setJiraConfigurationDto} dataObject={jiraConfigurationDto} />
      <JiraSprintInput jiraToolId={toolData.getData("_id")} jiraBoard={jiraConfigurationDto.getData("jiraBoard")} setDataObject={setJiraConfigurationDto} dataObject={jiraConfigurationDto} />
      <JiraParentTicketInput jiraToolId={toolData.getData("_id")} jiraSprintId={jiraConfigurationDto.getData("jiraSprint")} setDataObject={setJiraConfigurationDto} dataObject={jiraConfigurationDto} />
    </div>
  );
}

JiraProjectConfigurationPanel.propTypes = {
  toolData: PropTypes.object,
  jiraProjectData: PropTypes.object,
  jiraConfigurationDto: PropTypes.object,
  setJiraConfigurationDto: PropTypes.func
};

export default JiraProjectConfigurationPanel;


