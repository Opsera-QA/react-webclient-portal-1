import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import jiraConfigurationMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/jiraConfigurationMetadata";
import JiraToolProjectProjectSelectInput
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraToolProjectProjectSelectInput";
import JiraToolProjectSprintSelectInput
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraToolProjectSprintSelectInput";
import JiraToolProjectBoardSelectInput
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraToolProjectBoardSelectInput";
import JiraToolProjectParentTicketSelectInput
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraToolProjectParentTicketSelectInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";

// TODO: Just pass tool id if that's all that's used
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
      <JiraToolProjectProjectSelectInput
        model={jiraConfigurationDto}
        setModel={setJiraConfigurationDto}
        jiraToolId={toolData?.getData("_id")}
      />
      <JiraToolProjectBoardSelectInput
        jiraToolId={toolData?.getData("_id")}
        jiraProjectKey={jiraConfigurationDto?.getData("jiraProject")}
        model={jiraConfigurationDto}
        setModel={setJiraConfigurationDto}
      />
      <JiraToolProjectSprintSelectInput
        jiraToolId={toolData?.getData("_id")}
        jiraBoard={jiraConfigurationDto?.getData("jiraBoard")}
        model={jiraConfigurationDto}
        setModel={setJiraConfigurationDto}
      />
      <JiraToolProjectParentTicketSelectInput
        jiraToolId={toolData?.getData("_id")}
        jiraSprintId={jiraConfigurationDto?.getData("jiraSprint")}
        model={jiraConfigurationDto}
        setModel={setJiraConfigurationDto}
      />
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


