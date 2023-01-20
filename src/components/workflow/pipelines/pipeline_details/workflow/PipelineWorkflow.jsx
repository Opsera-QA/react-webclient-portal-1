import React, { useState } from "react";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import { SteppedLineTo } from "react-lineto";
import ErrorDialog from "components/common/status_notifications/error";
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
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

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
  const [zoomValue, setZoomValue] = useState(2); //1,2, or 3 with 2 being default zoom
  const [updatingWorkflow, setUpdatingWorkflow] = useState(2); //1,2, or 3 with 2 being default zoom
  const [editWorkflow, setEditWorkflow] = useState(false);
  const workflowSource = DataParsingHelper.parseNestedObject(pipeline, "workflow.source", {});
  const gitExportEnabled = DataParsingHelper.parseBooleanV2(workflowSource.gitExportEnabled, false);
  const sourceRepositoryModel = modelHelpers.parseObjectIntoModel(workflowSource, sourceRepositoryConfigurationMetadata);
  const {
    toastContext,
    getAccessToken,
   } = useComponentStateReference();


  const callbackFunctionEditItem = async (item) => {
    window.scrollTo(0, 0);
    setEditWorkflow(false);
    item.id = pipeline._id;
    await fetchPlan(item);
  };

  const updatePipeline = async (pipeline) => {
    setUpdatingWorkflow(true);
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${pipeline._id}/update`;
    try {
      await axiosApiService(accessToken).post(apiUrl, pipeline);
      await fetchPlan();
    } catch (err) {
      toastContext.showLoadingErrorDialog(err);
    } finally {
      setUpdatingWorkflow(false);
    }
  };

  const quietSavePlan = async (steps) => {
    if (steps) {
      pipeline.workflow.plan = steps;
    }
    await updatePipeline(pipeline);
  };

  if (pipeline == null || Object.keys(workflowSource)?.length === 0) {
    return <ErrorDialog error={"Pipeline Workflow Details Not Found"} align={"top"}/>;
  }

  return (
    <>
      <div className={"pb-1 d-flex"}>
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

      <div
        className={"workflow-container p-2 dark-grey" + (zoomValue > 2 ? " scale-120-container" : "")}>
        <div className={getZoomClass(zoomValue)}>
          <PipelineWorkflowSourceRepositoryItem
            pipeline={pipeline}
            status={status}
            softLoading={softLoading || updatingWorkflow}
          />

          <div style={{ height: "40px" }}>&nbsp;</div>

          <PipelineWorkflowItemList
            pipeline={pipeline}
            plan={DataParsingHelper.parseNestedArray(pipeline, "workflow.plan", [])}
            lastStep={lastStep}
            editWorkflow={editWorkflow}
            pipelineId={pipeline._id}
            fetchPlan={fetchPlan}
            parentCallbackEditItem={callbackFunctionEditItem}
            quietSavePlan={quietSavePlan}
            parentWorkflowStatus={status}
          />

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