import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import jiraConfigurationMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/jiraConfigurationMetadata";
import JiraProjectInput
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraProjectInput";
import JiraSprintInput
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraSprintInput";
import JiraBoardInput
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraBoardInput";
import JiraParentTicketInput
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/JiraParentTicketInput";

function JiraProjectConfigurationPanel({ toolData, jiraProjectData, jiraConfigurationDto, setJiraConfigurationDto }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(jiraProjectData.getData("configuration"), jiraConfigurationMetadata );
    configurationData.setData("jiraToolId", toolData.getData("_id"));
    setJiraConfigurationDto({...configurationData});
  };

  const getJiraMessage = () => {
    return (
      <small className="form-text text-muted px-2">
        Please Note: You must connect to Jira on the
        <Link to="/inventory/tools"><FontAwesomeIcon icon={faClipboardList} className="mx-1"/>Tool Registry</Link> page in order to use this feature.
      </small>
    );
  };

  if (toolData == null || jiraConfigurationDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div>
      {getJiraMessage()}
      <JiraProjectInput jiraToolId={toolData.getData("_id")} setDataObject={setJiraConfigurationDto} dataObject={jiraConfigurationDto} />
      <JiraBoardInput jiraToolId={toolData.getData("_id")} jiraProjectKey={toolData.getData("jiraProject")} setDataObject={setJiraConfigurationDto} dataObject={jiraConfigurationDto} />
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


