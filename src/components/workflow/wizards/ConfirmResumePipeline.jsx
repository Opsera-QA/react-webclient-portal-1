import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {faPlay, faSpinner, faStepForward} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

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
            <IconBase icon={faPlay} className={"mr-1"} isLoading={start} />Start from Beginning</Button>

          <Button variant="primary" className="ml-2" size="sm"
                  onClick={() => { setResume(true); handlePipelineWizardRequest(pipelineId, false);  }}
                  disabled={false}>
            <IconBase icon={faStepForward} className={"mr-1"} isLoading={resume} />
            Resume Existing Run</Button>
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