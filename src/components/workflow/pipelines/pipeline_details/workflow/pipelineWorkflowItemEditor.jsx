import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../api/apiService";
import LoadingDialog from "../../../../common/status_notifications/loading";
import ErrorDialog from "../../../../common/status_notifications/error";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SourceRepositoryConfig from "../../../forms/sourceRepository";
import StepNotificationConfig from "../../../forms/notifications";
import StepToolConfiguration from "../../../forms/stepToolConfiguration";
import StepConfiguration from "../../../forms/stepConfiguration";


const PipelineWorkflowEditor = ({ editItem, pipeline, closeEditorPanel, fetchPlan }) => {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  
  async function postData(param) {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${pipeline._id}/update`;   
    try {
      await axiosApiService(accessToken).post(apiUrl, param);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }

  const handleCloseClick = () => {
    closeEditorPanel();
  };

  const callbackFunctionTools = async (plan) => {
    pipeline.workflow.plan = plan;
    await postData(pipeline);
    await fetchPlan();
    closeEditorPanel();    
  };

  const callbackConfigureStep = async (plan) => {
    pipeline.workflow.plan = plan;
    await postData(pipeline);
    fetchPlan();  
    closeEditorPanel();  
  };

  const callbackFunctionSource = async (source) => {
    pipeline.workflow.source = source;
    await postData(pipeline);
    fetchPlan();
    closeEditorPanel();  
  };
  
  if (error) {
    return (<ErrorDialog error={error} />);
  } else if (loading) {
    return (<LoadingDialog size="sm" />);
  } else {
    
    switch (editItem.type) {
    case "source": 
      return (
        <>
          <Row className="mb-2">
            <Col sm={10}><h5>Source Repository</h5></Col>
            <Col sm={2} className="text-right">
              <FontAwesomeIcon 
                icon={faTimes} 
                className="mr-1"
                style={{ cursor:"pointer" }}
                onClick={() => { handleCloseClick(); }} />
            </Col>
          </Row>
          <SourceRepositoryConfig data={pipeline} parentCallback={callbackFunctionSource} />          
        </>
      );

    case "notification":
      return (
        <>
          <Row className="mb-2">
            <Col sm={10}><h5>Step Notification</h5></Col>
            <Col sm={2} className="text-right">
              <FontAwesomeIcon 
                icon={faTimes} 
                className="mr-1"
                style={{ cursor:"pointer" }}
                onClick={() => { handleCloseClick(); }} />
            </Col>
          </Row>
          <StepNotificationConfig data={pipeline} stepId={editItem.step_id} parentCallback={callbackFunctionTools} />
        </>
      );

    case "step":
      return (
        <>
          <Row className="mb-2">
            <Col sm={10}><h5>Step Setup</h5></Col>
            <Col sm={2} className="text-right">
              <FontAwesomeIcon 
                icon={faTimes} 
                className="mr-1"
                style={{ cursor:"pointer" }}
                onClick={() => { handleCloseClick(); }} />
            </Col>
          </Row>            
          <StepConfiguration data={pipeline} stepId={editItem.step_id} parentCallback={callbackConfigureStep} /> 
        </>
      );

    default: 
      return (
        <>
          <Row className="mb-2">
            <Col sm={10}><h5>Step Configuration</h5></Col>
            <Col sm={2} className="text-right">
              <FontAwesomeIcon 
                icon={faTimes} 
                className="mr-1"
                style={{ cursor:"pointer" }}
                onClick={() => { handleCloseClick(); }} />
            </Col>
          </Row> 
          <StepToolConfiguration pipeline={pipeline} editItem={editItem} parentCallback={callbackFunctionTools} reloadParentPipeline={fetchPlan} closeEditorPanel={closeEditorPanel} /> 
        </>
      );
    }
  }
};



PipelineWorkflowEditor.propTypes = {
  editItem: PropTypes.object,
  pipeline: PropTypes.object,
  parentCallback: PropTypes.func,
  fetchPlan: PropTypes.func
};

export default PipelineWorkflowEditor;