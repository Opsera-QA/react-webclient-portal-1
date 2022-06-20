import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {getTaskTypeLabel, TASK_TYPES} from "../../../../../tasks/task.types";


function SfdxQuickDeployTaskDetailsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        The <b>{getTaskTypeLabel(TASK_TYPES.SALESFORCE_QUICK_DEPLOY)} Task</b>  offers quick deploy where any pipeline with validate step with unit test are eligible. Upon pipeline run, a unique <b>Deploy ID</b> is generated which can be used for quick deploy task to be performed. This workflow requires first running a SFDX/ANT pipeline with a unit test in order to retrieve the unique <b>Deploy ID</b> used in task configuration. For more detailed information on the Salesforce Quick Deployment workflow including troubleshooting, view the <a href="https://opsera.atlassian.net/l/c/SN87X68R" target="_blank" rel="noreferrer"><b>Salesforce Quick Deployment Documentation</b>.</a>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Salesforce Quick Deploy Task Details"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(SfdxQuickDeployTaskDetailsHelpDocumentation);