import React from "react";
import PropTypes from "prop-types";
import EnabledNotificationBooleanToggle from "components/workflow/plan/step/notifications/EnabledNotificationBooleanToggle";
import JiraStepNotificationJiraToolSelectInput
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationJiraToolSelectInput";
import JiraPrioritySelectInput
  from "components/common/list_of_values_input/tools/jira/priorities/JiraPrioritySelectInput";
import JiraStepNotificationProjectSelectInput
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationProjectSelectInput";
import JiraProjectUserSelectInput
  from "components/common/list_of_values_input/tools/jira/users/JiraProjectUserSelectInput";
import JiraProjectUsersMultiSelectInput
  from "components/common/list_of_values_input/tools/jira/users/JiraProjectUsersMultiSelectInput";
import JiraStepNotificationBoardSelectInput
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationBoardSelectInput";
import JiraStepNotificationSprintInput
  from "components/workflow/plan/step/notifications/jira/JiraStepNotificationSprintInput";
import JiraSprintTicketSelectInput
  from "components/common/list_of_values_input/tools/jira/tickets/JiraSprintTicketSelectInput";
import JiraProjectWorkflowStepSelectInput
  from "components/common/list_of_values_input/tools/jira/workflow_steps/JiraProjectWorkflowStepSelectInput";
import ConnectToToolMessage from "components/common/fields/inventory/messages/ConnectToToolMessage";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import OrchestrationNotificationLevelSelectInput
  from "components/workflow/plan/step/notifications/OrchestrationNotificationLevelSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function JiraNotificationEditorPanel(
  {
    jiraNotificationModel,
    setJiraNotificationModel,
    isApprovalStep,
    showOrchestrationFields,
  }) {
  // const getOrchestrationFields = () => {
  //   if (showOrchestrationFields !== false) {
  //     return (
  //       <>
  //         <Col xs={12}>
  //           <OrchestrationNotificationLevelSelectInput
  //             model={slackNotificationModel}
  //             setModel={setSlackNotificationModel}
  //           />
  //         </Col>
  //         <Col xs={12}>
  //           <BooleanToggleInput
  //             dataObject={slackNotificationModel}
  //             setDataObject={setSlackNotificationModel}
  //             disabled={slackNotificationModel?.getData("enabled") === false}
  //             fieldName={"logEnabled"}
  //           />
  //         </Col>
  //       </>
  //     );
  //   }
  // };

  const getDynamicFields = () => {
    if (isApprovalStep !== true) {
      return (
        <>
          <Col xs={12} md={6}>
            <JiraProjectWorkflowStepSelectInput
              fieldName={"jiraOpenStep"}
              jiraToolId={jiraNotificationModel.getData("jiraToolId")}
              jiraProject={jiraNotificationModel.getData("jiraProject")}
              model={jiraNotificationModel}
              setModel={setJiraNotificationModel}
              disabled={jiraNotificationModel?.getData("enabled") !== true}
            />
          </Col>
          <Col xs={12} md={6}>
            <JiraProjectWorkflowStepSelectInput
              fieldName={"jiraClosureStep"}
              jiraToolId={jiraNotificationModel.getData("jiraToolId")}
              jiraProject={jiraNotificationModel.getData("jiraProject")}
              model={jiraNotificationModel}
              setModel={setJiraNotificationModel}
              disabled={jiraNotificationModel?.getData("enabled") !== true}
            />
          </Col>
        </>
      );
    }
  };
  
  if (jiraNotificationModel == null) {
    return null;
  }

  return (
    <Row>
      <Col xs={12}>
        <EnabledNotificationBooleanToggle
          model={jiraNotificationModel}
          setModel={setJiraNotificationModel}
        />
      </Col>
      <Col xs={12}>
        <ConnectToToolMessage toolFriendlyName={"Jira"}/>
      </Col>
      {/*<Col xs={12}>*/}
      {/*<NotificationLevelInput disabled={true} dataObject={jiraNotificationModel} setDataObject={setJiraNotificationModel} fieldName={"jiraNotificationLevel"} />*/}
      {/*</Col>*/}
      <Col xs={12}>
        <JiraStepNotificationJiraToolSelectInput
          model={jiraNotificationModel}
          setModel={setJiraNotificationModel}
          disabled={jiraNotificationModel?.getData("enabled") !== true}
        />
      </Col>
      <Col xs={12}>
        <JiraPrioritySelectInput
          fieldName={"jiraPriority"}
          jiraToolId={jiraNotificationModel.getData("jiraToolId")}
          model={jiraNotificationModel}
          setModel={setJiraNotificationModel}
          disabled={jiraNotificationModel?.getData("enabled") !== true}
        />
      </Col>
      <Col xs={12} md={6}>
        <JiraStepNotificationProjectSelectInput
          jiraToolId={jiraNotificationModel.getData("jiraToolId")}
          model={jiraNotificationModel}
          setModel={setJiraNotificationModel}
          disabled={jiraNotificationModel?.getData("enabled") !== true}
        />
      </Col>
      <Col xs={12} md={6}>
        <JiraProjectUserSelectInput
          fieldName={"jiraPrimaryAssignee"}
          jiraToolId={jiraNotificationModel.getData("jiraToolId")}
          jiraProject={jiraNotificationModel.getData("jiraProject")}
          model={jiraNotificationModel}
          setModel={setJiraNotificationModel}
          disabled={jiraNotificationModel?.getData("enabled") !== true}
        />
      </Col>
      <Col xs={12}>
        <JiraProjectUsersMultiSelectInput
          fieldName={"jiraSecondaryAssignees"}
          jiraToolId={jiraNotificationModel.getData("jiraToolId")}
          jiraProject={jiraNotificationModel.getData("jiraProject")}
          model={jiraNotificationModel}
          setModel={setJiraNotificationModel}
          disabled={jiraNotificationModel?.getData("enabled") !== true}
        />
      </Col>
      <Col xs={12} md={4}>
        <JiraStepNotificationBoardSelectInput
          jiraToolId={jiraNotificationModel.getData("jiraToolId")}
          jiraProjectKey={jiraNotificationModel.getData("jiraProject")}
          model={jiraNotificationModel}
          setModel={setJiraNotificationModel}
          disabled={jiraNotificationModel?.getData("enabled") !== true}
        />
      </Col>
      <Col xs={12} md={4}>
        <JiraStepNotificationSprintInput
          jiraToolId={jiraNotificationModel.getData("jiraToolId")}
          jiraBoard={jiraNotificationModel.getData("jiraBoard")}
          model={jiraNotificationModel}
          setModel={setJiraNotificationModel}
          disabled={jiraNotificationModel?.getData("enabled") !== true}
        />
      </Col>
      <Col xs={12} md={4}>
        <JiraSprintTicketSelectInput
          fieldName={"jiraParentTicket"}
          jiraToolId={jiraNotificationModel.getData("jiraToolId")}
          jiraSprintId={jiraNotificationModel.getData("jiraSprint")}
          model={jiraNotificationModel}
          setModel={setJiraNotificationModel}
          disabled={jiraNotificationModel?.getData("enabled") !== true}
        />
      </Col>
      {getDynamicFields()}
      {/*{getOrchestrationFields()}*/}
    </Row>
  );
}

JiraNotificationEditorPanel.propTypes = {
  jiraNotificationModel: PropTypes.object,
  setJiraNotificationModel: PropTypes.func,
  isApprovalStep: PropTypes.bool,
  showOrchestrationFields: PropTypes.bool,
};

export default JiraNotificationEditorPanel;