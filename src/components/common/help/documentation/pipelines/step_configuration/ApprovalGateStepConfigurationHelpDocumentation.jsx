import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import { getTaskTypeLabel, TASK_TYPES } from "../../../../../tasks/task.types";

function ApprovalGateStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2"}>The Approval Gate step will halt the running pipeline and notify the configured user in order to allow the pipeline to proceed. There are 2 steps required in this workflow: configuring the Approval Gate step and adding a pipeline step notification to the configured step. For more detailed information on Approval Gate setup, view the <b><a href="https://opsera.atlassian.net/l/c/o7JLXdPX" target="_blank" rel="noreferrer">Approval Gate Step Configuration Help Documentation</a></b>.
          <div className={"ml-4 mt-3"}>
            <div><h6>Approval Gate Step Configuration:</h6></div>
            <ol>
              <li>In the <b>Custom Step Message</b> field, provide a unique message to send to the configured user.</li>
              <li>In the <b>Point of Contact</b> field, enter a name to be used if the configured user has any questions.</li>
              <li>Select the <b>Save</b> button to proceed with configuring the pipeline step notification.</li>
              <li>To proceed to pipeline step notification, select the mail icon from the Approval Gate Step and continue with setup.</li>
            </ol>
            <div className={"mt-2"}>Note: The Approval Gate step setup is not complete until pipeline step notification has been configured following this step setup. </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpDocumentation={getHelpDocumentation()}
      helpTopic={"Approval Gate Step Configuration"}
    />
  );
}
export default React.memo(ApprovalGateStepConfigurationHelpDocumentation);