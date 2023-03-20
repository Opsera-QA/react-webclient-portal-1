import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";



function NotificationManagementHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>

      <div>Manage and create alerts based on your requirements for specific Pipelines, Tasks or Tools. For example, you can set up triggers for your crucial pipelines to be alerted when the pipeline configuration is updated. Opsera supports alerts for all types of actions performed. Choose specific actions (Example: Create, Update, Owner Transfer) and more. For more information, view the <a href="https://docs.opsera.io/notifications/audit-log-notifications" target="_blank" rel="noreferrer"><b>Audit Log Notifications Help Documentation</b>.</a>
      </div>
    <div className={"ml-2 mt-2"}><h5>Manage notifications:</h5>
    <ol>
      <li>Click <b>+ New Notification Policy</b>.</li>
      <li>In the <b>Create New Notification Policy</b> popup, provide the Name, Tags and Type.</li>
      <li>Select a Notification Method. Choose Pipeline, Task or Tool.</li>
      <li>Select the particular Pipeline(s), Task(s) or Tool(s) you wish to receive alerts for.</li>
      <li>Select <b>Notification Triggers</b>. Notifications will be riggered based on actions selected. </li>
      <li>Select the <b>Notification Configuration</b> platform. Choose Email, Microsoft Teams, Slack or Google Chat.</li>
      <li>Click <b>Create</b> to save the notification policy.</li>
    </ol>
    </div>
  </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Notification Management"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(NotificationManagementHelpDocumentation);