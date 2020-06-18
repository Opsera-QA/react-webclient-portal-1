import { axiosApiService } from "api/apiService";

const pipelineHelpers = {};

pipelineHelpers.getPendingApprovalStep = (pipeline) => {
  if (pipeline && pipeline.workflow && pipeline.workflow.last_step && pipeline.workflow.last_step.running && pipeline.workflow.last_step.running.paused) {
    let step_id = pipeline.workflow.last_step.running.step_id;
    let stepArrayIndex = pipeline.workflow.plan.findIndex(x => x._id === step_id); 
    //console.log("stepArrayIndex: ", stepArrayIndex);
    //console.log("pipeline.workflow.plan[stepArrayIndex].tool.tool_identifier: ", pipeline.workflow.plan[stepArrayIndex].tool.tool_identifier);
    if (stepArrayIndex > -1 && pipeline.workflow.plan[stepArrayIndex].tool.tool_identifier === "approval") {
      return pipeline.workflow.plan[stepArrayIndex];
    } 
  } 
  return false;
};

pipelineHelpers.getUserNameById = async (userId, accessTokenFn) => {
  const accessToken = await accessTokenFn();
  let name = userId;
  const apiUrl =  `/users/user/${userId}`;
  try {
    const user = await axiosApiService(accessToken).get(apiUrl); 
    if (user.data && user.data.lastName) {
      name = user.data.firstName + " " + user.data.lastName;
    }
    console.log("user: ", user);    
  }
  catch (err) {
    console.log(err.message);       
  }
  
  return name;
};



export default pipelineHelpers;