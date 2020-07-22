import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SfdcPipelineComponents from "./sfdcPipelineComponents";
import SfdcPipelineModifiedFiles from "./sfdcPipelineModifiedFiles";
import ErrorDialog from "components/common/error";

const SfdcPipelineWizard = ({ pipelineId, pipelineSteps, handlePipelineWizardRequest, handleClose }) => {
  const [error, setError] = useState(false); 
  const [view, setView] = useState(1); 
  const [modifiedFiles, setModifiedFiles] = useState([]);//need to pass this up the chain
  const [stepId, setStepId] = useState("");
  const [sfdcComponentFilterObject, setSfdcComponentFilterObject] = useState({});
  //trigger create jenkins job up here since it needs ot get data from step one.

  useEffect(() => {
    loadSfdcInitStep(pipelineSteps);
  }, []);

  //must find step ID of the Sfdc Jenkins Config step (typically first step and has step.tool.job_type set to "sfdc-ant")
  const loadSfdcInitStep = async (steps)=> {
    let stepArrayIndex = steps.findIndex(x => (x.tool && x.tool.job_type === "sfdc-ant" && x.tool.tool_identifier === "jenkins")); 
    console.log(stepArrayIndex);
    if (stepArrayIndex === -1) {
      setError("Warning, this pipeline is missing the default SFDC Jenkins Step needed.  Please edit the workflow and add the SFDC Ant Job setting in order to run thsi pipeline.");
      
    } else {
      console.log("step ID: ", steps[stepArrayIndex]._id);
      setStepId(steps[stepArrayIndex]._id);
    }
  };

  const createJenkinsJob = async () => {
    //details here!
    console.log(sfdcComponentFilterObject);

    const postBody = {
      buildParams: {
        stepId: sfdcComponentFilterObject.stepId,
        lastCommitTimeStamp: sfdcComponentFilterObject.lastCommitTimeStamp,
        componentTypes: sfdcComponentFilterObject.componentTypes
      }
    };

    console.log(postBody);

    //create jenkins job

    //log create of jenkins job (check to see if API does it automatically)

    // log approval of this data to the pipeline Acitivity log as new activity type
    
    //trigger start of pipeline

    //close modal

  };

  if (error) {
    return (<div className="mt-5"><ErrorDialog error={error} /></div>);
  } else {
    return ( 
      <>  
        {view === 1 && 
          <SfdcPipelineComponents 
            pipelineId={pipelineId} 
            stepId={stepId} 
            handleClose={handleClose} 
            setView={setView} 
            setModifiedFiles={setModifiedFiles}
            setSfdcComponentFilterObject={setSfdcComponentFilterObject} />}

        {view === 2 && 
          <SfdcPipelineModifiedFiles 
            pipelineId={pipelineId} 
            stepId={stepId} 
            handleClose={handleClose} 
            setView={setView} 
            modifiedFiles={modifiedFiles} 
            createJenkinsJob={createJenkinsJob} />}
      </>
    );}
};

SfdcPipelineWizard.propTypes = {
  pipelineId: PropTypes.string,
  pipelineSteps: PropTypes.array,
  handlePipelineWizardRequest: PropTypes.func,
  handleClose: PropTypes.func
};

export default SfdcPipelineWizard;