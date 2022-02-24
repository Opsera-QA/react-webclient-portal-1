import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import StepToolConfiguration from "./step_configuration/StepToolConfiguration";
import StepConfiguration from "./step_configuration/StepConfiguration";
import StepNotificationConfiguration from "./step_configuration/step_notification_configuration/StepNotificationConfiguration";
import { DialogToastContext } from "contexts/DialogToastContext";
import StepToolHelpIcon from "components/workflow/pipelines/pipeline_details/workflow/StepToolHelpIcon";
import SourceRepositoryConfiguration
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/SourceRepositoryConfiguration";


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

  // TODO: We should be handling this inside the step forms themselves
  const postData = async (pipeline, type) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${pipeline._id}/update`;
    try {
      const response = await axiosApiService(accessToken).post(apiUrl, pipeline);
      toastContext.showUpdateSuccessResultDialog(type);
      await fetchPlan();
      return response;
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
    return await postData(pipeline, "Step Configuration");
  };

  const callbackConfigureStep = async (plan) => {
    pipeline.workflow.plan = plan;
    return await postData(pipeline, "Pipeline Step Setup");
  };

  const callbackFunctionSource = async (source) => {
    pipeline.workflow.source = source;
    return await postData(pipeline, "Source Repository");
  };

  const getTitleBar = (title) => {
    return (
      <div className="px-2 my-auto content-block-header">
        <h5 className={"py-2 d-flex justify-content-between mb-0"}>
          <div className={"my-auto"}>{title}</div>
          <div className={"d-flex"}>
            <StepToolHelpIcon type={editItem?.type} tool={editItem?.tool_name?.toLowerCase()} />
            <FontAwesomeIcon icon={faTimes} size={"lg"} style={{ cursor: "pointer"}} onClick={() => {handleCloseClick();}}/>
          </div>
        </h5>
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
          pipeline={pipeline}
          parentCallback={callbackFunctionSource}
          handleCloseClick={handleCloseClick}/>
      </div>
    </>);
  }

  // TODO: Remove when overlay is pushed to master
  if (editItem.type === "notification") {
    return (<>
      {getTitleBar("Step Notification")}
      <div className="p-3 bg-white step-settings-container">
        {showToast && <div className="mb-2">{toast}</div>}
        <StepNotificationConfiguration
          pipeline={pipeline}
          stepId={editItem?.step_id}
          handleCloseClick={handleCloseClick}
        />
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