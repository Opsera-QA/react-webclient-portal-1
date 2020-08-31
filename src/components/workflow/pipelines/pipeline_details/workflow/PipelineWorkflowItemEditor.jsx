import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../api/apiService";
import LoadingDialog from "../../../../common/status_notifications/loading";
import ErrorDialog from "../../../../common/status_notifications/error";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SourceRepositoryConfiguration from "./step_configuration/SourceRepositoryConfiguration";
import StepNotificationConfig from "./step_configuration/StepNotificationConfiguration";
import StepToolConfiguration from "./step_configuration/StepToolConfiguration";
import StepConfiguration from "./step_configuration/StepConfiguration";
import {getUpdateFailureResultDialog, getUpdateSuccessResultDialog} from "../../../../common/toasts/toasts";
import StepNotificationConfiguration from "./step_configuration/StepNotificationConfiguration";


const PipelineWorkflowEditor = ({ editItem, pipeline, closeEditorPanel, fetchPlan }) => {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);
  
  const postData = async (pipeline, type) => {
    console.log("in post data: " + JSON.stringify(pipeline));
    console.log("Type: " + type);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${pipeline._id}/update`;   
    try {
      await axiosApiService(accessToken).post(apiUrl, pipeline);
      await fetchPlan();
      let toast = getUpdateSuccessResultDialog(type, setShowToast);
      setToast(toast);
      setShowToast(true);
    }
    catch (error) {
      console.error(error.message);
      setLoading(false);
      let toast = getUpdateFailureResultDialog(type, error, setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  }

  const handleCloseClick = () => {
    closeEditorPanel();
  };

  // TODO: Pull actual names
  const callbackFunctionTools = async (plan) => {
    pipeline.workflow.plan = plan;
    await postData(pipeline, "Step Configuration Tool");
    // closeEditorPanel();
  };

  const callbackConfigureStep = async (plan) => {
    pipeline.workflow.plan = plan;
    await postData(pipeline, "Pipeline Step");
    // closeEditorPanel();
  };

  const callbackFunctionSource = async (source) => {
    pipeline.workflow.source = source;
    await postData(pipeline, "Source Repository");
    // closeEditorPanel();
  };

  const getTitleBar = (title) => {
    return (
      <div className="pt-2 px-2 content-block-header">
        <Row>
          <Col sm={10}><h5>{title}</h5></Col>
          <Col sm={2} className="text-right" style={{bottom: "5px"}}>
            <FontAwesomeIcon
              icon={faTimes}
              className="mr-1"
              style={{ cursor:"pointer" }}
              onClick={() => { handleCloseClick(); }} />
          </Col>
        </Row>
      </div>
    );
  }
  
  if (error) {
    return (<ErrorDialog error={error} />);
  } else if (loading) {
    return (<LoadingDialog size="sm" />);
  } else if (editItem.type === "source") {
    return (<>
      {getTitleBar("Source Repository")}
      {showToast && toast}
      <div className="p-3 bg-white">
        <SourceRepositoryConfiguration data={pipeline} setToast={setToast} setShowToast={setShowToast} parentCallback={callbackFunctionSource} />
      </div>
    </>);
  } else if (editItem.type === "notification") {
    return (<>
      {getTitleBar("Step Notification")}
      {showToast && toast}
      <div className="p-3 bg-white">
        <StepNotificationConfiguration data={pipeline} setToast={setToast} setShowToast={setShowToast} stepId={editItem.step_id} parentCallback={callbackFunctionTools} />
      </div>
    </>);
  } else if (editItem.type === "step") {
    return (<>
      {getTitleBar("Step Setup")}
      {showToast && toast}
      <div className="p-3 bg-white">
        <StepConfiguration data={pipeline} setToast={setToast} setShowToast={setShowToast} stepId={editItem.step_id} parentCallback={callbackConfigureStep} />
      </div>
    </>);
  } else {
    return (
      <>
        {getTitleBar("Step Configuration")}
        {showToast && toast}
        <div className="p-3 bg-white">
          <StepToolConfiguration
            pipeline={pipeline}
            editItem={editItem}
            parentCallback={callbackFunctionTools}
            reloadParentPipeline={fetchPlan}
            closeEditorPanel={closeEditorPanel}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        </div>
      </>
    );
  }
};



PipelineWorkflowEditor.propTypes = {
  editItem: PropTypes.object,
  pipeline: PropTypes.object,
  parentCallback: PropTypes.func,
  fetchPlan: PropTypes.func
};

export default PipelineWorkflowEditor;