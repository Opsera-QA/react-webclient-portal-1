import React, {useContext} from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function AzurePipelineStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      titleText={"Step Configuration Help"}>
      <div className={"my-1"}>In Azure Pipeline Step Configuration, you are simply selecting values provided in the
        following drop down fields. Organization Name, Project Name/ID and Pipeline ID are fetched from a pipeline that
        has already been configured in the Azure DevOps portal.
      </div>
      <ul>
        <li>
          <div className={"mt-3"}><b>Azure DevOps Tool</b> - This field contains Azure DevOps tools configured in the
            Opsera Tool Registry. Upon tool configuration, a Personal Access Token and an Organization Name (found in
            the Azure DevOps portal) were entered. To edit or reconfigure a tool, select <b>View Or Edit this Tool’s
              Registry settings.</b>
          </div>
        </li>
        <li><b>Organization Name</b> - Defined in Tool Registry in the Tool Details Connection tab. Organization Name
          can be found in the Azure DevOps portal.
        </li>
        <li><b>Project Name/ID</b> - Fetched from the Azure portal in Organization name under Projects. If you signed up
          for Azure DevOps with an existing MSA or GitHub identity, you are automatically prompted to create a Project.
        </li>
        <li><b>Pipeline ID</b> - Fetched from Pipelines in the Azure DevOps portal.</li>
      </ul>
    </HelpOverlayBase>
  );
}

export default React.memo(AzurePipelineStepConfigurationHelpDocumentation);