import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {pipelineValidationHelper} from "components/workflow/pipelines/helpers/pipelineValidation.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import PipelineStepEditorOverlay from "components/workflow/plan/step/PipelineStepEditorOverlay";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PipelineStepWorkflowItemBody
  from "components/workflow/pipelines/pipeline_details/workflow/item/PipelineStepWorkflowItemBody";
import PipelineStepActivityLogOverlay
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineStepActivityLogOverlay";
import AccessDeniedOverlayBase from "components/common/overlays/center/denied/AccessDeniedOverlayBase";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import LoadingIcon from "components/common/icons/LoadingIcon";
import PipelineStepCardBottomActionBar
  from "components/workflow/pipelines/pipeline_details/workflow/item/PipelineStepCardBottomActionBar";
import PipelineStepCardHeader
  from "components/workflow/pipelines/pipeline_details/workflow/item/PipelineStepCardHeader";
import PipelineStepIcon from "components/common/icons/pipelines/steps/PipelineStepIcon";

const PipelineWorkflowItem = (
  {
    pipeline,
    plan,
    item,
    index,
    lastStep,
    pipelineId,
    editWorkflow,
    parentCallbackEditItem,
    parentWorkflowStatus,
    toolIdentifier,
    loadPipeline,
  }) => {
  const [currentStatus, setCurrentStatus] = useState({});
  const [itemState, setItemState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [runCountState, setRunCountState] = useState(undefined);
  const {
    toastContext,
    userData,
  } = useComponentStateReference();
  const isToolSet = DataParsingHelper.parseNestedString(item, "tool.tool_identifier", false) !== false;

  useEffect(() => {
    loadFormData(item, lastStep, index, plan).catch(error => {
      throw error;
    });

    setRunCountState(DataParsingHelper.parseNestedInteger(pipeline, "workflow.run_count", 0));
  }, [JSON.stringify(item), lastStep, JSON.stringify(pipeline.workflow)]);


  const loadFormData = async (item, lastStep, index, plan) => {
    setCurrentStatus({});
    setItemState("");

    // TOOD: We should make a helper function to handle this
    if (item !== undefined) {
      if (!pipelineValidationHelper.isPipelineStepToolValid(item.tool)) {
        setItemState("warning");
      }

      const lastStepSuccess = DataParsingHelper.parseNestedObject(lastStep, "success");

      if (lastStepSuccess) {
        const stepArrayIndex = pipelineHelper.getStepIndexFromPlan(plan, lastStepSuccess?.step_id);
        if (index === stepArrayIndex) {  //current step is successful, so it's completed
          setCurrentStatus(lastStepSuccess);
          setItemState("completed");
        }
      }

      const lastStepRunning = DataParsingHelper.parseNestedObject(lastStep, "running");

      if (lastStepRunning) {
        const stepArrayIndex = pipelineHelper.getStepIndexFromPlan(plan, lastStepRunning?.step_id);

        if (index === stepArrayIndex) {  //current step is running, so it's completed
          setCurrentStatus(lastStepRunning);

          if (lastStepRunning.paused) {
            setItemState("paused");
          } else if (lastStepRunning.status === "stopped") {
            setItemState("stopped");
          } else {
            setItemState("running");
          }
        }
      }

      const lastStepFailed = DataParsingHelper.parseNestedObject(lastStep, "failed");

      if (lastStepFailed) {
        const stepArrayIndex = pipelineHelper.getStepIndexFromPlan(plan, lastStepFailed?.step_id);

        if (index === stepArrayIndex) {  //current step is failed, so it's completed
          setCurrentStatus(lastStepFailed);
          setItemState("failed");
        }
      }
    }
  };

  const handleViewStepActivityLogClick = async (pipelineId, toolIdentifier, itemId, activityId) => {
    setIsLoading(true);
    toastContext.showOverlayPanel(
      <PipelineStepActivityLogOverlay
        pipelineId={pipelineId}
        stepId={itemId}
        tool={toolIdentifier}
        activityId={activityId}
      />
    );
    setIsLoading(false);
  };

  const handleEditClick = async (type, tool, itemId, pipelineStep) => {
    try {
      setIsLoading(true);
      if (PipelineRoleHelper.canUpdatePipelineStepDetails(userData, pipeline) !== true) {
        toastContext.showOverlayPanel(
          <AccessDeniedOverlayBase>
            Editing step settings is not allowed. This action requires elevated privileges.
          </AccessDeniedOverlayBase>
        );
        return;
      }

      const toolIdentifier = tool?.tool_identifier;

      if (hasStringValue(toolIdentifier) === true) {
        const newOverlayToolIdentifiers = [
          toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_REST_API_INTEGRATION,
          toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_SCRIPTS,
          toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION,
          toolIdentifierConstants.TOOL_IDENTIFIERS.COMMAND_LINE,
          toolIdentifierConstants.TOOL_IDENTIFIERS.DOCKER_CLI,
        ];

        if (newOverlayToolIdentifiers.includes(toolIdentifier) === true && type === "tool") {
          toastContext.showOverlayPanel(
            <PipelineStepEditorOverlay
              pipeline={pipeline}
              pipelineStep={pipelineStep}
              loadPipeline={loadPipeline}
            />
          );
        } else {
          await parentCallbackEditItem({type: type, tool_name: tool.tool_identifier, step_id: itemId});
        }
      } else {

        if (PipelineRoleHelper.canModifyPipelineWorkflowStructure(userData, pipeline) !== true) {
          toastContext.showOverlayPanel(
            <AccessDeniedOverlayBase>
              Editing pipeline workflow structure is not allowed for this unconfigured step. This action requires
              elevated privileges. The Pipeline Step needs to have its tool set by someone with sufficient access.
            </AccessDeniedOverlayBase>
          );
          return;
        }
        await parentCallbackEditItem({type: "step", tool_name: "", step_id: itemId});
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!DataParsingHelper.parseMongoDbId(item?._id)) {
    return (
      <div className={"workflow-module-container-height"}>
        <div className={"title-text-6 upper-case-first ml-1 mt-1 d-flex"}>
          <div className={"text-muted mr-1"}>
            <LoadingIcon className={"mr-2"}/>
            Initializing Step
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={"workflow-module-container-height pt-2 px-2 pb-1"}>
        <div className={"d-flex w-100 mx-1"}>
          <div className={"icon-card-title force-text-wrap"}>
            {DataParsingHelper.parseNestedString(item, "name", "Un-configured Step")}
            <PipelineStepWorkflowItemBody
              pipeline={pipeline}
              step={item}
              loadPipeline={loadPipeline}
              toolIdentifier={toolIdentifier}
            />
          </div>
          <div className={"ml-auto"}>
            <PipelineStepIcon
              pipelineStep={item}
              className={"ml-2"}
            />
          </div>
        </div>
        <div
          className={"w-100 d-flex justify-content-between pt-2"}
          style={{
            height: "30px",
          }}
        >
          <div>
            <PipelineStepCardBottomActionBar
              pipeline={pipeline}
              pipelineId={pipelineId}
              step={item}
              loadPipeline={loadPipeline}
              toolIdentifier={toolIdentifier}
              handleEditClick={handleEditClick}
              isEditingWorkflow={editWorkflow}
              handleViewStepActivityLogClick={handleViewStepActivityLogClick}
              isToolSet={isToolSet}
              itemState={itemState}
              parentWorkflowStatus={parentWorkflowStatus}
              runCount={runCountState}
            />
          </div>
          <div>
            <PipelineStepCardHeader
              pipeline={pipeline}
              pipelineStepId={item?._id}
              itemState={itemState}
              loadPipeline={loadPipeline}
              isToolSet={isToolSet}
              isLoading={isLoading}
              handleEditClick={handleEditClick}
              isEditingWorkflow={editWorkflow}
              handleViewStepActivityLogClick={handleViewStepActivityLogClick}
              pipelineId={pipelineId}
              pipelineStep={item}
              currentStatus={currentStatus}
            />
          </div>
        </div>
      </div>
    </>
  );
};

PipelineWorkflowItem.propTypes = {
  pipeline: PropTypes.object,
  plan: PropTypes.array,
  item: PropTypes.object,
  index: PropTypes.number,
  lastStep: PropTypes.object,
  pipelineId: PropTypes.string,
  editWorkflow: PropTypes.bool,
  parentCallbackEditItem: PropTypes.func,
  handleViewSourceActivityLog: PropTypes.func,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  toolIdentifier: PropTypes.object,
  loadPipeline: PropTypes.func,
};

export default PipelineWorkflowItem;