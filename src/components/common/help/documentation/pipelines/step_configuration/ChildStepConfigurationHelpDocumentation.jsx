import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function ChildStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}> A pipeline step with Child Pipeline step allows user to run another pipeline as a step within this pipeline. The overall success or failure of the parent pipeline will impact the execution of this pipeline. For more detailed information on Child Pipelines, view the <a href="https://docs.opsera.io/create-and-manage-pipelines/parent-child-pipelines" target="_blank" rel="noreferrer"><b>Parent-Child Pipelines Help Documentation</b>. </a>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Child Step Configuration"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}
export default React.memo(ChildStepConfigurationHelpDocumentation);