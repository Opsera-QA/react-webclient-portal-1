import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import SfdcPipelineComponents from "./sfdcPipelineComponents";
import SfdcPipelineModifiedFiles from "./sfdcPipelineModifiedFiles";
import ErrorDialog from "components/common/status_notifications/error";
import PipelineActions from "../pipeline-actions";

const SfdcPipelineWizard = ({ pipelineId, pipeline, handlePipelineWizardRequest, handleClose, refreshPipelineActivityData }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(false); 
  const [view, setView] = useState(1); 
  const [modifiedFiles, setModifiedFiles] = useState([]);
  const [stepId, setStepId] = useState("");
  const [stepToolConfigId, setStepToolConfigId] = useState("");
  const [stepIndex, setStepIndex] = useState();
  const [sfdcComponentFilterObject, setSfdcComponentFilterObject] = useState({});
  

  useEffect(() => {
    loadSfdcInitStep(pipeline.workflow.plan);
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
      setStepToolConfigId(steps[stepArrayIndex].tool.configuration.toolConfigId);
      setStepIndex(stepArrayIndex);
    }
  };

  const createJenkinsJob = async () => {
    const accessToken = await getAccessToken();   
    const apiUrl = `/pipelines/sfdc/set-jobs`

    const postBody = {
      jobId: "",
      pipelineId: pipelineId,
      stepId: stepId,
      buildParams: {
        stepId: sfdcComponentFilterObject.stepId,
        lastCommitTimeStamp: sfdcComponentFilterObject.lastCommitTimeStamp,
        componentTypes: JSON.stringify(sfdcComponentFilterObject.componentTypes),
        objectType: sfdcComponentFilterObject.objectType,
        retrieveFilesFromSFDC: sfdcComponentFilterObject.retrieveFilesFromSFDC,
        nameSpacePrefix: sfdcComponentFilterObject.nameSpacePrefix
      }
    };

    console.log(postBody);

    //create jenkins job and automate job creation/updation of validate and deploy jobs
    let createJobResponse;
    try {      
      createJobResponse = await axiosApiService(accessToken).post(apiUrl, postBody);
      console.log("createJobResponse: ", createJobResponse);      
    } catch (error) {
      console.log("Error posting to API: ", error);
      setError(error);
      createJobResponse = error;
    }

    if (createJobResponse && createJobResponse.data && createJobResponse.data.message === "success") {
    //trigger refresh of pipeline object!!!
    await refreshPipelineActivityData();

    //trigger start of pipeline & close modal
    await handlePipelineWizardRequest(pipelineId, true);
    }    
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
            handleClose={handleClose} 
            setView={setView} 
            modifiedFiles={modifiedFiles} 
            createJenkinsJob={createJenkinsJob} />}
      </>
    );}
};

SfdcPipelineWizard.propTypes = {
  pipelineId: PropTypes.string,
  pipeline: PropTypes.object,
  handlePipelineWizardRequest: PropTypes.func,
  handleClose: PropTypes.func,
  refreshPipelineActivityData: PropTypes.func
};

export default SfdcPipelineWizard;