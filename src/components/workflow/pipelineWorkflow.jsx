import React, { useContext, useState, useEffect } from "react";
//import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiService } from "../../api/apiService";
import { Row, Col } from "react-bootstrap";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faCog, faBars, faPause, faBan, faPlay, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "../common/modal";
import "./workflows.css";



function PipelineWorkflow({ id }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {    
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${id}`;   
    try {
      const pipeline = await axiosApiService(accessToken).get(apiUrl);
      setData(pipeline && pipeline.data[0].workflow);
      setLoading(false);    
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }

  
  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        {loading ? <LoadingDialog size="sm" /> :
          <>
            <div className="mt-3 max-content-width">
              {data.length == 0 ?
                <InfoDialog message="No Pipeline details found.  Please ensure you have access to view the requested pipeline." /> : 
                <>
                  {data !== undefined ? <PipelineWorkflowDetail data={data} /> : null}
                </>
              }
                
            </div>
          </>
        }
      </>
    );
  }
}



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
  const { data } = props;
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
    if (data.plan !== undefined) {
      setState({ items: data.plan });
    }
    
  }, [data]);

  return (
    <>
      {data.source === undefined ? <LoadingDialog size="sm" /> :
        <>
          <div className="workflow-module-container">
            <Row>
              <Col>Source Repository</Col>
              <Col>{data.source.repository} / {data.source.branch}</Col>
            </Row>
            <Row>
              <Col className="text-muted upper-case-first">{data.source.name} 
                <FontAwesomeIcon icon={faSearchPlus}
                  className="ml-1"
                  size="xs"
                  style={{ cursor: "pointer" }}
                  onClick={() => { handleViewClick(data.source); }} /></Col>
            </Row>
          </div>
          <div className="text-center workflow-module-container-arrow py-1">
            <FontAwesomeIcon icon={faChevronDown} size="lg" className="nav-blue"/>            
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {provided => (
                <div className="workflow-parent-module-container" ref={provided.innerRef} {...provided.droppableProps}>
                  <ItemList items={state.items} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="workflow-module-container py-2 text-center h5">
            End of Workflow
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

const ItemList = React.memo(function ItemList({ items }) {
  return items.map((item: object, index: number) => (
    <Item item={item} index={index} key={item._id} />
  ));
});

function Item({ item, index }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});

  const handleViewClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
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
                  onClick={() => { handleClick(item); }} />
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

      <div className="text-center workflow-module-container-arrow py-1">
        <FontAwesomeIcon icon={faChevronDown} size="lg"/>            
      </div>

      {showModal ? <Modal header="Log Details"
        message={<pre>{JSON.stringify(modalMessage, null, 2)}</pre>}
        button="OK"
        size="lg"
        handleCancelModal={() => setShowModal(false)}
        handleConfirmModal={() => setShowModal(false)} /> : null}
    </>
  );
}


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


PipelineWorkflow.propTypes = {
  id: PropTypes.string
};

PipelineWorkflowDetail.propTypes = {
  data: PropTypes.object
};

Item.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
};

ItemList.propTypes = {
  item: PropTypes.object
};

EditItem.propTypes = {
  item: PropTypes.object
};

export default PipelineWorkflow;