import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import LoadingDialog from "../common/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faCog, faBars, faPause, faBan, faPlay, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "../common/modal";
import Moment from "react-moment";
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
  const [state, setState] = useState({ items: [] });
  const [lastStep, setLastStep] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  
  const handleViewClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  const handleClick = (param) => {
    alert("coming soon");
  };

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

  useEffect(() => {    
    if (data.workflow !== undefined) {
      setState({ items: data.workflow.plan });
      setLastStep(data.workflow.last_step);
    }
    console.log(data);
  }, [data]);


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
      {typeof(data.workflow) !== "undefined" && data.workflow.hasOwnProperty("source") ? 
        <>
          <div className="workflow-container ml-4 px-3" style={{ maxWidth: "500px" }}>
            <div className="h6 p-2 text-center">{data.name} Workflow</div>
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
                  {data.workflow.source.repository ? <>
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
                  </>: null}
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
                      <ItemList items={state.items} lastStep={lastStep} parentCallback = {callbackFunction} />
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



const ItemList = React.memo(function ItemList({ items, lastStep, parentCallback }) {
  const callbackFunction = (param) => {
    parentCallback(param);
  };

  return items.map((item, index) => (
    <Item item={item} index={index} key={item._id} lastStep={lastStep}
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

const Item = ({ item, index, lastStep, parentCallback }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});

  const handleViewClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  const handleEditClick = (type, name, itemId) => {
    parentCallback({ type: type, tool_name: name, step_id: itemId });
  };

  const handleClick = (param) => {
    alert("coming soon");
  }; 

  const ItemStyle = {
    backgroundColor: lastStep.step_id === item._id ? "#28a74533" : "#fff"
  };
  
  return (
    <>
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
              <Col className="text-muted upper-case-first"><span className="text-muted">Tool:</span> {item.tool.tool_identifier} 
                <FontAwesomeIcon icon={faSearchPlus}
                  className="ml-1"
                  size="xs"
                  style={{ cursor: "pointer" }}
                  onClick={() => { handleViewClick(item); }} /></Col>
            </Row>
            { typeof(lastStep) !== "undefined" && lastStep.step_id === item._id ? 
              <>
                <Row>
                  <Col className="upper-case-first"><span className="text-muted">Status:</span> {lastStep.status}</Col>
                </Row>
                <Row>
                  <Col><span className="text-muted">Completed:</span> <Moment format="MMM Do YYYY, h:mm:ss a" date={lastStep.updatedAt} /></Col>
                </Row>
              </> : null}
            <Row>
              <Col className="text-right pt-1">
                <FontAwesomeIcon icon={faCog}
                  style={{ cursor: "pointer" }}
                  className="text-muted mr-1"
                  onClick={() => { handleEditClick("tool", item.tool.tool_identifier, item._id); }} />
                <FontAwesomeIcon icon={faPause}
                  className="ml-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => { handleClick(item._id); }} />
                <FontAwesomeIcon icon={faBan}
                  className="ml-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => { handleClick(item._id); }} />
                <FontAwesomeIcon icon={faPlay}
                  className="ml-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => { handleClick(item._id); }} />
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
  parentCallback: PropTypes.func
};

ItemList.propTypes = {
  items: PropTypes.array,
  lastStep: PropTypes.object,
  parentCallback: PropTypes.func
};


export default PipelineWorkflowDetail;