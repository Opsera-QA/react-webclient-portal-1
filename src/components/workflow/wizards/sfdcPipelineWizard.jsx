import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import SfdcPipelineComponents from "./sfdcPipelineComponents";
import SfdcPipelineModifiedFiles from "./sfdcPipelineModifiedFiles";
import ErrorDialog from "components/common/error";

const SfdcPipelineWizard = ({ pipelineId, pipelineSteps, handlePipelineWizardRequest, handleClose }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(false); 
  const [view, setView] = useState(1); 
  const [modifiedFiles, setModifiedFiles] = useState([]);
  const [stepId, setStepId] = useState("");
  const [stepToolConfigId, setStepToolConfigId] = useState("");
  const [stepIndex, setStepIndex] = useState();
  const [sfdcComponentFilterObject, setSfdcComponentFilterObject] = useState({});
  

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
      setStepToolConfigId(steps[stepArrayIndex].tool.configuration.toolConfigId);
      setStepIndex(stepArrayIndex);
    }
  };

  const createJenkinsJob = async () => {
    const accessToken = await getAccessToken();
    console.log(sfdcComponentFilterObject);
    const apiUrl = `/registry/action/${stepToolConfigId}/createjob`;

    const postBody = {
      jobId: "",
      pipelineId: pipelineId,
      stepId: stepId,
      buildParams: {
        stepId: sfdcComponentFilterObject.stepId,
        lastCommitTimeStamp: sfdcComponentFilterObject.lastCommitTimeStamp,
        componentTypes: JSON.stringify(sfdcComponentFilterObject.componentTypes)
      }
    };

    console.log(postBody);

    //create jenkins job
    let createJobResponse;
    try {      
      createJobResponse = await axiosApiService(accessToken).post(apiUrl, postBody);
      console.log(createJobResponse);      
    } catch (error) {
      console.log("Error posting to API: ", error);
      setError(error);
    }

    //TODO: update pipeline step with job name retruend from this call



    //post to pipeline acitivty log: 
    const logPostBody = {
      step_id: stepId,
      run_count: null,
      step_index: stepIndex,
      tool_identifier: "sfdc-configurator",
      step_name: "SFDC Modified Files Review",
      step_configuration: postBody,
      api_response: createJobResponse,
      build_number: "",
      message: "Modified files approved for pipeline",
      status: "success",
      action: "approve files for processing",
    };

    const logApi = `/pipelines/${pipelineId}/activity`;
    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).post(logApi, logPostBody);
      console.log(response);      
    } catch (error) {
      console.log("Error posting to API: ", error);
      setError(error);
    }
    
    //trigger start of pipeline & close modal
    handlePipelineWizardRequest(pipelineId, true);


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
  pipelineSteps: PropTypes.array,
  handlePipelineWizardRequest: PropTypes.func,
  handleClose: PropTypes.func
};

export default SfdcPipelineWizard;