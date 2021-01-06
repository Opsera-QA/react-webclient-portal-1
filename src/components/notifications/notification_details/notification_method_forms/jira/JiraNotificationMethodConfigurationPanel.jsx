import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import jiraNotificationMetadata from "components/notifications/notification_details/notification_method_forms/jira/jiraNotificationMetadata";
import JiraStepNotificationParentTicketInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/JiraStepNotificationParentTicketInput";
import JiraStepNotificationProjectUserInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/JiraStepNotificationProjectUserInput";
import JiraStepNotificationToolInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/JiraStepNotificationToolInput";
import JiraStepNotificationProjectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/JiraStepNotificationProjectInput";
import JiraStepNotificationProjectUsersMultiSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/JiraStepNotificationProjectUsersMultiSelectInput";
import JiraStepNotificationBoardInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/JiraStepNotificationBoardInput";
import JiraStepNotificationSprintInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/JiraStepNotificationSprintInput";
import JiraStepNotificationPriorityInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/JiraStepNotificationPriorityInput";
import JiraStepNotificationWorkflowStepInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/jira/JiraStepNotificationWorkflowStepInput";

function JiraNotificationMethodConfigurationPanel({ notificationDataDto, notificationMethodDataDto, setNotificationMethodDataDto }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(notificationDataDto.getData("notification"), jiraNotificationMetadata );
    setNotificationMethodDataDto({...configurationData});
  };

  const getJiraMessage = () => {
    return (
      <small className="form-text text-muted px-2">
        Please Note: You must connect to Jira on the
        <Link to="/inventory/tools"><FontAwesomeIcon icon={faClipboardList} className="mx-1"/>Tool Registry</Link> page in order to use this feature.
      </small>
    );
  };

  if (notificationDataDto == null || notificationMethodDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className="mb-4">
      {getJiraMessage()}
      <JiraStepNotificationToolInput setDataObject={setNotificationMethodDataDto} dataObject={notificationMethodDataDto} />
      <JiraStepNotificationPriorityInput jiraToolId={notificationMethodDataDto.getData("jiraToolId")} setDataObject={setNotificationMethodDataDto} dataObject={notificationMethodDataDto} />
      <JiraStepNotificationProjectInput jiraToolId={notificationMethodDataDto.getData("jiraToolId")} setDataObject={setNotificationMethodDataDto} dataObject={notificationMethodDataDto} />
      <JiraStepNotificationProjectUserInput jiraToolId={notificationMethodDataDto.getData("jiraToolId")} jiraProject={notificationMethodDataDto.getData("jiraProject")} setDataObject={setNotificationMethodDataDto} dataObject={notificationMethodDataDto} />
      <JiraStepNotificationProjectUsersMultiSelectInput jiraToolId={notificationMethodDataDto.getData("jiraToolId")} jiraProject={notificationMethodDataDto.getData("jiraProject")} setDataObject={setNotificationMethodDataDto} dataObject={notificationMethodDataDto} />
      <JiraStepNotificationBoardInput jiraToolId={notificationMethodDataDto.getData("jiraToolId")} setDataObject={setNotificationMethodDataDto} dataObject={notificationMethodDataDto} />
      <JiraStepNotificationSprintInput jiraToolId={notificationMethodDataDto.getData("jiraToolId")} jiraBoard={notificationMethodDataDto.getData("jiraBoard")} setDataObject={setNotificationMethodDataDto} dataObject={notificationMethodDataDto} />
      <JiraStepNotificationParentTicketInput jiraToolId={notificationMethodDataDto.getData("jiraToolId")} jiraSprintId={notificationMethodDataDto.getData("jiraSprint")} setDataObject={setNotificationMethodDataDto} dataObject={notificationMethodDataDto} />
      <JiraStepNotificationWorkflowStepInput jiraToolId={notificationMethodDataDto.getData("jiraToolId")} jiraProject={notificationMethodDataDto.getData("jiraProject")} setDataObject={setNotificationMethodDataDto} dataObject={notificationMethodDataDto} fieldName={"jiraOpenStep"} />
      <JiraStepNotificationWorkflowStepInput jiraToolId={notificationMethodDataDto.getData("jiraToolId")} jiraProject={notificationMethodDataDto.getData("jiraProject")} setDataObject={setNotificationMethodDataDto} dataObject={notificationMethodDataDto} fieldName={"jiraClosureStep"} />
    </div>
  );
}

JiraNotificationMethodConfigurationPanel.propTypes = {
  notificationDataDto: PropTypes.object,
  notificationMethodDataDto: PropTypes.object,
  setNotificationMethodDataDto: PropTypes.func
};

export default JiraNotificationMethodConfigurationPanel;


