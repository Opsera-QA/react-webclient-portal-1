import React, { useContext } from "react";
import HelpOverlayBase from "../../../../overlays/center/help/HelpOverlayBase";
import { DialogToastContext } from "contexts/DialogToastContext";

function AzurePipelineStepConfiguration() {
    const toastContext = useContext(DialogToastContext);
    const closePanel = () => {
      toastContext.clearOverlayPanel();
    };
  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      titleText={"Step Configuration Help"}>
      <br></br>
      <div className={"mb-1"}>In the Azure Pipeline Step Configuration, you are simply inserting values from a pipeline which has already been configured in the Azure DevOps portal.</div>
      <div className={"mt-3"}><b>Azure DevOps Tool</b> - This contains Azure DevOps tools fetched from the Opsera Tool Registry. To edit or reconfigure a tool, select <b>View Or Edit this Tool’s Registry settings.</b> </div>
      <div><b>Organization Name</b> - Find this in your Azure DevOps portal. </div>
      <div><b>Project Name/ID</b> - If you signed up for Azure DevOps with an existing MSA or GitHub identity, you are automatically prompted to create a Project. Find this in the Azure portal in your Organization name under Projects.</div>
      <div><b>Pipeline ID</b> - Pipeline ID is fetched from Pipelines in your Azure DevOps portal. This drop down menu auto populates upon entering your Project Name/ID. </div>
    </HelpOverlayBase>
  );
}

export default React.memo(AzurePipelineStepConfiguration);