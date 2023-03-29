import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function TwistlockStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>Prisma Cloud/Twistlock produces vulnerability findings by scanning containers and registries. Use Twistlock integration to gain awareness of container-based vulnerabilities in projects. For more detailed information on the Twistlock workflow, view the <a href="https://docs.opsera.io/supporting-documents/prisma-cloud-twistlock-integration" target="_blank" rel="noreferrer"><b>Twistlock Pipeline Help Documentation</b>. </a>
        </div>
        <div className={"ml-4"}>
          <ol>
            <li>Once the initial Step Setup is configured with the Twistlock tool, set the following values:
              <ul style={{listStyleType: "none"}}>
                <li><b>Jenkins Tool Selection</b> - Select a configured Jenkins tool.</li>
                <li><b>Twistlock Tool</b> - Select the properly configured Twistlock tool.</li>
                <li><b>Docker Build Step</b> - Select the Docker Build pipeline step.</li>
                <li><b>Compliance Threshold</b> - Select a compliance threshold Level from the following actions: <b>Critical</b>, <b>High</b>, <b>Medium</b>, <b>Low</b> or <b>Total</b>. Provide a <b>Count</b> for the threshold and click <b>+Add Threshold</b>.</li>
                <li><b>Vulnerability Threshold</b> - Select a vulnerability threshold Level from the following actions: <b>Critical</b>, <b>High</b>, <b>Medium</b>, <b>Low</b> or <b>Total</b>. Provide a <b>Count</b> for the threshold and click <b>+Add Threshold</b>.</li>
              </ul>
            </li>
            <li>Click <b>Save</b>.</li>
          </ol>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpDocumentation={getHelpDocumentation()}
      helpTopic={"Twistlock Step Configuration"}
    />
  );
}
export default React.memo(TwistlockStepConfigurationHelpDocumentation);