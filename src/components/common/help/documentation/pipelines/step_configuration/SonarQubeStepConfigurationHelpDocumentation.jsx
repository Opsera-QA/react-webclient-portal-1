import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function SonarQubeStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>SonarQube has a wide range of functionality which can be utilized using the SonarQube pipeline step. To view in depth documentation, view the <b><a href="https://docs.opsera.io/quality-and-security-scan/sonarqube-integration" target="_blank" rel="noreferrer">SonarQube Integration Help Documentation</a></b> .
        </div>
        <div className={"ml-4"}>
          <ol>
            <li>Once the initial Step Setup is configured with the SonarQube tool, set the following values:
              <ul style={{listStyleType: "none"}}>
                <li><b>Jenkins Tool</b> - Choose a Jenkins tool that is registered in Opsera.</li>
                <li><b>Job Type</b> - Choose Opsera Managed Job from the drop-down.</li>
                <li><b>Job</b> - Choose a SonarQube Job created for the selected Jenkins Tool. </li>
                <li><b>Limit Scan to Selected Artifacts</b> - Enable this toggle to scan only the selected artifact components.</li>
                <li><b>Account</b> -  Choose a account related to the Jenkins tool from the drop-down. </li>
                <li><b>Repository</b> - Choose a repository related to the chosen account.</li>
                <li><b>Branch</b> - Choose a branch in the chosen repository.</li>
                <li><b>Sonar Source Path</b> - Enter the source path.</li>
                <li><b>Sonar Credentials</b> - Choose the credentials from the drop-down. Confirm configuration in Connections is successful before proceeding with tool.</li>
                <li><b>Project Key</b> - Enter the project key.</li>
                <li><b>Project Name</b> - Enter the project name.</li>
                <li><b>Delete Jenkins workspace before building</b></li>
                <li><b>Success Threshold</b> </li>
                <li><b>Commands</b> - Provide commands.</li>
                <li><b>Enable Client Side Thresholds</b>:
                  <ul>
                    <li><b>Compliance threshold</b>: <b>Duplicated Lines</b>, <b>Coverage on New Code</b>, and <b>Security Hotspots Reviewed</b> - Choose one or all required compliance level and enter a numeric value.  </li>
                    <li><b>Rating Threshold</b>: <b>Security Ratings</b>, <b>Maintainability Rating</b>, and <b>Reliability Rating</b> - Choose one or any level and select rating from the drop-downs.</li>
                  </ul></li>
              </ul>
            </li>
            <li>Select <b>Save</b> and proceed to setting up the next pipeline steps.</li>
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
      helpTopic={"SonarQube Step Configuration"}
    />
  );
}
export default React.memo(SonarQubeStepConfigurationHelpDocumentation);