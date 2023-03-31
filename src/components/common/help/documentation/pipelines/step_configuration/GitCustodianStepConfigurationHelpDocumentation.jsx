import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function GitCustodianStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>Opsera offers Git Custodian support in a pipeline step that allows users to choose from Custodian libraries then run a scan against the configured SCM repos. You can define a maximum threshold and pipeline will use the values to determine the final status of the step. For more detailed information on the Git Custodian workflow, view the <a href="https://docs.opsera.io/quality-and-security-scan/git-custodian-pipeline" target="_blank" rel="noreferrer"><b>Git Custodian Pipeline Help Documentation</b>. </a>
        </div>
        <div className={"ml-4"}>
          <ol>
            <li>Once the initial Step Setup is configured with the Git Custodian tool, set the following values:
              <ul style={{listStyleType: "none"}}>
                <li><b>Source Code Management Tool Type</b> - Select a Source Code Management Tool Type from the drop-down. Choose Bitbucket, Github, GitLab or Azure.</li>
                <li><b>Source Code Management Tool</b> - Select the respective Source Code Management Tool containing the repository to run a scan against.</li>
                <li><b>Repository</b> - Select the repository to run a scan against.</li>
                <li><b>Branch</b> - Select the branch to run a scan against.</li>
                <li><b>Maximum Allows Secrets Threshold</b> - Select the maximum allowed secrets that scan can contain without receiving a failure status.</li>
                <li><b>Exclude Certain Secrets from Scan - Secrets to Ignore</b> - Select any Parameters to be ignored during the scan from the drop-down. These will not be counted toward the threshold. To add them to the table, click <b>Add</b>. Parameters are fetched from Tool Registry Parameters.</li>
                <li><b>Exclude Certain Project Files from Scan - Project Files to Ignore</b> - Select Absolute File Path(s) to be ignored during the scan from the drop-down. These will not be counted toward the threshold. To add them to the table, click <b>Add</b>.</li>
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
      helpTopic={"Git Custodian Step Configuration"}
    />
  );
}
export default React.memo(GitCustodianStepConfigurationHelpDocumentation);