import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function TaskNotificationConfigurationHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      helpTopic={"Task Completion Notification Configuration"}
      closeHelpPanel={closeHelpPanel}
    >
      <div className={"mb-2"}>Configure a <b>Task Completion Notification</b> to be notified upon a Task Completion.</div>
      <div className={"ml-4"}>
        <div><h6>Email Notification Configuration</h6></div>
        <ol>
          <li>Enable the <b>Email Notifications</b> toggle. </li>
          <li>In <b>Email Addresses</b> field, provide email address(es) where you would like to receive a notification.</li>
          <li>In <b>Notification Level</b> field, select the scenario in which you want to be notified. Choose from <b>Step Completed</b>, <b>On Error</b>, or <b>All Activity</b>.</li>
          <li>Click the <b>Save</b> button in order for changes to take effect upon next task run.</li>
        </ol>
        <div><h6>Microsoft Teams Configuration</h6></div>
        <div className={"ml-2 mb-1"}><b>Prerequisites</b> - A successfully configured Microsoft Teams tool in the Tool Registry, and an incoming webhook into the Teams channel where notifications will be received.</div>
        <ol>
          <li>Enable the <b>Microsoft Teams</b> toggle. </li>
          <li>In <b>Notification Level</b> field, select the scenario in which you want to be notified. Choose from <b>Step Completed</b>, <b>On Error</b>, or <b>All Activity</b>.</li>
          <li>Click the <b>Save</b> button in order for changes to take effect upon next task run.</li>
        </ol>
        <div><h6>Slack Notification Configuration</h6></div>
        <div className={"ml-2 mb-1"}><b>Prerequisites</b> - A successfully configured Slack tool in the Tool Registry, and the Opsera app added to the Slack channel where notifications wil be received. To receive a notification within a specific Slack channel, navigate to the slack channel. In the text field, type “/app” to search through your connected app directory and locate Opsera. </div>
        <ol>
          <li>Enable the <b>Slack Notifications</b> toggle. </li>
          <li>In <b>Notification Level</b> field, select the scenario in which you want to be notified. Choose from <b>Step Completed</b>, <b>On Error</b>, or <b>All Activity</b>.</li>
          <li>In the <b>Slack Channel</b> field, provide the name of the slack channel where you previously added the Opsera app. The <b>#</b> is not required.</li>
          <li>Click the <b>Save</b> button in order for changes to take effect upon next task run.</li>
        </ol>
      </div>
    </HelpDocumentationContainer>
  );
}

TaskNotificationConfigurationHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func
};

export default React.memo(TaskNotificationConfigurationHelpDocumentation);