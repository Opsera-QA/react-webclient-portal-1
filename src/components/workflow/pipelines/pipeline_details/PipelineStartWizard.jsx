import React, {useContext} from "react";
import PropTypes from "prop-types";
import {faWandMagic} from "@fortawesome/pro-light-svg-icons";
import SfdcPipelineWizard from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import ConfirmResumePipeline from "components/workflow/wizards/sfdc_pipeline_wizard/ConfirmResumePipeline";

function PipelineStartWizard( { pipelineType, pipelineId, pipelineOrientation, pipeline, handleClose, handlePipelineWizardRequest, refreshPipelineActivityData }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getWarningMessage = () => {
    if (pipelineOrientation === "middle") {
      return (
        <div className="info-text pl-4">
          Warning!  This pipeline is in the middle of running.  If you proceed, this will cancel the running job and start the pipeline over.
        </div>
      );
    }
  };

  const getBody = () => {
    if (pipelineType !== "sfdc" && pipelineOrientation === "middle") {
      return (<ConfirmResumePipeline pipelineId={pipelineId} handlePipelineWizardRequest={handlePipelineWizardRequest} />);
    }

    if (pipelineType === "sfdc") {
      return (
      <div>
        {getWarningMessage()}
        <SfdcPipelineWizard
          pipelineId={pipelineId}
          pipeline={pipeline}
          handlePipelineWizardRequest={handlePipelineWizardRequest}
          handleClose={handleClose}
          refreshPipelineActivityData={refreshPipelineActivityData}
        />
      </div>
      );
    }
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Pipeline Start Wizard`}
      titleIcon={faWandMagic}
      showToasts={true}
      fullWidth={true}
    >
      {getBody()}
    </CenterOverlayContainer>
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