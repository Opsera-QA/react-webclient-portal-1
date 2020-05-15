import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import socketIOClient from "socket.io-client";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import PipelineActions from "./actions";
import Moment from "react-moment";
import Modal from "../common/modal";
import ModalActivityLogs from "../common/modalActivityLogs";
import ErrorDialog from "../common/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faPencilAlt, faStopCircle, faSync, faPlay, faTrash, faThLarge, faSave, faSpinner, faTimes, faCogs } from "@fortawesome/free-solid-svg-icons";
import "./workflows.css";
import SchedulerWidget from "../common/schedulerWidget";


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
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [lastStep, setLastStep] = useState({});
  const endPointUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
  let history = useHistory();
  
  
  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        if (data.workflow !== undefined) {
          if (data.workflow.last_step !== undefined) {
            let status = data.workflow.last_step.hasOwnProperty("status") ? data.workflow.last_step.status : false;
            setWorkflowStatus(status);
            if (status === "running" && !socketRunning) {
              subscribeToTimer();
            }
          } else {
            setWorkflowStatus(false);        
          }       
        }
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


  let tmpDataObject = {};
  let staleRefreshCount = 0;
  const subscribeToTimer = () => {    
    const socket = socketIOClient(endPointUrl, { query: "pipelineId=" + data._id }); 

    setSocketRunning(true);
    socket.emit("subscribeToPipelineActivity", 1000);
    socket.on("subscribeToPipelineActivity", dataObj => {
      console.log("Update from Websocket (staleRefreshCount: "+staleRefreshCount+"): ", dataObj);
      if (_.isEqual(dataObj, tmpDataObject)) {
        staleRefreshCount++;
      } else {
        staleRefreshCount = 0;
      }  
      tmpDataObject = dataObj;
      
      if (staleRefreshCount >= 50) {
        console.log("closing connection");
        setWorkflowStatus(false);
        socket.close();
        setSocketRunning(false);
      } else {
        let status = data.workflow.last_step.hasOwnProperty("status") ? data.workflow.last_step.status : false;
        setWorkflowStatus(status);       
        parentCallbackRefreshActivity(); 
      }
           
      if (typeof(dataObj) !== "undefined" && Object.keys(dataObj).length > 0) {
        data.workflow.last_step = dataObj;
        setLastStep(dataObj);
      }
    });

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

  const handleRefreshClick = async () => {
    await parentCallback();
    //subscribeToTimer();
  };

  const handleDeleteClick = (itemId) => e => {
    e.preventDefault();
    setShowDeleteModal(true);
    setModalDeleteId(itemId);    
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
    console.log(value);

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
      }
      
      if (Object.keys(postBody).length > 0 ) {
        const response = await PipelineActions.save(pipelineId, postBody, getAccessToken);
        console.log(response);
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
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
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
                    {data.name} 
                    {role === "administrator" ? 
                      <FontAwesomeIcon icon={faPencilAlt}
                        className="ml-2 text-muted"
                        size="xs" transform="shrink-6"
                        style={{ cursor: "pointer" }}
                        onClick= {() => { setEditTitle(true); setFormData({ ...formData, name: data.name }); }} /> : null }
                    
                    <FontAwesomeIcon icon={faTrash} className="pointer red float-right ml-3" size="xs" onClick={handleDeleteClick(data._id)}/>
                    
                    <FontAwesomeIcon icon={faSearchPlus}
                      className="mr-1 float-right text-muted"
                      size="xs"
                      style={{ cursor: "pointer" }}
                      onClick= {() => { handleViewClick(data); }} />                                        
                  </> 
                }
                
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
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
              </Card.Subtitle>
              
              <Row className="mt-3">
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
                <Col lg className="py-1"><span className="text-muted mr-1">Pipeline Run Count:</span> {data.workflow.run_count || "0"}</Col>
              </Row>


              <Row className="row-content-spacing">
                <Col lg className="py-1"><span className="text-muted mr-1">ID:</span> {data._id}</Col>
                <Col lg className="py-1"><span className="text-muted mr-1">Owner:</span> {data.owner}</Col>                
              </Row>
              <Row className="row-content-spacing">
                <Col lg className="py-1"><span className="text-muted mr-1">Organization:</span> {data.organizationName}</Col>
                <Col lg className="py-1"><span className="text-muted mr-1">Created On:</span>  <Moment format="YYYY-MM-DD, hh:mm a" date={data.createdAt} /></Col>
              </Row>
              <Row className="row-content-spacing">
                <Col className="py-1"><span className="text-muted mr-1">Tags:</span> 
                  {data.tags.map((item, idx) => (<span key={idx}>{item}, </span>))}</Col>
              </Row>
              <Row className="row-content-spacing">
                <Col className="py-1"><span className="text-muted mr-1">Tools:</span> 
                  {_buildToolList(data.workflow.plan).map((item, idx) => (<span key={idx} className="upper-case-first mr-1">{item} </span>))}</Col> 
              </Row>

              { data.workflow.source !== undefined ?
                <Row className="row-content-spacing">
                  <Col md className="py-1"><span className="text-muted mr-1">Source:</span> <span className="upper-case-first">{data.workflow.source.name}</span></Col>
                  {data.workflow.source.repository ? <Col md className="py-1"><span className="text-muted mr-1">Repository:</span> {data.workflow.source.repository}</Col> : null}
                  {data.workflow.source.branch ? <Col md className="py-1"><span className="text-muted mr-1">Branch:</span> {data.workflow.source.branch}</Col> : null}
                </Row> : null}              

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
                        <span className="ml-1">Run next on: <Moment format="YYYY-MM-DD, hh:mm a" date={data.workflow.schedule.start_date} /></span>
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
                  <Col className="py-3">
                    <LinkContainer to={`/workflow/${data._id}/model`}>
                      <Button variant="success" className="mr-2 mt-2">
                        <FontAwesomeIcon icon={faCogs} className="mr-1" fixedWidth/>Build Workflow</Button>
                    </LinkContainer>
                  </Col>
                </Row>
                :
                <Row>
                  <Col className="py-3">
                    <LinkContainer to={`/workflow/${data._id}/model`}>
                      <Button variant="primary" className="mr-2 mt-2">
                        <FontAwesomeIcon icon={faThLarge} className="mr-1" fixedWidth/>View Workflow</Button>
                    </LinkContainer>
                
                    {workflowStatus === "running" ? 
                      <>
                        <Button variant="outline-dark" className="mr-2 mt-2" disabled>
                          <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> Running</Button>

                        <Button variant="outline-danger" className="mr-2 mt-2" 
                          onClick={() => { handleStopWorkflowClick(data._id); }} disabled={workflowStatus !== "running"}>
                          <FontAwesomeIcon icon={faStopCircle} className="mr-1" fixedWidth/>Reset Pipeline</Button>
                      </>
                      :
                      <Button variant="success" className="mr-2 mt-2" onClick={() => handleRunPipelineClick(data._id)}>
                        <FontAwesomeIcon icon={faPlay} className="mr-1" fixedWidth/>Start Pipeline</Button>
                    }
                 
                    <Button variant="outline-warning" className="mr-2 mt-2" onClick={() => { handleRefreshClick(data._id); }}>
                      <FontAwesomeIcon icon={faSync} className="fa-fw" fixedWidth/></Button> 

                  </Col>
                </Row>
              }
            </Card.Body>
          </Card>

        </>
        : null}

      {showDeleteModal ? <Modal header="Confirm Pipeline Delete"
        message="Warning! Data cannot be recovered once this pipeline is deleted. Do you still want to proceed?"
        button="Confirm"
        handleCancelModal={() => setShowDeleteModal(false)}
        handleConfirmModal={() => deleteItem(modalDeleteId)} /> : null}
     
      <ModalActivityLogs header="Pipeline Details" size="lg" jsonData={modalMessage} show={showModal} setParentVisibility={setShowModal} />
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

export default PipelineItemDetail;