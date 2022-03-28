import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function PipelineStepNotificationConfigurationHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      helpTopic={"Pipeline Step Notification Configuration"}
      closeHelpPanel={closeHelpPanel}
    >
      <div className={"mb-2"}>Each pipeline step in the workflow can be configured with notification triggers upon completion. Add a notification trigger to be notified upon Any Activity, Step Error, or Step Completion. Currently notifications can be sent via Email and Slack.</div>
      <div className={"ml-4"}>
        <div><h6>Email Step Notification Configuration</h6></div>
        <ol>
          <li>Enable the <b>Email Notifications</b> toggle. </li>
          <li>In <b>Email Addresses</b> field, provide email address(es) where you would like to receive a notification.</li>
          <li>In <b>Notification Level</b> field, select the scenario in which you want to be notified. Choose from <b>Step Completed</b>, <b>On Error</b>, or <b>All Activity</b>.</li>
          <li>Click the <b>Save</b> button in order for changes to take effect upon next pipeline run.</li>
        </ol>
        <div><h6>Slack Step Notification Configuration</h6></div>
        <div className={"ml-2 mb-1"}><b>Prerequisites</b> - In order to configure a notification trigger to Slack, you must first properly configure a Slack tool to your Slack account in the Tool Registry, and also add the Opsera app to the Slack channel where you want to receive notifications. To receive a notification within a specific Slack channel, navigate to the slack channel. In the text field, type “/app” to search through your connected app directory and locate Opsera. </div>
        <ol>
          <li>Enable the <b>Slack Notifications</b> toggle. </li>
          <li>In <b>Email Addresses</b> field, provide email address(es) where you would like to receive a notification.</li>
          <li>In <b>Notification Level</b> field, select the scenario in which you want to be notified. Choose from <b>Step Completed</b>, <b>On Error</b>, or <b>All Activity</b>.</li>
          <li>In the <b>Slack Channel</b> field, provide the name of the slack channel where you previously added the Opsera app. The <b>#</b> is not required.</li>
          <li>Click the <b>Save</b> button in order for changes to take effect upon next pipeline run.</li>
        </ol>
      </div>
    </HelpDocumentationContainer>
  );
}

PipelineStepNotificationConfigurationHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func
};

export default React.memo(PipelineStepNotificationConfigurationHelpDocumentation);