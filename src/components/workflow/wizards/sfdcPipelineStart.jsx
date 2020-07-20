import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { Button, OverlayTrigger, Popover, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepForward, faPlay, faSync, faSpinner, faStopCircle, faHistory, faPause, faFlag } from "@fortawesome/free-solid-svg-icons";

import "../workflows.css";


const SfdcPipelineStart = ({ pipelineId, handlePipelineWizardRequest }) => {
  const contextType = useContext(AuthContext);
  const [start, setStart] = useState(false);
  const [resume, setResume] = useState(false);

  //toto: This is where the SFDC work needs to happen
  

  useEffect(() => {
    setResume(false);
    setStart(false);
  }, []);

  return (    
    <div className="flex-container">
      <div className="flex-container-top"></div>
      <div className="flex-container-content">
        <div className="p-5">
          <div className="mb-4">This is where the pre-steps for running an SFDC Pipeline will load.
          </div>
          {/* <Button variant="success" className="mr-2" size="sm"
            onClick={() => {  setStart(true); handlePipelineWizardRequest(pipelineId, true); }}
            disabled={false}>
            {start ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : 
              <FontAwesomeIcon icon={faPlay} fixedWidth className="mr-1"/>}Start from Beginning</Button>

          <Button variant="primary" className="ml-2" size="sm"
            onClick={() => { setResume(true); handlePipelineWizardRequest(pipelineId, false);  }}
            disabled={false}>
            {resume ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : 
              <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1"/>}Resume Existing Run</Button> */}
        </div>
      </div>
      <div className="flex-container-bottom"></div>
    </div>    
  );
};


SfdcPipelineStart.propTypes = {
  pipelineId: PropTypes.string,
  handlePipelineWizardRequest: PropTypes.func
};

export default SfdcPipelineStart;