import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function ParallelProcessorStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}> A Parallel Processor pipeline step allows multiple pipelines to run within a parent pipeline. Include up to 5 pipeline executions inside a single step in the pipeline. Ensure the child pipelines are already configured and run successfully. For more detailed information on Parallel Processor Pipelines, view the <a href="https://docs.opsera.io/create-and-manage-pipelines/parent-child-pipelines" target="_blank" rel="noreferrer"><b>Parent-Child Pipelines Help Documentation</b>. </a>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Parallel Processor Step Configuration"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}
export default React.memo(ParallelProcessorStepConfigurationHelpDocumentation);