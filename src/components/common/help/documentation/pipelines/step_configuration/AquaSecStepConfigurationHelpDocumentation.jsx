import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function AquaSecStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>Integrate Aquasec tool in Opsera pipelines to perform vulnerability scans. Aqua automates security testing in your CI/CD workflow and scans to discover developing threats. For more detailed information on the Aqua Security Scan workflow, view the <a href="https://docs.opsera.io/quality-and-security-scan/aqua-security-scan-integration" target="_blank" rel="noreferrer"><b>Aqua Security Scan Pipeline Help Documentation</b>. </a>
        </div>
        <div className={"ml-4"}>
          <ol>
            <li>Once the initial Step Setup is configured with the Aquasec tool, set the following values:
              <ul style={{listStyleType: "none"}}>
                <li><b>Jenkins Tool</b> - Select a Jenkins tool from the drop-down.</li>
                <li><b>Aquasec Tool</b> - Select the Aquasec tool created in the tool registry.</li>
                <li><b>Build Step</b> - Choose the build step added to this pipeline. The build step added in the pipeline must be enabled in order to scan the docker image.</li>
                <li><b>Docker Tool</b> - Choose the required Tool ID from the drop-down.</li>
                <li><b>Docker Image</b> - Enter an image name.</li>
              </ul>
            </li>
            <li>Click <b>Save</b> to start pipeline.</li>
          </ol>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Aquasec Step Configuration"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}
export default React.memo(AquaSecStepConfigurationHelpDocumentation);