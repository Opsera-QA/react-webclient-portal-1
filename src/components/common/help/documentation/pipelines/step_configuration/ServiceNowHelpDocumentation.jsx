import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";


function ServiceNowHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>A Service Now Step in an Opsera Pipeline will halt the running pipeline and notify the configured user in order to allow the pipeline to proceed. Approval notification follows the rules defined for overall step notification. For more detailed information on Service Now setup, view the <b><a href="https://docs.opsera.io/saas/servicenow-integration" target="_blank" rel="noreferrer">Service Now Help Documentation</a>.</b> Once the initial Step Setup is configured with the Service Now tool, set the following values:
        </div>
          <div className={"ml-4 mb-2"}>
            <ul style={{listStyleType: "none"}}>
              <li><b>Service Now Tool</b> - Choose the Service Now Tool registered in Opsera.</li>
              <li><b>Request Type</b> - Choose the Request Type as Change Request.</li>
              <li><b>Existing Change Request</b> - In case of using an existing change, enable toggle. </li>
              <li><b>Change Request</b> - Choose the change request that you want to use from the drop-down.</li>
              <li><b>Assignment Group</b> - In case of new change request enter the assignment group.</li>
              <li><b>Description</b> - Provide a unique description for the request.</li>
            </ul>
          </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpDocumentation={getHelpDocumentation()}
      helpTopic={"Service Now Step Configuration"}
    />
  );
}
export default React.memo(ServiceNowHelpDocumentation);