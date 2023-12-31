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
        <div className={"ml-2 mb-2"}>Select an Ansible playbook to execute in this pipeline step. Ansible server will execute the playbook file located within the selected Source Code Management repository. Prior to this setup, Ansible tool must be successfully configured and registered in Opsera’s Tool Registry. For more detailed information on the Ansible workflow, view the <a href="https://docs.opsera.io/infrastructure-as-code/configure-ansible-pipeline" target="_blank" rel="noreferrer"><b>Ansible Pipeline Help Documentation</b>. </a>
        </div>
        <div className={"ml-4"}>
          <ol>
            <li>Once the initial Step Setup is configured with the Ansible tool, set the following values:
              <ul style={{listStyleType: "none"}}>
                <li><b>Ansible Tool</b> - Select a configured Ansible Tool from Tool Registry. Confirm that configuration in Connections is successful before proceeding with configurations. Ansible server will execute the playbook file selected in the following steps.</li>
                <li><b>Source Code Management Type</b> - Select the source code management type where the playbook file to be executed is stored. Choose from Bitbucket, Github or Gitlab.</li>
                <li><b>Source Code Management Tool</b> - Select the configured source code management tool containing the repository where the playbook file is stored.</li>
                <li><b>Repository</b> - Select the repository where the playbook file is stored.</li>
                <li><b>Branch</b> - Select the branch in the repository where the playbook file is stored.</li>
                <li><b>Playbook File Path</b> - Enter the file path where the playbook file is stored. </li>
                <li><b>Playbook File Name</b> - Click below on <b>Click here to fetch file list</b> to fetch playbook files from the selected file path.</li></ul>
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