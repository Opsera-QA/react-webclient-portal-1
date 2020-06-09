const pipelineHelpers = {};

pipelineHelpers.getPendingApprovalStep = (pipeline) => {
  if (pipeline && pipeline.workflow && pipeline.workflow.last_step && pipeline.workflow.last_step.running && pipeline.workflow.last_step.running.paused) {
    let step_id = pipeline.workflow.last_step.running.step_id;
    let stepArrayIndex = pipeline.workflow.plan.findIndex(x => x._id === step_id); 
    if (stepArrayIndex > -1 && pipeline.workflow.plan[stepArrayIndex].tool.tool_identifier === "approval") {
      console.log(" THIS IS THE STEP!");
      return pipeline.workflow.plan[stepArrayIndex];
    } 
  } 
  return false;
};


export default pipelineHelpers;