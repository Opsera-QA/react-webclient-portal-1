import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { axiosApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import ModalActivityLogs from "../common/modalActivityLogs";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

import "./workflows.css";


function WorkflowCatalog() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  
  const callbackFunction = (item) => {
    setModalMessage(item);
    setShowModal(true);
  };

  useEffect(() => {    
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();

    const apiUrl = "/pipelines/workflows";   
    try {
      const result = await axiosApiService(accessToken).get(apiUrl);
      setData(result.data ? result.data : []);
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
              <div className="mb-3 p-1">Listed below are workflow catalog options to choose from.  Each one contains specific tools and workflows for creating 
              your new pipeline.  After selecting a workflow to add to your pipeline, you will be able to customize it and add the proper tool configurations.</div>
              
              {data !== undefined && data.length > 0 ?
                <ItemSummaries data={data} parentCallback = {callbackFunction}  /> :
                <InfoDialog message="No Catalog Items Found" />}
            </div>

            <ModalActivityLogs header="Template Details" size="lg" jsonData={modalMessage} show={showModal} setParentVisibility={setShowModal} />
          </>
        }
      </>
    );
  }
}


const ItemSummaries = (props) => {
  const { data, parentCallback } = props;
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  
  const handleDetailsClick = param => e => {
    e.preventDefault();
    parentCallback(param);    
  };

  const handleAddClick = param => e => {
    console.log("Adding: ", param);
    e.preventDefault();
    postData(param._id);
  };

  async function postData(templateId) {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/deploy/${templateId}`;   
    const params = {};
    try {
      const result = await axiosApiService(accessToken).post(apiUrl, params);
      
      let newPipelineId = result.data !== undefined ? result.data._id : false;
      
      if (newPipelineId) {
        history.push(`/workflow/${newPipelineId}`);
      }
      setLoading(false);    
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }

  return (
    <>
      {loading ? <LoadingDialog size="lg" /> : null}
      <Row>
        {data !== undefined ? data.map((item, idx) => (
          <Col sm={6} lg={4} key={idx} className="p-2">
            <Card style={{ height:"100%" }}>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text className="mb-2">{item.description}</Card.Text>
              
                {/* <Row className="mt-2">
                <Col lg className="text-muted">Tags: {item.tags.map((item, idx) => (<span key={idx}>{item}, </span>))}</Col>
              </Row> */}
                {/* <Row className="mt-4">
                <Col lg className=""><span className="text-muted">Tools: </span>
                  {buildToolList(item.plan).map((item, idx) => (<span key={idx} className="upper-case-first mr-1">{item} </span>))}</Col>
              </Row> */}

                <Row className="mt-3">
                  <Col lg><small className="text-muted">Last updated on <Moment format="YYYY-MM-DD" date={item.updatedAt} /></small></Col>
                </Row>
                <Row className="mb-2">
                  <Col lg><small className="text-muted">Created on <Moment format="YYYY-MM-DD" date={item.createdAt} /></small></Col>
                </Row>

              </Card.Body>
              <Card.Footer style={{ backgroundColor: "#fff" }}>
                <Button variant="primary" size="sm" className="mr-2 mt-2" onClick={handleAddClick(item)}>
                  <FontAwesomeIcon icon={faPlus} className="mr-1"/>  Add</Button>
                <Button variant="outline-secondary" size="sm" className="mr-2 mt-2" onClick={handleDetailsClick(item)}>
                  <FontAwesomeIcon icon={faSearch} className="mr-1"/>Details</Button>
              </Card.Footer>
            </Card>
          </Col>)) : null}
      </Row>
    </>
    
  );
};


const buildToolList = (array) => {
  let tools = [];
  array.map((item) => {tools.push(item.tool.tool_identifier);});
  return tools.filter((a, b) => tools.indexOf(a) === b);
};


WorkflowCatalog.propTypes = {
  data: PropTypes.array
};


ItemSummaries.propTypes = {
  data: PropTypes.array,
  parentCallback: PropTypes.func
};

export default WorkflowCatalog;
