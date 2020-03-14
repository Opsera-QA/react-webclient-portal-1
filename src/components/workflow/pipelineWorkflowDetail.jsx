import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
// import { AuthContext } from "../../contexts/AuthContext"; 
// import { axiosApiService } from "../../api/apiService";
import { Row, Col } from "react-bootstrap";
import LoadingDialog from "../common/loading";
// import ErrorDialog from "../common/error";
//import InfoDialog from "../common/info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faCog, faBars, faPause, faBan, faPlay, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "../common/modal";
import "./workflows.css";


const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QuoteItem = styled.div`
  max-width: 450px;
  background-color: #fff;
  color: #334152;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  margin-bottom: ${grid}px;
  padding: ${grid}px;
`;


const PipelineWorkflowDetail = (props) => {
  const { data, parentCallback } = props;
  console.log(data);
  const [state, setState] = useState({ items: [] });
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
    }
    
  }, [data]);

  const callbackFunction = (item) => {
    parentCallback(item);
  };

  const handleEditClick = (param) => {
    parentCallback(param);
  };

  return (
    <>
      {data.workflow === undefined ? <LoadingDialog size="sm" /> :
        <>
          <div className="workflow-container ml-4 px-3" style={{ maxWidth: "500px" }}>
            <div className="h6 p-2 text-center">{data.name} Workflow</div>
            <div className="workflow-module-container workflow-module-container-width mx-auto">
              <Row>
                <Col>Source Repository</Col>
                <Col>{data.workflow.source.repository}</Col>
                <Col>{data.workflow.source.branch}</Col>
              </Row>
              {data.workflow.source.name ? 
                <Row>
                  <Col className="text-muted upper-case-first">{data.workflow.source.name} 
                    <FontAwesomeIcon icon={faSearchPlus}
                      className="ml-1"
                      size="xs"
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleViewClick(data.workflow.source); }} /></Col>
                </Row> : null}
              <Row>
                <Col className="text-right pt-1">
                  <FontAwesomeIcon icon={faCog}
                    style={{ cursor: "pointer" }}
                    className="text-muted mr-1"
                    onClick={() => { handleEditClick(data); }} />
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
                      <ItemList items={state.items} parentCallback = {callbackFunction} />
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
        </>
      }
    </>
  );
};



const ItemList = React.memo(function ItemList({ items, parentCallback }) {
  const callbackFunction = (item) => {
    parentCallback(item);
  };

  return items.map((item: object, index: number) => (
    <Item item={item} index={index} key={item._id} 
      parentCallback = {callbackFunction} />
  ));
});



const Item = ({ item, index, parentCallback }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});

  const handleViewClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  const handleEditClick = (param) => {
    parentCallback(param);
  };

  const handleClick = (param) => {
    alert("coming soon");
  };

  return (
    <>
      <Draggable draggableId={item._id} index={index}>
        {provided => (
          <QuoteItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
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
              <Col className="text-muted upper-case-first">{item.tool.name} 
                <FontAwesomeIcon icon={faSearchPlus}
                  className="ml-1"
                  size="xs"
                  style={{ cursor: "pointer" }}
                  onClick={() => { handleViewClick(item); }} /></Col>
            </Row>
            <Row>
              <Col className="text-right pt-1">
                <FontAwesomeIcon icon={faCog}
                  style={{ cursor: "pointer" }}
                  className="text-muted mr-1"
                  onClick={() => { handleEditClick(item); }} />
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


// TODO: This could use Context API to share data from the Item component.
function EditItem({ item }) {
  
  return (
    <>
      <div id="pipeline-sidebar" className="item-edit-sidebar">
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
    </>
  );
}




PipelineWorkflowDetail.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

Item.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  parentCallback: PropTypes.func
};

ItemList.propTypes = {
  items: PropTypes.array,
  parentCallback: PropTypes.func
};

EditItem.propTypes = {
  item: PropTypes.object
};

export default PipelineWorkflowDetail;