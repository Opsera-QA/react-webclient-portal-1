import React, { useState } from "react";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import { SteppedLineTo } from "react-lineto";
import ErrorDialog from "components/common/status_notifications/error";
import ModalActivityLogs from "components/common/modal/modalActivityLogs";
import PipelineWorkflowItemList from "./PipelineWorkflowItemList";
import modelHelpers from "components/common/model/modelHelpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  sourceRepositoryConfigurationMetadata
} from "components/workflow/plan/source/sourceRepositoryConfiguration.metadata";
import PipelineWorkflowViewConfigurationButton
  from "components/workflow/pipelines/pipeline_details/workflow/buttons/PipelineWorkflowViewConfigurationButton";
import PipelineWorkflowExportWorkflowButton
  from "components/workflow/pipelines/pipeline_details/workflow/buttons/PipelineWorkflowExportWorkflowButton";
import PipelineWorkflowWorkflowEditingToggleButton
  from "components/workflow/pipelines/pipeline_details/workflow/buttons/PipelineWorkflowWorkflowEditingToggleButton";
import PipelineWorkflowSourceRepositoryItem
  from "components/workflow/pipelines/pipeline_details/workflow/source/PipelineWorkflowSourceRepositoryItem";
import PipelineWorkflowZoomButtons
  from "components/workflow/pipelines/pipeline_details/workflow/buttons/PipelineWorkflowZoomButtons";

const getZoomClass = (val) => {
  switch (val) {
    case 1:
      return "scale-80"; // .8x zoom
    case 2:
      return "scale-100"; //standard 100% zoom
    case 3:
      return "scale-120"; // 1.2x zoom
  }
};

// TODO: Clean up and refactor to make separate components. IE the source repository begin workflow box can be its own component
function PipelineWorkflow({
  pipeline,
  fetchPlan,
  softLoading,
  status,
  lastStep,
}) {
  const [modalHeader, setModalHeader] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [zoomValue, setZoomValue] = useState(2); //1,2, or 3 with 2 being default zoom
  const [modalMessage, setModalMessage] = useState({});
  const [editWorkflow, setEditWorkflow] = useState(false);
  const gitExportEnabled = pipeline?.workflow?.source?.gitExportEnabled;
  const sourceRepositoryModel = modelHelpers.parseObjectIntoModel(pipeline?.workflow?.source, sourceRepositoryConfigurationMetadata);
  const {
    toastContext,
    getAccessToken,
    cancelTokenSource,
   } = useComponentStateReference();

  // TODO: Break out into separate actions file, maybe call in a pipeline activity overlay rather than here?
  const fetchPipelineActivityByTool = async (pipelineId, tool, stepId, activityId) => {
    const accessToken = await getAccessToken();
    let apiUrl = `/pipelines/${pipelineId}/activity`;
    const params = {
      tool: tool,
      step_id: stepId,
      id: activityId,
    };

    try {
      const pipelineActivityLog = await axiosApiService(accessToken).get(apiUrl, { params });
      return pipelineActivityLog;
    } catch (err) {
      toastContext.showLoadingErrorDialog(err);
      return false;
    }
  };

  const callbackFunctionEditItem = async (item) => {
    window.scrollTo(0, 0);
    setEditWorkflow(false);
    item.id = pipeline._id;
    await fetchPlan(item);
  };

  const updatePipeline = async (pipeline) => {
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${pipeline._id}/update`;
    try {
      await axiosApiService(accessToken).post(apiUrl, pipeline);
    } catch (err) {
      toastContext.showLoadingErrorDialog(err);
    }
  };

  const quietSavePlan = async (steps) => {
    console.log("saving plan quietly: ", pipeline.workflow.plan);
    if (steps) {
      pipeline.workflow.plan = steps;
    }
    await updatePipeline(pipeline);
  };

  const handleViewSourceActivityLog = async (pipelineId, tool, stepId, activityId) => {
    if (tool) {
      const activityData = await fetchPipelineActivityByTool(pipelineId, tool, stepId, activityId);
      if (activityData && activityData.data) {
        setModalHeader("Step Activity Log");
        setModalMessage(activityData.data.pipelineData[0]);
        setShowModal(true);
      }
    }
  };

  if (pipeline == null || pipeline.workflow == null || !Object.prototype.hasOwnProperty.call(pipeline.workflow, "source")) {
    return <ErrorDialog error={"Pipeline Workflow Details Not Found"} align={"top"}/>;
  }

  return (
    <>
      <div>
        <div className="pb-1">
          <PipelineWorkflowViewConfigurationButton
            pipeline={pipeline}
          />
          <PipelineWorkflowWorkflowEditingToggleButton
            pipeline={pipeline}
            editingWorkflow={editWorkflow}
            workflowStatus={status}
            setEditingWorkflow={setEditWorkflow}
          />
          <PipelineWorkflowExportWorkflowButton
            pipeline={pipeline}
            editingWorkflow={editWorkflow}
            gitExportEnabled={gitExportEnabled}
            sourceRepositoryModel={sourceRepositoryModel}
            workflowStatus={status}
          />
        </div>
      </div>

      <div
        className={"workflow-container p-2 dark-grey" + (zoomValue > 2 ? " scale-120-container" : "")}>
        <div className={getZoomClass(zoomValue)}>
          <PipelineWorkflowSourceRepositoryItem
            pipeline={pipeline}
            status={status}
            softLoading={softLoading}
          />

          <div style={{ height: "40px" }}>&nbsp;</div>

          <div className="step-items workflow-module-container-width mx-auto">
            <PipelineWorkflowItemList
              pipeline={pipeline}
              lastStep={lastStep}
              editWorkflow={editWorkflow}
              pipelineId={pipeline._id}
              fetchPlan={fetchPlan}
              parentCallbackEditItem={callbackFunctionEditItem}
              quietSavePlan={quietSavePlan}
              parentHandleViewSourceActivityLog={handleViewSourceActivityLog}
              parentWorkflowStatus={status}
            />
          </div>

          <SteppedLineTo
            from={"source"}
            to={"step-items"}
            delay={100}
            orientation={"v"}
            zIndex={10}
            borderColor={"#0f3e84"}
            borderWidth={2}
            fromAnchor={"bottom"}
            toAnchor={"top"}
          />


          <div
            className="title-text-6 text-muted workflow-module-container workflow-module-container-width p-2 mb-4 text-center mx-auto">
            End of Workflow
          </div>
        </div>

        <PipelineWorkflowZoomButtons
          zoomValue={zoomValue}
          setZoomValue={setZoomValue}
        />
      </div>

      <ModalActivityLogs header={modalHeader} size="lg" jsonData={modalMessage} show={showModal}
                         setParentVisibility={setShowModal}/>
    </>
  );

}

PipelineWorkflow.propTypes = {
  pipeline: PropTypes.object,
  fetchPlan: PropTypes.func,
  softLoading: PropTypes.bool,
  status: PropTypes.string,
  lastStep: PropTypes.any,
};
export default PipelineWorkflow;