import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Modal from "components/common/modal/modal";
import {
  faCog,
  faArchive,
  faFlag,
  faPen,
  faExclamationTriangle,
  faSpinner,
  faCheckCircle,
  faTimesCircle,
  faTrash,
  faBan,
  faTerminal, faOctagon,
} from "@fortawesome/pro-light-svg-icons";
import ModalActivityLogs from "components/common/modal/modalActivityLogs";
import StepToolActivityView from "./step_configuration/StepToolActivityView";
import pipelineActions from "components/workflow/pipeline-actions";
import StepToolHelpIcon from "components/workflow/pipelines/pipeline_details/workflow/StepToolHelpIcon";
import { pipelineValidationHelper } from "components/workflow/pipelines/helpers/pipelineValidation.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";
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
import InfoOverlayBase from "components/common/overlays/info/InfoOverlayBase";

const jenkinsTools = ["jmeter", "command-line", "cypress", "junit", "jenkins", "s3", "selenium", "sonar", "teamcity", "twistlock", "xunit", "docker-push", "anchore-scan", "dotnet", "nunit"];

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
    deleteStep,
    parentWorkflowStatus,
    toolIdentifier,
    loadPipeline,
  }) => {
  const [currentStatus, setCurrentStatus] = useState({});
  const [itemState, setItemState] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalDeleteIndex, setModalDeleteIndex] = useState(false);
  const [modalDeleteObj, setModalDeleteObj] = useState(false);
  const [activityLogModal, setActivityLogModal] = useState({ show: false, header: "", message: "", button: "OK" });
  const [showToolActivity, setShowToolActivity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isToolSet, setIsToolSet] = useState(false);
  const [runCountState, setRunCountState] = useState(undefined);
  const {
    toastContext,
    getAccessToken,
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    loadFormData(item, lastStep, index, plan).catch(error => {
      throw error;
    });

    setRunCountState(DataParsingHelper.parseNestedInteger(pipeline, "workflow.run_count", 0));
  }, [JSON.stringify(item), lastStep, JSON.stringify(pipeline.workflow)]);


  const loadFormData = async (item, lastStep, index, plan) => {
    setCurrentStatus({});
    setItemState("");
    setIsToolSet(DataParsingHelper.parseNestedString(item, "tool.tool_identifier") !== false);

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
      ];
      if (newOverlayToolIdentifiers.includes(toolIdentifier) === true && type === "tool") {
        toastContext.showOverlayPanel(
          <PipelineStepEditorOverlay
            pipeline={pipeline}
            pipelineStep={pipelineStep}
            loadPipeline={loadPipeline}
          />
        );
      }
      else {
        await parentCallbackEditItem({type: type, tool_name: tool.tool_identifier, step_id: itemId});
      }
    } else {
      // TODO: Implement opening tool setter
      if (PipelineRoleHelper.canModifyPipelineWorkflowStructure(userData, pipeline) !== true) {
        toastContext.showOverlayPanel(
          <AccessDeniedOverlayBase>
            Editing pipeline workflow structure is not allowed for this unconfigured step. This action requires elevated privileges. The Pipeline Step needs to have its tool set by someone with sufficient access.
          </AccessDeniedOverlayBase>
        );
        return;
      }
      await parentCallbackEditItem({ type: "step", tool_name: "", step_id: itemId });
    }
  };

  const handleDeleteStepClick = (index, pipeline, step) => {
    let deleteObj = {
      pipelineId: pipeline._id,
      stepId: step._id,
      toolIdentifier: step?.tool?.tool_identifier,
      configuration: {
        toolConfigId : step?.tool?.configuration?.toolConfigId,
        jobName : step?.tool?.configuration?.jobName
      }
    };
    setShowDeleteModal(true);
    setModalDeleteIndex(index);
    setModalDeleteObj(deleteObj);
  };

  const handleDeleteStepClickConfirm = async (index, deleteObj) => {
    setShowDeleteModal(false);
    if (deleteObj.toolIdentifier && jenkinsTools.includes(deleteObj.toolIdentifier)) {
      // make an kafka call to delete jenkins job
      await pipelineActions.deleteJenkinsJob(deleteObj, getAccessToken);
    }
    deleteStep(index);
  };

  const getBottomActionBarButtons = () => {
    if (isToolSet === true) {
      return (
      <div className={"ml-auto d-flex"}>
        {!editWorkflow &&
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

            {parentWorkflowStatus !== "running" && parentWorkflowStatus !== "paused" ? //if the overall pipeline is in a running/locked state
              <>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Configure Step Settings" })}>
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
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Cannot access settings while pipeline is running" })}>
                  <div>
                    <IconBase icon={faCog}
                              className={"text-muted mx-1"} />
                  </div>
                </OverlayTrigger>
              </>}
          </>}
      </div>
      );
    }
  };

  return (
    <>
      <div className="workflow-module-container-height">
        <div className="title-text-6 upper-case-first ml-1 mt-1 d-flex">
          <div className="text-muted mr-1">{item.name || "Un-configured Step"}</div>

          <div className={"ml-auto d-flex"}>
            <div className={"ml-auto d-flex mr-1"}>

              {isLoading && <LoadingIcon className={"green"} />}

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

                {itemState === "paused" && //assumes approval is needed
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Approval of this step is required to proceed. Only Pipeline Admins and Managers (via Pipeline Access Rules) are permitted to perform this action." })}>
                  <div>
                    <IconBase icon={faFlag} className={"ml-2 red"} iconStyling={{ cursor: "help" }} />
                  </div>
                </OverlayTrigger>}

                {itemState === "warning" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({message: "Warning: Step configuration settings are incomplete!"})}>
                  <div>
                    <IconBase
                      icon={faExclamationTriangle}
                      className="ml-2 yellow pointer"
                      onClickFunction={() => {
                        toastContext.showOverlayPanel(
                          <InfoOverlayBase
                            titleText={"Step Warning"}
                            titleIcon={faExclamationTriangle}
                          >
                            {`
                              This step is either missing configuration settings or needs to be reviewed. 
                              In its current state, it will not run properly.  
                              Please view the step settings and ensure the required fields are provided and valid.
                            `}
                          </InfoOverlayBase>
                        );
                      }}/>
                  </div>
                </OverlayTrigger>}

                {!item.active &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "This step is currently disabled" })}>
                  <div>
                    <IconBase
                      icon={faBan}
                      className={"ml-2 dark-grey pointer"}
                      onClickFunction={() => {
                        toastContext.showOverlayPanel(
                          <InfoOverlayBase
                            titleText={"Step Warning"}
                            titleIcon={faExclamationTriangle}
                          >
                            {`
                              This step is currently disabled and will be skipped during a pipeline run.  
                              If you have sufficient access, you can enable this step by clicking the edit workflow button at the top and then edit the step's configuration (via the pipeline step editor icon at the top) and mark the step as Active.
                            `}
                          </InfoOverlayBase>
                        );
                      }}
                    />
                  </div>
                </OverlayTrigger>
                }

              </>
              }

              {(editWorkflow || !isToolSet) &&
              <>

                  {editWorkflow &&
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Delete Step" })}>
                    <div>
                      <IconBase icon={faTrash} className="ml-2 red pointer"
                                onClickFunction={() => {
                                  handleDeleteStepClick(index, pipeline, item);
                                }} />
                    </div>
                  </OverlayTrigger>
                  }

                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Step Setup" })}>
                    <div>
                      <IconBase icon={faPen}
                                className="text-muted ml-2 pointer"
                                onClickFunction={() => {
                                  handleEditClick("step", item.tool, item._id, item);
                                }} />
                    </div>
                  </OverlayTrigger>

              </>}
              <StepToolHelpIcon
                iconClassName={"mb-1"}
                className={"mr-0"}
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

      <ModalActivityLogs
        header={activityLogModal.header}
        size="lg"
        jsonData={activityLogModal.message}
        liveStreamObject={activityLogModal.liveData}
        show={activityLogModal.show}
        setParentVisibility={() => setActivityLogModal({ ...activityLogModal, show: false })} />

      {showDeleteModal && <Modal header="Confirm Pipeline Step Delete"
                                 message="Warning! Data about this step cannot be recovered once it is deleted. Do you still want to proceed?"
                                 button="Confirm"
                                 handleCancelModal={() => setShowDeleteModal(false)}
                                 handleConfirmModal={() => handleDeleteStepClickConfirm(modalDeleteIndex, modalDeleteObj)} />}


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
  deleteStep: PropTypes.func,
  handleViewSourceActivityLog: PropTypes.func,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  toolIdentifier: PropTypes.object,
  loadPipeline: PropTypes.func,
};

export default PipelineWorkflowItem;