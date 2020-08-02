import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Button, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import PipelineActions from "./actions";
import { format } from "date-fns";
import Modal from "../common/modal/modal";
import ModalActivityLogs from "../common/modal/modalActivityLogs";
import ErrorDialog from "../common/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faPencilAlt,
  faTrash,
  faSave,
  faTimes,
  faCogs,
  faFlag,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import "./workflows.css";
import SchedulerWidget from "../common/schedulerWidget";
import PipelineHelpers from "./pipelineHelpers";
import EditToolModal from "./editToolModal";

const INITIAL_FORM_DATA = {
  name: "",
  project: { name: "", project_id: "" },
  description: "",
};


const PipelineOverviewSummary = (props) => {
  const { data, customerAccessRules, parentWorkflowStatus } = props;
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
  const [editTags, setEditTags] = React.useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [approvalStep, setApprovalStep] = useState({});
  const [infoModal, setInfoModal] = useState({ show: false, header: "", message: "", button: "OK" });
  const [ownerName, setOwnerName] = useState("");
  let history = useHistory();


  const authorizedAction = (action, owner) => {
    if (customerAccessRules.Administrator) {
      return true; //all actions are authorized to administrrator

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
    const runEffect = async () => {
      try {

        await loadFormData(data);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }
      }
    };
    runEffect();
    return () => {
      controller.abort();
    };
  }, []);


  const loadFormData = async (pipeline) => {
    if (pipeline.workflow !== undefined) {
      const { getAccessToken } = contextType;
      let owner = await PipelineHelpers.getUserNameById(pipeline.owner, getAccessToken);
      setOwnerName(owner);

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

      const step = PipelineHelpers.getPendingApprovalStep(data);
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

      if (type === "name") {
        data.name = value.name;
        postBody = {
          "name": value.name,
        };
        setEditTitle(false);

      } else if (type === "project") {
        data.project.name = value.project.name;
        postBody = {
          "project": {
            "name": value.project.name,
            "project_id": "",
          },
        };
        setEditProject(false);

      } else if (type === "description") {
        data.description = value.description;
        postBody = {
          "description": value.description,
        };
        setEditDescription(false);

      } else if (type === "schedule") {
        data.workflow.schedule = value;
        postBody = {
          "workflow": data.workflow,
        };
        setEditTitle(false);
      } else if (type === "tags") {
        data.tags = value;
        postBody = {
          "tags": data.tags,
        };
        setEditTags(false);
      }

      if (Object.keys(postBody).length > 0) {
        const response = await PipelineActions.save(pipelineId, postBody, getAccessToken);
        //console.log(response);
        if (typeof (response.error) !== "undefined") {
          console.log(response.error);
          setErrors(response.error);
        } else {
          setFormData(INITIAL_FORM_DATA);
        }
      }
    } else {
      console.log("Missing value or type for edit field");
    }
  };

  const handleSetSchedule = async (schedule) => {
    handleSavePropertyClick(data._id, schedule, "schedule");
    setEditSchedule(false);
  };


  return (
    <>
      {error ? <ErrorDialog error={error}/> : null}
      {typeof (data) !== "undefined" && data !== {} ?
        <>
          <div className="my-1 w-100 max-content-width">
            {data.owner !== customerAccessRules.UserId &&
            <>
              <div className="mb-2 w-100 max-charting-width info-text">
                {customerAccessRules.Role === "administrator" && <>Administrator Access Role: Your account has full
                  access to this pipeline and its settings.</>}
                {customerAccessRules.Role === "power_user" && <>Power User Role: Your account has elevated privileges to
                  this pipeline which include changing settings and running the pipeline.</>}
                {customerAccessRules.Role === "user" && <>Standard User Role: Your account has basic access to this
                  pipeline which is limited to viewing and running pipeline operations only.</>}
                {customerAccessRules.Role === "readonly" && <>Read Only Role: Your account does not have any privileges
                  associated with this pipeline. You are being temporarily granted Viewer permissions and will not be able to perform any
                  actions.</>}
              </div>
            </>
            }

            <div className="title-text-5">
              {editTitle ?
                <>
                  <Row>
                    <Col sm={11}>
                      <Form.Control maxLength="500" type="text" placeholder="" value={formData.name || ""}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}/></Col>
                    <Col sm={1} className="my-auto">
                      <FontAwesomeIcon icon={faSave}
                                       className="text-muted"
                                       size="sm"
                                       style={{ cursor: "pointer" }}
                                       onClick={() => {
                                         handleSavePropertyClick(data._id, formData, "name");
                                       }}/>
                      <FontAwesomeIcon icon={faTimes}
                                       className="text-muted ml-3"
                                       size="sm"
                                       style={{ cursor: "pointer" }}
                                       onClick={() => {
                                         setEditTitle(false);
                                       }}/>
                    </Col>
                  </Row>
                </>
                :
                <>
                  {Object.keys(approvalStep).length > 0 && <FontAwesomeIcon icon={faFlag} className="red mr-1"/>}
                  {data.name}
                  {authorizedAction("edit_pipeline_attribute", data.owner) && parentWorkflowStatus !== "running" ?
                    <FontAwesomeIcon icon={faPencilAlt}
                                     className="ml-2 text-muted"
                                     size="xs" transform="shrink-6"
                                     style={{ cursor: "pointer" }}
                                     onClick={() => {
                                       setEditTitle(true);
                                       setFormData({ ...formData, name: data.name });
                                     }}/> : null}
                </>
              }</div>
          </div>

          <div className="default-custom-tabs">
            <ul className="nav nav-tabs w-100">
              <li className="nav-item">
                <Link className="nav-link active"
                      to={location => `/workflow/${data._id}`}>Summary</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"
                      to={location => `/workflow/${data._id}/model`}>Workflow</Link>
              </li>
            </ul>
          </div>

          <div className="mb-3 flat-top-content-block p-3">
            <div className="mb-2 text-muted">
              {authorizedAction("delete_pipeline_btn", data.owner) &&
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Delete this pipeline" })}>
                <FontAwesomeIcon icon={faTrash} className="pointer red float-right ml-3" onClick={() => {
                  handleDeleteClick(data._id);
                }}/></OverlayTrigger>}

              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Duplicate this pipeline configuration" })}>
                <FontAwesomeIcon icon={faCopy} className="pointer float-right ml-3" onClick={() => {
                  handleCopyPipeline(data._id);
                }}/></OverlayTrigger>

              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "View Pipeline Configurations" })}>
                <FontAwesomeIcon icon={faFileAlt}
                                 className="float-right text-muted ml-3"
                                 style={{ cursor: "pointer" }}
                                 onClick={() => {
                                   handleViewClick(data);
                                 }}/></OverlayTrigger>

              {editDescription ?
                <>
                  <Row className="my-2">
                    <Col sm={11}>
                      <Form.Control maxLength="2000" as="textarea" type="text" placeholder=""
                                    value={formData.description || ""}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}/></Col>
                    <Col sm={1} className="my-auto">
                      <FontAwesomeIcon icon={faSave}
                                       className="text-muted"
                                       size="sm"
                                       style={{ cursor: "pointer" }}
                                       onClick={() => {
                                         handleSavePropertyClick(data._id, formData, "description");
                                       }}/>
                      <FontAwesomeIcon icon={faTimes}
                                       className="text-muted ml-3"
                                       size="sm"
                                       style={{ cursor: "pointer" }}
                                       onClick={() => {
                                         setEditDescription(false);
                                       }}/>
                    </Col>
                  </Row>
                </>
                :
                <>
                  {data.description}
                  {authorizedAction("edit_pipeline_attribute", data.owner) && parentWorkflowStatus !== "running" ?
                    <FontAwesomeIcon icon={faPencilAlt}
                                     className="ml-2 text-muted"
                                     size="xs" transform="shrink-5"
                                     style={{ cursor: "pointer" }}
                                     onClick={() => {
                                       setEditDescription(true);
                                       setFormData({ ...formData, description: data.description });
                                     }}/> : null}
                </>
              }
            </div>
            <hr></hr>
            <Row className="mt-3">
              <Col lg className="py-1"><span className="text-muted mr-1">ID:</span> {data._id}</Col>
              <Col lg className="py-1"><span
                className="text-muted mr-1">Pipeline Run Count:</span> {data.workflow.run_count || "0"}</Col>
            </Row>


            <Row className="row-content-spacing">

              <Col>
                {editProject ?
                  <>
                    <Row className="my-2">
                      <Col sm={9}>
                        <Form.Control maxLength="150" type="text" placeholder="Project Name"
                                      value={formData.project.name || ""}
                                      onChange={e => setFormData({ ...formData, project: { name: e.target.value } })}/></Col>
                      <Col sm={3} className="my-auto">
                        <FontAwesomeIcon icon={faSave}
                                         className="text-muted"
                                         size="sm"
                                         style={{ cursor: "pointer" }}
                                         onClick={() => {
                                           handleSavePropertyClick(data._id, formData, "project");
                                         }}/>
                        <FontAwesomeIcon icon={faTimes}
                                         className="text-muted ml-3"
                                         size="sm"
                                         style={{ cursor: "pointer" }}
                                         onClick={() => {
                                           setEditProject(false);
                                         }}/>
                      </Col>
                    </Row>
                  </>
                  :
                  <>
                    <span
                      className="text-muted">Project: </span> {data.project !== undefined && data.project.hasOwnProperty("name") ? <>{data.project.name}</> :
                    <span className="text-muted font-italic">untitled</span>}
                    {authorizedAction("edit_pipeline_attribute", data.owner) && parentWorkflowStatus !== "running" ?
                      <FontAwesomeIcon icon={faPencilAlt}
                                       className="ml-2 text-muted"
                                       size="xs" transform="shrink-6"
                                       style={{ cursor: "pointer" }}
                                       onClick={() => {
                                         setEditProject(true);
                                         setFormData({
                                           ...formData,
                                           project: { name: data.project !== undefined && data.project.hasOwnProperty("name") ? data.project.name : "" },
                                         });
                                       }}/> : null}
                  </>}
              </Col>
              <Col lg className="py-1"><span className="text-muted mr-1">Owner:</span> {ownerName}</Col>
            </Row>
            <Row className="row-content-spacing">
              <Col lg className="py-1"><span className="text-muted mr-1">Organization:</span> <span
                className="upper-case-first">{data.organizationName}</span></Col>
              <Col lg className="py-1"><span
                className="text-muted mr-1">Created On:</span> {data.createdAt && format(new Date(data.createdAt), "yyyy-MM-dd', 'hh:mm a")}
              </Col>
            </Row>

            <Row className="row-content-spacing">
              <Col className="py-1"><span className="text-muted mr-1">Tags:</span>
                {!editTags && authorizedAction("edit_pipeline_attribute", data.owner) && parentWorkflowStatus !== "running" && <>
                  {data.tags.map((item, idx) => (<span key={idx}>{item}, </span>))}
                  <FontAwesomeIcon icon={faPencilAlt}
                                   className="ml-2 text-muted"
                                   size="xs" transform="shrink-4"
                                   style={{ cursor: "pointer" }}
                                   onClick={() => {
                                     setEditTags(true);
                                   }}/>
                </>}
                {editTags && <EditToolModal data={data.tags} visible={editTags} onHide={() => {
                  setEditTags(false);
                }} onClick={(tags) => {
                  handleSavePropertyClick(data._id, tags, "tags");
                }}/>}
              </Col>
            </Row>

            <Row className="row-content-spacing">
              {editSchedule ?
                <>
                  <Col xs={12} md={8}><span className="text-muted mr-1">Schedule:</span>
                    <SchedulerWidget
                      startDate={data.workflow.schedule ? data.workflow.schedule.start_date : new Date()}
                      frequency={data.workflow.schedule ? data.workflow.schedule.frequency : ""}
                      schedule={data.workflow.schedule ? data.workflow.schedule : null}
                      setEditSchedule={setEditSchedule}
                      setSchedule={handleSetSchedule}></SchedulerWidget></Col>
                  <Col xs={6} md={4}></Col>
                </> :

                <Col className="py-1"><span className="text-muted mr-1">Schedule:</span>
                  {data.workflow.schedule && data.workflow.schedule.start_date !== null && !editSchedule ?
                    <>
                      <span
                        className="ml-1">Run next on: {format(new Date(data.workflow.schedule.start_date), "yyyy-MM-dd', 'hh:mm a")}</span>
                      <span
                        className="ml-2">Frequency: {data.workflow.schedule ? data.workflow.schedule.frequency : "undefined"}</span>
                    </> : null}

                  {authorizedAction("edit_pipeline_attribute", data.owner) && parentWorkflowStatus !== "running" ?
                    <FontAwesomeIcon icon={faPencilAlt}
                                     className="ml-2 text-muted"
                                     size="xs" transform="shrink-4"
                                     style={{ cursor: "pointer" }}
                                     onClick={() => {
                                       setEditSchedule(true);
                                     }}/> : null}
                </Col>
              }
            </Row>

            {_configuredToolsCount(data.workflow.plan) === 0 &&
            <Row>
              <Col className="mt-3 mb-1">
                <LinkContainer to={`/workflow/${data._id}/model`}>
                  <Button variant="success" className="mr-2 mt-2" size="sm">
                    <FontAwesomeIcon icon={faCogs} className="mr-1" fixedWidth/>Build Workflow</Button>
                </LinkContainer>
              </Col>
            </Row>}
          </div>
        </>
        : null}

      {showDeleteModal ? <Modal header="Confirm Pipeline Delete"
                                message="Warning! Data cannot be recovered once this pipeline is deleted. Do you still want to proceed?"
                                button="Confirm"
                                handleCancelModal={() => setShowDeleteModal(false)}
                                handleConfirmModal={() => deleteItem(modalDeleteId)}/> : null}

      <ModalActivityLogs header="Pipeline Details" size="lg" jsonData={modalMessage} show={showModal}
                         setParentVisibility={setShowModal}/>
      {infoModal.show && <Modal header={infoModal.header} message={infoModal.message} button={infoModal.button}
                                handleCancelModal={() => setInfoModal({ ...infoModal, show: false })}/>}

    </>

  );
};


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

function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}


PipelineOverviewSummary.propTypes = {
  data: PropTypes.object,
  customerAccessRules: PropTypes.object,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
export default PipelineOverviewSummary;