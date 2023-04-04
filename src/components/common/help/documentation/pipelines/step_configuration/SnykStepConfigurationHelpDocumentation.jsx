import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function SnykStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>Integrate Snyk tool in Opsera pipelines to scan, prioritize, and identify security vulnerabilities in code during your deployment. You can include the Snyk task in your pipeline to test for security vulnerabilities. When the testing is done, you can review and work with results directly from the reports generated by the Opsera Pipelines. For more detailed information on the Snyk workflow, view the <a href="https://docs.opsera.io/quality-and-security-scan/snyk-integration" target="_blank" rel="noreferrer"><b>Snyk Pipeline Help Documentation</b>. </a>
        </div>
        <div className={"ml-4"}>
          <ol>
            <li>Once the initial Step Setup is configured with the Snyk tool, set the following values:
              <ul style={{listStyleType: "none"}}>
                <li><b>Snyk Tool</b> - Select the created Snyk tool from the drop-down.</li>
                <li><b>Snyk Products</b> - Choose the scan type.</li>
                <li><b>Git Service</b> - Choose the Git tool type.</li>
                <li><b>Git Tool ID</b> - Choose the required Git tool from the drop-down.</li>
                <li><b>Repository</b> - Choose a repository from the selected account.</li>
                <li><b>Git Branch</b> - Choose a branch from the drop-down.</li>
                <li><b>Language</b> - Choose the Git tool type.</li>
                <li><b>Language Version</b> - Choose the required Git tool from the drop-down.</li>
                <li><b>Package Manager or Build Tool</b> - Select package manager or build tool.</li>
                <li><b>Multi Module Project</b> - Enable to support multi module project. </li>
                <li><b>Enable Client Side Thresholds</b>: <b>Vulnerability threshold</b> - Provide values for Level and Count and click <b>+Add Threshold</b>.</li>
              </ul>
            </li>
            <li>Click <b>Save</b> and start pipeline.</li>
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
      helpTopic={"Snyk Step Configuration"}
    />
  );
}
export default React.memo(SnykStepConfigurationHelpDocumentation);