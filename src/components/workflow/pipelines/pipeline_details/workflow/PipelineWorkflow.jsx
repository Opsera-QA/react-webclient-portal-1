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
  faSearchMinus,
} from "@fortawesome/pro-light-svg-icons";
import ModalActivityLogs from "components/common/modal/modalActivityLogs";
import PipelineWorkflowItemList from "./PipelineWorkflowItemList";
import Modal from "components/common/modal/modal";
import "../../../workflows.css";
import { DialogToastContext } from "contexts/DialogToastContext";

function PipelineWorkflow({
  pipeline,
  fetchPlan,
  customerAccessRules,
  editItemId,
  refreshCount,
  softLoading,
}) {
  const [modalHeader, setModalHeader] = useState("");
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [lastStep, setLastStep] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [zoomValue, setZoomValue] = useState(2); //1,2, or 3 with 2 being default zoom
  const [modalMessage, setModalMessage] = useState({});
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [editWorkflow, setEditWorkflow] = useState(false);
  const [infoModal, setInfoModal] = useState({ show: false, header: "", message: "", button: "OK" });

  const authorizedAction = (action, owner) => {
    if (customerAccessRules.Administrator) {
      return true; //all actions are authorized to administrator
    } else if (owner && customerAccessRules.UserId === owner) {
      return true; //owner can do all actions
    } else if (customerAccessRules.PowerUser) {
      return false;
    } else if (customerAccessRules.User) {
      return false;
    } else {
      return false;
    }
  };

  /*useEffect(() => {
    loadData();
  }, []);*/

  useEffect(() => {
    loadFormData(pipeline);
  }, [refreshCount, JSON.stringify(pipeline)]);


  /*const loadData = async () => {
    await checkAuthentication();
  };*/

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

  /*async function checkAuthentication() {
    const { getUserRecord, getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    setAccessToken(accessToken);
    /!*try {
      const userInfoResponse = await getUserRecord();
      if (userInfoResponse !== undefined && Object.keys(userInfoResponse).length > 0) {
        setUserInfo(userInfoResponse);
      }
    } catch (err) {
      console.log("Error occurred getting user authentication status.", err);
    }*!/
  }*/


  const handleViewClick = (data, header) => {
    setModalMessage(data);
    setModalHeader(header);
    setShowModal(true);
  };

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

  const handleViewPipelineClick = (param) => {
    setModalHeader("Pipeline Configuration");
    setModalMessage(param);
    setShowModal(true);
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
        <div className="">
          <div className="pl-1 pb-1 dark-grey-background" style={{borderBottom: "5px solid #6c757d"}}>

            <Button variant="secondary"
                    className="mr-1"
                    size="sm"
                    disabled={zoomValue >= 3}
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
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "View pipeline configuration" })}>
                <Button variant="secondary" className="mr-1" size="sm" onClick={() => {
                  handleViewPipelineClick(pipeline);
                }}>
                  <FontAwesomeIcon icon={faFileAlt} fixedWidth/></Button>
              </OverlayTrigger>

              {authorizedAction("edit_workflow_btn", pipeline.owner) && <>
                {!editWorkflow &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Edit workflow" })}>
                  <Button variant="secondary" size="sm"
                          onClick={() => {
                            handleEditWorkflowClick();
                          }}
                          disabled={(workflowStatus && workflowStatus !== "stopped") || !authorizedAction("edit_workflow_btn", pipeline.owner)}>
                    <FontAwesomeIcon icon={faPen} fixedWidth/> </Button>
                </OverlayTrigger>
                }
              </>}
            </>}

            {softLoading && <span className={"ml-2"}><FontAwesomeIcon icon={faSpinner} size={"lg"} spin/></span>}

          </div>
        </div>

        <div
          className={"workflow-container p-2 dark-grey-border" + (zoomValue > 2 ? " scale-120-container" : "")}>
          <div className={setZoomClass(zoomValue)}>
            <div className="source workflow-module-container workflow-module-container-width mt-2 mx-auto">
              <div className="pt-2 text-center h6 mx-auto">Start of Workflow</div>


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

              <div className="d-flex align-items-end flex-row m-2">
                <div className="ml-auto text-right">
                  <OverlayTrigger
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

                  {workflowStatus !== "running" ?
                    <>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip({ message: "Configure Pipeline Level Settings" })}>
                        <FontAwesomeIcon icon={faCog}
                                         style={{ cursor: "pointer" }}
                                         className="text-muted" fixedWidth
                                         onClick={() => {
                                           handleSourceEditClick();
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
              className="workflow-module-container workflow-module-container-width p-2 mb-4 text-center h6 mx-auto">
              End of Workflow
            </div>
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