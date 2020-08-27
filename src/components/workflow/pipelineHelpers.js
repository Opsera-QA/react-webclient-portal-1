import { axiosApiService } from "api/apiService";

const pipelineHelpers = {};

pipelineHelpers.getPendingApprovalStep = (pipeline) => {
  if (pipeline && pipeline.workflow && pipeline.workflow.last_step && pipeline.workflow.last_step.running && pipeline.workflow.last_step.running.paused) {
    let step_id = pipeline.workflow.last_step.running.step_id;
    let stepArrayIndex = pipeline.workflow.plan.findIndex(x => x._id === step_id); 
    if (stepArrayIndex > -1 && pipeline.workflow.plan[stepArrayIndex].tool.tool_identifier === "approval") {
      return pipeline.workflow.plan[stepArrayIndex];
    } 
  } 
  return false;
};

pipelineHelpers.getPriorStepFrom = (pipeline, step) => {
  if (step) {
    let stepArrayIndex = pipeline.workflow.plan.findIndex(x => x._id === step._id); 
    if (stepArrayIndex > 0) {
      return pipeline.workflow.plan[stepArrayIndex-1];
    }
  }
};

pipelineHelpers.getStepIndex = (pipeline, stepId) => {
  if (stepId) {
    let stepArrayIndex = pipeline.workflow.plan.findIndex(x => x._id === stepId); 
    return stepArrayIndex;
  }
};


//TODO: Why doesn't this include "paused" and can I use it in PipelineActionControls?
pipelineHelpers.getPipelineStatus = (pipeline) => {
  if (pipeline) {
    const { workflow } = pipeline;
    if (workflow.last_step && workflow.last_step.success && workflow.last_step.success.step_id.length > 0) {
      return "success";
    } else if (workflow.last_step && workflow.last_step.failed && workflow.last_step.failed.step_id.length > 0) {
      return "failed";
    } else if (workflow.last_step && workflow.last_step.status === "running") {
      return "running";
    } else {
      return false; //idle or stopped state
    }
  }
};

// TODO: Move to general helper
pipelineHelpers.getUserNameById = async (userId, accessTokenFn) => {
  const accessToken = await accessTokenFn();
  let name = userId;
  const apiUrl =  `/users/user/${userId}`;
  try {
    const user = await axiosApiService(accessToken).get(apiUrl); 
    if (user.data && user.data.lastName) {
      name = user.data.firstName + " " + user.data.lastName;
    }     
  }
  catch (err) {
    console.log(err.message);       
  }
  
  return name;
};

pipelineHelpers.displayPipelineType = (typeArray) => {
  switch (typeArray[0]) {
    case "sfdc":
      return "SalesForce";
    case "ai-ml":
      return "Machine Learning (AI)";
    case "sdlc":
      return "Software Development";
    default:
      return "";
  }
};

pipelineHelpers.displayPipelineValueComponent = ({typeArray}) => {
  switch (typeArray[0]) {
    case "sfdc":
      return "SalesForce";
    case "ai-ml":
      return "Machine Learning (AI)";
    case "sdlc":
      return "Software Development";
    default:
      return "";
  }
};

pipelineHelpers.PIPELINE_TYPES = [
  { id: "", name: "No Value", groupId: "Pipeline Types" },
  { id: "sfdc", name: "SalesForce", groupId: "Pipeline Types" },
  { id: "sdlc", name: "Software Development", groupId: "Pipeline Types" },
  { id: "ai-ml", name: "Machine Learning (AI)", groupId: "Pipeline Types" },
];

export default pipelineHelpers;