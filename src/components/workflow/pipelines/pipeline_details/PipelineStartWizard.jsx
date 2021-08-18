import React, {useContext} from "react";
import PropTypes from "prop-types";
import {faWandMagic} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import ConfirmResumePipeline from "components/workflow/wizards/ConfirmResumePipeline";
import SfdcPipelineWizard from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";

function PipelineStartWizard( { pipelineType, pipelineId, pipelineOrientation, pipeline, handleClose, handlePipelineWizardRequest, refreshPipelineActivityData }) {
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
          handleClose={handleClose}
          refreshPipelineActivityData={refreshPipelineActivityData}
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
  handleClose: PropTypes.func,
  refreshPipelineActivityData: PropTypes.func
};

export default PipelineStartWizard;