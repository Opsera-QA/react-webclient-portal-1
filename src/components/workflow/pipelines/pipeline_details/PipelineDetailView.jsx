import React, {useContext, useEffect, useState} from "react";
import PipelineActivityLogTreeTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTreeTable";
import LoadingDialog from "components/common/status_notifications/loading";
import {useParams} from "react-router-dom";
import PipelineWorkflowView from "./workflow/PipelineWorkflowView";
import PipelineSummaryPanel from "components/workflow/pipelines/summary/PipelineSummaryPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import pipelineActions from "components/workflow/pipeline-actions";
import PipelineWorkflowTabBar from "components/workflow/pipelines/pipeline_details/PipelineWorkflowTabBar";
import useHeaderNavigationBarReference from "hooks/useHeaderNavigationBarReference";
import FreeTrialLandingHeaderNavigationBar from "components/trial/landing/FreeTrialLandingHeaderNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";

let internalRefreshCount = 1;
const refreshInterval = 15000;

function PipelineDetailView() {
  useHeaderNavigationBarReference(<FreeTrialLandingHeaderNavigationBar currentScreen={"workspace"} />);
  const { tab, id } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [pipeline, setPipeline] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [softLoading, setSoftLoading] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [refreshTimer, setRefreshTimer] = useState(null);
  const {
    accessRoleData,
    getAccessToken,
    cancelTokenSource,
    isMounted,
    isOpseraAdministrator,
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      if (refreshTimer) {
        console.log("clearing refresh timer");
        clearTimeout(refreshTimer);
      }
    };
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
        if (newPipeline && (newPipeline.owner === userData._id || isOpseraAdministrator === true)) {
          setPipeline(newPipeline);
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

    const pipelineStatus = pipeline?.workflow?.last_step?.status;

    if (!pipelineStatus || pipelineStatus === "stopped") {
      const isPaused = pipeline?.workflow?.last_step?.running?.paused;

      if (isPipelineRunning === true) {
        const stoppedMessage = "The Pipeline has completed running. Please check the activity logs for details.";
        const pausedMessage = "The Pipeline has been paused. Please check the activity logs for details.";

        toastContext.showInformationToast(isPaused === true ? pausedMessage : stoppedMessage, 20);
        setIsPipelineRunning(false);
      }

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
          customerAccessRules={accessRoleData}
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
          className="max-content-width-1080 content-block-no-height p-2 mb-2"
          style={{ width: "80vw", border: "1px solid #d2d2d2", borderRadius: "0" }}
        >
          <PipelineSummaryPanel
            pipeline={pipeline}
            setPipeline={setPipeline}
            refreshCount={refreshCount}
            customerAccessRules={accessRoleData}
            parentWorkflowStatus={workflowStatus}
            ownerName={pipeline?.owner_name}
            setWorkflowStatus={setWorkflowStatus}
            fetchPlan={fetchPlan}
          />
        </div>
        <div className="max-content-width-1875 mr-2">
          <PipelineActivityLogTreeTable
            pipeline={pipeline}
            pipelineStatus={pipeline?.workflow?.last_step?.status}
            pipelineId={id}
            getPipeline={getPipeline}
            pipelineRunCount={pipeline?.workflow?.run_count}
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
        <AccessDeniedContainer
          navigationTabContainer={<WorkflowSubNavigationBar currentTab={"pipelineViewer"} />}
          customMessage={"No Pipeline details found.  Please ensure you have access to view the requested pipeline."}
        />
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