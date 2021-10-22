import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function AnsibleStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-4"}>Select an Ansible playbook to execute in this pipeline step. Ansible server will execute the playbook file located within the selected SCM repository. Prior to this setup, Ansible tool must be successfully configured and registered in Opsera’s Tool Registry. For more detailed information on the Ansible workflow, view the <a href="https://opsera.atlassian.net/l/c/RSJswEfv" target="_blank" rel="noreferrer"><b>Ansible Pipeline Help Documentation</b>. </a>
        </div>
        <div className={"ml-4 mt-2"}>
          <ol>
            <li>Once the pipeline step has been created with Ansible as the Tool Identifier, configure the pipeline step by selecting the following values:
              <ul style={{listStyleType: "none"}}>
                <li><b>Ansible Tool</b> - Select a configured Ansible Tool from Tool Registry. Confirm that configuration in Connections is successful before proceeding with configurations. Ansible server will execute the playbook file selected in the following steps.</li>
                <li><b>SCM Service Type</b> - Select the source control management type where the playbook file to be executed is stored. Choose from Bitbucket, Github or Gitlab.</li>
                <li><b>SCM Tool</b> - Select the configured source control management tool containing the repository where the playbook file is stored.</li>
                <li><b>Repository</b> - Select the repository where the playbook file is stored.</li>
                <li><b>Branch</b> - Select the branch in the repository where the playbook file is stored.</li>
                <li><b>Playbook File Path</b> - Enter the file path where the playbook file is stored. </li>
                <li><b>Playbook File Name</b> - Click below on ‘Click here to fetch file list’ to fetch playbook files from the selected file path.</li>
                <li><b>Playbook Command Arguments</b> - Add custom parameters passed as a runtime value. To view a formatting reference, view the documentation link above.</li></ul>
            </li>
            <li>Select <b>Save</b> and start pipeline.</li>
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
      helpTopic={"Ansible Step Configuration"}
    />
  );
}
export default React.memo(AnsibleStepConfigurationHelpDocumentation);