import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function BlackDuckStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>Utilize Black Duck Integration in Opsera to scan and identify open source software throughout your code base. The scan&apos;s defect reports will be pushed to Black Duck server and Opsera&apos;s Insights. For more detailed information on the Black Duck workflow, view the <a href="https://docs.opsera.io/quality-and-security-scan/black-duck-integration" target="_blank" rel="noreferrer"><b>Black Duck Pipeline Help Documentation</b>. </a>
        </div>
        <div className={"ml-4"}>
          <ol>
            <li>Once the initial Step Setup is configured with the Black Duck tool, set the following values:
              <ul style={{listStyleType: "none"}}>
                <li><b>BlackDuck Tool</b> - Select a configured Black Duck tool.</li>
                <li><b>Source Code Management Type</b> - Select Bitbucket, Github or GitLab.</li>
                <li><b>Source Code Management Tool</b> - Select the Source Code Management tool containing the project with files for the Black Duck scan.</li>
                <li><b>Repository</b> - Select the Repository containing the project with files for the Black Duck scan.</li>
                <li><b>Branch</b> - Provide the branch where scans will occur.</li>
                <li><b>Git File Path</b> - Provide the path of file for scan.</li>
                <li><b>Project Name</b> - Select Black Duck project.</li>
                <li><b>Commands</b> - Provide a platform specific script.</li>
                <li><b>Runtime Variables</b> - Select Parameters configured in Tool Registry and provide a Key Name and click <b>Add</b>.</li>
                <li><b>Dependency</b> - Select the Java Dependency and Maven Version.</li>
                <li><b>Enable Client Side Thresholds</b> - For <b>Vulnerability threshold</b>, <b>License Threshold</b>, <b>Operational Threshold</b> select Level and Count.</li>
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
      helpTopic={"Black Duck Step Configuration"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}
export default React.memo(BlackDuckStepConfigurationHelpDocumentation);