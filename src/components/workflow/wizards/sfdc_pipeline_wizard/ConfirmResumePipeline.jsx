import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faSpinner, faStepForward} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

// TODO: Refactor. I just pulled this into its own component
const ConfirmResumePipeline = ({ pipelineId, handlePipelineWizardRequest }) => {
  const [start, setStart] = useState(false);
  const [resume, setResume] = useState(false);

  useEffect(() => {
    setResume(false);
    setStart(false);
  }, []);

  return (
    <div className="flex-container">
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
      <div className="flex-container-bottom" />
    </div>
  );
};

ConfirmResumePipeline.propTypes = {
  pipelineId: PropTypes.string,
  handlePipelineWizardRequest: PropTypes.func
};

export default ConfirmResumePipeline;