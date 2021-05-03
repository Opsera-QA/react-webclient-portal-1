import {axiosApiService} from "api/apiService";
import {Popover} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import React from "react";

const pipelineHelpers = {};

pipelineHelpers.getStepIndexWithName = (pipeline, stepName) => {
  const plan = pipeline?.workflow?.plan;
  let stepArrayIndex;

  if (plan) {
    stepArrayIndex = pipeline.workflow.plan.findIndex(x => x.name?.toLowerCase() === stepName.toLowerCase());
  }

  return stepArrayIndex > -1 ? stepArrayIndex + 1 : "UNKNOWN";
};


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


pipelineHelpers.getChildPipelinesFromParent = (pipeline) => {
  if (pipeline && pipeline.workflow && pipeline.workflow.plan) {
    const { plan } = pipeline.workflow;
    let childPipelines = [];

    for (const item of plan) {
      if (item.tool.tool_identifier === "parallel-processor" || item.tool.tool_identifier === "child-pipeline") {
        const { configuration } = item.tool;
        if (configuration.pipelineId) {
          childPipelines.push(configuration.pipelineId);
        }

        if (configuration.pipelines) {
          childPipelines = childPipelines.concat(configuration.pipelines);
        }
      }
    }
    return childPipelines;
  }
  return false;
};


pipelineHelpers.getPriorStepFrom = (pipeline, step) => {
  if (step) {
    let stepArrayIndex = pipeline.workflow.plan.findIndex(x => x._id === step._id);
    if (stepArrayIndex > 0) {
      return pipeline.workflow.plan[stepArrayIndex - 1];
    }
  }
};

pipelineHelpers.getNextStepFrom = (pipeline, step) => {
  if (step) {
    let stepArrayIndex = pipeline.workflow.plan.findIndex(x => x._id === step._id);
    if (stepArrayIndex > 0) {
      return pipeline.workflow.plan[stepArrayIndex + 1];
    }
  }
};

pipelineHelpers.getStepIndex = (pipeline, stepId) => {
  if (stepId) {
    let stepArrayIndex = pipeline.workflow.plan.findIndex(x => x._id === stepId);
    return stepArrayIndex;
  }
};

pipelineHelpers.getStepIndexFromPlan = (plan, stepId) => {
  if (stepId && plan) {
    return plan.findIndex(step => step._id === stepId);
  }

  return -1;
};

pipelineHelpers.getPipelineStatus = (pipeline) => {
  if (pipeline) {
    const { workflow } = pipeline;

    if (workflow.last_step?.success?.step_id) {
      return "success";
    }

    if (workflow.last_step?.failed?.step_id) {
      return "failed";
    }

    if (workflow.last_step?.status === "running") {
      return "running";
    }

    if (workflow.last_step?.status === "stopped" && workflow.last_step?.running?.status === "pending") {
      return "paused";
    }

    return false; //idle or stopped state
  }
};

// TODO: Move to general helper
pipelineHelpers.getUserNameById = async (userId, accessTokenFn) => {
  const accessToken = await accessTokenFn();
  let name = userId;
  const apiUrl = `/users/user/${userId}`;
  try {
    const user = await axiosApiService(accessToken).get(apiUrl);
    if (user.data && user.data.lastName) {
      name = user.data.firstName + " " + user.data.lastName;
    }
  } catch (err) {
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

pipelineHelpers.displayPipelineValueComponent = ({ typeArray }) => {
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

pipelineHelpers.getRegistryPopover = (data) => {
  if (data) {
    return (
      <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
        <Popover.Title as="h3">
          Tool and Account Details{" "}
          <FontAwesomeIcon icon={faTimes} className="fa-pull-right pointer" onClick={() => document.body.click()}/>
        </Popover.Title>

        <Popover.Content>
          <div className="text-muted mb-2">
            Configuration details for this item are listed below. Tool and account specific settings are stored in the
            <Link to="/inventory/tools">Tool Registry</Link>. To add a new entry to a dropdown or update settings,
            make those changes there.
          </div>
          {data.configuration && (
            <>
              {Object.entries(data.configuration).map(function(a) {
                return (
                  <div key={a}>
                    {a[1].length > 0 && (
                      <>
                        <span className="text-muted pr-1">{a[0]}: </span> {a[1]}
                      </>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </Popover.Content>
      </Popover>
    );
  } else {
    return (
      <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
        <Popover.Title as="h3">
          Tool and Account Details{" "}
          <FontAwesomeIcon icon={faTimes} className="fa-pull-right pointer" onClick={() => document.body.click()}/>
        </Popover.Title>
        <Popover.Content>
          <div className="text-muted mb-2">Please select any tool/account to get the details.</div>
        </Popover.Content>
      </Popover>
    );
  }
};

pipelineHelpers.PIPELINE_TYPES = [
  { id: "", name: "No Value", groupId: "Pipeline Types" },
  { id: "sfdc", name: "SalesForce", groupId: "Pipeline Types" },
  { id: "sdlc", name: "Software Development", groupId: "Pipeline Types" },
  { id: "ai-ml", name: "Machine Learning (AI)", groupId: "Pipeline Types" },
];

pipelineHelpers.PIPELINE_TYPES_ = [
  { value: "sfdc", text: "SalesForce", groupId: "Pipeline Types" },
  { value: "sdlc", text: "Software Development", groupId: "Pipeline Types" },
  { value: "ai-ml", text: "Machine Learning (AI)", groupId: "Pipeline Types" },
];

pipelineHelpers.formatStepOptions = (plan, stepId) => {
  let STEP_OPTIONS = plan.slice(
    0,
    plan.findIndex((element) => element._id === stepId),
  );
  STEP_OPTIONS.unshift({ _id: "", name: "Select One", isDisabled: "yes" });
  console.log(STEP_OPTIONS);
  return STEP_OPTIONS;
};

export default pipelineHelpers;