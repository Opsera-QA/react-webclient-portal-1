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
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

let internalRefreshCount = 1;
const refreshInterval = 15000;

function PipelineDetailView() {
  const { tab, id } = useParams();
  const [pipeline, setPipeline] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [softLoading, setSoftLoading] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [refreshTimer, setRefreshTimer] = useState(null);
  const {
    getAccessToken,
    toastContext,
    isMounted,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  useEffect(() => {
    if (pipeline) {
      evaluatePipelineStatus(pipeline);
    }
  }, [pipeline]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getPipeline();
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error.message);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
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

      const newRefreshCount = refreshCount + 1;
      setRefreshCount(newRefreshCount);

      setSoftLoading(true);
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

  const evaluatePipelineStatus = (pipeline) => {
    console.log("evaluating pipeline status function");
    if (!pipeline || Object.entries(pipeline).length === 0) {
      return;
    }

    const pipelineStatus = DataParsingHelper.parseNestedString(pipeline, "workflow.last_step.status");

    if (!pipelineStatus || pipelineStatus === "stopped") {
      const isPaused = DataParsingHelper.parseNestedBoolean(pipeline, "workflow.last_step.running.paused");

      if (isPaused === true) {
        setWorkflowStatus("paused");
        const pausedMessage = "The Pipeline has been paused. Please check the activity logs for details.";
        toastContext.showInformationToast(pausedMessage, 20);
      } else if (isPipelineRunning === true) {
        setWorkflowStatus(pipelineStatus);
        const stoppedMessage = "The Pipeline has completed running. Please check the activity logs for details.";
        toastContext.showInformationToast(stoppedMessage, 20);
      }

      setIsPipelineRunning(false);
      console.log("Pipeline stopped, no need to schedule refresh. Status: ", isPaused === true ? "Paused" : pipelineStatus);
      return;
    }

    if (refreshTimer) {
      clearTimeout(refreshTimer);
    }

    if (isPipelineRunning !== true) {
      toastContext.showInformationToast("The Pipeline is currently running. Please check the activity logs for details.", 20);
      setIsPipelineRunning(true);
    }

    console.log(`Scheduling status check followup for Pipeline: ${pipeline._id}, counter: ${internalRefreshCount}, interval: ${refreshInterval} `);
    const newRefreshTimer = setTimeout(async function() {
      internalRefreshCount++;
      console.log("running pipeline refresh interval");
      await getPipeline();
    }, refreshInterval);

    setRefreshTimer(newRefreshTimer);
  };

  const getCurrentView = () => {
    if (tab === "model") {
      return (
        <PipelineWorkflowView
          parentWorkflowStatus={workflowStatus}
          pipeline={pipeline}
          setPipeline={setPipeline}
          refreshCount={refreshCount}
          editItem={editItem}
          setEditItem={setEditItem}
          fetchPlan={fetchPlan}
          setWorkflowStatus={setWorkflowStatus}
          softLoading={softLoading}
        />
      );
    }

    return (
      <div>
        <div
          className="max-content-width content-block-no-height p-2 mb-2"
          style={{ width: "80vw", border: "1px solid #d2d2d2", borderRadius: "0" }}
        >
          <PipelineSummaryPanel
            pipeline={pipeline}
            setPipeline={setPipeline}
            refreshCount={refreshCount}
            parentWorkflowStatus={workflowStatus}
            ownerName={pipeline?.owner_name}
            setWorkflowStatus={setWorkflowStatus}
            fetchPlan={fetchPlan}
          />
        </div>
        <div className="max-content-width-1875">
          <PipelineActivityLogTreeTable
            pipeline={pipeline}
            pipelineStatus={pipeline?.workflow?.last_step?.status}
            pipelineId={id}
            getPipeline={getPipeline}
            pipelineRunCount={pipeline?.workflow?.run_count}
            loadPipelineFunction={fetchPlan}
          />
        </div>
      </div>
    );
  };

  const getBody = () => {
    if (isLoading) {
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
          currentTab={tab}
          pipelineId={id}
          getPipeline={getPipeline}
        />
        {getCurrentView()}
      </div>
    );
  };

  return (
    <div>
      <WorkflowSubNavigationBar currentTab={"pipelineViewer"} />
      {getBody()}
    </div>
  );
}

export default PipelineDetailView;