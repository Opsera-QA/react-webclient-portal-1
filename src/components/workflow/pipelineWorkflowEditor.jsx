import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SourceRepositoryConfig from "./forms/sourceRepository";
import StepNotificationConfig from "./forms/notifications";
import StepToolConfiguration from "./forms/stepToolConfiguration";
 


const PipelineWorkflowEditor = ({ editItem, data, parentCallback }) => {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [loading, setLoading] = useState(false);

  async function postData(param) {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${data._id}/update`;   
    try {
      await axiosApiService(accessToken).post(apiUrl, param);
      setLoading(false);    
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }

  const handleCloseClick = (param) => {
    parentCallback(param);
  };

  const callbackFunctionTools = async (plan) => {
    data.workflow.plan = plan;
    await postData(data);
    parentCallback(data);  
  };

  const callbackFunctionSource = async (source) => {
    data.workflow.source = source;
    await postData(data);
    parentCallback(data);  
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
            <Col sm={10}><h5>Source Repository Configuration</h5></Col>
            <Col sm={2} className="text-right">
              <FontAwesomeIcon 
                icon={faTimes} 
                className="mr-1"
                style={{ cursor:"pointer" }}
                onClick={() => { handleCloseClick(); }} />
            </Col>
          </Row>
          <SourceRepositoryConfig data={data} parentCallback={callbackFunctionSource} />          
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
          <StepNotificationConfig data={data} editItem={editItem} parentCallback={callbackFunctionTools} />          
        </>
      );

    case "approval":
      return (
        <>
          coming soon
        </>
      );

    default: 
      return (
        <>
          <Row className="mb-2">
            <Col sm={10}><h5>Tool Configuration</h5></Col>
            <Col sm={2} className="text-right">
              <FontAwesomeIcon 
                icon={faTimes} 
                className="mr-1"
                style={{ cursor:"pointer" }}
                onClick={() => { handleCloseClick(); }} />
            </Col>
          </Row>            
          <StepToolConfiguration data={data} editItem={editItem} parentCallback={callbackFunctionTools} /> 
        </>
      );
    }
  }
};



PipelineWorkflowEditor.propTypes = {
  editItem: PropTypes.object,
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default PipelineWorkflowEditor;