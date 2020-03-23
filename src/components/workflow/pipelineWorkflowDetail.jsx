import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { axiosApiService } from "../../api/apiService";
import { AuthContext } from "../../contexts/AuthContext"; 
import { Row, Col } from "react-bootstrap";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faCog, faBars, faPause, faBan, faPlay, faChevronDown, faSync, faSpinner } from "@fortawesome/free-solid-svg-icons";
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

// const QuoteItem = styled.div`
//   max-width: 450px;
//   background-color: #28a74533;
//   color: #334152;
//   border: 1px solid rgba(0,0,0,.125);
//   border-radius: .25rem;
//   margin-bottom: ${grid}px;
//   padding: ${grid}px;
// `;


const PipelineWorkflowDetail = (props) => {
  const { data, parentCallback } = props;
  const [error, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const contextType = useContext(AuthContext);
  const [state, setState] = useState({ items: [] });
  const [lastStep, setLastStep] = useState({});
  const [nextStep, setNextStep] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});


  useEffect(() => {    
    if (data.workflow !== undefined) {
      setState({ items: data.workflow.plan });
      setLastStep(data.workflow.last_step);
      setNextStep(calculateNextStep(data.workflow.last_step));
    }
    console.log(data);
  }, [data]);

  
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

  const handleRefreshClick = (pipelineId) => {
    //call gest status API
    fetchStatusData(pipelineId);
    parentCallback();
  };


  async function fetchStatusData(pipelineId) {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${pipelineId}/status`;   
    
    try {
      const pipelineActivityLog = await axiosApiService(accessToken).get(apiUrl);
      console.log(pipelineActivityLog);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
      setLoading(false);
    }
  }



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



  const callbackFunction = (item) => {
    window.scrollTo(0, 0);
    item.id = data._id;
    parentCallback(item);
  };

  const handleSourceEditClick = () => {
    parentCallback({ id: data._id, type: "source", item_id: "" });
  };

  return (
    <>
      {loading ? <LoadingDialog size="lg" /> : null}
      {error ? <ErrorDialog error={error} /> : null}
      {typeof(data.workflow) !== "undefined" && data.workflow.hasOwnProperty("source") ? 
        <>
          <div className="workflow-container ml-4 px-3" style={{ maxWidth: "500px" }}>
            <div className="h6 p-2 text-center">{data.name} Workflow 
              <FontAwesomeIcon icon={faSync}
                className="ml-1 float-right"
                size="xs"
                style={{ cursor: "pointer" }}
                onClick={() => { handleRefreshClick(data._id); }} />
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
                      <ItemList items={state.items} lastStep={lastStep} nextStep={nextStep} pipelineId={data._id} parentCallback = {callbackFunction} />
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
            message={<pre>{JSON.stringify(modalMessage, null, 2)}</pre>}
            button="OK"
            size="lg"
            handleCancelModal={() => setShowModal(false)}
            handleConfirmModal={() => setShowModal(false)} /> : null}
        </> : null }
    </>
  );
};



const ItemList = React.memo(function ItemList({ items, lastStep, nextStep, pipelineId, parentCallback }) {
  const callbackFunction = (param) => {
    parentCallback(param);
  };

  return items.map((item, index) => (
    <Item item={item} index={index} key={item._id} 
      lastStep={lastStep} pipelineId={pipelineId} nextStep={nextStep} 
      parentCallback = {callbackFunction} />
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

const Item = ({ item, index, lastStep, nextStep, pipelineId, parentCallback }) => {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const [showActionAlert, setShowActionAlert] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [currentStatus, setCurrentStatus] = useState({});

  useEffect(() => {    
    if (typeof(lastStep) !== "undefined" && typeof(item) !== "undefined") {
      if(typeof(lastStep.success) !== "undefined" && lastStep.success.step_id === item._id) {
        setCurrentStatus(lastStep.success);
      }
      else if(typeof(lastStep.running) !== "undefined" && lastStep.running.step_id === item._id) {
        setCurrentStatus(lastStep.running);
      }
      else if(typeof(lastStep.failed) !== "undefined" && lastStep.failed.step_id === item._id) {
        setCurrentStatus(lastStep.failed);
      } else {
        setCurrentStatus({});
      }
    } else {
      setCurrentStatus({});
    }
    
  }, [lastStep]);

  
  async function fetchActivityLogData(activityId) {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${pipelineId}/activity/`;   
    const params = { id: activityId };
    try {
      const pipelineActivityLog = await axiosApiService(accessToken).get(apiUrl, params);
      return pipelineActivityLog && pipelineActivityLog.data[0];      
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  }

  async function runPipeline(pipelineId, stepId) {
    setLoading(true);
    const { getAccessToken } = contextType;
    const postBody = {
      "action": "run",
      "stepId": stepId
    };
    const response = await PipelineActions.run(pipelineId, postBody, getAccessToken);
    console.log(response);
    if (typeof(response.error) !== "undefined") {
      console.log(response.error);
      setErrors(response.error);
      setLoading(false);
    } else {
      setShowActionAlert(true);
      setLoading(false);      
    }   
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
      setShowCancelAlert(true);
      setLoading(false);      
    }   
  }

  const handleViewClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  const handleEditClick = (type, name, itemId) => {
    parentCallback({ type: type, tool_name: name, step_id: itemId });
  };

  const handleViewActivityLogClick = async (param) => {
    let activityLog = await fetchActivityLogData(param);
    setModalMessage(activityLog);
    setShowModal(true);
  };

  const handleRunClick = (stepId) => {
    runPipeline(pipelineId, stepId);
  };
  
  const handleCancelClick = (stepId) => {
    cancelPipelineStep(pipelineId, stepId);
  };

  const handleClick = (param) => {
    alert("coming soon");
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
              <Col>{item.name}</Col>
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
                  size="xs"
                  style={{ cursor: "pointer" }}
                  onClick={() => { handleViewClick(item); }} /></Col>
            </Row>
            { typeof(currentStatus) !== "undefined" && currentStatus.step_id === item._id ? 
              <>
                <Row>
                  <Col className="upper-case-first"><span className="text-muted">Status:</span> {currentStatus.status} 
                    <FontAwesomeIcon icon={faSearchPlus}
                      className="ml-1"
                      size="xs"
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleViewActivityLogClick(currentStatus); }} /></Col>
                </Row>
                <Row>
                  <Col><span className="text-muted">On:</span> <Moment format="YYYY-MM-DD, hh:mm a" date={currentStatus.updatedAt} /></Col>
                </Row>
              </> : null}
            <Row>
              <Col className="text-right pt-1">
                <FontAwesomeIcon icon={faCog}
                  style={{ cursor: "pointer" }}
                  className="text-muted mr-1"
                  onClick={() => { handleEditClick("tool", item.tool.tool_identifier, item._id); }} />
                { nextStep._id === item._id || currentStatus.step_id === item._id ?
                  <>
                    {/* <FontAwesomeIcon icon={faPause}
                      className="ml-2" disabled
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleClick(item._id); }} /> */}
                    
                    {showCancelAlert ? <FontAwesomeIcon icon={faSpinner} spin className="ml-2 mr-1" />
                      :
                      <FontAwesomeIcon icon={faBan}
                        className="ml-2 mr-1" disabled
                        style={{ cursor: "pointer" }}
                        onClick={() => { handleCancelClick(item._id); }} /> }
                    
                    {showActionAlert ? <FontAwesomeIcon icon={faSpinner} spin className="ml-2" />
                      :
                      <FontAwesomeIcon icon={faPlay}
                        className="ml-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => { handleRunClick(item._id); }} /> }


                  </> : null}
              </Col>
            </Row>
            
          </QuoteItem>
        )}
      </Draggable>
      

      <div className="text-center py-1">
        <FontAwesomeIcon icon={faChevronDown} size="lg" className="nav-blue"/>            
      </div>

      {showModal ? <Modal header="Log Details"
        message={<pre>{JSON.stringify(modalMessage, null, 2)}</pre>}
        button="OK"
        size="lg"
        handleCancelModal={() => setShowModal(false)}
        handleConfirmModal={() => setShowModal(false)} /> : null}
    </>
  );
};




PipelineWorkflowDetail.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

Item.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  lastStep: PropTypes.object,
  nextStep: PropTypes.object,
  pipelineId: PropTypes.string,
  parentCallback: PropTypes.func
};

ItemList.propTypes = {
  items: PropTypes.array,
  lastStep: PropTypes.object,
  nextStep: PropTypes.object,
  pipelineId: PropTypes.string,
  parentCallback: PropTypes.func
};


export default PipelineWorkflowDetail;