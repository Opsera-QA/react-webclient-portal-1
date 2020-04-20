import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../../contexts/AuthContext"; 
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import Moment from "react-moment";
import Modal from "../common/modal";
import PipelineActions from "./actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faSearch, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./workflows.css";


function MyPipelines() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {    
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();

    const apiCall = new ApiService("/pipelines", {}, accessToken);
    apiCall.get()
      .then(function (result) {
        console.log(result);
        setData(result.data);
        setLoading(false);        
      })
      .catch(function (error) {
        setLoading(false);
        setErrors(error);
        console.log(`Error Reported: ${error}`);
      });
  }

  const callbackFunction = (action) => {
    console.log("Action: ", action);
    fetchData();    
  };

  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        {loading ? <LoadingDialog size="sm" /> :
          <>
            <div className="mt-3 max-content-width">
              {typeof(data) !== "undefined" && data.length > 0 ?
                <ItemSummaries data={data} parentCallback = {callbackFunction} /> :
                <>
                  <div className="mt-5">
                    <Alert variant="secondary">
                      <Alert.Heading>Welcome to the new OpsERA Pipelines!</Alert.Heading>
                      <p>
                      This technology will enable you to leverage OpsERA's expertise in building and managing DevSecOPS workflows as well as 
                      building custom pipelines to meet your individual needs.  At this time you do not have any pipelines configured.  Please visit 
                      the Catalog in order to add a workflow template to your pipeline.
                      </p>
                      <hr />
                      <div className="d-flex justify-content-end">
                        <LinkContainer to={"/workflow/catalog"}>
                          <Button variant="primary" size="sm" className="mr-2 mt-2">
                            <FontAwesomeIcon icon={faList} className="mr-1"/>Choose A Catalog Item</Button>
                        </LinkContainer>
                      </div>
                    </Alert>
                  </div>
                </>  }
            </div>
          </>
        }
      </>
    );
  }
}


const ItemSummaries = (props) => {
  const { data, parentCallback } = props;
  let history = useHistory();
  const contextType = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalDeleteId, setModalDeleteId] = useState(false);
  
  const handleDetailsClick = param => e => {
    e.preventDefault();
    history.push(`/workflow/${param}`);
  };

  const handleActionClick = (action, itemId) => e => {
    e.preventDefault();
    console.log("Performing Action  ", action);
    console.log("ID:  ", itemId);

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

  async function deleteItem(pipelineId) {
    setLoading(true);
    const { getAccessToken } = contextType;
    await PipelineActions.delete(pipelineId, getAccessToken);
    setLoading(false);
    parentCallback("delete");
  }

  
  return (
    <>
      {loading ? <LoadingDialog size="lg" /> : null}
      {data.length > 0 ? data.map((item, idx) => (        
        <div className="list-item-container my-3" key={idx}> 
          <Row className="row-content-spacing">
            <Col className="h5">{item.name}</Col>
            <Col sm={1}><Button variant="outline-danger" size="sm" className="mr-2" onClick={handleActionClick("delete", item._id)}>
              <FontAwesomeIcon icon={faTrash} className="fa-fw"/></Button></Col>
          </Row>

          <Row className="row-content-spacing">
            <Col>{item.description}</Col>
          </Row>
          
          <Row className="row-content-spacing">
            <Col><span className="text-muted">Created on: </span> <Moment format="YYYY-MM-DD, hh:mm a" date={item.createdAt} /></Col>
            <Col><span className="text-muted">Last Activity on: </span> <Moment format="YYYY-MM-DD, hh:mm a" date={item.updatedAt} /></Col>
          </Row>
          
          { item.workflow.hasOwnProperty("last_step") ? 
            <Row className="row-content-spacing">
              <Col><span className="text-muted">Current Status: </span> 
                { item.workflow.last_step.hasOwnProperty("status") && item.workflow.last_step.status === "running" ? 
                  <span className="green">Pipeline Running</span> : 
                  <span>Pipeline Idle</span>
                }
              
              </Col>
              { item.workflow.last_step.hasOwnProperty("failed") ? 
                <Col className="failure-text">Last Failure on: <Moment format="YYYY-MM-DD, hh:mm a" date={item.workflow.last_step.failed.updatedAt} /></Col> : null }
              
              { item.workflow.last_step.hasOwnProperty("success") ? 
                <Col className="green">Last Successful on : <Moment format="YYYY-MM-DD, hh:mm a" date={item.workflow.last_step.success.updatedAt} /></Col> : null }
            </Row> : null }


          <Button variant="primary" size="sm" className="mr-2 mt-3" onClick={handleDetailsClick(item._id)}>
            <FontAwesomeIcon icon={faSearch} className="mr-1"/> View Pipeline </Button>
        </div>
        
      )) : null}


      {showDeleteModal ? <Modal header="Confirm Pipeline Delete"
        message="Warning! Data cannot be recovered once this pipeline is deleted. Do you still want to proceed?"
        button="Confirm"
        handleCancelModal={() => setShowDeleteModal(false)}
        handleConfirmModal={() => deleteItem(modalDeleteId)} /> : null}
    </>
    
  );
};

ItemSummaries.propTypes = {
  data: PropTypes.array,
  parentCallback: PropTypes.func
};

export default MyPipelines;
