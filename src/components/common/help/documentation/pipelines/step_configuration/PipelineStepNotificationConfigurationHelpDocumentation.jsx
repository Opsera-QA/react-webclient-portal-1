import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function PipelineStepNotificationConfigurationHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      helpTopic={"Pipeline Step Notification Configuration"}
      closeHelpPanel={closeHelpPanel}
    >
      <div className={"ml-2 mb-2"}>Configure a <b>Pipeline Step Notification</b> to trigger a notification upon step completion. The platform&apos;s toggle must be enabled to configure. <b>Notification Level</b> selected will indicate if notification will be received when <b>Step Completed</b>, <b>On Error</b>, or for <b>All Activity</b> of the configured pipeline step. For notification changes to take effect upon next pipeline run, configurations must be saved. Currently notifications can be sent via <b>Email</b>, <b>Microsoft Teams</b>, <b>Google Chat</b> and <b>Slack</b>.</div>
      <div>
        <ul style={{listStyleType: "none"}}><li><b>Email Notification Configuration</b>
          <ul>
            <li><b>Email Addresses</b> - Provide email address(es) where you would like to receive a notification then click <b>+ Add Email Address</b>.</li>
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
            <li><b>Prerequisites</b> - A successfully configured Google Chat tool in the Tool Registry.</li>
            <li><b>Gchat Tool</b> - Select a properly configured Gchat tool from the drop-down.</li>
          </ul></li>
        </ul>
        <ul style={{listStyleType: "none"}}><li><b>Slack Notification Configuration</b>
          <ul>
            <li><b>Prerequisites</b> - A successfully configured Slack tool in the Tool Registry, and the Opsera app added to the Slack channel where notifications will be received. To receive a notification within a specific Slack channel, navigate to the slack channel. In the text field, type “/app” to search through your connected app directory and locate Opsera. </li>
            <li><b>Slack Tool</b> - Select a properly configured Slack tool from the drop-down.</li>
            <li><b>Slack Channel</b> - Provide the name of the slack channel where you previously added the Opsera app. The <b>#</b> is not required.</li>
          </ul></li>
        </ul>
      </div>
    </HelpDocumentationContainer>
  );
}

PipelineStepNotificationConfigurationHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func
};

export default React.memo(PipelineStepNotificationConfigurationHelpDocumentation);