import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import SourceRepositoryConfiguration from "./step_configuration/SourceRepositoryConfiguration";
import StepToolConfiguration from "./step_configuration/StepToolConfiguration";
import StepConfiguration from "./step_configuration/StepConfiguration";
import StepNotificationConfiguration from "./step_configuration/step_notification_configuration/StepNotificationConfiguration";
import { DialogToastContext } from "contexts/DialogToastContext";


const PipelineWorkflowEditor = ({ editItem, pipeline, closeEditorPanel, fetchPlan }) => {
  const contextType = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(undefined);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(false);
    setToast(undefined);
  }, [editItem]);

  const postData = async (pipeline, type) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${pipeline._id}/update`;
    try {
      await axiosApiService(accessToken).post(apiUrl, pipeline);
      await fetchPlan();
      toastContext.showUpdateSuccessResultDialog("Step Configuration");
    } catch (err) {
      setLoading(false);
      toastContext.showLoadingErrorDialog(err);
    }
  };

  const handleCloseClick = async () => {
    closeEditorPanel();
    await fetchPlan();
  };

  // TODO: Pull actual names
  const callbackFunctionTools = async (plan) => {
    pipeline.workflow.plan = plan;
    await postData(pipeline, "Step Configuration Tool");
  };

  const callbackConfigureStep = async (plan) => {
    pipeline.workflow.plan = plan;
    await postData(pipeline, "Pipeline Step");
  };

  const callbackFunctionSource = async (source) => {
    pipeline.workflow.source = source;
    await postData(pipeline, "Source Repository");
  };

  const getTitleBar = (title) => {
    return (
      <div className="pt-2 px-2 content-block-header">
        <Row>
          <Col sm={10}><h5>{title}</h5></Col>
          <Col sm={2} className="text-right" style={{ bottom: "5px" }}>
            <FontAwesomeIcon
              icon={faTimes}
              className="mr-1"
              size={"2x"}
              style={{ cursor: "pointer", verticalAlign: "middle" }}
              onClick={() => {
                handleCloseClick();
              }}/>
          </Col>
        </Row>
      </div>
    );
  };

  if (loading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (editItem.type === "source") {
    return (<>
      {getTitleBar("Source Repository")}
      <div className="p-3 bg-white step-settings-container">
        {showToast && <div className="mb-2">{toast}</div>}
        <SourceRepositoryConfiguration
          data={pipeline}
          parentCallback={callbackFunctionSource}
          handleCloseClick={handleCloseClick}/>
      </div>
    </>);
  }

  if (editItem.type === "notification") {
    return (<>
      {getTitleBar("Step Notification")}
      <div className="p-3 bg-white step-settings-container">
        {showToast && <div className="mb-2">{toast}</div>}
        <StepNotificationConfiguration
          data={pipeline}
          stepId={editItem.step_id}
          handleCloseClick={handleCloseClick}
          parentCallback={callbackFunctionTools}/>
      </div>
    </>);
  }

  if (editItem.type === "step") {
    return (<>
      {getTitleBar("Step Setup")}
      <div className="p-3 bg-white step-settings-container">
        <StepConfiguration
          plan={pipeline?.workflow?.plan}
          stepId={editItem?.step_id}
          parentCallback={callbackConfigureStep}
          closeEditorPanel={handleCloseClick} />
      </div>
    </>);
  }

  return (
    <>
      {getTitleBar("Step Configuration")}
      <div className="p-3 bg-white step-settings-container">
        {showToast && <div className="mb-2">{toast}</div>}
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

};


PipelineWorkflowEditor.propTypes = {
  editItem: PropTypes.object,
  pipeline: PropTypes.object,
  parentCallback: PropTypes.func,
  fetchPlan: PropTypes.func,
  closeEditorPanel: PropTypes.func
};

export default PipelineWorkflowEditor;