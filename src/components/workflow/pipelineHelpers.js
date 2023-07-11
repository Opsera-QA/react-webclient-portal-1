import {Popover} from "react-bootstrap";
import {faTimes} from "@fortawesome/pro-solid-svg-icons";
import {Link} from "react-router-dom";
import React from "react";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import IconBase from "components/common/icons/IconBase";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";

const pipelineHelpers = {};

pipelineHelpers.getStepIndexWithName = (pipeline, stepName) => {
  const plan = pipeline?.workflow?.plan;
  let stepArrayIndex;

  if (plan) {
    stepArrayIndex = pipeline.workflow.plan.findIndex(x => x.name?.toLowerCase() === stepName.toLowerCase());
  }

  return stepArrayIndex > -1 ? stepArrayIndex + 1 : "UNKNOWN";
};

pipelineHelpers.getToolIdentifierFromPlanForStepId = (plan, stepId) => {
  if (Array.isArray(plan) && isMongoDbId(stepId) === true) {
    const step = plan?.find((step) => step?._id === stepId);

    if (step) {
      return step?.tool?.tool_identifier;
    }
  }
};

pipelineHelpers.getToolIdentifierFromPipelineStep = (pipelineStep) => {
  return DataParsingHelper.parseNestedString(pipelineStep, "tool.tool_identifier");
};

pipelineHelpers.getPendingApprovalStep = (pipeline) => {
  if (pipeline?.workflow?.last_step?.running?.paused) {
    const step_id = pipeline?.workflow?.last_step?.running?.step_id;
    const stepArrayIndex = pipeline?.workflow?.plan?.findIndex(x => x._id === step_id);

    if (typeof stepArrayIndex !== "number" || stepArrayIndex === -1) {
      return false;
    }

    const pipelineStep = DataParsingHelper.parseObject(pipeline?.workflow?.plan[stepArrayIndex], {});
    const toolIdentifier = DataParsingHelper.parseNestedString(pipelineStep, "tool.tool_identifier");

    if ([toolIdentifierConstants.TOOL_IDENTIFIERS.APPROVAL, toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION, toolIdentifierConstants.TOOL_IDENTIFIERS.SERVICE_NOW].includes(toolIdentifier) === true) {
      return pipelineStep;
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
  return pipelineHelpers.getStepIndexFromPlan(
    DataParsingHelper.parseNestedArray(pipeline, "workflow.plan"),
    stepId,
  );
};

pipelineHelpers.getStepIndexFromPlan = (plan, stepId) => {
  const parsedStepId = DataParsingHelper.parseMongoDbId(stepId);
  const parsedPlan = DataParsingHelper.parseArray(plan);

  if (!parsedStepId || !parsedPlan) {
    return -1;
  }

  return parsedPlan.findIndex((pipelineStep) => pipelineStep?._id === stepId);
};

pipelineHelpers.getPendingApprovalStepToolIdentifier = (pipeline) => {
  const pipelineStatus = DataParsingHelper.parseNestedString(pipeline, "workflow.last_step.status");
  const isPipelinePaused = DataParsingHelper.parseNestedBoolean(pipeline, "workflow.last_step.running.paused");

  if (pipelineStatus === "stopped" && isPipelinePaused === true) {
    const pendingPipelineStepId = DataParsingHelper.safeObjectPropertyParser(pipeline, "workflow.last_step.running.step_id");

    if (DataParsingHelper.isValidMongoDbId(pendingPipelineStepId) === true) {
      const pendingStepIndex = pipelineHelpers.getStepIndex(pipeline, pendingPipelineStepId);

      if (pendingStepIndex > -1) {
        const pipelinePlan = DataParsingHelper.parseNestedArray(pipeline, "workflow.plan", []);
        const parsedPipelineStep = DataParsingHelper.parseObject(pipelinePlan[pendingStepIndex], {});
        return DataParsingHelper.parseNestedString(parsedPipelineStep, "tool.tool_identifier");
      }
    }
  }
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

    if (workflow.last_step?.status === "stopped"
      && (workflow.last_step?.running?.status === "pending" || workflow.last_step?.running?.paused === true) ) {
      return "paused";
    }

    if (workflow.last_step?.status === "stopped") {
      return "stopped";
    }

    return false; //idle or stopped state
  }
};

pipelineHelpers.displayPipelineType = (typeArray) => {
  switch (typeArray[0]) {
    case "sfdc":
      return "Salesforce";
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
      return "Salesforce";
    case "ai-ml":
      return "Machine Learning (AI)";
    case "sdlc":
      return "Software Development";
    default:
      return "";
  }
};

// TODO: Don't use. Use RoleRestricted input
pipelineHelpers.getRegistryPopover = (data) => {
  if (data) {
    return (
      <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
        <Popover.Title as="h3">
          Tool and Account Details
          <IconBase icon={faTimes} className={"ml-2 fa-pull-right pointer"} onClick={() => document.body.click()}/>
        </Popover.Title>

        <Popover.Content>
          <div className="text-muted mb-2">
            Configuration details for this item are listed below. Tool and account specific settings are stored in the
            <span> <Link to="/inventory/tools">Tool Registry</Link></span>. To add a new entry to a dropdown or update settings,
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
          <IconBase icon={faTimes} className={"fa-pull-right pointer"} onClickFunction={() => document.body.click()}/>
        </Popover.Title>
        <Popover.Content>
          <div className="text-muted mb-2">Please select any tool/account to get the details.</div>
        </Popover.Content>
      </Popover>
    );
  }
};

pipelineHelpers.formatStepOptions = (plan, stepId) => {
  let STEP_OPTIONS = plan.slice(
    0,
    plan.findIndex((element) => element._id === stepId),
  );
  // console.log(STEP_OPTIONS);
  return STEP_OPTIONS;
};

// TODO: Rework logs to store in a consistent manner for all flows
// Status and run api responses work a little differently. For status, there is a nested response inside api_response.
pipelineHelpers.parseSummaryLogApiResponseValue = (pipelineLogData, fieldName) => {
  try {
    const parsedLogData = dataParsingHelper.parseObject(pipelineLogData, false);

    if (!parsedLogData) {
      return undefined;
    }

    const apiResponse = dataParsingHelper.parseObject(pipelineLogData?.api_response);
    const innerApiResponse = dataParsingHelper.parseObject(pipelineLogData?.api_response?.apiResponse);

    if (innerApiResponse && innerApiResponse[fieldName]) {
      return innerApiResponse[fieldName];
    }

    return apiResponse[fieldName];
  }
  catch (error) {
    return undefined;
  }
};

// TODO: Rework logs to store in a consistent manner for all flows
pipelineHelpers.parseSummaryLogStepConfiguration = (pipelineLogData) => {
  try {
    const parsedLogData = dataParsingHelper.parseObject(pipelineLogData, false);

    if (!parsedLogData) {
      return undefined;
    }

    const internalStepConfiguration = pipelineHelpers.parseSummaryLogApiResponseValue(parsedLogData, "stepConfiguration");

    if (internalStepConfiguration) {
      return internalStepConfiguration;
    }

    return parsedLogData?.step_configuration?.tool?.configuration;
  }
  catch (error) {
    return undefined;
  }
};

pipelineHelpers.getFilteredPreviousSteps = (plan, stepId, toolIdentifiers) => {
  if (plan && stepId) {
    const pipelineSteps = pipelineHelpers.formatStepOptions(plan, stepId);
    return pipelineSteps.filter(step => toolIdentifiers.includes(step?.tool?.tool_identifier));    
  }
  return [];
};

export default pipelineHelpers;
