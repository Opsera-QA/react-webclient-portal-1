import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Modal from "components/common/modal/modal";
import {
  faSearchPlus,
  faCog,
  faArchive,
  faHourglassStart,
  faFlag,
  faIdBadge,
  faPen,
  faExclamationTriangle,
  faSpinner,
  faCheckCircle,
  faEnvelope,
  faTimesCircle,
  faTrash,
  faBan,
  faTerminal, faToolbox, faOctagon, faCodeBranch
} from "@fortawesome/pro-light-svg-icons";
import ModalActivityLogs from "components/common/modal/modalActivityLogs";
import StepToolActivityView from "./step_configuration/StepToolActivityView";
import pipelineActions from "components/workflow/pipeline-actions";
import StepToolHelpIcon from "components/workflow/pipelines/pipeline_details/workflow/StepToolHelpIcon";
import StepValidationHelper from "./step_configuration/helpers/step-validation-helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import PipelineStepNotificationConfigurationOverlay
  from "components/workflow/plan/step/notifications/PipelineStepNotificationConfigurationOverlay";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import PipelineStepEditorOverlay from "components/workflow/plan/step/PipelineStepEditorOverlay";
import PipelineStepDetailsOverviewOverlay
  from "components/workflow/pipelines/overview/step/PipelineStepDetailsOverviewOverlay";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineWorkflowItemActionField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowItemActionField";

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
    parentHandleViewSourceActivityLog,
    customerAccessRules,
    parentWorkflowStatus,
    toolIdentifier,
    loadPipeline,
  }) => {
  const [currentStatus, setCurrentStatus] = useState({});
  const [itemState, setItemState] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalDeleteIndex, setModalDeleteIndex] = useState(false);
  const [modalDeleteObj, setModalDeleteObj] = useState(false);
  const [infoModal, setInfoModal] = useState({ show: false, header: "", message: "", button: "OK" });
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

    const { run_count } = pipeline.workflow;

    setRunCountState(run_count);

  }, [JSON.stringify(item), lastStep, JSON.stringify(pipeline.workflow)]);


  const loadFormData = async (item, lastStep, index, plan) => {
    setCurrentStatus({});
    setItemState("");
    setIsToolSet(false);

    if (item !== undefined) {
      if (!StepValidationHelper.isValidConfiguration(item.tool)) {
        setItemState("warning");
      }

      if (item.tool?.tool_identifier) {
        setIsToolSet(true);
      }

      if (lastStep !== undefined) {
        if (lastStep?.success && lastStep.success !== undefined && Object.keys(lastStep.success).length > 0) {
          let stepArrayIndex = plan.findIndex((x) => {
            if (x._id && x._id.toString() === lastStep.success.step_id) {
              return true;
            }
          });
          if (index === stepArrayIndex) {  //current step is successful, so it's completed
            setCurrentStatus(lastStep.success);
            setItemState("completed");
          }
        }

        if (lastStep.running && lastStep.running !== undefined && Object.keys(lastStep.running).length > 0) {
          let stepArrayIndex = plan.findIndex(x => x?._id?.toString() === lastStep.running.step_id);
          if (index === stepArrayIndex) {  //current step is successful, so it's completed
            setCurrentStatus(lastStep.running);
            if (lastStep.running.paused) {
              setItemState("paused");
            } else if (lastStep.running.status === "stopped") {
              setItemState("stopped");
            } else {
              setItemState("running");
            }
          }
        }

        if (lastStep.failed && lastStep.failed !== undefined && Object.keys(lastStep.failed).length > 0) {
          let stepArrayIndex = plan.findIndex(x => x?._id?.toString() === lastStep.failed.step_id);
          if (index === stepArrayIndex) {  //current step is successful, so it's completed
            setCurrentStatus(lastStep.failed);
            setItemState("failed");
          }
        }
      }
    }
  };

  /*  const handleViewClick = (data, header) => {
      setActivityLogModal({ show: true, header: header, message: data, button: "OK" });
    };*/

  const handleSummaryViewClick = () => {
    toastContext.showOverlayPanel(
      <PipelineStepDetailsOverviewOverlay pipelineStepData={item} />
    );
  };

  const handleViewStepActivityLogClick = async (pipelineId, toolIdentifier, itemId) => {
    setIsLoading(true);
    await parentHandleViewSourceActivityLog(pipelineId, toolIdentifier, itemId);
    setIsLoading(false);
  };

  const handleEditClick = async (type, tool, itemId, pipelineStep) => {
    if (PipelineRoleHelper.canUpdatePipelineStepDetails(userData, pipeline) !== true) {
      setInfoModal({
        show: true,
        header: "Permission Denied",
        message: "Editing step settings is not allowed.  This action requires elevated privileges.",
        button: "OK",
      });
      return;
    }

    setIsLoading(true);
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
      await parentCallbackEditItem({ type: type, tool_name: "", step_id: itemId });
    }
    setIsLoading(false);
  };

  const editStepNotificationConfiguration = async (pipelineStep) => {
    if (PipelineRoleHelper.canUpdatePipelineStepNotifications(userData, pipeline) !== true) {
      setInfoModal({
        show: true,
        header: "Permission Denied",
        message: "Editing step notifications is not allowed.  This action requires elevated privileges.",
        button: "OK",
      });
      return;
    }

    toastContext.showOverlayPanel(
      <PipelineStepNotificationConfigurationOverlay
        pipelineId={pipeline?._id}
        pipelineStep={pipelineStep}
        loadPipeline={loadPipeline}
      />
    );
  };

  const handleDeleteStepClick = (index, pipeline, step) => {
    let deleteObj = {
      "pipelineId": pipeline._id,
      "stepId": step._id,
      "toolIdentifier": step?.tool?.tool_identifier,
      "configuration": {
        "toolConfigId" : step?.tool?.configuration?.toolConfigId,
        "jobName" : step?.tool?.configuration?.jobName
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

  const getToolField = () => {
    if (toolIdentifier?.identifier !== null && toolIdentifier?.identifier !== toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS) {
      return (
        <div className="pl-1 pt-1 text-muted small">
          <IconBase icon={faToolbox} iconSize={"sm"} className={"mr-1"} />
          Tool: {toolIdentifier?.name || ""}
        </div>
      );
    }

    return (
      <div />
    );
  };

  const getRepositoryField = () => {
    if (item && item.tool) {
      const { configuration } = item.tool;
      if (configuration && configuration.repository) {
        return (
          <div className="pl-1 pt-1 text-muted small">
            <IconBase icon={faCodeBranch} iconSize={"sm"} className={"mr-1"} />
            Repository: {configuration.repository}
          </div>
        );
      }
    }
    return (
      <div />
    );
  };

  const getBranchField = () => {
    if (item && item.tool) {
      const { configuration } = item.tool;
      if (configuration && (configuration.branch || configuration.gitBranch || configuration.defaultBranch)) {
        return (
          <div className="pl-1 pt-1 text-muted small">
            <IconBase icon={faCodeBranch} iconSize={"sm"} className={"mr-1"} />
            Branch: {configuration.branch || configuration.gitBranch || configuration.defaultBranch}
          </div>
        );
      }
    }
    return (
      <div style={{ height: "26px" }} />
    );
  };

  return (
    <>
      <div className="workflow-module-container-height">
        <div className="title-text-6 upper-case-first ml-1 mt-1 d-flex">
          <div className="text-muted mr-1">{item.name || "Un-configured Step"}</div>

          <div className={"ml-auto d-flex"}>
            <div className={"ml-auto d-flex"}>

              {isLoading && <LoadingIcon className={"mr-2 green"} />}

              {isToolSet && !editWorkflow && !isLoading &&
              <>
                {itemState === "failed" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "View Errors" })}>
                  <div>
                    <IconBase icon={faTimesCircle} className={"mr-2 red pointer"}
                              onClickFunction={() => {
                                parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id);
                              }} />
                  </div>
                </OverlayTrigger>}

                {itemState === "stopped" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "The last run of this pipeline was stopped while this step was running." })}>
                  <div>
                    <IconBase icon={faOctagon} className={"mr-2 danger-red"}
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
                    <IconBase icon={faCheckCircle} className={"mr-2 green pointer"}
                              onClickFunction={() => {
                                parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id);
                              }} />
                  </div>
                </OverlayTrigger>}

                {itemState === "running" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "View running step configuration" })}>
                  <div>
                  <IconBase icon={faSpinner} className={"mr-2 green pointer"}
                                   spinIcon={true}
                                   onClickFunction={() => {
                                     parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id);
                                   }} />

                  </div>
                </OverlayTrigger>}

                {itemState === "paused" && //assumes approval is needed
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Approval of this step is required to proceed. Only Pipeline Admins and Managers (via Pipeline Access Rules) are permitted to perform this action." })}>
                  <div>
                    <IconBase icon={faFlag} className={"mr-2 red"} iconStyling={{ cursor: "help" }} />
                  </div>
                </OverlayTrigger>}

                {itemState === "warning" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Warning: Step configuration settings are incomplete!" })}>
                  <div>
                  <IconBase icon={faExclamationTriangle} className="mr-2 yellow pointer"
                                   onClickFunction={() => {
                                     setInfoModal({
                                       show: true,
                                       header: "Step Warning",
                                       message: "This step is either missing configuration settings or needs to be reviewed.  In its current state, it will not run.  Please view the step settings and ensure the required fields are provided and valid.",
                                       button: "OK",
                                     });
                                   }} />
                  </div>
                </OverlayTrigger>}

                {/*{(itemState === "pending" && item.active) &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "This is the next pending step in the workflow" })}>
                  <IconBase icon={faHourglassStart} className={"mr-2 yellow pointer"}
                                   onClickFunction={() => {
                                     setInfoModal({
                                       show: true,
                                       header: "Step Warning",
                                       message: "This step is the next pending step in the workflow.",
                                       button: "OK",
                                     });
                                   }}/>
                </OverlayTrigger>
                }*/}

                {!item.active &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "This step is currently disabled" })}>
                  <IconBase icon={faBan} className="mr-2 dark-grey pointer"
                                   onClickFunction={() => {
                                     setInfoModal({
                                       show: true,
                                       header: "Step Disabled",
                                       message: "This step is currently disabled and will be skipped during a pipeline run.  To enable this step, edit the workflow (via the pipeline editor icon at the top) and mark the step as Active.",
                                       button: "OK",
                                     });
                                   }} />
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
                      <IconBase icon={faTrash} className="mr-2 red pointer"
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
                                className="text-muted mr-1 pointer"
                                onClickFunction={() => {
                                  handleEditClick("step", item.tool, item._id, item);
                                }} />
                    </div>
                  </OverlayTrigger>

              </>}
              <StepToolHelpIcon iconClassName={"mb-1"} className={"mr-0"}
                                tool={item?.tool?.tool_identifier?.toLowerCase()} />
            </div>
          </div>
        </div>

        <div className="pl-1 pt-1 text-muted small">
          <IconBase icon={faIdBadge} iconSize={"sm"} className={"mr-1"} />ID: {item._id}
        </div>

        {getToolField()}

        <PipelineWorkflowItemActionField pipelineStep={item} />

        {getRepositoryField()}

        {getBranchField()}

        <div className="ml-auto mt-auto">
        <div className="p-1 ml-auto d-flex">
          {isToolSet &&
          <div className={"ml-auto d-flex"}>
            {!editWorkflow &&
            <>
              {PipelineRoleHelper.canViewStepConfiguration(userData, pipeline) &&
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "View Settings" })}>
                <div>
                  <IconBase icon={faSearchPlus} //settings!
                            className={"text-muted mx-1 pointer"}
                            onClickFunction={() => {
                              handleSummaryViewClick();
                            }} />
                </div>
              </OverlayTrigger>
              }

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

              {parentWorkflowStatus !== "running" && parentWorkflowStatus !== "paused" ? //if the overall pipeline is in a running/locked state
                <>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Configure Step Notification and Approval Rules" })}>
                    <div>
                      <IconBase icon={faEnvelope}
                                className={"pointer text-muted mx-1"}
                                onClickFunction={() => {
                                  editStepNotificationConfiguration(item);
                                }} />
                    </div>
                  </OverlayTrigger>

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
                      <IconBase icon={faEnvelope}
                                className={"text-muted mx-1"} />
                    </div>
                  </OverlayTrigger>

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
          </div>}
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

      {infoModal.show && <Modal header={infoModal.header} message={infoModal.message} button={infoModal.button}
                                handleCancelModal={() => setInfoModal({ ...infoModal, show: false })} />}

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
  parentHandleViewSourceActivityLog: PropTypes.func,
  customerAccessRules: PropTypes.object,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  toolIdentifier: PropTypes.object,
  loadPipeline: PropTypes.func,
};

export default PipelineWorkflowItem;