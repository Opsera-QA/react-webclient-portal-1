import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function AnchoreIntegratorConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>Utilize Anchor Integrator in Opsera pipelines to scan Docker images for vulnerabilities . After the scan, view the Anchore Security Report in Blueprints for vulnerability details according to severity. For more detailed information on the Anchore Integrator workflow, view the <a href="https://docs.opsera.io/quality-and-security-scan/anchore-integration" target="_blank" rel="noreferrer"><b>Anchore Integration Help Documentation</b>. </a>
        </div>
        <div className={"ml-4"}>
          <ol>
            <li>Once the initial Step Setup is configured with the Anchore Integrator tool, set the following values:
              <ul style={{listStyleType: "none"}}>
                <li><b>Anchore Tool</b> - Select a configured Anchore tool.</li>
                <li><b>ECR Step Push ID</b> - Select the preceding ECR/Docker pipeline step from the drop-down.</li>
                <li><b>Enable Client Side Thresholds</b>: <b>Vulnerability threshold</b> - Select Level and Count. Click <b>+Add Threshold</b>.</li>
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
      helpTopic={"Anchore Integrator Step Configuration"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}
export default React.memo(AnchoreIntegratorConfigurationHelpDocumentation);