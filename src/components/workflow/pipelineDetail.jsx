import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Card, Row, Col, Table, Button } from "react-bootstrap";
import Modal from "../common/modal";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiServiceMultiGet } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import Moment from "react-moment";
import PipelineActions from "./actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faPencilAlt, faPause, faBan, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./workflows.css";


function PipelineDetail({ id }) {
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
    const apiUrls = [ `/pipelines/${id}`, `/pipelines/${id}/activity` ];   
    try {
      const [pipeline, activity] = await axiosApiServiceMultiGet(accessToken, apiUrls);
      setData({
        pipeline: pipeline && pipeline.data[0],
        activity: activity && activity.data
      });
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
                
                  <ItemSummaryDetail data={data.pipeline} /> 
                  <PipelineActivity data={data.activity} /> 
                </>
              }
                
            </div>
          </>
        }
      </>
    );
  }
}


const ItemSummaryDetail = (props) => {
  const { data } = props;
  const contextType = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalDeleteId, setModalDeleteId] = useState(false);
  let history = useHistory();

  const handleEditClick = (param) => {
    //edit fields
  };

  const handleActionClick = (action, itemId) => e => {
    e.preventDefault();
    if (action === "delete") {
      setShowDeleteModal(true);
      setModalDeleteId(itemId);
    } else {
      alert("coming soon");
    }
  };

  //let history = useHistory();
  async function deleteItem(pipelineId) {
    setLoading(true);
    const { getAccessToken } = contextType;
    await PipelineActions.delete(pipelineId, getAccessToken);
    setLoading(false);
    
    history.push("/workflow");
  }


  return (
    <>
      {data !== undefined ? 
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>{data.name} 
              <FontAwesomeIcon icon={faPencilAlt}
                className="ml-2 text-muted"
                size="xs" transform="shrink-6"
                style={{ cursor: "pointer" }}
                onClick= {() => { handleEditClick("name"); }} /></Card.Title>
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
              <Col lg className="py-1"><span className="text-muted mr-1">Created On:</span>  <Moment format="MMM Do YYYY, h:mm:ss a" date={data.createdAt} /></Col>
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
                <Button variant="outline-secondary" size="sm" className="mr-2 mt-2" onClick={handleActionClick("run", data._id)}>
                  <FontAwesomeIcon icon={faPlay} className="mr-1"/>Run</Button>
                <Button variant="outline-secondary" size="sm" className="mr-2 mt-2" onClick={handleActionClick("pause", data._id)}>
                  <FontAwesomeIcon icon={faPause} className="mr-1"/>Pause</Button>
                <Button variant="outline-secondary" size="sm" className="mr-2 mt-2" onClick={handleActionClick("disable", data._id)}>
                  <FontAwesomeIcon icon={faBan} className="mr-1"/>Suspend</Button>
                <Button variant="outline-danger" size="sm" className="mr-2 mt-2" onClick={handleActionClick("delete", data._id)}>
                  <FontAwesomeIcon icon={faTrash} className="mr-1"/>Delete</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card> : null}

      {showDeleteModal ? <Modal header="Confirm Pipeline Delete"
        message="Warning! Data cannot be recovered once this pipeline is deleted. Do you still want to proceed?"
        button="Confirm"
        handleCancelModal={() => setShowDeleteModal(false)}
        handleConfirmModal={() => deleteItem(modalDeleteId)} /> : null}

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
      {data !== undefined && data !== null ?
        <>
          <div className="h6 mt-4">Activity Log</div>
          <Table striped bordered hover className="table-sm" style={{ fontSize:"small" }}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Plan</th>
                <th style={{ width: "10%" }}>Task</th>
                <th style={{ width: "10%" }}>Tool</th>
                <th style={{ width: "5%" }}>Build</th>
                <th style={{ width: "20%" }}>Summary</th>
                <th style={{ width: "30%" }}>Detail</th>
                <th style={{ width: "5%" }}>Status</th>
                <th style={{ width: "10%" }}>Date</th>
              </tr>
            </thead>
            <tbody>
            
              {data.map((item, idx) => (
                <tr key={idx} >
                  <td className="force-text-wrap">{item["plan_id"]}</td>
                  <td className="force-text-wrap">{item["task"]}</td> 
                  <td className="upper-case-first">{item["system"]}</td>
                  <td>{item["build_number"]}</td>
                  <td className="force-text-wrap">{item["summary"]}</td>
                  <td className="force-text-wrap">{item["detail"]} 
                    <FontAwesomeIcon icon={faSearchPlus}
                      className="ml-1"
                      size="xs"
                      style={{ cursor: "pointer" }}
                      onClick= {() => { handleClick(item); }} />
                  </td>
                  <td className="upper-case-all">{item["status"]}</td>
                  <td><Moment format="MM/DD/YYYY, h:mm:ss a" date={item["createdAt"]} /></td>   
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
        : <InfoDialog message="No pipeline activity data currently available.  Logs will get populated once the workflow starts running." />}

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
  data: PropTypes.object
};

PipelineActivity.propTypes = {
  data: PropTypes.array
};

export default PipelineDetail;