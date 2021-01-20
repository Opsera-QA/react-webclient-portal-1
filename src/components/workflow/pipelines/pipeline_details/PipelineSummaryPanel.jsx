import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import PipelineActions from "../../pipeline-actions";
import { format } from "date-fns";
import Modal from "../../../common/modal/modal";
import ModalActivityLogs from "../../../common/modal/modalActivityLogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faSave,
  faTimes,
  faCogs,
  faFlag, faUser, faUserFriends,
} from "@fortawesome/pro-light-svg-icons";
import "../../workflows.css";
import SchedulerWidget from "../../../common/schedulerWidget";
import PipelineHelpers from "../../pipelineHelpers";
import DropdownList from "react-widgets/lib/DropdownList";
import pipelineHelpers from "../../pipelineHelpers";
import { DialogToastContext } from "contexts/DialogToastContext";
import PipelineActionControls from "./PipelineActionControls";
import EditTagModal from "../../EditTagModal";
import PipelineSummaryActionBar from "../../../common/actions/pipeline/PipelineSummaryActionBar";
import InfoDialog from "../../../common/status_notifications/info";
import WorkflowAuthorizedActions from "./workflow/workflow-authorized-actions";
import PipelineSummaryMessages from "./pipelineSummaryMessage";
import EditRolesModal from "components/workflow/EditRolesModal";
import Model from "core/data_model/model";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";

const INITIAL_FORM_DATA = {
  name: "",
  project: { name: "", project_id: "" },
  description: "",
  type: [],
};

// TODO: This class needs to be reworked with new components and also to cleanup
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
  const toastContext = useContext(DialogToastContext);
  const { featureFlagHideItemInProd, getUserRecord } = contextType;
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalDeleteId, setModalDeleteId] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [editSchedule, setEditSchedule] = useState(false);
  const [editTags, setEditTags] = useState(false);
  const [editRoles, setEditRoles] = useState(false);
  const [editType, setEditType] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [approvalStep, setApprovalStep] = useState({});
  const [pipelineModel, setPipelineModel] = useState(new Model(pipeline, pipelineMetadata, false));
  const [infoModal, setInfoModal] = useState({ show: false, header: "", message: "", button: "OK" });
  let history = useHistory();


  const authorizedAction = (action, owner) => {
    return WorkflowAuthorizedActions.workflowItems(customerAccessRules, action, owner);
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

  const handleEditAccessRolesClick = () => {
    setEditRoles(true);
  };

  const handleCopyPipeline = async (pipelineId) => {
    const { getAccessToken } = contextType;
    await PipelineActions.duplicate(pipelineId, getAccessToken);
    setInfoModal({
      show: true,
      header: "Duplicate Pipeline",
      message: "A new pipeline configuration has been created, duplicating all of the settings from this one.  That pipeline is now in your list of Pipelines for viewing.  No tools or activity logs have been duplicated in this process.",
      button: "OK",
    });
  };


  const handlePublishPipelineClick = async (pipelineId) => {
    const { getAccessToken } = contextType;
    await PipelineActions.publish(pipelineId, getAccessToken);
    setInfoModal({
      show: true,
      header: "Publish Pipeline to Catalog",
      message: "You have published a copy of this pipeline in your shared Catalog for others to use.  Overall settings of the pipeline are shared but no tools or activity logs have been duplicated in this process.",
      button: "OK",
    });
  };

  const deleteItem = async (pipelineId) => {
    try {
      const { getAccessToken } = contextType;
      await PipelineActions.delete(pipelineId, getAccessToken);
      toastContext.showDeleteSuccessResultDialog("Pipeline");
      history.push("/workflow");
    }
    catch (error) {
      toastContext.showDeleteFailureResultDialog("Pipeline", error);
    }
  }

  const handleSavePropertyClick = async (pipelineId, value, type) => {
    if (Object.keys(value).length > 0 && type.length > 0) {
      const {getAccessToken} = contextType;
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
        case "roles":

          pipeline.roles = [...value];
          postBody = {
            "roles": [...value],
          };
          setEditRoles(false);
          break;
      }

      setPipelineModel(new Model({...pipeline}, pipelineMetadata, false));

      if (Object.keys(postBody).length > 0) {
        try {
          await PipelineActions.updatePipeline(pipelineId, postBody, getAccessToken);
          setFormData(INITIAL_FORM_DATA);
          toastContext.showUpdateSuccessResultDialog("Pipeline");
          await fetchPlan();
        } catch (error) {
          toastContext.showErrorDialog(error);
        }
      }
    }
  };

  const handleSetSchedule = async (schedule) => {
    await handleSavePropertyClick(pipeline._id, schedule, "schedule");
    setEditSchedule(false);
  };

  const handleEditPropertyClick = (type) => {
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
    case "roles":
        handleEditAccessRolesClick();
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

  const getTagField = () => {
    return (
      <Col xs={12} className="py-2"><span className="text-muted mr-1">Tags:</span>

        {!editTags && pipeline.tags &&
        <span className="item-field">
            {pipeline.tags.map((item, idx) => {
              if (typeof item !== "string")
                return (
                  <span key={idx} className="mx-1 mb-1 badge badge-secondary">
            <span className="mr-1">{item.type}:</span>{item.value}
            </span>
                );
            })}
          </span>
        }
        {authorizedAction("edit_pipeline_attribute", pipeline.owner) && parentWorkflowStatus !== "running" && getEditIcon("tags")}

        {editTags &&
        <EditTagModal data={pipeline.tags} visible={editTags} onHide={() => {
          setEditTags(false);
        }} onClick={(tags) => {
          handleSavePropertyClick(pipeline._id, tags, "tags");
        }}/>}

      </Col>
    );
  };

  // TODO: This can be removed once dto components are wired up
  const getRoleBadges = (roles) => {
    if (roles == null || roles.length === 0) {
      return <span>No Role Access Configurations Applied</span>;
    }

    return (
      roles.map((item, i) => {
        const user = item["user"];
        const group = item["group"];

        if (user) {
          return (
            <span key={i} className="mx-1 mb-1 badge badge-primary">
              <FontAwesomeIcon icon={faUser} fixedWidth className="mr-1"/>{`${user}: ${item.role}`}
            </span>
          );
        }

        return (
          <span key={i} className="mx-1 mb-1 badge badge-secondary">
            <FontAwesomeIcon icon={faUserFriends} fixedWidth className="mr-1"/>{`${group}: ${item.role}`}
          </span>
        );
      })
    );
  };

  const getRoleAccessField = () => {
    return (
      <Col xs={12} className="py-2"><span className="text-muted mr-1">Roles:</span>

        {!editRoles && pipeline.roles &&
          <span className="item-field">{getRoleBadges(pipeline.roles)}</span>}
        {authorizedAction("edit_pipeline_attribute", pipeline.owner) && parentWorkflowStatus !== "running" && getEditIcon("roles")}

        {editRoles &&
        <EditRolesModal setPipelineModel={setPipelineModel} pipelineModel={pipelineModel} data={pipeline.roles} visible={editRoles} onHide={() => {setEditRoles(false);}} onClick={(roles) => {handleSavePropertyClick(pipeline._id, roles, "roles");
        }}/>}

      </Col>
    );
  };

  if (!pipeline || Object.keys(pipeline).length <= 0) {
    return (<InfoDialog
      message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."/>);
  }

  return (
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

      <div className="mb-3 flat-top-content-block p-3">

        <div className="text-muted float-right">
          {/*TODO: Remove this and replace with new action bar*/}
          <PipelineSummaryActionBar
            pipeline={pipeline}
            handleDeleteClick={authorizedAction("delete_pipeline_btn", pipeline.owner) ? handleDeleteClick : undefined}
            handleDuplicateClick={authorizedAction("duplicate_pipeline_btn", pipeline.owner) ? handleCopyPipeline : undefined}
            handleViewClick={authorizedAction("view_template_pipeline_btn", pipeline.owner) ? handleViewClick : undefined}
            handlePublishClick={authorizedAction("publish_pipeline_btn", pipeline.owner) ? handlePublishPipelineClick : undefined}
            handleEditAccessRolesClick={authorizedAction("edit_access_roles", pipeline.owner) ? handleEditAccessRolesClick : undefined}
            canTransferPipeline={authorizedAction("transfer_pipeline_btn", pipeline.owner)}
            loadPipeline={fetchPlan}
          />
        </div>

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
                  {/*{Object.keys(approvalStep).length > 0 &&
                      <FontAwesomeIcon icon={faFlag} className="red mr-1 vertical-align-item" fixedWidth/>}*/}
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
          {/*<Col sm={12} md={6} className="py-2">
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
          </Col>*/}
          <Col xs={12} sm={6} className="py-2"><span className="text-muted mr-1">
            Owner:</span> {ownerName}</Col>
          <Col xs={12} sm={6} className="py-2"><span
            className="text-muted mr-1">Created On:</span> {pipeline.createdAt && format(new Date(pipeline.createdAt), "yyyy-MM-dd', 'hh:mm a")}
          </Col>
          <Col xs={12} sm={6} className="py-2"><span className="text-muted mr-1">
            Organization:</span> <span
            className="upper-case-first">{pipeline.organizationName}</span></Col>

          <Col lg className="py-1"><span className="text-muted mr-1">Org Account:</span> {pipeline.account}</Col>
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

              {/*TODO: Remove FF after schedler is fixed*/}
              {authorizedAction("edit_pipeline_attribute", pipeline.owner) && !featureFlagHideItemInProd() && parentWorkflowStatus !== "running" ?
                getEditIcon("schedule", true) : null}
            </Col>
          }
          {getTagField()}

          {!featureFlagHideItemInProd() && getRoleAccessField()}

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
                <span className="text-muted mr-1">Notes:</span>{pipeline.description}
                {authorizedAction("edit_pipeline_attribute", pipeline.owner)
                && parentWorkflowStatus !== "running"
                  ? getEditIcon("description")
                  : null}
              </Col>
            </>
          }

          {/*{_configuredToolsCount(pipeline.workflow.plan) === 0 &&
          <Col className="mt-3 mb-1">
            <Button variant="success" className="mr-2 mt-2" size="sm" onClick={() => setActiveTab("model")}>
              <FontAwesomeIcon icon={faCogs} className="mr-1" fixedWidth/>
              Build Workflow
            </Button>
          </Col>
          }*/}

          {pipeline.workflow?.last_run?.completed &&
          <Col sm={12} className="py-2">
            <span className="text-muted mr-1">Summary:</span> Last complete run of pipline finished on {
            format(new Date(pipeline.workflow.last_run.completed), "yyyy-MM-dd', 'hh:mm a")} with a status of {pipeline.workflow.last_run.status}.

            {(process.env.REACT_APP_STACK === "free-trial") &&
              <PipelineSummaryMessages
                type="free-trial-container-url-msg"
                lastRun={pipeline.workflow.last_run}
                tags={pipeline.tags}
                run={pipeline.workflow.run_count}
                getUserRecord={getUserRecord} />
            }
          </Col>
          }

        </Row>
      </div>

      {showDeleteModal ? <Modal header="Confirm Pipeline Delete"
                                message="Warning! This pipeline cannot be recovered once this pipeline is deleted. Do you still want to proceed?"
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