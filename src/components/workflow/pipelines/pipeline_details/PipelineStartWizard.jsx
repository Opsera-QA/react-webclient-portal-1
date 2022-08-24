import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {faWandMagic} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import ConfirmResumePipeline from "components/workflow/wizards/ConfirmResumePipeline";
import SfdcPipelineWizard from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import SalesforcePipelineWizardPreRunTaskScreen
  from "components/workflow/wizards/sfdc_pipeline_wizard/pre_run_tasks/SalesforcePipelineWizardPreRunTaskScreen";

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
    handleClose,
    handlePipelineWizardRequest,
  }) {
  const [currentScreen, setCurrentScreen] = useState(PIPELINE_START_WIZARD_FLOWS.PRE_RUN_TASK_SCREEN);
  const [internalPipeline, setInternalPipeline] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    if (pipeline) {
      setInternalPipeline({...pipeline});
    }
  }, [pipeline]);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (pipelineType !== "sfdc" && pipelineOrientation === "middle") {
      return (
        <ConfirmResumePipeline
          pipelineId={pipelineId}
          handlePipelineWizardRequest={handlePipelineWizardRequest}
        />
      );
    }

    if (pipelineType === "sfdc") {
      if (currentScreen === PIPELINE_START_WIZARD_FLOWS.PRE_RUN_TASK_SCREEN) {
        return (
          <SalesforcePipelineWizardPreRunTaskScreen
            setCurrentScreen={setCurrentScreen}
            pipeline={internalPipeline}
            setPipeline={setInternalPipeline}
            className={"m-3"}
          />
        );
      }

      return (
        <SfdcPipelineWizard
          pipelineId={pipelineId}
          pipeline={pipeline}
          handlePipelineWizardRequest={handlePipelineWizardRequest}
          handleClose={handleClose}
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
  handleClose: PropTypes.func,
};

export default PipelineStartWizard;