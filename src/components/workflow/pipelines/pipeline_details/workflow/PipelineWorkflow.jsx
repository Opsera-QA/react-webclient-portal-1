import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import { AuthContext } from "contexts/AuthContext";
import { SteppedLineTo } from "react-lineto";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorDialog from "components/common/status_notifications/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchPlus,
  faFileAlt,
  faCog,
  faPen,
  faSpinner,
  faCheck,
  faClipboardCheck,
  faCode,
  faSearchMinus, faFolder, faCodeBranch,
} from "@fortawesome/pro-light-svg-icons";
import ModalActivityLogs from "components/common/modal/modalActivityLogs";
import PipelineWorkflowItemList from "./PipelineWorkflowItemList";
import Modal from "components/common/modal/modal";
import { DialogToastContext } from "contexts/DialogToastContext";
import WorkflowAuthorizedActions from "./workflow-authorized-actions";
import PipelineDetailsOverviewOverlay
  from "components/workflow/pipelines/overview/PipelineDetailsOverviewOverlay";

// TODO: Clean up and refactor to make separate components. IE the source repository begin workflow box can be its own component
function PipelineWorkflow({
  pipeline,
  fetchPlan,
  customerAccessRules,
  editItemId,
  refreshCount,
  softLoading,
}) {
  const [modalHeader, setModalHeader] = useState("");
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [lastStep, setLastStep] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [zoomValue, setZoomValue] = useState(2); //1,2, or 3 with 2 being default zoom
  const [modalMessage, setModalMessage] = useState({});
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [editWorkflow, setEditWorkflow] = useState(false);
  const [infoModal, setInfoModal] = useState({ show: false, header: "", message: "", button: "OK" });

  const authorizedAction = (action, owner) => {
    let objectRoles = pipeline?.roles;
    return WorkflowAuthorizedActions.workflowItems(customerAccessRules, action, owner, objectRoles);
  };

  useEffect(() => {
    loadFormData(pipeline);
  }, [refreshCount, JSON.stringify(pipeline)]);


  const loadFormData = (pipeline) => {
    if (!pipeline.workflow) {
      return;
    }

    //setState({ items: pipeline.workflow.plan });
    setLastStep(pipeline.workflow.last_step);

    if (pipeline.workflow.last_step !== undefined) {
      let status = Object.prototype.hasOwnProperty.call(pipeline.workflow.last_step, "status") ? pipeline.workflow.last_step.status : false;

      if (status === "stopped" && pipeline.workflow.last_step.running && pipeline.workflow.last_step.running.paused) {
        setWorkflowStatus("paused");
      } else {
        setWorkflowStatus(status);
      }
    } else {
      setWorkflowStatus(false);
    }
  };

  const handleViewClick = (data, header) => {
    setModalMessage(data);
    setModalHeader(header);
    setShowModal(true);
  };

  // TODO: Break out into separate actions file, maybe call in a pipeline activity overlay rather than here?
  const fetchPipelineActivityByTool = async (pipelineId, tool, stepId, activityId) => {
    const accessToken = await getAccessToken();
    let apiUrl = `/pipelines/${pipelineId}/activity`;
    const params = {
      tool: tool,
      step_id: stepId,
      id: activityId,
    };

    try {
      const pipelineActivityLog = await axiosApiService(accessToken).get(apiUrl, { params });
      return pipelineActivityLog;
    } catch (err) {
      toastContext.showLoadingErrorDialog(err);
      return false;
    }
  };

  const handleViewPipelineClick = () => {

    if (!authorizedAction("view_pipeline_configuration", pipeline.owner)) {
      setInfoModal({
        show: true,
        header: "Permission Denied",
        message: "Viewing the pipeline configuration requires elevated privileges.",
        button: "OK",
      });
      return;
    }
    toastContext.showOverlayPanel(<PipelineDetailsOverviewOverlay pipeline={pipeline} />);
  };

  const callbackFunctionEditItem = async (item) => {
    window.scrollTo(0, 0);
    setEditWorkflow(false);
    item.id = pipeline._id;
    await fetchPlan(item);
  };

  const updatePipeline = async (pipeline) => {
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${pipeline._id}/update`;
    try {
      await axiosApiService(accessToken).post(apiUrl, pipeline);
    } catch (err) {
      toastContext.showLoadingErrorDialog(err);
    }
  };

  const handleSourceEditClick = () => {
    fetchPlan({ id: pipeline._id, type: "source", item_id: "" });
  };

  const handleEditWorkflowClick = () => {
    setEditWorkflow(true);
  };

  const handleDoneWorkflowEditsClick = () => {
    setEditWorkflow(false);
  };

  const quietSavePlan = async (steps) => {
    console.log("saving plan quietly: ", pipeline.workflow.plan);
    if (steps) {
      pipeline.workflow.plan = steps;
    }
    await updatePipeline(pipeline);
  };

  const handleViewSourceActivityLog = async (pipelineId, tool, stepId, activityId) => {
    if (tool) {
      const activityData = await fetchPipelineActivityByTool(pipelineId, tool, stepId, activityId);
      if (activityData && activityData.data) {
        setModalHeader("Step Activity Log");
        setModalMessage(activityData.data.pipelineData[0]);
        setShowModal(true);
      }
    }
  };

  const handleEditSourceSettingsClick = () => {
    if (!authorizedAction("edit_step_details", pipeline.owner)) {
      setInfoModal({
        show: true,
        header: "Permission Denied",
        message: "Editing pipeline workflow settings allows users to change the behavior of a pipeline step.  This action requires elevated privileges.",
        button: "OK",
      });
      return;
    }

    handleSourceEditClick();
  };

  const setZoomClass = (val) => {
    switch (val) {
    case 1:
      return "scale-80"; // .8x zoom
    case 2:
      return "scale-100"; //standard 100% zoom
    case 3:
      return "scale-120"; // 1.2x zoom
    }
  };

  const handleZoomClick = (val, direction) => {
    //take current value and increment up or down
    if (direction === "in") {
      setZoomValue(zoomValue => zoomValue + 1);
    } else {
      setZoomValue(zoomValue => zoomValue - 1);
    }
  };

  if (pipeline == null || pipeline.workflow == null || !Object.prototype.hasOwnProperty.call(pipeline.workflow, "source")) {
    return <ErrorDialog error={"Pipeline Workflow Details Not Found"} align={"top"}/>;
  }

  return (
    <>
      <div>
        <div className="pb-1">

          {authorizedAction("view_pipeline_configuration", pipeline.owner) &&
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: "" +
                "View pipeline configuration" })}>
            <Button variant="outline-secondary" className="mr-1" size="sm" onClick={() => {
              handleViewPipelineClick(pipeline);
            }}>
              <FontAwesomeIcon icon={faFileAlt} fixedWidth/> View Configuration</Button>
          </OverlayTrigger>
          }

          {editWorkflow &&
          <Button
            variant="success"
            size="sm"
            onClick={() => {
              handleDoneWorkflowEditsClick();
            }}>
            <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1"/>Done Editing</Button>
          }

          {!editWorkflow &&
          <>
            {authorizedAction("edit_workflow_structure", pipeline.owner) && <>
              {!editWorkflow &&
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Edit pipeline workflow: add or remove steps, edit step names and set tools for individual steps" })}>
                <Button variant="outline-secondary" size="sm"
                        onClick={() => {
                          handleEditWorkflowClick();
                        }}
                        disabled={(workflowStatus && workflowStatus !== "stopped")}>
                  <FontAwesomeIcon icon={faPen} fixedWidth/> Edit Workflow</Button>
              </OverlayTrigger>
              }
            </>}
          </>}
        </div>
      </div>

      <div
        className={"workflow-container p-2 dark-grey" + (zoomValue > 2 ? " scale-120-container" : "")}>
        <div className={setZoomClass(zoomValue)}>
          <div className="source workflow-module-container workflow-module-container-width mt-2 mx-auto">
            {!softLoading ?
              <div className="pt-2 text-center mx-auto">Start of Workflow</div> :
              <div className="pt-2 text-center mx-auto green"><FontAwesomeIcon icon={faSpinner} className="mr-1"
                                                                               spin/> Processing Workflow...</div>
            }

            {pipeline.workflow.source.trigger_active &&
            <div className="d-flex">
              <div className="upper-case-first pl-2">
            <span className="text-muted small">
            <FontAwesomeIcon icon={faClipboardCheck} size="sm" fixedWidth
                             className="mr-1"/>Webhook Trigger: {pipeline.workflow.source.trigger_active ? "Enabled" : "Disabled"}</span>
              </div>
            </div>}

            {pipeline.workflow.source.service &&
            <div className="d-flex">
              <div className="upper-case-first pl-2">
            <span className="text-muted small">
            <FontAwesomeIcon icon={faCode} size="sm" fixedWidth
                             className="mr-1"/>Source Repository: {pipeline.workflow.source.service}</span>
              </div>
            </div>}

            {pipeline?.workflow?.source?.repository &&
              <div className="d-flex">
                <div className={"pl-2"}>
                  <span className="text-muted small">
                    <FontAwesomeIcon icon={faCode} size="sm" fixedWidth className="mr-1"/>
                    Repository: {pipeline.workflow.source.repository}
                  </span>
                </div>
              </div>
            }

            {pipeline?.workflow?.source?.branch &&
              <div className="d-flex">
                <div className={"pl-2"}>
                  <span className="text-muted small my-auto">
                    <FontAwesomeIcon icon={faCodeBranch} size="sm" fixedWidth className="mr-1"/>
                    Primary Branch: {pipeline.workflow.source.branch}
                  </span>
                </div>
              </div>
            }

            {Array.isArray(pipeline?.workflow?.source?.secondary_branches) && pipeline?.workflow?.source?.secondary_branches?.length > 0 &&
              <div className="d-flex">
                <div className={"pl-2"}>
                  <span className="text-muted small my-auto">
                    <FontAwesomeIcon icon={faCodeBranch} size="sm" fixedWidth className="mr-1"/>
                    Secondary Branches: {pipeline.workflow.source.secondary_branches?.join(", ")}
                  </span>
                </div>
              </div>
            }

            <div className="d-flex align-items-end flex-row m-2">
              <div className="ml-auto text-right">
                {authorizedAction("view_step_configuration", pipeline.owner) && <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "View Settings" })}>
                  <FontAwesomeIcon icon={faSearchPlus}
                                   className="text-muted mr-2" fixedWidth
                                   style={{ cursor: "pointer" }}
                                   onClick={() => {
                                     handleViewClick(pipeline.workflow.source, "Step Settings");
                                   }}/>
                </OverlayTrigger>
                }

                {workflowStatus !== "running" && workflowStatus !== "paused" ?
                  <>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip({ message: "Configure pipeline level settings such as source repository and webhook events" })}>
                      <FontAwesomeIcon icon={faCog}
                                       style={{ cursor: "pointer" }}
                                       className="text-muted" fixedWidth
                                       onClick={() => {
                                         handleEditSourceSettingsClick();
                                       }}/>
                    </OverlayTrigger>
                  </>
                  :
                  <>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip({ message: "Cannot access settings while pipeline is running" })}>
                      <FontAwesomeIcon icon={faCog}
                                       className="text-muted mx-1" fixedWidth/>
                    </OverlayTrigger>
                  </>
                }
              </div>
            </div>
          </div>

          <div style={{ height: "40px" }}>&nbsp;</div>

          <div className="step-items workflow-module-container-width mx-auto">
            <PipelineWorkflowItemList
              pipeline={pipeline}
              lastStep={lastStep}
              lastStepId={lastStep && lastStep.step_id}
              editWorkflow={editWorkflow}
              pipelineId={pipeline._id}
              fetchPlan={fetchPlan}
              refreshCount={refreshCount}
              customerAccessRules={customerAccessRules}
              parentCallbackEditItem={callbackFunctionEditItem}
              quietSavePlan={quietSavePlan}
              parentHandleViewSourceActivityLog={handleViewSourceActivityLog}
              parentWorkflowStatus={workflowStatus}
            />
          </div>

          <SteppedLineTo from="source" to="step-items" delay={100} orientation="v" zIndex={-1}
                         borderColor="#0f3e84" borderWidth={2} fromAnchor="bottom" toAnchor="top"/>


          <div
            className="workflow-module-container workflow-module-container-width p-2 mb-4 text-center mx-auto">
            End of Workflow
          </div>
        </div>

        <div className="bottom-zoom-btns mb-1 mr-3">
          <Button variant="secondary"
                  className="mr-1"
                  size="sm"
                  disabled={zoomValue >= 2}
                  onClick={() => {
                    handleZoomClick(zoomValue, "in");
                  }}>
            <FontAwesomeIcon icon={faSearchPlus} fixedWidth/></Button>

          <Button variant="secondary"
                  className="mr-1"
                  size="sm"
                  disabled={zoomValue <= 1}
                  onClick={() => {
                    handleZoomClick(zoomValue, "out");
                  }}>
            <FontAwesomeIcon icon={faSearchMinus} fixedWidth/></Button>
        </div>
      </div>

      <ModalActivityLogs header={modalHeader} size="lg" jsonData={modalMessage} show={showModal}
                         setParentVisibility={setShowModal}/>

      {infoModal.show && <Modal header={infoModal.header} message={infoModal.message} button={infoModal.button}
                                handleCancelModal={() => setInfoModal({ ...infoModal, show: false })}/>}
    </>
  );

}


function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}

PipelineWorkflow.propTypes = {
  pipeline: PropTypes.object,
  fetchPlan: PropTypes.func,
  customerAccessRules: PropTypes.object,
  editItemId: PropTypes.string,
  refreshCount: PropTypes.number,
  softLoading: PropTypes.bool,
};
export default PipelineWorkflow;