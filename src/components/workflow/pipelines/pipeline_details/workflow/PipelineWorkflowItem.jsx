import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  faCog,
  faArchive,
  faPen,
  faSpinner,
  faCheckCircle,
  faTimesCircle,
  faTerminal, faOctagon,
} from "@fortawesome/pro-light-svg-icons";
import StepToolActivityView from "./step_configuration/StepToolActivityView";
import StepToolHelpIcon from "components/workflow/pipelines/pipeline_details/workflow/StepToolHelpIcon";
import { pipelineValidationHelper } from "components/workflow/pipelines/helpers/pipelineValidation.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import IconBase from "components/common/icons/IconBase";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import PipelineStepEditorOverlay from "components/workflow/plan/step/PipelineStepEditorOverlay";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PipelineStepWorkflowItemBody
  from "components/workflow/pipelines/pipeline_details/workflow/item/PipelineStepWorkflowItemBody";
import PipelineStepWorkflowItemViewSettingsButton
  from "components/workflow/pipelines/pipeline_details/workflow/item/button/PipelineStepWorkflowItemViewSettingsButton";
import PipelineStepActivityLogOverlay
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineStepActivityLogOverlay";
import PipelineStepWorkflowItemEditNotificationSettingsButton
  from "components/workflow/pipelines/pipeline_details/workflow/item/button/PipelineStepWorkflowItemEditNotificationSettingsButton";
import AccessDeniedOverlayBase from "components/common/overlays/center/denied/AccessDeniedOverlayBase";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import PipelineStepWorkflowStepDeleteStepButton
  from "components/workflow/pipelines/pipeline_details/workflow/item/button/PipelineStepWorkflowStepDeleteStepButton";
import PipelineStepWorkflowStepDisabledStepIcon
  from "components/workflow/pipelines/pipeline_details/workflow/item/icon/PipelineStepWorkflowStepDisabledStepIcon";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import PipelineWorkflowStepIncompleteStepIcon
  from "components/workflow/pipelines/pipeline_details/workflow/item/icon/PipelineWorkflowStepIncompleteStepIcon";
import PipelineStepWorkflowStepAwaitingApprovalStepIcon
  from "components/workflow/pipelines/pipeline_details/workflow/item/icon/PipelineStepWorkflowStepAwaitingApprovalStepIcon";
import LoadingIcon from "components/common/icons/LoadingIcon";

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
  const [showToolActivity, setShowToolActivity] = useState(false);
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

  const getBottomActionBarButtons = () => {
    if (!editWorkflow) {
      return (
      <div className={"ml-auto d-flex"}>
        {isToolSet === true &&
          <>
            <PipelineStepWorkflowItemViewSettingsButton
              editingWorkflow={editWorkflow}
              pipeline={pipeline}
              step={item}
            />
            {itemState !== "running" ? //if THIS step is running
              <>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "View Step Activity Logs" })}>
                  <div>
                    <IconBase icon={faArchive}
                              className={"text-muted mx-1 pointer"}
                              onClickFunction={() => {
                                handleViewStepActivityLogClick(pipelineId, item.tool.tool_identifier, item._id);
                              }} />
                  </div>
                </OverlayTrigger>
              </>
              :
              <>
                {toolIdentifier?.properties && toolIdentifier?.properties?.isLiveStream && <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "View Running Tool Activity (if available)" })}>
                  <div>
                    <IconBase icon={faTerminal}
                              className={"green mx-1 pointer"}
                              onClickFunction={() => {
                                setShowToolActivity(true);
                              }} />
                  </div>
                </OverlayTrigger>}
              </>}

            <PipelineStepWorkflowItemEditNotificationSettingsButton
              pipeline={pipeline}
              step={item}
              editingWorkflow={editWorkflow}
              pipelineStatus={parentWorkflowStatus}
            />
          </>}
        {parentWorkflowStatus !== "running" && parentWorkflowStatus !== "paused" ? //if the overall pipeline is in a running/locked state
          <>
            <OverlayTrigger
              placement="top"
              delay={{show: 250, hide: 400}}
              overlay={renderTooltip({message: "Configure Step Settings"})}>
              <div>
                <IconBase icon={faCog}
                          className={"text-muted mx-1 pointer"}
                          onClickFunction={() => {
                            handleEditClick("tool", item.tool, item._id, item);
                          }}
                />
              </div>
            </OverlayTrigger>
          </>
          :
          <>
            <OverlayTrigger
              placement="top"
              delay={{show: 250, hide: 400}}
              overlay={renderTooltip({message: "Cannot access settings while pipeline is running"})}>
              <div>
                <IconBase icon={faCog}
                          className={"text-muted mx-1"}/>
              </div>
            </OverlayTrigger>
          </>}
      </div>
      );
    }
  };

  // TODO: Make separate component
  const getStepDefinitionEditButton = () => {
    const mongoDbId = DataParsingHelper.parseMongoDbId(item?._id);

    if (mongoDbId && (editWorkflow || !isToolSet)) {
      return (
        <OverlayIconBase
          icon={faPen}
          className={"text-muted ml-2"}
          overlayBody={"Step Setup"}
          onClickFunction={() =>  handleEditClick("step", item.tool, item._id, item)}
        />
      );
    }
  };

  if (!DataParsingHelper.parseMongoDbId(item?._id)) {
    return (
      <div className="workflow-module-container-height">
        <div className="title-text-6 upper-case-first ml-1 mt-1 d-flex">
          <div className="text-muted mr-1">
            <LoadingIcon className={"mr-2"} />
            Initializing Step
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="workflow-module-container-height">
        <div className="title-text-6 upper-case-first ml-1 mt-1 d-flex">
          <div className="text-muted mr-1">{item.name || "Un-configured Step"}</div>

          <div className={"ml-auto d-flex"}>
            <div className={"ml-auto d-flex mr-1"}>
              <IconBase
                isLoading={isLoading}
                className={"green"}
              />

              {isToolSet && !editWorkflow && !isLoading &&
              <>
                {itemState === "failed" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "View Errors" })}>
                  <div>
                    <IconBase icon={faTimesCircle} className={"ml-2 red pointer"}
                              onClickFunction={() => {
                                handleViewStepActivityLogClick(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id);
                              }} />
                  </div>
                </OverlayTrigger>}

                {itemState === "stopped" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "The last run of this pipeline was stopped while this step was running." })}>
                  <div>
                    <IconBase icon={faOctagon} className={"ml-2 danger-red"}
                              iconStyling={{ cursor: "help" }}
                    />
                  </div>
                </OverlayTrigger>}

                {itemState === "completed" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "View last completed log" })}>
                  <div>
                    <IconBase icon={faCheckCircle} className={"ml-2 green pointer"}
                              onClickFunction={() => {
                                handleViewStepActivityLogClick(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id);
                              }} />
                  </div>
                </OverlayTrigger>}

                {itemState === "running" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "View running step configuration" })}>
                  <div>
                  <IconBase icon={faSpinner} className={"ml-2 green pointer"}
                                   spinIcon={true}
                                   onClickFunction={() => {
                                     handleViewStepActivityLogClick(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id);
                                   }} />

                  </div>
                </OverlayTrigger>}
                <PipelineStepWorkflowStepAwaitingApprovalStepIcon
                  pipelineStepState={itemState}
                  className={"ml-2 red"}
                />
                <PipelineWorkflowStepIncompleteStepIcon
                  className={"ml-2 yellow"}
                  pipelineStep={item}
                />
                <PipelineStepWorkflowStepDisabledStepIcon
                  pipelineStep={item}
                  className={"ml-2 dark-grey"}
                />
              </>
              }

              <PipelineStepWorkflowStepDeleteStepButton
                pipeline={pipeline}
                pipelineStep={item}
                className={"ml-2"}
                inWorkflowEditMode={editWorkflow}
                loadPipelineFunction={loadPipeline}
              />
              {getStepDefinitionEditButton()}
              <StepToolHelpIcon
                iconClassName={"mb-1"}
                className={"ml-2"}
                tool={item?.tool?.tool_identifier}
              />
            </div>
          </div>
        </div>

        <PipelineStepWorkflowItemBody
          pipeline={pipeline}
          step={item}
          loadPipeline={loadPipeline}
          toolIdentifier={toolIdentifier}
        />
        <div
          className={"ml-auto mt-auto pt-2 "}
          style={{
            height: "30px",
          }}
        >
          <div className={"ml-auto d-flex"}>
            {getBottomActionBarButtons()}
          </div>
        </div>
      </div>

      {showToolActivity && <StepToolActivityView pipelineId={pipelineId}
                                                 stepId={item._id}
                                                 itemState={itemState}
                                                 runCount={runCountState}
                                                 tool_identifier={item.tool.tool_identifier}
                                                 handleClose={() => setShowToolActivity(false)} />}
    </>
  );
};


function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}

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