import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Modal from "components/common/modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faTerminal, faToolbox, faOctagon,
} from "@fortawesome/pro-light-svg-icons";
import ModalActivityLogs from "components/common/modal/modalActivityLogs";
import StepToolActivityView from "./step_configuration/StepToolActivityView";
import { AuthContext } from "contexts/AuthContext";
import WorkflowAuthorizedActions from "./workflow-authorized-actions";
import PipelineStepConfigurationSummaryModal from "./step_configuration/PipelineStepConfigurationSummaryModal";
import pipelineActions from "components/workflow/pipeline-actions";
import StepToolHelpIcon from "components/workflow/pipelines/pipeline_details/workflow/StepToolHelpIcon";
import "./step_configuration/helpers/step-validation-helper";
import StepValidationHelper from "./step_configuration/helpers/step-validation-helper";

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
  }) => {
  const { getAccessToken } = useContext(AuthContext);
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
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [runCountState, setRunCountState] = useState(undefined);

  const authorizedAction = (action, owner) => {
    let objectRoles = pipeline?.roles;
    return WorkflowAuthorizedActions.workflowItems(customerAccessRules, action, owner, objectRoles);
  };

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
    setShowSummaryModal(true);
  };

  const handleViewStepActivityLogClick = async (pipelineId, toolIdentifier, itemId) => {
    setIsLoading(true);
    await parentHandleViewSourceActivityLog(pipelineId, toolIdentifier, itemId);
    setIsLoading(false);
  };

  const handleEditClick = async (type, tool, itemId) => {
    if (type === "notification") {
      if (!authorizedAction("edit_step_notification", pipeline.owner)) {
        setInfoModal({
          show: true,
          header: "Permission Denied",
          message: "Editing step notifications is not allowed.  This action requires elevated privileges.",
          button: "OK",
        });
        return;
      }
    }

    if (type !== "notification") {
      if (!authorizedAction("edit_step_details", pipeline.owner)) {
        setInfoModal({
          show: true,
          header: "Permission Denied",
          message: "Editing step settings is not allowed.  This action requires elevated privileges.",
          button: "OK",
        });
        return;
      }
    }

    setIsLoading(true);
    if (tool && tool.tool_identifier !== undefined) {
      await parentCallbackEditItem({ type: type, tool_name: tool.tool_identifier, step_id: itemId });
    } else {
      await parentCallbackEditItem({ type: type, tool_name: "", step_id: itemId });
    }
    setIsLoading(false);
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

  return (
    <>
      <div className="workflow-module-container-height">
        <div className="title-text-6 upper-case-first ml-1 mt-1 d-flex flex-row">
          <div className="text-muted mr-1">{item.name || "Un-configured Step"}</div>

          <div className="ml-auto">
            <div className={"ml-auto d-flex"}>

              {isLoading && <FontAwesomeIcon icon={faSpinner} spin className="mr-2 green" />}

              {isToolSet && !editWorkflow && !isLoading &&
              <>
                {itemState === "failed" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "View Errors" })}>
                  <FontAwesomeIcon icon={faTimesCircle} className="mr-2 red"
                                   style={{ cursor: "pointer" }}
                                   onClick={() => {
                                     parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id);
                                   }} />
                </OverlayTrigger>}

                {itemState === "stopped" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "The last run of this pipeline was stopped while this step was running." })}>
                  <FontAwesomeIcon icon={faOctagon} className="mr-2 danger-red"
                                   style={{ cursor: "help" }}
                  />
                </OverlayTrigger>}

                {itemState === "completed" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "View last completed log" })}>
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2 green"
                                   style={{ cursor: "pointer" }}
                                   onClick={() => {
                                     parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id);
                                   }} />
                </OverlayTrigger>}

                {itemState === "running" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "View running step configuration" })}>
                  <FontAwesomeIcon icon={faSpinner} className="mr-2 green"
                                   style={{ cursor: "pointer" }} spin
                                   onClick={() => {
                                     parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id);
                                   }} />
                </OverlayTrigger>}

                {itemState === "paused" && //assumes approval is needed
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Approval of this step is required to proceed. Only Pipeline Admins and Managers (via Pipeline Access Rules) are permitted to perform this action." })}>
                  <FontAwesomeIcon icon={faFlag} className="mr-2 red"
                                   style={{ cursor: "help" }} />
                </OverlayTrigger>}

                {itemState === "warning" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Warning: Step configuration settings are incomplete!" })}>
                  <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 yellow"
                                   style={{ cursor: "pointer" }}
                                   onClick={() => {
                                     setInfoModal({
                                       show: true,
                                       header: "Step Warning",
                                       message: "This step is either missing configuration settings or needs to be reviewed.  In its current state, it will not run.  Please view the step settings and ensure the required fields are provided and valid.",
                                       button: "OK",
                                     });
                                   }} />
                </OverlayTrigger>}

                {/*{(itemState === "pending" && item.active) &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "This is the next pending step in the workflow" })}>
                  <FontAwesomeIcon icon={faHourglassStart} className="mr-2 yellow"
                                   style={{ cursor: "pointer" }}
                                   onClick={() => {
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
                  <FontAwesomeIcon icon={faBan} className="mr-2 dark-grey"
                                   style={{ cursor: "pointer" }}
                                   onClick={() => {
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
                <div className="no-wrap">

                  {editWorkflow &&
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Delete Step" })}>
                    <FontAwesomeIcon icon={faTrash} className="mr-2 red"
                                     style={{ cursor: "pointer" }}
                                     onClick={() => {
                                       handleDeleteStepClick(index, pipeline, item);
                                     }} />
                  </OverlayTrigger>
                  }

                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Step Setup" })}>
                    <FontAwesomeIcon icon={faPen}
                                     style={{ cursor: "pointer" }}
                                     className="text-muted mr-1" fixedWidth
                                     onClick={() => {
                                       handleEditClick("step", item.tool, item._id);
                                     }} />
                  </OverlayTrigger>

                </div>
              </>}
              <StepToolHelpIcon iconClassName={"mb-1"} className={"mr-0"}
                                tool={item?.tool?.tool_identifier?.toLowerCase()} />
            </div>
          </div>
        </div>


        <div className="p-1 text-muted small">
          <FontAwesomeIcon icon={faToolbox} size="sm" fixedWidth
                           className="mr-1" /> Tool: {toolIdentifier?.name || ""}
        </div>


        <div className="p-1 text-muted small">
          <FontAwesomeIcon icon={faIdBadge} size="sm" fixedWidth
                           className="mr-1" />ID: {item._id}</div>

        <div className="p-1 text-right">
          {isToolSet &&
          <>
            {!editWorkflow &&
            <>
              {authorizedAction("view_step_configuration", pipeline.owner) &&
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "View Settings" })}>
                <FontAwesomeIcon icon={faSearchPlus} //settings!
                                 className="text-muted mx-1" fixedWidth
                                 style={{ cursor: "pointer" }}
                                 onClick={() => {
                                   handleSummaryViewClick();
                                 }} />
              </OverlayTrigger>
              }

              {itemState !== "running" ? //if THIS step is running
                <>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "View Step Activity Logs" })}>
                    <FontAwesomeIcon icon={faArchive}
                                     className="text-muted mx-1" fixedWidth
                                     style={{ cursor: "pointer" }}
                                     onClick={() => {
                                       handleViewStepActivityLogClick(pipelineId, item.tool.tool_identifier, item._id);
                                     }} />
                  </OverlayTrigger>
                </>
                :
                <>
                  {toolIdentifier?.properties && toolIdentifier?.properties?.isLiveStream && <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "View Running Tool Activity (if available)" })}>
                    <FontAwesomeIcon icon={faTerminal}
                                     className="green mx-1" fixedWidth
                                     style={{ cursor: "pointer" }}
                                     onClick={() => {
                                       setShowToolActivity(true);
                                     }} />
                  </OverlayTrigger>}
                </>}

              {parentWorkflowStatus !== "running" && parentWorkflowStatus !== "paused" ? //if the overall pipeline is in a running/locked state
                <>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Configure Step Notification and Approval Rules" })}>
                    <FontAwesomeIcon icon={faEnvelope}
                                     style={{ cursor: "pointer" }}
                                     className="text-muted mx-1" fixedWidth
                                     onClick={() => {
                                       handleEditClick("notification", item.tool, item._id);
                                     }} />
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Configure Step Settings" })}>
                    <FontAwesomeIcon icon={faCog}
                                     style={{ cursor: "pointer" }}
                                     className="text-muted mx-1" fixedWidth
                                     onClick={() => {
                                       handleEditClick("tool", item.tool, item._id);
                                     }}
                    />
                  </OverlayTrigger>
                </>
                :
                <>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Cannot access settings while pipeline is running" })}>
                    <FontAwesomeIcon icon={faEnvelope}
                                     className="text-muted mx-1" fixedWidth />
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Cannot access settings while pipeline is running" })}>
                    <FontAwesomeIcon icon={faCog}
                                     className="text-muted mx-1" fixedWidth />
                  </OverlayTrigger>
                </>}
            </>}
          </>}
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


      <PipelineStepConfigurationSummaryModal
        pipelineStepData={item}
        setShowModal={setShowSummaryModal}
        showModal={showSummaryModal}
      />


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
};

export default PipelineWorkflowItem;