import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Alert, Card, Row, Col, Table, Button, Form } from "react-bootstrap";
import Modal from "../common/modal";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiServiceMultiGet, axiosApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import Moment from "react-moment";
import PipelineActions from "./actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faPencilAlt, faPause, faBan, faPlay, faTrash, faProjectDiagram, faSave, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./workflows.css";


function PipelineDetail({ id }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [role, setRole] = useState("");
  const [stepStatus, setStepStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(true);
  
  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
        setReload(false);
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
  }, [reload]);



  async function fetchData() {
    setLoading(true);
    const { getAccessToken, getUserSsoUsersRecord } = contextType;
    const accessToken = await getAccessToken();
    const ssoUsersRecord = await getUserSsoUsersRecord();
    const apiUrls = [ `/pipelines/${id}`, `/pipelines/${id}/activity` ];   
    try {
      const [pipeline, activity] = await axiosApiServiceMultiGet(accessToken, apiUrls);
      setData({
        pipeline: pipeline && pipeline.data[0],
        activity: activity && activity.data
      });
      setPipelineAttributes(pipeline && pipeline.data[0], ssoUsersRecord._id);
      setLoading(false);  
      console.log("pipeline", pipeline);      
      console.log("activity", activity);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }


  const setPipelineAttributes = (pipeline, ssoUsersId) => {
    // console.log("SETTING PIPELINE ATTRIBUTES");
    // setStepStatus({});
    // setRole("");
    
    if (typeof(pipeline.roles) !== "undefined") {
      let adminRoleIndex = pipeline.roles.findIndex(x => x.role === "administrator"); 
      if (pipeline.roles[adminRoleIndex].user === ssoUsersId) {
        setRole(pipeline.roles[adminRoleIndex].role);
      }
    }
    
    if (typeof(pipeline.workflow) !== "undefined") {
      if (typeof(pipeline.workflow.last_step) !== "undefined") {
        console.log("Last Step: ", pipeline.workflow.last_step);
        setStepStatus(pipeline.workflow.last_step);
      } else {
        setStepStatus({});
      }
    }
  };


  const callbackFunction = async () => {
    setReload(true);
    await fetchData();
  };
  
  if (error) {
    return (<ErrorDialog error={error} />);
  }  else if (loading) {
    return (<LoadingDialog size="lg" />);
  }  else if (!loading && data.length == 0) {
    return ( <InfoDialog message="No Pipeline details found.  Please ensure you have access to view the requested pipeline." />);
  } else {
    return (
      <>
        <div className="mt-3 max-content-width">
          <ItemSummaryDetail data={data.pipeline} parentCallback={callbackFunction} role={role} stepStatus={stepStatus}  /> 
          <PipelineActivity data={data.activity} />               
        </div>
          
      </>
    );
  }
}


const ItemSummaryDetail = (props) => {
  const { data, role, stepStatus, parentCallback } = props;
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //const [showActionAlert, setShowActionAlert] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalDeleteId, setModalDeleteId] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [runningStepId, setRunningStepId] = useState("");

  let history = useHistory();
  
  
  useEffect(() => {
    if (typeof(stepStatus.running) !== "undefined") {
      if (typeof(stepStatus.running.step_id) !== "undefined" && stepStatus.running.step_id.length > 0) { 
        setWorkflowStatus("running");
        setRunningStepId(stepStatus.running.step_id);
      } else {
        setWorkflowStatus("");
        setRunningStepId({});
      }
    } else {
      setWorkflowStatus("");
      setRunningStepId({});
    }
    
  }, [stepStatus, data]);

  const handleViewClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  const handleSaveTitleClick = async (pipelineId, title) => {
    console.log(title);
    if (title.length > 0) {
      data.name = title;
      const { getAccessToken } = contextType;
      const postBody = {
        "name": title
      };
      
      const response = await PipelineActions.save(pipelineId, postBody, getAccessToken);
      console.log(response);
      if (typeof(response.error) !== "undefined") {
        console.log(response.error);
        setErrors(response.error);
      } else {
        setEditTitle(false);  
      }  
    } else {
      setEditTitle(false);  
    }
  };

  const handleActionClick = (action, itemId) => e => {
    e.preventDefault();
    
    switch(action) {
    case "delete":
      setShowDeleteModal(true);
      setModalDeleteId(itemId);
      break;
    case "run":
      console.log("wire up run operation for entire pipeline");
      break;
    default:
      alert("coming soon");
    }
  };

  const handleCancelClick = async (pipelineId, stepId) => {
    await cancelPipelineStep(pipelineId, stepId);
    // setWorkflowStatus(false);
    // setRunningStepId("");
    parentCallback();
  };

  //let history = useHistory();
  async function deleteItem(pipelineId) {
    const { getAccessToken } = contextType;
    await PipelineActions.delete(pipelineId, getAccessToken);
    history.push("/workflow");
  }

  async function runPipeline(pipelineId) {
    setLoading(true);
    const { getAccessToken } = contextType;
    const postBody = {
      "action": "run",
      "stepId": ""
    };
    const response = await PipelineActions.run(pipelineId, postBody, getAccessToken);
    console.log(response);
    if (typeof(response.error) !== "undefined") {
      console.log(response.error);
      setErrors(response.error);
    } else {
      //setShowActionAlert(true);      
      parentCallback();
    }   
    setLoading(false);
  }

  async function cancelPipelineStep(pipelineId, stepId) {
    setLoading(true);
    const { getAccessToken } = contextType;
    const postBody = {
      "action": "cancel",
      "stepId": stepId
    };
    const response = await PipelineActions.run(pipelineId, postBody, getAccessToken);
    console.log(response);
    if (typeof(response.error) !== "undefined") {
      console.log(response.error);
      setErrors(response.error);
      setLoading(false);
    } else {
      setLoading(false);
      parentCallback();      
    }   
  }


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
                          onClick= {() => { handleSaveTitleClick(data._id, formData.name); }} />
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
                        onClick= {() => { setEditTitle(true); setFormData({ name: data.name }); }} /> : null }
                    <FontAwesomeIcon icon={faSearchPlus}
                      className="mr-1 float-right text-muted"
                      size="xs"
                      style={{ cursor: "pointer" }}
                      onClick= {() => { handleViewClick(data); }} />
                  </> 
                }
                
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{data.project}</Card.Subtitle>
              <Card.Text>
                {data.description}
              </Card.Text>
              <Row className="mt-2">
                <Col lg className="py-1"><span className="text-muted mr-1">ID:</span> {data._id}</Col>
                <Col lg className="py-1"><span className="text-muted mr-1">Owner:</span> {data.owner}</Col>                
              </Row>
              <Row>
                <Col lg className="py-1"><span className="text-muted mr-1">Organization:</span> {data.organizationName}</Col>
                <Col lg className="py-1"><span className="text-muted mr-1">Created On:</span>  <Moment format="YYYY-MM-DD, hh:mm a" date={data.createdAt} /></Col>
              </Row>
              <Row>
                <Col className="py-1"><span className="text-muted mr-1">Tags:</span> 
                  {data.tags.map((item, idx) => (<span key={idx}>{item}, </span>))}</Col>
              </Row>
              { data.workflow.source !== undefined ?
                <Row>
                  <Col md className="py-1"><span className="text-muted mr-1">Source:</span> <span className="upper-case-first">{data.workflow.source.name}</span></Col>
                  <Col md className="py-1"><span className="text-muted mr-1">Repository:</span> {data.workflow.source.repository}</Col>
                  <Col md className="py-1"><span className="text-muted mr-1">Branch:</span> {data.workflow.source.branch}</Col>
                </Row> : null}
              <Row>
                <Col className="py-1"><span className="text-muted mr-1">Tools:</span> 
                  {buildToolList(data.workflow.plan).map((item, idx) => (<span key={idx} className="upper-case-first mr-1">{item} </span>))}</Col> 
              </Row>
              <Row>
                <Col className="py-1">
                  <LinkContainer to={`/workflow/${data._id}/model`}>
                    <Button variant="primary" size="sm" className="mr-2 mt-2">
                      <FontAwesomeIcon icon={faProjectDiagram} className="mr-1"/>View Workflow</Button>
                  </LinkContainer>
                
                  {workflowStatus === "running" ? 
                    <Button variant="outline-secondary" size="sm" className="mr-2 mt-2" onClick={() => runPipeline(data._id)} disabled>
                      <FontAwesomeIcon icon={faSpinner} spin className="mr-1"/>Pipeline Running</Button>
                    :
                    <Button variant="outline-secondary" size="sm" className="mr-2 mt-2" onClick={() => runPipeline(data._id)}>
                      <FontAwesomeIcon icon={faPlay} className="mr-1"/>Run Pipeline</Button>
                  }
                  
                  {/* <Button variant="outline-secondary" size="sm" className="mr-2 mt-2" disabled onClick={handleActionClick("pause", data._id)}>
                    <FontAwesomeIcon icon={faPause} className="mr-1"/>Pause</Button> */}
                  <Button variant="outline-secondary" size="sm" className="mr-2 mt-2" 
                    onClick={() => { handleCancelClick(data._id, runningStepId); }} disabled={workflowStatus !== "running"} >
                    <FontAwesomeIcon icon={faBan} className="mr-1"/>Cancel</Button>
                  {role === "administrator" ? 
                    <Button variant="outline-danger" size="sm" className="mr-2 mt-2" onClick={handleActionClick("delete", data._id)}>
                      <FontAwesomeIcon icon={faTrash} className="fa-fw"/></Button> : null }
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* <Alert show={showActionAlert} variant="success">
            <Alert.Heading>Starting Pipeline</Alert.Heading>
            <p>
            The {data.name} workflow has been started.  This will take some time to run.  View the status and activity in the Pipeline Workflow view.
            </p>
            <hr />
            <div className="d-flex justify-content-end">              
              <Button onClick={() => {setShowActionAlert(false); parentCallback();}} variant="outline-success">
                  Continue
              </Button>
            </div>
          </Alert> */}
        
        </>
        : null}

      {showDeleteModal ? <Modal header="Confirm Pipeline Delete"
        message="Warning! Data cannot be recovered once this pipeline is deleted. Do you still want to proceed?"
        button="Confirm"
        handleCancelModal={() => setShowDeleteModal(false)}
        handleConfirmModal={() => deleteItem(modalDeleteId)} /> : null}

      {showModal ? <Modal header="Pipeline Details"
        message={<pre>{JSON.stringify(modalMessage, null, 2)}</pre>}
        button="OK"
        size="lg"
        handleCancelModal={() => setShowModal(false)}
        handleConfirmModal={() => setShowModal(false)} /> : null}

    </>
    
  );
};


const PipelineActivity = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const { data } = props;
  
  const handleClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  return (
    <>
      {data !== undefined && data.length > 0 ?
        <>
          <div className="h6 mt-4">Activity Log</div>
          <Table striped bordered hover className="table-sm" style={{ fontSize:"small" }}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Action</th>
                <th style={{ width: "5%" }}>Step</th>  
                <th style={{ width: "10%" }}>Task</th>                
                <th style={{ width: "10%" }}>Tool</th>
                <th style={{ width: "5%" }}>Build</th>
                <th style={{ width: "10%" }}>Status</th>
                <th style={{ width: "35%" }}>Message</th>
                <th style={{ width: "15%" }}>Date</th>
              </tr>
            </thead>
            <tbody>
            
              {data.map((item, idx) => (
                <tr key={idx} >
                  <td className="upper-case-first">{item["action"]}</td> 
                  <td className="text-center">{item["step_index"] + 1}</td> 
                  <td className="force-text-wrap">{item["step_name"]}</td>                  
                  <td className="upper-case-first">{item["tool_identifier"]}</td>
                  <td>{item["build_number"]}</td>
                  <td className="force-text-wrap upper-case-first">{item["status"] ? item["status"] : "unknown"}</td>
                  <td className="force-text-wrap upper-case-first">{item["message"] ? item["message"] : ""} 
                    <FontAwesomeIcon icon={faSearchPlus}
                      className="mr-1 mt-1 float-right"
                      size="xs"
                      style={{ cursor: "pointer" }}
                      onClick= {() => { handleClick(item); }} /></td>
                  <td><Moment format="YYYY-MM-DD, hh:mm a" date={item["createdAt"]} /> </td>   
                </tr>
              ))}
            </tbody>
          </Table>

          {showModal ? <Modal header="Log Details"
            message={<pre>{JSON.stringify(modalMessage, null, 2)}</pre>}
            button="OK"
            size="lg"
            handleCancelModal={() => setShowModal(false)}
            handleConfirmModal={() => setShowModal(false)} /> : null}
        </>
        : <InfoDialog message="No pipeline activity data is currently available.  Logs will start getting populated once the pipeline starts running." />}

    </>
    
  );
};


const buildToolList = (array) => {
  let tools = [];
  array.map((item) => {tools.push(item.tool.tool_identifier);});
  return tools.filter((a, b) => tools.indexOf(a) === b);
};


PipelineDetail.propTypes = {
  id: PropTypes.string
};

ItemSummaryDetail.propTypes = {
  data: PropTypes.object,
  role: PropTypes.string,
  stepStatus: PropTypes.object,
  parentCallback: PropTypes.func
};

PipelineActivity.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
};

export default PipelineDetail;