import React from "react";
import PropTypes from "prop-types";
import NotificationsToggle from "components/workflow/plan/step/notifications/NotificationsToggle";
import JiraStepNotificationToolInput
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationToolInput";
import JiraStepNotificationPriorityInput
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationPriorityInput";
import JiraStepNotificationProjectInput
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationProjectInput";
import JiraStepNotificationProjectUserInput
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationProjectUserInput";
import JiraStepNotificationProjectUsersMultiSelectInput
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationProjectUsersMultiSelectInput";
import JiraStepNotificationBoardInput
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationBoardInput";
import JiraStepNotificationSprintInput
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationSprintInput";
import JiraStepNotificationParentTicketInput
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationParentTicketInput";
import JiraStepNotificationWorkflowStepInput
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationWorkflowStepInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";

function JiraStepNotificationEditorPanel(
  {
    jiraNotificationModel,
    setJiraNotificationModel,
    isApprovalStep,
  }) {
  
  const getDynamicFields = () => {
    if (isApprovalStep !== true) {
      return (
        <>
          <JiraStepNotificationWorkflowStepInput 
            jiraToolId={jiraNotificationModel.getData("jiraToolId")} 
            jiraProject={jiraNotificationModel.getData("jiraProject")} 
            setDataObject={setJiraNotificationModel}
            dataObject={jiraNotificationModel} 
            fieldName={"jiraOpenStep"}
          />
          <JiraStepNotificationWorkflowStepInput 
            jiraToolId={jiraNotificationModel.getData("jiraToolId")} 
            jiraProject={jiraNotificationModel.getData("jiraProject")} 
            setDataObject={setJiraNotificationModel} 
            dataObject={jiraNotificationModel} 
            fieldName={"jiraClosureStep"} 
          />
        </>
      );
    }
  };
  
  if (jiraNotificationModel == null) {
    return null;
  }

  // TODO: Remove after updating the panel to use side tabs
  if (jiraNotificationModel?.getData("enabled") === false) {
    return (
      <div className="my-4">
        <NotificationsToggle
          dataObject={jiraNotificationModel}
          setDataObject={setJiraNotificationModel}
          fieldName={"enabled"}
          type={"jira"}
        />
      </div>
    );
  }

  return (
    <div className="my-4">
      <NotificationsToggle dataObject={jiraNotificationModel} setDataObject={setJiraNotificationModel} type={"jira"} />
      <ConnectToToolMessage toolFriendlyName={"Jira"} />
      {/*<NotificationLevelInput disabled={true} dataObject={jiraNotificationModel} setDataObject={setJiraNotificationModel} fieldName={"jiraNotificationLevel"} />*/}
      <JiraStepNotificationToolInput setDataObject={setJiraNotificationModel} dataObject={jiraNotificationModel} />
      <JiraStepNotificationPriorityInput jiraToolId={jiraNotificationModel.getData("jiraToolId")} setDataObject={setJiraNotificationModel} dataObject={jiraNotificationModel} />
      <JiraStepNotificationProjectInput jiraToolId={jiraNotificationModel.getData("jiraToolId")} setDataObject={setJiraNotificationModel} dataObject={jiraNotificationModel} />
      <JiraStepNotificationProjectUserInput jiraToolId={jiraNotificationModel.getData("jiraToolId")} jiraProject={jiraNotificationModel.getData("jiraProject")} setDataObject={setJiraNotificationModel} dataObject={jiraNotificationModel} />
      <JiraStepNotificationProjectUsersMultiSelectInput jiraToolId={jiraNotificationModel.getData("jiraToolId")} jiraProject={jiraNotificationModel.getData("jiraProject")} setDataObject={setJiraNotificationModel} dataObject={jiraNotificationModel} />
      <JiraStepNotificationBoardInput jiraToolId={jiraNotificationModel.getData("jiraToolId")} jiraProjectKey={jiraNotificationModel.getData("jiraProject")} setDataObject={setJiraNotificationModel} dataObject={jiraNotificationModel} />
      <JiraStepNotificationSprintInput jiraToolId={jiraNotificationModel.getData("jiraToolId")} jiraBoard={jiraNotificationModel.getData("jiraBoard")} setDataObject={setJiraNotificationModel} dataObject={jiraNotificationModel} />
      <JiraStepNotificationParentTicketInput jiraToolId={jiraNotificationModel.getData("jiraToolId")} jiraSprintId={jiraNotificationModel.getData("jiraSprint")} setDataObject={setJiraNotificationModel} dataObject={jiraNotificationModel} />
      {getDynamicFields()}
    </div>
  );
}

JiraStepNotificationEditorPanel.propTypes = {
  jiraNotificationModel: PropTypes.object,
  setJiraNotificationModel: PropTypes.func,
  isApprovalStep: PropTypes.bool,
};

export default JiraStepNotificationEditorPanel;