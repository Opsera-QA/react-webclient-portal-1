import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {faWandMagic} from "@fortawesome/pro-light-svg-icons";
import SfdcPipelineWizard from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import SalesforcePipelineWizardPreRunTaskScreen
  from "components/workflow/wizards/sfdc_pipeline_wizard/pre_run_tasks/SalesforcePipelineWizardPreRunTaskScreen";
import PipelineActions from "components/workflow/pipeline-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import { pipelineHelper } from "components/workflow/pipeline.helper";

export const PIPELINE_START_WIZARD_FLOWS = {
  PRE_RUN_TASK_SCREEN: "pre_run_task_screen",
  SALESFORCE_PIPELINE_WIZARD: "salesforce_pipeline_wizard",
};

export default function SalesforcePipelineWizardOverlay(
  {
    pipeline,
  }) {
  const [currentScreen, setCurrentScreen] = useState(PIPELINE_START_WIZARD_FLOWS.PRE_RUN_TASK_SCREEN);
  const [internalPipeline, setInternalPipeline] = useState(undefined);
  const {
    toastContext,
    getAccessToken,
    cancelTokenSource,
    isMounted
  } = useComponentStateReference();

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
        pipelineId={internalPipeline?._id}
        pipeline={internalPipeline}
        handlePipelineWizardRequest={startNewPipelineRun}
        handleClose={closePanel}
        pipelineOrientation={pipelineHelper.getPipelineOrientation(internalPipeline)}
      />
    );
  };

  const startNewPipelineRun = async (pipelineId) => {
    try {
      toastContext.showInformationToast("A request to start this pipeline from the start has been submitted.  Resetting pipeline status and then the pipeline will begin momentarily.", 20);
      await PipelineActions.triggerPipelineNewStartV2(getAccessToken, cancelTokenSource, pipelineId);
      closePanel();
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Salesforce Pipeline Wizard`}
      titleIcon={faWandMagic}
      showToasts={true}
      showCloseButton={false}
    >
      {getBody()}
    </FullScreenCenterOverlayContainer>
  );

}

SalesforcePipelineWizardOverlay.propTypes = {
  pipeline: PropTypes.object,
};