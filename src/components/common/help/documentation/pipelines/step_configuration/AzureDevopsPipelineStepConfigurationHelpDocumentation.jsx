import React, { useContext } from "react";
import HelpOverlayBase from "../../../../overlays/center/help/HelpOverlayBase";
import { DialogToastContext } from "contexts/DialogToastContext";

function AzureDevopsPipelineStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"mb-1 ml-3"}>To configure Azure DevOps in the pipeline step, select values provided in the following drop down fields. Organization Name, Project Name/ID and Pipeline ID are fetched from a configured pipeline within the Azure DevOps portal.</div>
          <ul style={{listStyleType: "none"}}>
            <li><b>Azure DevOps Tool</b> - This field contains Azure DevOps tools that have been configured in the Opsera Tool Registry. Upon tool configuration, a Personal Access Token and an Organization Name (found in the Azure DevOps portal) were entered. To edit or reconfigure a tool, select <b>View Or Edit this Tool’s Registry settings.</b></li>
            <li><b>Organization Name</b> - Defined in Tool Registry in the Tool Details Connection tab. Organization Name can be found in the Azure DevOps portal. </li>
            <li><b>Project Name/ID</b> - Fetched from the Azure portal in Organization name under Projects. If you signed up for Azure DevOps with an existing MSA or GitHub identity, you are automatically prompted to create a Project. </li>
            <li><b>Pipeline ID</b> - Fetched from Pipelines in the Azure DevOps portal. </li>
          </ul>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Azure DevOps Step Configuration"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}

export default React.memo(AzureDevopsPipelineStepConfigurationHelpDocumentation);