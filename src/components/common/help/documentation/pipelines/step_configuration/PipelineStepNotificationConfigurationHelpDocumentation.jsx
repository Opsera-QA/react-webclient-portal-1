import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function PipelineStepNotificationConfigurationHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      helpTopic={"Pipeline Step Notification Configuration"}
      closeHelpPanel={closeHelpPanel}
    >
      <div className={"mb-2"}>To receive a notification upon a pipeline step&apos;s completion, configure a <b>Pipeline Step Notification Configuration</b>. The platform&apos;s toggle must be enabled to configure. <b>Notification Level</b> selected will indicate if notification will be received when <b>Step Completed</b>, <b>On Error</b>, or for <b>All Activity</b> of the configured step. Currently notifications can be sent via Email, Jira, Microsoft Teams and Slack. For further information on pipeline step notification setup, view the <b><a href="https://docs.opsera.io/notifications/pipeline-notifications" target="_blank" rel="noreferrer">Pipeline Notification Documentation</a></b>.
      </div>
      <div>
        <ul style={{listStyleType: "none"}}>
          <li><b>Email Notification Configuration</b>
          <ul>
            <li><b>Email Addresses</b> - Provide email address(es) where you would like to receive a notification then click <b>+ Add Email Address</b>.</li>
          </ul></li>
        </ul>
        <ul style={{listStyleType: "none"}}><li><b>Jira Notification Configuration</b>
          <ul>
            <li><b>Prerequisite</b> - Successfully configure a Jira tool in the Tool Registry prior to notification configuration.</li>
            <li><b>Jira Tool</b> - Select a properly configured Jira tool from the drop-down.</li>
            <li><b>Priority</b> - Select the Jira Priority Level.</li>
            <li><b>Project</b> - Select the corresponding Jira Project.</li>
            <li><b>Primary Assignee</b> - Select the primary assignee who will receive the notification. Select up to 10 <b>Secondary Assignees</b>.</li>
            <li><b>Board</b> - Select the corresponding Jira Board.</li>
            <li><b>Other Details</b> - From the drop-downs, select the corresponding <b>Sprint</b>, <b>Parent Ticket</b>, <b>Open Step</b> and <b>Closure</b> Workflow Steps.</li>
          </ul></li>
        </ul>
        <ul style={{listStyleType: "none"}}><li><b>Microsoft Teams Notification Configuration</b>
          <ul>
            <li><b>Prerequisites</b> - A successfully configured Microsoft Teams tool in the Tool Registry, and an incoming webhook into the Teams channel where notifications will be received.</li>
            <li><b>Teams Tool</b> - Select a properly configured Teams tool from the drop-down.</li>
          </ul></li>
        </ul>
        <ul style={{listStyleType: "none"}}><li><b>Google Chat Notification Configuration</b>
          <ul>
            <li><b>Prerequisite</b> - A successfully configured Google Chat tool in the Tool Registry.</li>
            <li><b>Gchat Tool</b> - Select a properly configured Gchat tool from the drop-down.</li>
          </ul></li>
        </ul>
        <ul style={{listStyleType: "none"}}><li><b>Slack Notification Configuration</b>
          <ul>
            <li><b>Prerequisites</b> - A successfully configured Slack tool in the Tool Registry, and the Opsera app added to the Slack channel where notifications wil be received. To receive a notification within a specific Slack channel, navigate to the slack channel. In the text field, type “/app” to search through your connected app directory and locate Opsera. </li>
            <li><b>Slack Tool</b> - Select a properly configured Slack tool from the drop-down.</li>
            <li><b>Slack Channel</b> - Provide the name of the slack channel where you previously added the Opsera app. The <b>#</b> is not required.</li>
          </ul></li>
        </ul>
        <div>Note: For notification changes to take effect upon next pipeline run, configurations must be saved.</div>
      </div>
    </HelpDocumentationContainer>
  );
}

PipelineStepNotificationConfigurationHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func
};

export default React.memo(PipelineStepNotificationConfigurationHelpDocumentation);