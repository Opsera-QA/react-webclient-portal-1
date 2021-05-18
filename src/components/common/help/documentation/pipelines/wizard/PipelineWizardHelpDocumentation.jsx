import React from "react";
import RoleAccessEditorHelpOverlayContainer from "components/common/help/input/role_access_editor/RoleAccessEditorHelpOverlayContainer";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function PipelineWizardModifiedFilesHelpDocumentation() {
  return (
    <div className={"mt-2"}>
      <div className={"mb-2"}>
        <div><b>Pipeline Modified Files Selector</b></div>
        <div>Select which files will be modified using the Rule Filters.</div>
      </div>
    </div>
  );
}

export default React.memo(PipelineWizardModifiedFilesHelpDocumentation);