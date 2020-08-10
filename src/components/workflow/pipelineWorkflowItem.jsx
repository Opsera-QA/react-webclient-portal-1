import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { axiosApiService } from "../../api/apiService";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Modal from "../common/modal/modal";
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
  faTerminal, faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import ModalActivityLogs from "../common/modal/modalActivityLogs";
//import ApprovalModal from "./approvalModal";
import StepToolActivityView from "./stepToolActivityView";
import { format } from "date-fns";
import "./workflows.css";


const PipelineWorkflowItem = ({ pipeline, plan, item, index, lastStep, pipelineId, accessToken, editWorkflow, parentCallbackEditItem, deleteStep, parentHandleViewSourceActivityLog, customerAccessRules, parentWorkflowStatus }) => {
  const [currentStatus, setCurrentStatus] = useState({});
  const [itemState, setItemState] = useState(false);
  const [stepConfigured, setStepConfigured] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalDeleteIndex, setModalDeleteIndex] = useState(false);
  const [toolProperties, setToolProperties] = useState({});
  const [infoModal, setInfoModal] = useState({ show: false, header: "", message: "", button: "OK" });
  const [activityLogModal, setActivityLogModal] = useState({ show: false, header: "", message: "", button: "OK" });
  const [showToolActivity, setShowToolActivity] = useState(false);

  const authorizedAction = (action, owner) => {
    if (customerAccessRules.Administrator) {
      return true; //all actions are authorized to administrrator
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

  useEffect(() => {
    loadFormData(item, lastStep, index, plan);
  }, [item, lastStep]);


  const loadFormData = async (item, lastStep1, index, plan) => {
    setStepConfigured(false);
    setToolProperties({});
    setCurrentStatus({});
    setItemState("");

    if (item !== undefined) {
      if (item.tool === undefined || item.tool.configuration === undefined) {
        setItemState("warning");
      }

      if (lastStep !== undefined) {

        if (lastStep.success !== undefined && Object.keys(lastStep.success).length > 0) {
          let stepArrayIndex = plan.findIndex((x) => {
            if (x._id && x._id.toString() === lastStep.success.step_id) {
              return true;
            }
          });
          if (index === stepArrayIndex) {  //current step is successful, so it's completed
            setCurrentStatus(lastStep.success);
            setItemState("completed");

          } else if (index === stepArrayIndex + 1) { //this is the next step in the plan
            setItemState("pending");
          }
        }

        if (lastStep.running !== undefined && Object.keys(lastStep.running).length > 0) {
          let stepArrayIndex = plan.findIndex(x => x._id.toString() === lastStep.running.step_id);
          if (index === stepArrayIndex) {  //current step is successful, so it's completed
            setCurrentStatus(lastStep.running);
            if (lastStep.running.paused) {
              setItemState("paused");
            } else {
              setItemState("running");
            }

          } else if (index === stepArrayIndex + 1) { //this is the next step in the plan
            setItemState("pending");
          }
        }

        if (lastStep.failed !== undefined && Object.keys(lastStep.failed).length > 0) {
          let stepArrayIndex = plan.findIndex(x => x._id && x._id.toString() === lastStep.failed.step_id);
          if (index === stepArrayIndex) {  //current step is successful, so it's completed
            setCurrentStatus(lastStep.failed);
            setItemState("failed");

          } else if (index === stepArrayIndex + 1) { //this is the next step in the plan
            setItemState("pending");
          }
        }
      }

      if (item.tool !== undefined && (typeof (item.tool.tool_identifier) === "string" && item.tool.tool_identifier.length > 0)) {
        getToolDetails(item.tool.tool_identifier);
        if (item.type && item.type[0] && item.type[0].length > 0) {
          setStepConfigured(true);
        }
      }
    }
  };

  const handleViewClick = (data, header) => {
    console.log("HERE?");
    setActivityLogModal({ show: true, header: header, message: data, button: "OK" });
  };

  const handleEditClick = (type, tool, itemId) => {

    if (!authorizedAction("edit_step_details", pipeline.owner)) {
      setInfoModal({
        show: true,
        header: "Permission Denied",
        message: "Editing step details requires administrator or owner access to this Pipeline.",
        button: "OK",
      });
    } else {
      if (tool && tool.tool_identifier !== undefined) {
        parentCallbackEditItem({ type: type, tool_name: tool.tool_identifier, step_id: itemId });
      } else {
        parentCallbackEditItem({ type: type, tool_name: "", step_id: itemId });
      }
    }

  };

  const handleDeleteStepClick = (index) => {
    setShowDeleteModal(true);
    setModalDeleteIndex(index);
  };

  const handleDeleteStepClickConfirm = (index) => {
    setShowDeleteModal(false);
    deleteStep(index);
  };

  const getToolDetails = async (tool_identifier) => {
    //take tool ID (too_identifier in pipeline), pass to Node route that returns both tool record and type from registry
    try {
      const toolResponse = await axiosApiService(accessToken).get("/registry/tool/properties/" + tool_identifier, {});
      setToolProperties(toolResponse.data);
    } catch (err) {
      console.log(err.message);
    }
  };


  return (
    <>
      <div>
        <div className="title-text-6 upper-case-first ml-1 mt-1">
          <span
            className="text-muted mr-1">{item.name || "Un-configured Step"}</span>
          <div className="float-right text-right">
            {stepConfigured === true && editWorkflow === false ?
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
                                   }}/>
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
                                   }}/>
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
                                   }}/>
                </OverlayTrigger>}

                {itemState === "paused" && //assumes approval is needed
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Approval of this step is required to proceed" })}>
                  <FontAwesomeIcon icon={faFlag} className="mr-2 red"
                                   style={{ cursor: "help" }}/>
                </OverlayTrigger>}

                {itemState === "warning" &&
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Step warning alert due to missing data" })}>
                  <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 yellow"
                                   style={{ cursor: "pointer" }}
                                   onClick={() => {
                                     setInfoModal({
                                       show: true,
                                       header: "Step Warning",
                                       message: "This step is missing configuration information and will not run.",
                                       button: "OK",
                                     });
                                   }}/>
                </OverlayTrigger>}

                {(itemState === "pending" && item.active) &&
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
                }

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
                                   }}/>
                </OverlayTrigger>
                }

              </> :
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Step Setup" })}>
                <FontAwesomeIcon icon={faPen}
                                 style={{ cursor: "pointer" }}
                                 className="text-muted mx-1" fixedWidth
                                 onClick={() => {
                                   handleEditClick("step", item.tool, item._id);
                                 }}/>
              </OverlayTrigger>
            }

            {editWorkflow ? <>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Delete Step" })}>
                <FontAwesomeIcon icon={faTrash} className="mr-2 ml-1 dark-grey"
                                 style={{ cursor: "pointer" }}
                                 onClick={() => {
                                   handleDeleteStepClick(index);
                                 }}/>
              </OverlayTrigger>
            </> : null}
          </div>
        </div>


        <div className="p-1 text-muted small">
          <FontAwesomeIcon icon={faToolbox} size="sm" fixedWidth
                           className="mr-1"/> Tool: {toolProperties.name || ""}
        </div>

        {/*{item.last_status && Object.keys(item.last_status).length > 0 && typeof (item.last_status.data) === "object" ?
          <div>
            {item.last_status.updatedAt ? <div className="pl-1 text-muted small">Last status
              on {format(new Date(item.last_status.updatedAt), "hh:mm a 'on' MMM dd yyyy'")}:</div> : null}
            <div className="pt-1 pl-1 code json-block-text small">
              {Object.keys(item.last_status.data).slice(0, 5).map(key => {
                if (typeof (item.last_status.data[key]) === "string" || typeof (item.last_status.data[key]) === "number") {
                  return <div key={key} className="json-block-text small ml-1"
                              style={{ padding: 0, margin: 0 }}>{key}: {item.last_status.data[key]}</div>;
                }
              })}
            </div>
          </div> : null}*/}

        <div className="p-1 text-muted small">
          <FontAwesomeIcon icon={faIdBadge} size="sm" fixedWidth
                           className="mr-1"/>ID: {item._id}</div>

        <div className="p-1 text-right">
          {stepConfigured === true &&
          <>
            {!editWorkflow &&
            <>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "View Settings" })}>
                <FontAwesomeIcon icon={faSearchPlus} //settings!
                                 className="text-muted mx-1" fixedWidth
                                 style={{ cursor: "pointer" }}
                                 onClick={() => {
                                   handleViewClick(item, "Step Settings");
                                 }}/>
              </OverlayTrigger>

              {itemState !== "running" ?
                <>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "View Step Activity Logs" })}>
                    <FontAwesomeIcon icon={faArchive}
                                     className="text-muted mx-1" fixedWidth
                                     style={{ cursor: "pointer" }}
                                     onClick={() => {
                                       parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id);
                                     }}/>
                  </OverlayTrigger>
                </>
                :
                <>
                  {toolProperties.properties && toolProperties.properties.isLiveStream && <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "View Running Tool Activity (if available)" })}>
                    <FontAwesomeIcon icon={faTerminal}
                                     className="green mx-1" fixedWidth
                                     style={{ cursor: "pointer" }}
                                     onClick={() => {
                                       setShowToolActivity(true);
                                     }}/>
                  </OverlayTrigger>}
                </>}

              {parentWorkflowStatus !== "running" ?
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
                                     }}/>
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
                                     className="text-muted mx-1" fixedWidth/>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Cannot access settings while pipeline is running" })}>
                    <FontAwesomeIcon icon={faCog}
                                     className="text-muted mx-1" fixedWidth/>
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
        setParentVisibility={() => setActivityLogModal({ ...activityLogModal, show: false })}/>

      {infoModal.show && <Modal header={infoModal.header} message={infoModal.message} button={infoModal.button}
                                handleCancelModal={() => setInfoModal({ ...infoModal, show: false })}/>}

      {showDeleteModal && <Modal header="Confirm Pipeline Step Delete"
                                 message="Warning! Data about this step cannot be recovered once it is deleted. Do you still want to proceed?"
                                 button="Confirm"
                                 handleCancelModal={() => setShowDeleteModal(false)}
                                 handleConfirmModal={() => handleDeleteStepClickConfirm(modalDeleteIndex)}/>}


      {showToolActivity && <StepToolActivityView pipelineId={pipelineId}
                                                 stepId={item._id}
                                                 itemState={itemState}
                                                 tool_identifier={item.tool.tool_identifier}
                                                 handleClose={() => setShowToolActivity(false)}/>}
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
  accessToken: PropTypes.string,
  editWorkflow: PropTypes.bool,
  parentCallbackEditItem: PropTypes.func,
  deleteStep: PropTypes.func,
  handleViewSourceActivityLog: PropTypes.func,
  parentHandleViewSourceActivityLog: PropTypes.func,
  customerAccessRules: PropTypes.object,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default PipelineWorkflowItem;