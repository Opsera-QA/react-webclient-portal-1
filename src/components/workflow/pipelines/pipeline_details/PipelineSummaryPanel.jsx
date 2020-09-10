import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import { Row, Col, Button, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import PipelineActions from "../../pipeline-actions";
import { format } from "date-fns";
import Modal from "../../../common/modal/modal";
import ModalActivityLogs from "../../../common/modal/modalActivityLogs";
import ErrorDialog from "../../../common/status_notifications/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faSave,
  faTimes,
  faCogs,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import "../../workflows.css";
import SchedulerWidget from "../../../common/schedulerWidget";
import PipelineHelpers from "../../pipelineHelpers";
import DropdownList from "react-widgets/lib/DropdownList";
import SummaryActionBar from "../../../common/actions/SummaryActionBar";
import pipelineHelpers from "../../pipelineHelpers";
import { getCreateSuccessResultDialog, getUpdateSuccessResultDialog } from "../../../common/toasts/toasts";
import PipelineActionControls from "./PipelineActionControls";
import EditTagModal from "../../EditTagModal";

const INITIAL_FORM_DATA = {
  name: "",
  project: { name: "", project_id: "" },
  description: "",
  type: [],
};

function PipelineSummaryPanel({
  pipeline,
  ownerName,
  customerAccessRules,
  parentWorkflowStatus,
  setActiveTab,
  fetchPlan,
  setWorkflowStatus,
  getActivityLogs,
  setRefreshCount,
  setPipeline,
  refreshCount,
}) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalDeleteId, setModalDeleteId] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [editSchedule, setEditSchedule] = useState(false);
  const [editTags, setEditTags] = useState(false);
  const [editType, setEditType] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [approvalStep, setApprovalStep] = useState({});
  const [infoModal, setInfoModal] = useState({ show: false, header: "", message: "", button: "OK" });
  let history = useHistory();
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);


  const authorizedAction = (action, owner) => {
    if (customerAccessRules.Administrator) {
      return true; //all actions are authorized to administrator

    } else if (owner && customerAccessRules.UserId === owner) {
      return true; //owner can do all actions

    } else if (customerAccessRules.PowerUser) {
      switch (action) {
      case "edit_pipeline_attribute":
        return true;
      default:
        return false; //all other options are disabled
      }

    } else if (customerAccessRules.User) {
      return false; //all other options are disabled
    } else {
      return false;
    }
  };


  useEffect(() => {
    const controller = new AbortController();
    loadData();
    return () => {
      controller.abort();
    };
  }, []);

  const loadData = async () => {
    try {
      await loadFormData(pipeline);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Request was canceled via controller.abort");
        return;
      }
    }
  };

  const loadFormData = async (pipeline) => {
    if (pipeline.workflow !== undefined) {
      const { getAccessToken } = contextType;

      if (pipeline.workflow.last_step !== undefined) {
        let status = pipeline.workflow.last_step.hasOwnProperty("status") ? pipeline.workflow.last_step.status : false;

        if (status === "stopped" && pipeline.workflow.last_step.running && pipeline.workflow.last_step.running.paused) {
          setWorkflowStatus("paused");
        } else {
          setWorkflowStatus(status);
        }
      } else {
        setWorkflowStatus(false);
      }

      const step = await PipelineHelpers.getPendingApprovalStep(pipeline);
      if (step) {
        setApprovalStep(step);
      } else {
        setApprovalStep({});
      }
    }
  };


  const handleViewClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  const handleDeleteClick = (itemId) => {
    setShowDeleteModal(true);
    setModalDeleteId(itemId);
  };

  const handleCopyPipeline = async (pipelineId) => {
    const { getAccessToken } = contextType;
    await PipelineActions.duplicate(pipelineId, getAccessToken);
    setInfoModal({
      show: true,
      header: "Duplicate Pipeline",
      message: "A new pipeline configuration has been created, duplicating all of the settings from this one.  That pipeline is now in your list of Pipelines for viewing.  No tools or activity logs were duplicated in this process.",
      button: "OK",
    });
  };

  async function deleteItem(pipelineId) {
    const { getAccessToken } = contextType;
    await PipelineActions.delete(pipelineId, getAccessToken);
    history.push("/workflow");
  }

  const handleSavePropertyClick = async (pipelineId, value, type) => {
    if (Object.keys(value).length > 0 && type.length > 0) {
      const { getAccessToken } = contextType;
      let postBody = {};

      switch (type) {
      case "name":
        pipeline.name = value.name;
        postBody = {
          "name": value.name,
        };
        setEditTitle(false);
        break;
      case "project":
        pipeline.project.name = value.project.name;
        postBody = {
          "project": {
            "name": value.project.name,
            "project_id": "",
          },
        };
        setEditProject(false);
        break;
      case "description":
        pipeline.description = value.description;
        postBody = {
          "description": value.description,
        };
        setEditDescription(false);
        break;
      case "schedule":
        pipeline.workflow.schedule = value;
        postBody = {
          "workflow": pipeline.workflow,
        };
        setEditTitle(false);
        break;
      case "tags":
        pipeline.tags = value;
        postBody = {
          "tags": pipeline.tags,
        };
        setEditTags(false);
        break;
      case "type":
        pipeline.type = value.type;
        postBody = {
          "type": value.type,
        };
        setEditType(false);
        break;
      }

      if (Object.keys(postBody).length > 0) {
        try {
          const response = await PipelineActions.updatePipeline(pipelineId, postBody, getAccessToken);
          setFormData(INITIAL_FORM_DATA);
          let toast = getUpdateSuccessResultDialog("Pipeline", setShowToast);
          setToast(toast);
          setShowToast(true);
          await fetchPlan();
        } catch (error) {
          console.error(error);
          setErrors(error);
        }
      }
    } else {
      console.error("Missing value or type for edit field");
    }
  };

  const handleSetSchedule = async (schedule) => {
    handleSavePropertyClick(pipeline._id, schedule, "schedule");
    setEditSchedule(false);
  };

  const handleEditPropertyClick = (type) => {
    console.log("in handle edit property click: " + type);
    switch (type) {
    case "name":
      setEditTitle(true);
      setFormData({ ...formData, name: pipeline.name });
      break;
    case "project":
      setEditProject(true);
      setFormData({
        ...formData,
        project: { name: pipeline.project !== undefined && pipeline.project.hasOwnProperty("name") ? pipeline.project.name : "" },
      });
      break;
    case "description":
      setEditDescription(true);
      setFormData({ ...formData, description: pipeline.description });
      break;
    case "schedule":
      setEditSchedule(true);
      break;
    case "tags":
      setEditTags(true);
      break;
    case "type":
      setEditType(true);
      break;
    default:
      console.error("Missing value or type for edit field");
    }
  };

  const getSaveIcon = (field) => {
    return (
      <FontAwesomeIcon
        icon={faSave}
        className="text-muted"
        size="sm"
        style={{ cursor: "pointer" }}
        onClick={() => {
          handleSavePropertyClick(pipeline._id, formData, field);
        }}/>
    );
  };

  const getEditIcon = (field) => {
    return (
      <FontAwesomeIcon
        icon={faPencilAlt}
        className="ml-2 text-muted"
        size="xs" transform="shrink-6"
        style={{ cursor: "pointer" }}
        onClick={() => {
          handleEditPropertyClick(field);
        }}/>
    );
  };

  const getCancelIcon = (cancelFunction) => {
    return (
      <FontAwesomeIcon
        icon={faTimes}
        className="text-muted ml-3"
        size="sm"
        style={{ cursor: "pointer" }}
        onClick={() => {
          cancelFunction(false);
        }}/>
    );
  };

  return (
    <>
      {error ? <ErrorDialog error={error}/> : null}
      {typeof (pipeline) !== "undefined" && pipeline !== {} ?
        <>
          <div>
            <div className="text-right py-2">
              <PipelineActionControls pipeline={pipeline} disabledActionState={false}
                                      customerAccessRules={customerAccessRules}
                                      fetchData={fetchPlan}
                                      setPipeline={setPipeline}
                                      setRefreshCount={setRefreshCount}
                                      refreshCount={refreshCount}
                                      fetchActivityLogs={getActivityLogs}
                                      setParentWorkflowStatus={setWorkflowStatus}/>


            </div>
          </div>
          <div>
            {pipeline.owner !== customerAccessRules.UserId &&
            <>
              <div className="mb-2 max-charting-width info-text">
                {customerAccessRules.Role === "administrator" && <>Administrator Access Role: Your account has full
                  access to this pipeline and its settings.</>}
                {customerAccessRules.Role === "power_user" && <>Power User Role: Your account has elevated privileges to
                  this pipeline which include changing settings and running the pipeline.</>}
                {customerAccessRules.Role === "user" && <>Standard User Role: Your account has basic access to this
                  pipeline which is limited to viewing and running pipeline operations only.</>}
                {customerAccessRules.Role === "readonly" && <>Read Only Role: Your account does not have any privileges
                  associated with this pipeline. You are being temporarily granted Viewer permissions and will not be
                  able to perform any
                  actions.</>}
              </div>
            </>
            }
          </div>

          <div className="mb-3 flat-top-content-block p-3">

            <div className="text-muted float-right">
              <SummaryActionBar
                itemId={pipeline._id}
                itemName={"Pipeline"}
                data={pipeline}
                /*backButtonPath={"/workflow"}*/
                handleDeleteClick={authorizedAction("delete_pipeline_btn", pipeline.owner) ? handleDeleteClick : undefined}
                handleDuplicateClick={handleCopyPipeline}
                handleViewClick={handleViewClick}
              />
            </div>
            {showToast && toast}
            <Row>
              <Col sm={12}>
                <div className="d-flex py-2">
                  {editTitle ?
                    <>
                      <div className="flex-fill p-2">
                        <Form.Control maxLength="500" type="text" placeholder="" value={formData.name || ""}
                                      onChange={e => setFormData({ ...formData, name: e.target.value })}/></div>
                      <div className="flex-fill p-2">
                        {getSaveIcon("name")}
                        {getCancelIcon(setEditTitle)}
                      </div>
                    </>
                    :
                    <>
                      {Object.keys(approvalStep).length > 0 && <FontAwesomeIcon icon={faFlag} className="red mr-1"/>}
                      <span className="text-muted mr-1">Name:</span> {pipeline.name}
                      {authorizedAction("edit_pipeline_attribute", pipeline.owner)
                      && parentWorkflowStatus !== "running"
                        ? getEditIcon("name")
                        : null}
                    </>
                  }</div>
              </Col>
              <Col sm={12} md={6} className="py-2"><span className="text-muted mr-1">ID:</span> {pipeline._id}</Col>
              <Col sm={12} md={6} className="py-2"><span
                className="text-muted mr-1">Pipeline Run Count:</span> {pipeline.workflow.run_count || "0"}</Col>
              <Col sm={12} md={6} className="py-2">
                {editProject ?
                  <>
                    <Row className="">
                      <Col sm={9}>
                        <Form.Control maxLength="150" type="text" placeholder="Project Name"
                                      value={formData.project.name || ""}
                                      onChange={e => setFormData({
                                        ...formData,
                                        project: { name: e.target.value },
                                      })}/></Col>
                      <Col sm={3} className="my-auto">
                        {getSaveIcon("project")}
                        {getCancelIcon(setEditProject)}
                      </Col>
                    </Row>
                  </>
                  :
                  <>
                    <span
                      className="text-muted">Project: </span> {pipeline.project !== undefined && pipeline.project.hasOwnProperty("name") ? <>{pipeline.project.name}</> :
                    <span className="text-muted font-italic">untitled</span>}
                    {authorizedAction("edit_pipeline_attribute", pipeline.owner)
                    && parentWorkflowStatus !== "running"
                      ? getEditIcon("project")
                      : null}
                  </>}
              </Col>
              <Col xs={12} sm={6} className="py-2"><span className="text-muted mr-1">Owner:</span> {ownerName}</Col>
              <Col xs={12} sm={6} className="py-2"><span className="text-muted mr-1">Organization:</span> <span
                className="upper-case-first">{pipeline.organizationName}</span></Col>
              <Col xs={12} sm={6} className="py-2"><span
                className="text-muted mr-1">Created On:</span> {pipeline.createdAt && format(new Date(pipeline.createdAt), "yyyy-MM-dd', 'hh:mm a")}
              </Col>
              <Col xs={12} sm={6} className="py-2"><span className="text-muted mr-1">Tags:</span>
                {authorizedAction("edit_pipeline_attribute", pipeline.owner) && parentWorkflowStatus !== "running" && getEditIcon("tags")}

                {!editTags && pipeline.tags &&
                  pipeline.tags.map((item, idx) => {
                    if (typeof item !== "string")
                      return (
                        <div>
                          <span className="ml-1" key={idx}><span className="mr-1">{item.type}:</span>{item.value}</span>
                        </div>
                      );})
                }

                {editTags &&
                <EditTagModal data={pipeline.tags} visible={editTags} onHide={() => {
                  setEditTags(false);
                }} onClick={(tags) => {
                  handleSavePropertyClick(pipeline._id, tags, "tags");
                }}/>}

              </Col>
              <Col xs={12} sm={6} className="py-2"><span className="text-muted mr-2">Type:</span>
                {pipeline.type && !editType && pipelineHelpers.displayPipelineType(pipeline.type)}
                {authorizedAction("edit_pipeline_attribute", pipeline.owner)
                && parentWorkflowStatus !== "running" && !editType
                  ? getEditIcon("type")
                  : null}
                {editType &&
                <div className="d-flex mt-1">
                  <div className="w-75">
                    <DropdownList
                      data={pipelineHelpers.PIPELINE_TYPES}
                      defaultValue={pipeline.type[0]}
                      valueField='id'
                      textField='name'
                      onChange={e => {
                        let type = formData.type;
                        type[0] = e.id;
                        setFormData({ ...formData, type: type });
                      }}
                    />
                  </div>
                  <div className="px-2 pt-1">
                    {getSaveIcon("type")}
                    {getCancelIcon(setEditType)}
                  </div>
                </div>
                }
              </Col>
              {editSchedule ?
                <>
                  <Col xs={12} sm={6} className="py-2"><span className="text-muted mr-1">Schedule:</span>
                    <SchedulerWidget
                      startDate={pipeline.workflow.schedule ? pipeline.workflow.schedule.start_date : new Date()}
                      frequency={pipeline.workflow.schedule ? pipeline.workflow.schedule.frequency : ""}
                      schedule={pipeline.workflow.schedule ? pipeline.workflow.schedule : null}
                      setEditSchedule={setEditSchedule}
                      setSchedule={handleSetSchedule}></SchedulerWidget>
                  </Col>
                </> :

                <Col xs={12} sm={6} className="py-2"><span className="text-muted mr-1">Schedule:</span>
                  {pipeline.workflow.schedule
                  && pipeline.workflow.schedule.start_date !== null
                  && !editSchedule
                    ? <>
                      <span
                        className="ml-1">Run next on: {format(new Date(pipeline.workflow.schedule.start_date), "yyyy-MM-dd', 'hh:mm a")}</span>
                      <span
                        className="ml-2">Frequency: {pipeline.workflow.schedule ? pipeline.workflow.schedule.frequency : "undefined"}</span>
                    </> : null}

                  {authorizedAction("edit_pipeline_attribute", pipeline.owner) && parentWorkflowStatus !== "running" ?
                    getEditIcon("schedule") : null}
                </Col>
              }
              <Col lg className="py-1"><span className="text-muted mr-1">Org Account:</span> {pipeline.account}</Col>

              {editDescription ?
                <>
                  <Col xs={11}>
                    <Form.Control maxLength="2000" as="textarea" type="text" placeholder=""
                                  value={formData.description || ""}
                                  onChange={e => setFormData({ ...formData, description: e.target.value })}/></Col>
                  <Col xs={1} className="my-auto">
                    {getSaveIcon("description")}
                    {getCancelIcon(setEditDescription)}
                  </Col>
                </>
                :
                <>
                  <Col sm={12} className="py-2">
                    <span className="text-muted mr-1">Description:</span>{pipeline.description}
                    {authorizedAction("edit_pipeline_attribute", pipeline.owner)
                    && parentWorkflowStatus !== "running"
                      ? getEditIcon("description")
                      : null}
                  </Col>
                </>
              }
              {_configuredToolsCount(pipeline.workflow.plan) === 0 &&
              <Col className="mt-3 mb-1">
                <Button variant="success" className="mr-2 mt-2" size="sm" onClick={() => setActiveTab("model")}>
                  <FontAwesomeIcon icon={faCogs} className="mr-1" fixedWidth/>
                  Build Workflow
                </Button>
              </Col>
              }
            </Row>
          </div>
        </>
        : null}

      {showDeleteModal ? <Modal header="Confirm Pipeline Delete"
                                message="Warning! pipeline cannot be recovered once this pipeline is deleted. Do you still want to proceed?"
                                button="Confirm"
                                handleCancelModal={() => setShowDeleteModal(false)}
                                handleConfirmModal={() => deleteItem(modalDeleteId)}/> : null}

      <ModalActivityLogs header="Pipeline Details" size="lg" jsonData={modalMessage} show={showModal}
                         setParentVisibility={setShowModal}/>
      {infoModal.show && <Modal header={infoModal.header} message={infoModal.message} button={infoModal.button}
                                handleCancelModal={() => setInfoModal({ ...infoModal, show: false })}/>}

    </>

  );
}

const _configuredToolsCount = (array) => {
  let toolsCount = 0;
  array.map((item) => {
    if (item.tool !== undefined) {
      if ((item.tool.tool_identifier !== undefined && item.tool.tool_identifier !== "") || item.tool.configuration !== undefined) {
        toolsCount++;
      }
    }
  });
  return toolsCount;
};

PipelineSummaryPanel.propTypes = {
  pipeline: PropTypes.object,
  getActivityLogs: PropTypes.func,
  customerAccessRules: PropTypes.object,
  ownerName: PropTypes.string,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setActiveTab: PropTypes.func,
  fetchPlan: PropTypes.func,
  setWorkflowStatus: PropTypes.func,
  setPipeline: PropTypes.func,
  refreshCount: PropTypes.number,
  setRefreshCount: PropTypes.func,
};

export default PipelineSummaryPanel;