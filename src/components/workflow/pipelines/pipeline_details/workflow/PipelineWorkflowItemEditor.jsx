import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import StepToolConfiguration from "./step_configuration/StepToolConfiguration";
import PipelineStepConfiguration from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepConfiguration";
import { DialogToastContext } from "contexts/DialogToastContext";
import StepToolHelpIcon from "components/workflow/pipelines/pipeline_details/workflow/StepToolHelpIcon";
import PipelineSourceRepositoryConfiguration
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositoryConfiguration";
import IconBase from "components/common/icons/IconBase";

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
      await fetchPlan();
      return response;
    } catch (error) {
      setLoading(false);
      toastContext.showSaveFailureToast(type, error);
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

  const getTitleBar = (title) => {
    return (
      <div className={"px-2 my-auto content-block-header d-flex"}>
          <h5 className={"my-auto d-flex justify-content-between h-100 w-100"}>
            <div className={"my-auto"}>{title}</div>
            <div className={"d-flex"}>
              <StepToolHelpIcon
                type={editItem?.type}
                tool={editItem?.tool_name?.toLowerCase()}
              />
              <IconBase
                icon={faTimes}
                iconSize={"lg"}
                className={"pointer"}
                onClickFunction={() => {handleCloseClick();}}
              />
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
      {getTitleBar("Pipeline Settings")}
      <div className="p-3 bg-white step-settings-container">
        <PipelineSourceRepositoryConfiguration
          pipeline={pipeline}
          handleCloseClick={handleCloseClick}/>
      </div>
    </>);
  }

  if (editItem.type === "step") {
    return (<>
      {getTitleBar("Step Definition")}
      <div className="px-3 pb-3 pt-2 bg-white step-settings-container">
        <PipelineStepConfiguration
          step={editItem}
          stepId={editItem?.step_id}
          plan={pipeline?.workflow?.plan}
          parentCallback={callbackConfigureStep}
          closeEditorPanel={handleCloseClick}
        />
      </div>
    </>);
  }

  return (
    <>
      {getTitleBar("Step Settings")}
      <div className="p-3 bg-white step-settings-container">
        {showToast && <div className="mb-2">{toast}</div>}
        <StepToolConfiguration
          pipeline={pipeline}
          pipelineStepId={editItem?.step_id}
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