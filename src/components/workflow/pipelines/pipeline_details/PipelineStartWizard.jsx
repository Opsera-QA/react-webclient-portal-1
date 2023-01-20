import React, {useContext} from "react";
import PropTypes from "prop-types";
import {faWandMagic} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import ConfirmResumePipeline from "components/workflow/wizards/ConfirmResumePipeline";
import SfdcPipelineWizard from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";

export const PIPELINE_START_WIZARD_FLOWS = {
  PRE_RUN_TASK_SCREEN: "pre_run_task_screen",
  SALESFORCE_PIPELINE_WIZARD: "salesforce_pipeline_wizard",
};

function PipelineStartWizard(
  {
    pipelineType,
    pipelineId,
    pipelineOrientation,
    pipeline,
    handlePipelineWizardRequest,
  }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (pipelineType !== "sfdc" && pipelineOrientation === "middle") {
      return (<ConfirmResumePipeline pipelineId={pipelineId} handlePipelineWizardRequest={handlePipelineWizardRequest} />);
    }

    if (pipelineType === "sfdc") {
      return (
        <SfdcPipelineWizard
          pipelineId={pipelineId}
          pipeline={pipeline}
          handlePipelineWizardRequest={handlePipelineWizardRequest}
          handleClose={closePanel}
          pipelineOrientation={pipelineOrientation}
        />
      );
    }
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Pipeline Start Wizard`}
      titleIcon={faWandMagic}
      showToasts={true}
      fullWidth={true}
      showCloseButton={false}
    >
      {getBody()}
    </FullScreenCenterOverlayContainer>
  );

}

PipelineStartWizard.propTypes = {
  pipelineType: PropTypes.string,
  pipelineId: PropTypes.string,
  pipeline: PropTypes.object,
  pipelineOrientation: PropTypes.string,
  handlePipelineWizardRequest: PropTypes.func,
};

export default PipelineStartWizard;