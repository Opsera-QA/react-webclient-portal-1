import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, OverlayTrigger, Popover, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepForward, faPlay, faSpinner } from "@fortawesome/pro-light-svg-icons";
import SfdcPipelineWizard from "components/workflow/wizards/sfdc_pipeline_wizard/sfdcPipelineWizard";

function PipelineStartWizard( { pipelineType, pipelineId, pipelineOrientation, pipeline, handleClose, handlePipelineWizardRequest, refreshPipelineActivityData }) {

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
       Warning! Closing this window will prevent the pipeline from starting.
      </Popover.Content>
    </Popover>
  );

  const getBody = () => {
    if (pipelineType !== "sfdc" && pipelineOrientation === "middle") {
      return (<ConfirmResumePipeline pipelineId={pipelineId} handlePipelineWizardRequest={handlePipelineWizardRequest} />);
    }

    if (pipelineType === "sfdc") {
      return (
      <div>
        {pipelineOrientation === "middle"
        && <div className="info-text mt-3 pl-4">Warning!  This pipeline is in the middle of running.  If you proceed, this will cancel the running job and start the pipeline over.</div>}
        <SfdcPipelineWizard pipelineId={pipelineId} pipeline={pipeline} handlePipelineWizardRequest={handlePipelineWizardRequest} handleClose={handleClose} refreshPipelineActivityData={refreshPipelineActivityData} />
      </div>
      );
    }
  };

  return (
    <Modal size={"xl"} show={true} onHide={handleClose} className={"pipeline-start-wizard-modal"} id="pipelineWizardModal" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Pipeline Start Wizard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getBody()}
      </Modal.Body>
      <Modal.Footer>
        <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={popover}>
          <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
        </OverlayTrigger>
      </Modal.Footer>
    </Modal>
  );

}




const ConfirmResumePipeline = ({ pipelineId, handlePipelineWizardRequest }) => {
  const [start, setStart] = useState(false);
  const [resume, setResume] = useState(false);
  

  useEffect(() => {
    setResume(false);
    setStart(false);
  }, []);

  return (    
    <div className="flex-container">
      <div className="flex-container-top"></div>
      <div className="flex-container-content">
        <div className="p-5">
          <div className="mb-4">The requested pipeline stopped before it reached the end of its run.  This 
        may have happened due to a failed step or other error. Please review the pipeline logs if necessary.  
        Would you like to restart this pipeline from the beginning 
          or attempt to resume from the last stopped step?
          </div>
          <Button variant="success" className="mr-2" size="sm"
            onClick={() => {  setStart(true); handlePipelineWizardRequest(pipelineId, true); }}
            disabled={false}>
            {start ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : 
              <FontAwesomeIcon icon={faPlay} fixedWidth className="mr-1"/>}Start from Beginning</Button>

          <Button variant="primary" className="ml-2" size="sm"
            onClick={() => { setResume(true); handlePipelineWizardRequest(pipelineId, false);  }}
            disabled={false}>
            {resume ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : 
              <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1"/>}Resume Existing Run</Button>
        </div>
      </div>
      <div className="flex-container-bottom"></div>
    </div>    
  );
};

ConfirmResumePipeline.propTypes = {
  pipelineId: PropTypes.string,
  handlePipelineWizardRequest: PropTypes.func
};

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