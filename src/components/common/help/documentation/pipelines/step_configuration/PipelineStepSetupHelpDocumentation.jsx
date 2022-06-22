import React, { useContext } from "react";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {DialogToastContext} from "contexts/DialogToastContext";

function PipelineStepSetupHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
      return (
        <div>
          <div className={"ml-2 mb-2"}>This is the initial <b>Step Setup</b>.
            This setup defines the tool associated with the step. Each step is unique based on the tool it is orchestrating.
            It requires unique settings and configurations typically defined in the Tool Registry.
            A pipeline relies on settings in Tool Registry, Script Library and Custom Parameters to bring together the necessary functionality per tool.
            Once this form is saved, selections can be configured in <b>Step Configuration</b>.
            Please ensure you understand the overall needs of the selected tool before attempting to configure a step.
          </div>
          <div>
            <ul style={{listStyleType: "none"}}>
              <li><b>Step Enabled</b> - The toggle determines if the step will run during normal pipeline operations.  If the toggle is disabled, the step will be skipped during the pipeline run. This is a way to turn the step on or off in the workflow without having to delete and recreate it.</li>
              <li><b>Step Name</b> and <b>Tool</b> - These will be displayed in log data. Note: These selections cannot be changed after this form is saved. To change these selections, delete the step and create a new one.</li>
              <li><b>Tags</b> - Used for analytics and data archiving purposes.  Applying tags at this level will associate the tag with the specific step in this pipeline allowing for more targeted analytics and insights. </li>
            </ul>
            </div>
          <div className={"ml-4"}>
            <b>Note</b>: Tags are not regressive in nature. If a tag is applied after the pipeline has already run multiple times, tag data will ONLY apply for future runs. Prior log data will not be associated with the tag.  The same applies if the tag is removed.  Data with the tag already associated is not changed in any way.
          </div>
        </div>
      );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpDocumentation={getHelpDocumentation()}
      helpTopic={"Step Setup"}
    />
  );
}

export default React.memo(PipelineStepSetupHelpDocumentation);