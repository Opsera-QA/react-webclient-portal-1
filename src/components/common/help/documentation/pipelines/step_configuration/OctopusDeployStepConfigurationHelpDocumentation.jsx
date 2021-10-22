import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function OctopusDeployStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"mb-2 ml-4"}>Octopus has a wide range of functionality which can be utilized using the Octopus Deploy pipeline step. To view in depth documentation on Octopus Deployment, including Tool Registry and Pipeline setup, view the <b><a href="https://opsera.atlassian.net/l/c/b1VftgBW" target="_blank" rel="noreferrer">Octopus Deployment Help Documentation</a></b> .
        </div>
        <ol>
          <li>Once the initial Step Setup is configured with the Octopus Tool, set the following values:
            <ul style={{listStyleType: "none"}}>
              <li><b>Octopus Tool ID</b> - Select a configured Octopus Tool from Tool Registry. Confirm configuration in Connections is successful before proceeding with tool.</li>
              <li><b>Space Name</b> - Choose the Space Name, found in Octopus portal.</li>
              <li><b>Environment Name</b> - Select the environment required.</li>
              <li><b>Project Type</b> - Enter a prefix to be prepended to the uniquely generated name.
                <ul>
                  <li><b>Octopus Native Project</b> - A project already available in Octopus that will be used for orchestration.</li>
                  <li><b>Opsera Managed Project</b> - A new Octopus project created via Opsera.</li>
                </ul></li>
              <li><b>Project Group</b> -  Projects are organized by group in the Octopus portal. </li>
              <li><b>Project Name</b> - Enter a unique project name. Use the validate button to verify it is available.</li>
              <li><b>Project Description</b> - Enter a project description for the project.</li>
              <li><b>Channel</b> - Channels enable deployment of the same project with multiple deployment strategies. For example, if a hot-fix is deployed first to production, the same can be deployed to other environments using the same pipeline and a different channel ID.</li>
              <li><b>Artifact Step</b> - Select the corresponding pipeline step from the drop down list.</li>
              <li><b>Deployment Target Role</b> - Select the server to deploy to.</li>
              <li><b>Deployment Lifecycle</b> - Select the deployment lifecycle. If there is no lifecycle available in Octopus, Default will be the only option.</li>
            </ul>
          </li>
          <li>Select <b>Save</b> and proceed to setting up the next pipeline steps.</li>
        </ol>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpDocumentation={getHelpDocumentation()}
      helpTopic={"Octopus Deploy Step Configuration"}
    />
  );
}
export default React.memo(OctopusDeployStepConfigurationHelpDocumentation);