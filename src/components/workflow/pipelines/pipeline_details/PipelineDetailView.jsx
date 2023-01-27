import React, {useEffect, useState} from "react";
import PipelineActivityLogTreeTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTreeTable";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import {useParams} from "react-router-dom";
import PipelineWorkflowView from "./workflow/PipelineWorkflowView";
import PipelineSummaryPanel from "components/workflow/pipelines/summary/PipelineSummaryPanel";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import pipelineActions from "components/workflow/pipeline-actions";
import PipelineWorkflowTabBar from "components/workflow/pipelines/pipeline_details/PipelineWorkflowTabBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPollingPipelineOrchestrationStatusById
  from "hooks/workflow/pipelines/orchestration/useGetPollingPipelineOrchestrationStatusById";

const refreshInterval = 15000;
const pausedMessage = "This Pipeline has been paused. Please check the activity logs for details.";
const stoppedMessage = "This Pipeline has completed running. Please check the activity logs for details.";
const failedMessage = "This Pipeline has completed running with a failed status. Please check the activity logs for details.";
const successMessage = "This Pipeline has completed running with a successful status. Please check the activity logs for details.";
const runningMessage = "This Pipeline is currently running. Please check the activity logs for details.";

function PipelineDetailView() {
  const {tab, id} = useParams();
  const [currentTab, setCurrentTab] = useState(tab);
  const [pipeline, setPipeline] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [softLoading, setSoftLoading] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const {
    getAccessToken,
    toastContext,
    isMounted,
    cancelTokenSource,
  } = useComponentStateReference();
  const {
    status,
    isQueued,
    runCount,
    lastStep,
    restingStepId,
    updatedAt,
  } = useGetPollingPipelineOrchestrationStatusById(id, refreshInterval);

  // TODO: We probably don't need to refresh the pipeline on resting step changes.
  useEffect(() => {
    console.log(`Refreshing pipeline with \n   status: [${status}]\n    run count: [${runCount}]\n   Resting Step ID: [${restingStepId}] \n Last Updated At: [${updatedAt}]`);
    evaluatePipelineStatus(pipeline);
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [status, runCount, restingStepId, updatedAt]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getPipeline();
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error.message);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getPipeline = async () => {
    try {
      if (isMounted?.current !== true) {
        return;
      }

      setSoftLoading(true);
      console.log("refreshing pipeline");
      const response = await pipelineActions.getPipelineByIdV2(getAccessToken, cancelTokenSource, id);
      const newPipeline = response?.data?.data;

      if (isMounted?.current === true) {
        if (newPipeline) {
          setPipeline({...newPipeline});
        } else {
          toastContext.showLoadingErrorDialog("Pipeline not found");
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setSoftLoading(false);
      }
    }
  };

  const fetchPlan = async (param) => {
    await getPipeline();
    if (param) {
      setEditItem(param);
    }
  };

  const evaluatePipelineStatus = () => {
    if (status === "paused") {
      toastContext.showSystemInformationToast(pausedMessage, 20);
    } else if (isPipelineRunning === true && status === "stopped") {
      toastContext.showSystemInformationToast(stoppedMessage, 20);
    } else if (isPipelineRunning === true && status === "success") {
      toastContext.showSystemSuccessToast(successMessage, 20);
    } else if (isPipelineRunning === true && status === "failed") {
      toastContext.showSystemErrorToast(failedMessage, undefined,20);
    } else if (isPipelineRunning !== true && status === "running") {
      toastContext.showSystemInformationToast(runningMessage, 20);
      setIsPipelineRunning(true);
    }
  };

  const getCurrentView = () => {
    if (currentTab === "model") {
      return (
        <PipelineWorkflowView
          pipelineStatus={status}
          pipeline={pipeline}
          setPipeline={setPipeline}
          editItem={editItem}
          setEditItem={setEditItem}
          fetchPlan={fetchPlan}
          softLoading={softLoading}
          isQueued={isQueued}
          lastStep={lastStep}
          runCount={runCount}
        />
      );
    }

    return (
      <div>
        <div
          className="max-content-width content-block-no-height p-2 mb-2"
          style={{width: "80vw", border: "1px solid #d2d2d2", borderRadius: "0"}}
        >
          <PipelineSummaryPanel
            pipeline={pipeline}
            setPipeline={setPipeline}
            parentWorkflowStatus={status}
            fetchPlan={fetchPlan}
            isLoading={softLoading || isLoading}
            isQueued={isQueued}
            runCount={runCount}
          />
        </div>
        <div className="max-content-width-1875">
          <PipelineActivityLogTreeTable
            pipeline={pipeline}
            pipelineStatus={status}
            pipelineId={id}
            getPipeline={getPipeline}
            pipelineRunCount={runCount}
            loadPipelineFunction={fetchPlan}
          />
        </div>
      </div>
    );
  };

  const getBody = () => {
    if (isLoading && !pipeline) {
      return (
        <LoadingDialog
          size="md"
          message={"Loading pipeline..."}
        />
      );
    }

    if (!pipeline) {
      return (
        <div className={"p-5"}>
          <InfoDialog
            message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."
          />
        </div>
      );
    }

    return (
      <div>
        <div className="h4 mt-3 mb-2">
          {pipeline?.name}
        </div>
        <PipelineWorkflowTabBar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          getPipeline={getPipeline}
          pipelineId={id}
        />
        {getCurrentView()}
      </div>
    );
  };

  return (
    <div>
      <WorkflowSubNavigationBar currentTab={"pipelineViewer"}/>
      {getBody()}
    </div>
  );
}

export default PipelineDetailView;