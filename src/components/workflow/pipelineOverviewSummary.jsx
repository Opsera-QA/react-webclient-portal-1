import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import socketIOClient from "socket.io-client";
import { useHistory, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Row, Col, Button, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import PipelineActions from "./actions";
import { format } from "date-fns";
import Modal from "../common/modal";
import ModalActivityLogs from "../common/modalActivityLogs";
import ErrorDialog from "../common/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faPencilAlt, faHistory, faSync, faPlay, faTrash, faStopCircle, faSave, faSpinner, faTimes, faCogs, faPause, faHourglass, faFlag, faCopy } from "@fortawesome/free-solid-svg-icons";
import "./workflows.css";
import SchedulerWidget from "../common/schedulerWidget";
import isEqual from "lodash.isequal";
import ApprovalModal from "./approvalModal";
import PipelineHelpers from "./pipelineHelpers";
import EditToolModal from "./editToolModal";

const INITIAL_FORM_DATA = {
  name: "",
  project: { name: "", project_id: "" },
  description: ""
};


const PipelineItemDetail = (props) => {
  const { data, role, stepStatus, parentCallback, parentCallbackRefreshActivity } = props;
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [showModal, setShowModal] = useState(false);
  const [socketRunning, setSocketRunning] = useState(false);
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
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [infoModal, setInfoModal] = useState({ show:false, header: "", message: "", button: "OK" });
  const endPointUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
  const [ownerName, setOwnerName] = useState("");
  let history = useHistory();
  
  
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

        if (status === "running" && !socketRunning) {
          subscribeToTimer();
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


  let tmpDataObject = {};
  let staleRefreshCount = 0;
  const subscribeToTimer = () => {    
    const socket = socketIOClient(endPointUrl, { query: "pipelineId=" + data._id });
    console.log("Connected status before onConnect", socket.socket ? socket.socket.connected : socket.socket === undefined );
    setSocketRunning(true);
    
    if (socket.socket === undefined ) {
      socket.emit("subscribeToPipelineActivity", 1000);
      socket.on("subscribeToPipelineActivity", dataObj => {
        console.log("Update from Websocket (staleRefreshCount: "+staleRefreshCount+"): ", dataObj);
        if (isEqual(dataObj, tmpDataObject)) {
          staleRefreshCount++;
        } else {
          staleRefreshCount = 0;
        }  
        tmpDataObject = dataObj;
        let status =  data.workflow.last_step !== undefined && data.workflow.last_step.hasOwnProperty("status") ? data.workflow.last_step.status : false;

        if (staleRefreshCount >= 20) {
          console.log("closing connection due to stale data");
          setWorkflowStatus(false);
          setSocketRunning(false);
          socket.close();
          parentCallbackRefreshActivity();
        } else {          
          if (status === "stopped" && data.workflow.last_step.running && data.workflow.last_step.running.paused) {
            setWorkflowStatus("paused");
          } else {
            setWorkflowStatus(status);
          }
        }
           
        if (typeof(dataObj) !== "undefined" && Object.keys(dataObj).length > 0) {
          data.workflow.last_step = dataObj;          
        }

        if (staleRefreshCount > 3 && status === "stopped") {
          console.log("closing connection due to stopped status");
          setWorkflowStatus(false);
          setSocketRunning(false);
          socket.close();
          parentCallbackRefreshActivity();
        }

      });
    }

    socket.on("disconnect", () => {
      setWorkflowStatus(false);
      setSocketRunning(false);
    });

    socket.on("connect_error", function(err) {
      console.log("Connection Error on Socket:", err);
      setWorkflowStatus(false);
      setSocketRunning(false);
      socket.close();
    });
  };

  const handleViewClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  const handleRefreshClick = () => {
    parentCallback();
    parentCallbackRefreshActivity();
  };

  const handleDeleteClick = (itemId) => e => {
    e.preventDefault();
    setShowDeleteModal(true);
    setModalDeleteId(itemId);    
  };

  const handleCopyPipeline = (itemId) => {
    console.log("Copy this pipeline coming soon.", itemId);
  };

  const handleApprovalClick = () => {
    setShowApprovalModal(true);    
  };

  const handleApprovalActivity = () => {
    setInfoModal({ show:true, header: "Approval Status", message: "Your approval action has been recorded in this pipeline's Activity Logs.  The pipeline will resume operations shortly.", button: "OK" });
    setWorkflowStatus("running");  
    parentCallback();
    subscribeToTimer();  
  };

  const handleStopWorkflowClick = async (pipelineId) => {
    await stopPipeline(pipelineId);
    setWorkflowStatus(false);    
  };
  
  const handleRunPipelineClick = async (pipelineId, oneStep) => {
    await runPipeline(pipelineId, oneStep);
    setWorkflowStatus("running");
    subscribeToTimer();  
  };
  
  async function deleteItem(pipelineId) {
    const { getAccessToken } = contextType;
    await PipelineActions.delete(pipelineId, getAccessToken);
    history.push("/workflow");
  }

  async function runPipeline(pipelineId) {
    const { getAccessToken } = contextType;
    const postBody = {};
    const response = await PipelineActions.run(pipelineId, postBody, getAccessToken);
    console.log(response);
    if (typeof(response.error) !== "undefined") {
      console.log(response.error);
      setErrors(response.error);
    }     
  }

  async function stopPipeline(pipelineId) {
    const { getAccessToken } = contextType;
    const response = await PipelineActions.cancel(pipelineId, getAccessToken);
    console.log(response);
    if (typeof(response.error) !== "undefined") {
      console.log(response.error);
      setErrors(response.error);
    }  
  }

  const handleSavePropertyClick = async (pipelineId, value, type) => {

    if (Object.keys(value).length > 0 && type.length > 0) {
      const { getAccessToken } = contextType;
      let postBody = {};
      
      if (type === "name") {
        data.name = value.name;        
        postBody = {
          "name": value.name
        };
        setEditTitle(false);

      } else if (type === "project") {
        data.project.name = value.project.name;
        postBody = {
          "project": { 
            "name": value.project.name,
            "project_id": ""
          }
        };
        setEditProject(false);

      } else if (type === "description") {
        data.description = value.description;
        postBody = {
          "description": value.description
        };
        setEditDescription(false);

      } else if (type === "schedule") {
        data.workflow.schedule = value;        
        postBody = {
          "workflow": data.workflow
        };
        setEditTitle(false);
      } else if (type === "tags") {
        data.tags = value;
        postBody = {
          "tags": data.tags
        };
        setEditTags(false);
      }
      
      if (Object.keys(postBody).length > 0 ) {
        const response = await PipelineActions.save(pipelineId, postBody, getAccessToken);
        //console.log(response);
        if (typeof(response.error) !== "undefined") {
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
    console.log("SCHEDULE DATA", schedule);
    handleSavePropertyClick(data._id, schedule, "schedule");
    setEditSchedule(false);
  };


  return (
    <>
      {error ? <ErrorDialog error={error} /> : null}
      {typeof(data) !== "undefined" && data !== {} ? 
        <>
          <div className="ml-1 mb-2 w-100 max-content-width">           
            <div className="title-text-5 mt-2">
              { editTitle ? 
                <>
                  <Row>
                    <Col sm={11}>
                      <Form.Control maxLength="500" type="text" placeholder="" value={formData.name || ""} 
                        onChange={e => setFormData({ ...formData, name: e.target.value })} /></Col>
                    <Col sm={1} className="my-auto">
                      <FontAwesomeIcon icon={faSave}
                        className="text-muted"
                        size="sm"
                        style={{ cursor: "pointer" }}
                        onClick= {() => { handleSavePropertyClick(data._id, formData, "name"); }} />
                      <FontAwesomeIcon icon={faTimes}
                        className="text-muted ml-3"
                        size="sm"
                        style={{ cursor: "pointer" }}
                        onClick= {() => { setEditTitle(false); }} />
                    </Col>
                  </Row>                    
                </> 
                :
                <>
                  { Object.keys(approvalStep).length > 0 && <FontAwesomeIcon icon={faFlag} className="red mr-1" /> }
                  {data.name} 
                  {role === "administrator" ? 
                    <FontAwesomeIcon icon={faPencilAlt}
                      className="ml-2 text-muted"
                      size="xs" transform="shrink-6"
                      style={{ cursor: "pointer" }}
                      onClick= {() => { setEditTitle(true); setFormData({ ...formData, name: data.name }); }} /> : null }
                </> 
              }</div>     
          </div>
          
          
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

          <div className="mb-3 flat-top-content-block p-3">              
            <div className="mb-2 text-muted">
              {role === "administrator" && 
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Delete this pipeline" })} >
                <FontAwesomeIcon icon={faTrash} className="pointer red float-right ml-3" size="sm" onClick={handleDeleteClick(data._id)}/></OverlayTrigger>}

              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "COMING SOON! Duplicate this pipeline" })} >
                <FontAwesomeIcon icon={faCopy} className="pointer float-right ml-3" size="sm" onClick={handleCopyPipeline(data._id)}/></OverlayTrigger>
                    
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "View Pipeline Configurations" })} >
                <FontAwesomeIcon icon={faFileAlt}
                  className="mr-1 float-right text-muted"
                  size="sm"
                  style={{ cursor: "pointer" }}
                  onClick= {() => { handleViewClick(data); }} /></OverlayTrigger>

              { editDescription ? 
                <>
                  <Row className="my-2">
                    <Col sm={11}>
                      <Form.Control maxLength="2000" as="textarea" type="text" placeholder="" value={formData.description || ""} 
                        onChange={e => setFormData({ ...formData, description: e.target.value })} /></Col>
                    <Col sm={1} className="my-auto">
                      <FontAwesomeIcon icon={faSave}
                        className="text-muted"
                        size="sm"
                        style={{ cursor: "pointer" }}
                        onClick= {() => { handleSavePropertyClick(data._id, formData, "description"); }} />
                      <FontAwesomeIcon icon={faTimes}
                        className="text-muted ml-3"
                        size="sm"
                        style={{ cursor: "pointer" }}
                        onClick= {() => { setEditDescription(false); }} />
                    </Col>
                  </Row>                    
                </> 
                :
                <>
                  {data.description} 
                  {role === "administrator" ? 
                    <FontAwesomeIcon icon={faPencilAlt}
                      className="ml-2 text-muted"
                      size="xs" transform="shrink-5"
                      style={{ cursor: "pointer" }}
                      onClick= {() => { setEditDescription(true); setFormData({ ...formData, description: data.description }); }} /> : null }                    
                </> 
              }
            </div>
            <hr></hr>
            <Row className="mt-3">
              <Col lg className="py-1"><span className="text-muted mr-1">ID:</span> {data._id}</Col>
              <Col lg className="py-1"><span className="text-muted mr-1">Pipeline Run Count:</span> {data.workflow.run_count || "0"}</Col>
            </Row>


            <Row className="row-content-spacing">
              
              <Col>
                { editProject ? 
                  <>
                    <Row className="my-2">
                      <Col sm={9}>
                        <Form.Control maxLength="150" type="text" placeholder="Project Name" value={formData.project.name || ""} 
                          onChange={e => setFormData({ ...formData, project: { name: e.target.value } })} /></Col>
                      <Col sm={3} className="my-auto">
                        <FontAwesomeIcon icon={faSave}
                          className="text-muted"
                          size="sm"
                          style={{ cursor: "pointer" }}
                          onClick= {() => { handleSavePropertyClick(data._id, formData, "project"); }} />
                        <FontAwesomeIcon icon={faTimes}
                          className="text-muted ml-3"
                          size="sm"
                          style={{ cursor: "pointer" }}
                          onClick= {() => { setEditProject(false); }} />
                      </Col>
                    </Row>                    
                  </> 
                  :
                  <>
                    <span className="text-muted">Project: </span> {data.project !== undefined && data.project.hasOwnProperty("name") ? <>{data.project.name}</> : <span className="text-muted font-italic">untitled</span> }                    
                    {role === "administrator" ? 
                      <FontAwesomeIcon icon={faPencilAlt}
                        className="ml-2 text-muted"
                        size="xs" transform="shrink-6"
                        style={{ cursor: "pointer" }}
                        onClick= {() => { setEditProject(true); setFormData({ ...formData, project: { name: data.project !== undefined && data.project.hasOwnProperty("name") ? data.project.name : "" } }); }} /> : null }                  
                  </>  }
              </Col>
              <Col lg className="py-1"><span className="text-muted mr-1">Owner:</span> {ownerName}</Col>                
            </Row>
            <Row className="row-content-spacing">
              <Col lg className="py-1"><span className="text-muted mr-1">Organization:</span> <span className="upper-case-first">{data.organizationName}</span></Col>
              <Col lg className="py-1"><span className="text-muted mr-1">Created On:</span>  {format(new Date(data.createdAt), "yyyy-MM-dd', 'hh:mm a")}</Col>
            </Row>

            <Row className="row-content-spacing">
              <Col className="py-1"><span className="text-muted mr-1">Tags:</span> 
                {!editTags && <> 
                  {data.tags.map((item, idx) => (<span key={idx}>{item}, </span>))} 
                  <FontAwesomeIcon icon={faPencilAlt}
                    className="ml-2 text-muted"
                    size="xs" transform="shrink-4"
                    style={{ cursor: "pointer" }}
                    onClick= {() => { setEditTags(true); }} />
                </>}
                {editTags && <EditToolModal data={data.tags} visible={editTags} onHide={() => { setEditTags(false); }} onClick= {(tags) => { handleSavePropertyClick(data._id, tags, "tags"); }} /> }
              </Col>
            </Row>

            {/* <Row className="row-content-spacing">
                <Col className="py-1"><span className="text-muted mr-1">Tools:</span> 
                  {_buildToolList(data.workflow.plan).map((item, idx) => (<span key={idx} className="upper-case-first mr-1">{item} </span>))}</Col> 
              </Row> */}

            {/* { data.workflow.source !== undefined ?
                <Row className="row-content-spacing">
                  <Col md className="py-1"><span className="text-muted mr-1">Source:</span> <span className="upper-case-first">{data.workflow.source.name}</span></Col>
                  {data.workflow.source.repository ? <Col md className="py-1"><span className="text-muted mr-1">Repository:</span> {data.workflow.source.repository}</Col> : null}
                  {data.workflow.source.branch ? <Col md className="py-1"><span className="text-muted mr-1">Branch:</span> {data.workflow.source.branch}</Col> : null}
                </Row> : null}      */}         

            <Row className="row-content-spacing">
              { editSchedule ? 
                <>
                  <Col xs={12} md={8}><span className="text-muted mr-1">Schedule:</span>
                    <SchedulerWidget 
                      startDate={data.workflow.schedule ? data.workflow.schedule.start_date : new Date()} 
                      frequency={data.workflow.schedule ? data.workflow.schedule.frequency : ""} 
                      schedule={data.workflow.schedule ? data.workflow.schedule : null }
                      setEditSchedule={setEditSchedule} 
                      setSchedule={handleSetSchedule}></SchedulerWidget></Col> 
                  <Col xs={6} md={4}></Col>
                </> : 

                <Col className="py-1"><span className="text-muted mr-1">Schedule:</span> 
                  {data.workflow.schedule && data.workflow.schedule.start_date !== null && !editSchedule ? 
                    <>
                      <span className="ml-1">Run next on: {format(new Date(data.workflow.schedule.start_date), "yyyy-MM-dd', 'hh:mm a")}</span>
                      <span className="ml-2">Frequency: {data.workflow.schedule ? data.workflow.schedule.frequency : "undefined"}</span> 
                    </> : null }

                  {role === "administrator" ? 
                    <FontAwesomeIcon icon={faPencilAlt}
                      className="ml-2 text-muted"
                      size="xs" transform="shrink-4"
                      style={{ cursor: "pointer" }}
                      onClick= {() => { setEditSchedule(true); }} /> : null }                    

                </Col>                               
              }
            </Row> 


            {_configuredToolsCount(data.workflow.plan) === 0 ?
              <Row>
                <Col className="mt-3 mb-1">
                  <LinkContainer to={`/workflow/${data._id}/model`}>
                    <Button variant="success" className="mr-2 mt-2" size="sm">
                      <FontAwesomeIcon icon={faCogs} className="mr-1" fixedWidth/>Build Workflow</Button>
                  </LinkContainer>
                </Col>
              </Row>
              :
              <Row>
                <Col className="mt-3 mb-1">
                  {/* <LinkContainer to={`/workflow/${data._id}/model`}>
                      <Button variant="primary" className="mr-2 mt-2" size="sm">
                        <FontAwesomeIcon icon={faThLarge} className="mr-1" fixedWidth/>View Workflow</Button>
                    </LinkContainer> */}

                  {workflowStatus === "running" && 
                      <>
                        <Button variant="outline-dark" className="mr-1"  size="sm" disabled><FontAwesomeIcon icon={faSpinner} spin className="mr-1"/> Running</Button>
                        <Button variant="outline-danger" className="mr-1"  size="sm" onClick={() => { handleStopWorkflowClick(data._id); }}
                          disabled={role !== "administrator"}><FontAwesomeIcon icon={faStopCircle} className="mr-1"/>Stop</Button>
                      </>}

                  {workflowStatus === "paused" && 
                      <>
                        <Button variant="outline-warning" className="mr-1"  size="sm" disabled><FontAwesomeIcon icon={faPause} className="mr-1"/> Paused</Button>
                        <Button variant="warning" className="mr-1"  size="sm" onClick={() => { handleApprovalClick(); }}
                          disabled={role !== "administrator"}><FontAwesomeIcon icon={faFlag} className="mr-1" fixedWidth/>Approve Step</Button>
                      </>}

                  {(workflowStatus === "stopped" || !workflowStatus) && 
                  <>
                    { data.workflow.schedule.start_date ? 
                      <>
                        <Button variant="outline-dark" className="mr-1"  size="sm" disabled>
                          <FontAwesomeIcon icon={faHourglass} fixedWidth className="mr-1"/>Pending Scheduled Activity</Button> 
                        <Button variant="outline-success" className="mr-1" size="sm"
                          onClick={() => { handleRunPipelineClick(data._id); }}
                          disabled={role !== "administrator"}>
                          <FontAwesomeIcon icon={faPlay} fixedWidth className="mr-1"/>Force Start</Button> 
                      </>
                      :
                      <Button variant="success" className="mr-1" size="sm"
                        onClick={() => { handleRunPipelineClick(data._id); }}
                        disabled={role !== "administrator"}>
                        <FontAwesomeIcon icon={faPlay} fixedWidth className="mr-1"/>Start Pipeline</Button>
                    }                        
                  </>}
                
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Restart pipeline from beginning as new run" })} >
                    <Button variant="outline-danger" className="mr-1"  size="sm" 
                      onClick={() => { handleStopWorkflowClick(data._id); }}
                      disabled={role !== "administrator"}>
                      <FontAwesomeIcon icon={faHistory} fixedWidth className="mr-1"/>Reset Pipeline</Button>
                  </OverlayTrigger>

                  
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Refresh pipeline status" })} >
                    <Button variant="secondary" size="sm" onClick={() => { handleRefreshClick(data._id); }}>
                      <FontAwesomeIcon icon={faSync} fixedWidth/></Button> 
                  </OverlayTrigger>

                </Col>
              </Row>
            }
          </div>
          

        </>
        : null}

      {showDeleteModal ? <Modal header="Confirm Pipeline Delete"
        message="Warning! Data cannot be recovered once this pipeline is deleted. Do you still want to proceed?"
        button="Confirm"
        handleCancelModal={() => setShowDeleteModal(false)}
        handleConfirmModal={() => deleteItem(modalDeleteId)} /> : null}
     
      <ModalActivityLogs header="Pipeline Details" size="lg" jsonData={modalMessage} show={showModal} setParentVisibility={setShowModal} />
      {infoModal.show && <Modal header={infoModal.header} message={infoModal.message} button={infoModal.button} handleCancelModal={() => setInfoModal({ ...infoModal, show: false })}  />}
      {showApprovalModal && <ApprovalModal pipelineId={data._id} visible={showApprovalModal} setVisible={setShowApprovalModal} refreshActivity={handleApprovalActivity} />}
    </>
    
  );
};

PipelineItemDetail.propTypes = {
  data: PropTypes.object,
  role: PropTypes.string,
  stepStatus: PropTypes.object,
  parentCallback: PropTypes.func,
  parentCallbackRefreshActivity: PropTypes.func
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

const _buildToolList = (array) => {
  
  let tools = [];
  array.map((item) => {
    if (item.tool !== undefined) {
      tools.push(item.tool.tool_identifier);
    }
  });
  return tools.filter((a, b) => tools.indexOf(a) === b);
  
};

function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}

export default PipelineItemDetail;