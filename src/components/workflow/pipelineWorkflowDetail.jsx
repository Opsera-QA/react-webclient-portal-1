import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import _ from "lodash";
import { axiosApiService } from "../../api/apiService";
import { AuthContext } from "../../contexts/AuthContext"; 
import socketIOClient from "socket.io-client";
import { Row, Col, Button } from "react-bootstrap";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faCog, faBars, faArchive, faBan, faPlay, faChevronDown, faSync, faSpinner, faForward, faCheck, faStopCircle, faHistory } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "../common/modal";
import Moment from "react-moment";
import PipelineActions from "./actions";
import "./workflows.css";


const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const PipelineWorkflowDetail = (props) => {
  const { data, parentCallback, role } = props;
  const [error, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const contextType = useContext(AuthContext);
  const [state, setState] = useState({ items: [] });
  const [lastStep, setLastStep] = useState({});
  const [nextStep, setNextStep] = useState({});
  const [socketRunning, setSocketRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [showPipelineDataModal, setShowPipelineDataModal] = useState(false);
  const endPointUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
  const socket = socketIOClient(endPointUrl, { query: "pipelineId=" + data._id }); 

  useEffect(() => {    
    if (data.workflow !== undefined) {
      setState({ items: data.workflow.plan });
      setLastStep(data.workflow.last_step);
      setNextStep(calculateNextStep(data.workflow.last_step));

      if (data !== undefined && data.workflow.last_step !== undefined) {
        let status = data.workflow.last_step.hasOwnProperty("status") ? data.workflow.last_step.status : false;
        setWorkflowStatus(status);
        if (status === "running" && !socketRunning) {
          subscribeToTimer();
        }
      } else {
        setWorkflowStatus(false);        
      }      
    }

  }, [data]);


  let tmpDataObject = {};
  let staleRefreshCount = 0;
  const subscribeToTimer = () => {    
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
      
      if (staleRefreshCount >= 150) {
        console.log("closing connection due to stale data");
        setWorkflowStatus(false);
        socket.close();
        setSocketRunning(false);
      } else {
        let status =  data.workflow.last_step !== undefined && data.workflow.last_step.hasOwnProperty("status") ? data.workflow.last_step.status : false;
        setWorkflowStatus(status);
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
  };

  
  const calculateNextStep = (last_step) => {
    let nextStep = {};    
    if (last_step && last_step.hasOwnProperty("running")) {
      let runningStepId = typeof(last_step.running.step_id) !== "undefined" && last_step.running.step_id.length > 0 ? last_step.running.step_id : false;
      let stepArrayIndex = data.workflow.plan.findIndex(x => x._id.toString() === runningStepId); 
      nextStep = data.workflow.plan[stepArrayIndex + 1];
      console.log("NEXT: ", nextStep);
    } else if (last_step && last_step.hasOwnProperty("success")) {
      let lastSuccessStepId = typeof(last_step.success.step_id) !== "undefined" && last_step.success.step_id.length > 0 ? last_step.success.step_id : false;
      let stepArrayIndex = data.workflow.plan.findIndex(x => x._id.toString() === lastSuccessStepId); 
      nextStep = data.workflow.plan[stepArrayIndex + 1];
      console.log("NEXT: ", nextStep);
    } else {
      nextStep = data.workflow.plan[0];
    }
    return nextStep;
  };


  const handleViewClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };


  const handleRefreshClick = async (pipelineId, stepNext) => {
    await fetchStatusData(pipelineId, stepNext);
    subscribeToTimer();
  };


  const handleStopWorkflowClick = async (pipelineId, stepNext) => {
    //call gest status API
    await runPipelineAction(pipelineId, stepNext, "cancel");
    setWorkflowStatus(false);
  };
  

  const handleRunPipelineClick = async (pipelineId, oneStep) => {
    await runPipeline(pipelineId, oneStep);
    setWorkflowStatus("running");
    setTimeout(subscribeToTimer(), 10000); // delay this by 5 seconds to allow time for services to spin up
  };


  async function fetchStatusData(pipelineId, stepNext) {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    let apiUrl = `/pipelines/${pipelineId}/status`;
    if (stepNext) {
      apiUrl = apiUrl + "?run=true";
    }   
    
    try {
      const pipelineActivityLog = await axiosApiService(accessToken).get(apiUrl);
      console.log(pipelineActivityLog);
      setLoading(false);
      parentCallback();
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
      setLoading(false);
    }
  }


  async function runPipelineAction(pipelineId, nextStepId, action) {
    const { getAccessToken } = contextType;
    const postBody = {
      "action": action,
      "stepId": nextStepId ? nextStepId : ""
    };
    console.log("POST OPERATION: ", postBody);
    const response = await PipelineActions.action(pipelineId, postBody, getAccessToken);
    
    if (typeof(response.error) !== "undefined") {
      console.log(response.error);
      setErrors(response.error);
    } else {
      parentCallback();
    }   
  }


  async function runPipeline(pipelineId, oneStep) {
    const { getAccessToken } = contextType;
    const postBody = {
      "oneStep": oneStep
    };
    const response = await PipelineActions.run(pipelineId, postBody, getAccessToken);
    console.log(response);
    if (typeof(response.error) !== "undefined") {
      console.log(response.error);
      setErrors(response.error);
    } else {
      setWorkflowStatus("running");
      subscribeToTimer();
    }   
  }


  const handleViewPipelineClick = (param) => {
    setShowPipelineDataModal(param);
  };


  const callbackFunction = (item) => {
    window.scrollTo(0, 0);
    item.id = data._id;
    parentCallback(item);
  };


  const handleSourceEditClick = () => {
    parentCallback({ id: data._id, type: "source", item_id: "" });
  };



  //TODO: Drag/drop code
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    console.log("result.source.index: ", result.source.index);
    console.log("result.destination.index", result.destination.index);
    console.log("result: ", result);
    const items = reorder(
      state.items,
      result.source.index,
      result.destination.index
    );

    //TODO: right now it's just changing the order in the array.  Need to make it update the step value.

    setState({ items });
  }



  return (
    <>      
      {error ? <ErrorDialog error={error} /> : null}
      {typeof(data.workflow) !== "undefined" && data.workflow.hasOwnProperty("source") ? 
        <>
          <div className="workflow-container ml-4 px-3" style={{ maxWidth: "500px" }}>
            <div className="h6 p-2 text-center">{data.name} Workflow
              <FontAwesomeIcon icon={faSearchPlus}
                className="mr-1 mt-1 float-right text-muted"
                size="sm"
                style={{ cursor: "pointer" }}
                onClick= {() => { handleViewPipelineClick(data); }} />
            </div>
            <div className="py-2 mb-1 text-right">
              
              {/* <Button variant="warning" size="sm" className="mr-2" onClick={() => { handleRefreshClick(data._id); }}>
                <FontAwesomeIcon icon={faSync} className="mr-1"/>Update Status</Button> */}

              {workflowStatus === "running" ? 
                <>
                  <Button variant="outline-dark" size="sm" className="mr-2" disabled>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-1"/> Running</Button>
                  <Button variant="outline-danger" size="sm" className="mr-2" 
                    onClick={() => { handleStopWorkflowClick(data._id); }}
                    disabled={role !== "administrator"}>
                    <FontAwesomeIcon icon={faStopCircle} className="mr-1"/>Stop Pipeline</Button>
                </>
                :
                <>
                  { nextStep === undefined || nextStep === data.workflow.plan[0] ?
                    <Button variant="success" size="sm" className="mr-2" 
                      onClick={() => { handleRunPipelineClick(data._id); }}
                      disabled={role !== "administrator"}>
                      <FontAwesomeIcon icon={faPlay} className="mr-1"/>Start Pipeline</Button>
                    :
                    <>
                      <Button variant="success" size="sm" className="mr-2" 
                        onClick={() => { handleRunPipelineClick(data._id); }}
                        disabled={role !== "administrator"}>
                        <FontAwesomeIcon icon={faPlay} className="mr-1"/>Continue Pipeline</Button>

                    </>}
                  <Button variant="outline-primary" size="sm" className="mr-2" 
                    onClick={() => { handleStopWorkflowClick(data._id); }}
                    disabled={role !== "administrator"}>
                    <FontAwesomeIcon icon={faHistory} className="mr-1"/>Reset Pipeline</Button>
                </>
              }
              <Button variant="outline-warning" size="sm" className="mr-2" onClick={() => { handleRefreshClick(data._id); }}>
                <FontAwesomeIcon icon={faSync} className="fa-fw"/></Button>              
              

            </div>

            <div className="workflow-module-container workflow-module-container-width mx-auto">
              <div>Source Repository: {data.workflow.source.repository}</div>
              {data.workflow.source.name ? 
                <>
                  <div className="mt-1 upper-case-first"><span className="text-muted pr-1">Branch:</span> {data.workflow.source.branch}</div>
                  <div className="mt-1 upper-case-first"><span className="text-muted pr-1">Platform:</span> {data.workflow.source.name} 
                    <FontAwesomeIcon icon={faSearchPlus}
                      className="ml-1"
                      size="xs"
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleViewClick(data.workflow.source); }} /></div>
                </>: null}
               
              <Row>
                <Col className="text-right pt-1">
                  <FontAwesomeIcon icon={faCog}
                    style={{ cursor: "pointer" }}
                    className="text-muted mr-1"
                    onClick={() => { handleSourceEditClick(); }} />
                  {/* {data.workflow.source.repository ? <>
                    <FontAwesomeIcon icon={faPause}
                      className="ml-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleClick(data); }} />
                    <FontAwesomeIcon icon={faBan}
                      className="ml-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleClick(data); }} />
                    <FontAwesomeIcon icon={faPlay}
                      className="ml-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleClick(data); }} /> 
                  </>: null} */}
                </Col>
              </Row>
            </div>
            <div className="text-center workflow-module-container-width py-1 mx-auto">
              <FontAwesomeIcon icon={faChevronDown} size="lg" className="nav-blue"/>            
            </div>
            <div className="workflow-module-container-width mx-auto">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                  {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <ItemList items={state.items} lastStep={lastStep} 
                        nextStep={nextStep} pipelineId={data._id} parentCallbackPipelineAction={handleRunPipelineClick}  
                        parentCallback={callbackFunction} fetchStatusCallback={handleRefreshClick} role={role} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <div className="workflow-module-container workflow-module-container-width py-2 text-center mx-auto h5">
            End of Workflow
            </div>
          </div>
          {showModal ? <Modal header="Log Details"
            jsonMessage={modalMessage}
            jsonView="true"
            button="OK"
            size="lg"
            handleCancelModal={() => setShowModal(false)}
            handleConfirmModal={() => setShowModal(false)} /> : null}
        </> : null }

      {showPipelineDataModal ? <Modal header="Pipeline Details"
        jsonMessage={showPipelineDataModal}
        jsonView="true"
        button="OK"
        size="lg"
        handleCancelModal={() => setShowPipelineDataModal(false)}
        handleConfirmModal={() => setShowPipelineDataModal(false)} /> : null}

    </>
  );
};



const ItemList = React.memo(function ItemList({ items, lastStep, nextStep, pipelineId, parentCallback, fetchStatusCallback, parentCallbackPipelineAction, role }) {
  const callbackFunction = (param) => {
    parentCallback(param);
  };

  return items.map((item, index) => (
    <Item item={item} index={index} key={item._id} 
      lastStep={lastStep} pipelineId={pipelineId} nextStep={nextStep}  parentCallbackPipelineAction={parentCallbackPipelineAction} 
      parentCallback={callbackFunction} fetchStatusCallback={fetchStatusCallback}  role={role} />
  ));
});



const QuoteItem = styled.div`
  max-width: 450px;
  background-color: #fff;
  color: #334152;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  margin-bottom: ${grid}px;
  padding: ${grid}px;
`;

const Item = ({ item, index, lastStep, nextStep, pipelineId, parentCallback, fetchStatusCallback, parentCallbackPipelineAction, role }) => {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const [showActionAlert, setShowActionAlert] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [currentStatus, setCurrentStatus] = useState({});
  const [itemState, setItemState] = useState(false);

  useEffect(() => {    
    if (typeof(lastStep) !== "undefined" && typeof(item) !== "undefined") {
      if(typeof(lastStep.success) !== "undefined" && lastStep.success.step_id === item._id) {
        setCurrentStatus(lastStep.success);
        setItemState("completed");
      }
      else if(typeof(lastStep.running) !== "undefined" && lastStep.running.step_id === item._id) {
        setCurrentStatus(lastStep.running);
        setItemState("running");
      }
      else if(typeof(lastStep.failed) !== "undefined" && lastStep.failed.step_id === item._id) {
        setCurrentStatus(lastStep.failed);
        setItemState("failed");
      } else {
        setCurrentStatus({});
        setItemState("");
      }
    } else {
      setCurrentStatus({});
      setItemState("");
    }    
  }, [lastStep]);

  
  async function fetchActivityLogData(activityId, latest) {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${pipelineId}/activity`;   
    const params = { step_id: activityId, latest: latest };
    console.log("PARPAMS: ", params);
    try {
      const pipelineActivityLog = await axiosApiService(accessToken).get(apiUrl, { params });
      console.log(pipelineActivityLog);
      return pipelineActivityLog && pipelineActivityLog.data;      
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  }

  const handleViewClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  const handleEditClick = (type, name, itemId) => {
    parentCallback({ type: type, tool_name: name, step_id: itemId });
  };

  const handleViewActivityLogClick = async (param, latest) => {
    let activityLog = await fetchActivityLogData(param, latest);
    setModalMessage(activityLog);
    setShowModal(true);
  };

  const handleOneStepRunClick = async () => {
    await parentCallbackPipelineAction(pipelineId, true);
  };
  
  const handleCancelClick = async (stepId) => {
    await parentCallbackPipelineAction(pipelineId, stepId, "cancel");
    
    //TODO THIS NEEDS TO TRIGGER REFRESH OF UI!
    //await fetchStatusCallback(pipelineId);
  };

  const handleRefreshClick = async () => {
    await fetchStatusCallback(pipelineId);
  }; 

  

  const setStepStatusStyle = (last_step, item_id) => {
    let success = "#28a74533"; //green
    let running = "#ffc1077a"; //yellow
    let failed = "#dc354552"; //red
    let inactive = "#fff"; //white

    //is this step in either the last_step.succcess, failed or running object?
    if (typeof(last_step) !== "undefined") {
      if(typeof(last_step.success) !== "undefined" && last_step.success.step_id === item_id) {
        return success;
      }
      else if(typeof(last_step.running) !== "undefined" && last_step.running.step_id === item_id) {
        return running;
      }
      else if(typeof(last_step.failed) !== "undefined" && last_step.failed.step_id === item_id) {
        return failed;
      } else {
        return inactive;
      }
    }

  }; 

  const ItemStyle = {
    backgroundColor: setStepStatusStyle(lastStep, item._id) 
  };
  
  return (
    <>
      {loading ? <LoadingDialog size="lg" /> : null }
      {error ? <ErrorDialog error={error} /> : null}
      <Draggable draggableId={item._id} index={index} > 
        {provided => (
          <QuoteItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={ItemStyle}
          >
            
            <Row>
              <Col><span className="text-muted">Step:</span> {item.name}</Col>
              <Col className="text-right" style={{ fontSize:"small" }}>
                <FontAwesomeIcon icon={faBars}
                  className="ml-2"
                  size="xs"
                  style={{ cursor: "pointer" }} /></Col>
            </Row>
            <Row>
              <Col className="upper-case-first"><span className="text-muted">Tool:</span> {item.tool.tool_identifier} 
                <FontAwesomeIcon icon={faSearchPlus}
                  className="ml-1"
                  size="sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => { handleViewClick(item); }} /></Col>
            </Row>
           
            { typeof(currentStatus) !== "undefined" && currentStatus.step_id === item._id ? 
              <>
                <Row>
                  <Col><span className="text-muted pr-1">Status:</span> 
                    <span className="upper-case-first pr-1">{currentStatus.status}</span>
                     on <Moment format="YYYY-MM-DD, hh:mm a" date={currentStatus.updatedAt} />
                    <FontAwesomeIcon icon={faSearchPlus}
                      className="ml-2"
                      size="sm"
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleViewActivityLogClick(item._id, true); }} />                    
                  </Col>
                </Row>
               
              </> : null}
            <Row className="mt-1">
              <Col className="text-muted small">ID: {item._id}</Col>
              <Col className="text-right pt-1">
                <FontAwesomeIcon icon={faArchive}
                  className="text-muted mr-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => { handleViewActivityLogClick(item._id, false); }} />

                <FontAwesomeIcon icon={faCog}
                  style={{ cursor: "pointer" }}
                  className="text-muted"
                  onClick={() => { handleEditClick("tool", item.tool.tool_identifier, item._id); }} />

              
                {itemState === "completed" ? <FontAwesomeIcon icon={faCheck} className="ml-2 mr-1" /> : null }
                {itemState === "running" ? 
                  <>
                    <FontAwesomeIcon icon={faSync}
                      className="ml-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleRefreshClick(); }} /> 

                    <FontAwesomeIcon icon={faBan}
                      className="ml-2 mr-1"
                      style={{ cursor: "pointer" }} 
                      onClick={() => { handleCancelClick(item._id); }} />
                    <FontAwesomeIcon icon={faSpinner} spin className="ml-2 mr-1" />
                  </> : null }
                
                { nextStep !== undefined && nextStep._id === item._id ?
                  <>
                    <FontAwesomeIcon icon={faSync}
                      className="ml-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleRefreshClick(); }} /> 
                    {role === "administrator" ? <FontAwesomeIcon icon={faPlay}
                      className="ml-2"
                      style={{ cursor: "pointer" }} 
                      onClick={() => { handleOneStepRunClick(); }} /> : null }
                  </>
                  : null
                }
              </Col>
            </Row>
            
            
          </QuoteItem>
        )}
      </Draggable>
      

      <div className="text-center py-1">
        <FontAwesomeIcon icon={faChevronDown} size="lg" className="nav-blue"/>            
      </div>

      {showModal ? <Modal header="Log Details"
        jsonMessage={modalMessage}
        jsonView="true"
        button="OK"
        size="lg"
        handleCancelModal={() => setShowModal(false)}
        handleConfirmModal={() => setShowModal(false)} /> : null}
    </>
  );
};




PipelineWorkflowDetail.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func,
  role: PropTypes.string
};

Item.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  lastStep: PropTypes.object,
  nextStep: PropTypes.object,
  pipelineId: PropTypes.string,
  parentCallback: PropTypes.func,
  fetchStatusCallback: PropTypes.func,
  parentCallbackPipelineAction: PropTypes.func,
  role: PropTypes.string
};

ItemList.propTypes = {
  items: PropTypes.array,
  lastStep: PropTypes.object,
  nextStep: PropTypes.object,
  pipelineId: PropTypes.string,
  parentCallback: PropTypes.func,
  fetchStatusCallback: PropTypes.func,
  parentCallbackPipelineAction: PropTypes.func,
  role: PropTypes.string
};


export default PipelineWorkflowDetail;