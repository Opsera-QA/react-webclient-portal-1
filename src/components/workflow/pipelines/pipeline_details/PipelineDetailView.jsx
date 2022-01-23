import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import PipelineActivityLogTreeTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTreeTable";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import { useParams} from "react-router-dom";
import PipelineWorkflowView from "./workflow/PipelineWorkflowView";
import PipelineSummaryPanel from "./PipelineSummaryPanel";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import pipelineActions from "components/workflow/pipeline-actions";
import PipelineWorkflowTabBar from "components/workflow/pipelines/pipeline_details/PipelineWorkflowTabBar";
import PipelineFilterModel from "components/workflow/pipelines/pipeline.filter.model";
import pipelineActivityHelpers
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-helpers";
import pipelineActivityActions
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-actions";

const refreshInterval = 15000;

// TODO: Find way to refresh logs inside the log components rather than leaving all the methods in here
//  we could instead pass refresh trigger down. 
function PipelineDetailView() {
  const { tab, id } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [pipeline, setPipeline] = useState(undefined);
  const [activityData, setActivityData] = useState([]);
  const [latestActivityLogs, setLatestActivityLogs] = useState([]);
  const [secondaryActivityLogs, setSecondaryActivityLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [softLoading, setSoftLoading] = useState(false);
  const [logsIsLoading, setLogsIsLoading] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [pipelineActivityFilterModel, setPipelineActivityFilterModel] = useState(new PipelineFilterModel());
  const [pipelineActivityMetadata, setPipelineActivityMetadata] = useState(undefined);
  const [pipelineActivityTreeData, setPipelineActivityTreeData] = useState([]);

  const [refreshTimer, setRefreshTimer] = useState(null);
  let internalRefreshCount = 1;

  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const [customerAccessRules, setCustomerAccessRules] = useState({});

  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [currentLogTreePage, setCurrentLogTreePage] = useState(0);

  useEffect(() => {
    //console.log("Effect  1");
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (tab === "summary") {
      setActivityData([]);
      getActivityLogs().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [tab]);

  useEffect(() => {
    if (tab === "summary" && Array.isArray(pipelineActivityTreeData) && pipelineActivityTreeData.length > 0) {
      pullLogData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [currentLogTreePage]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setLoading(true);

      const userRecord = await getUserRecord(); //RBAC Logic
      const rules = await setAccessRoles(userRecord);
      setCustomerAccessRules(rules);

      await getPipeline(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error.message);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

  const getPipeline = async (cancelSource = cancelTokenSource) => {
    const newRefreshCount = refreshCount + 1;
    setRefreshCount(newRefreshCount);

    setSoftLoading(true);
    const response = await pipelineActions.getPipelineByIdV2(getAccessToken, cancelSource, id);
    const newPipeline = response?.data?.data;

    if (newPipeline) {
      setPipeline(newPipeline);
      evaluatePipelineStatus(newPipeline);
    } else {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog("Pipeline not found");
      }
    }

    if (isMounted?.current === true) {
      setSoftLoading(false);
    }
  };

  const evaluatePipelineStatus = (pipeline) => {
    console.log("evaluating pipeline status function");
    if (!pipeline || Object.entries(pipeline).length === 0) {
      return;
    }

    const pipelineStatus = pipeline?.workflow?.last_step?.status;

    if (!pipelineStatus || pipelineStatus === "stopped") {
      console.log("Pipeline stopped, no need to schedule refresh. Status: ", pipelineStatus);
      return;
    }

    console.log(`Scheduling status check followup for Pipeline: ${pipeline._id}, counter: ${internalRefreshCount}, interval: ${refreshInterval} `);
    const refreshTimer = setTimeout(async function() {
      internalRefreshCount++;
      console.log("running pipeline refresh interval");
      await getPipeline();
      await getActivityLogs(pipelineActivityFilterModel, true);
    }, refreshInterval);
    setRefreshTimer(refreshTimer);
  };

  // TODO: Find way to put refresh inside table itself
  const getActivityLogs = async (newFilterModel = pipelineActivityFilterModel, silentLoading = false, cancelSource = cancelTokenSource) => {
    if (tab !== "summary" || logsIsLoading) {
      return;
    }

    try {
      if (!silentLoading) {
        setLogsIsLoading(true);
      }

      // TODO: if search term applies ignore run count and reconstruct tree?
      const treeResponse = await pipelineActivityActions.getPipelineActivityLogTree(getAccessToken, cancelSource, id, newFilterModel);
      const pipelineTree = pipelineActivityHelpers.constructTree(treeResponse?.data?.data);
      setPipelineActivityTreeData([...pipelineTree]);

      if (!silentLoading) {
        setActivityData([]);
        setSecondaryActivityLogs([]);
        setLatestActivityLogs([]);
      }

      if (Array.isArray(pipelineTree) && pipelineTree.length > 0) {
        await pullLogData(pipelineTree, newFilterModel, cancelSource, silentLoading);
      }
      else {
        newFilterModel?.setData("totalCount", 0);
        newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
        setPipelineActivityFilterModel({...newFilterModel});
      }

      await getLatestActivityLogs(newFilterModel, cancelSource);
      await getSecondaryActivityLogs(newFilterModel, cancelSource);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.log(error.message);
    } finally {
      setLogsIsLoading(false);
    }
  };

  const pullLogData = async (pipelineTree = pipelineActivityTreeData, filterDto = pipelineActivityFilterModel, cancelSource = cancelTokenSource, silentLoading = false) => {
    try {
      if (!silentLoading) {
        setLogsIsLoading(true);
      }
      await getActivityLogsBasedOnTree(pipelineTree, filterDto, cancelSource);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.log(error.message);
    }
    finally {
      setLogsIsLoading(false);
    }
  };

  const getActivityLogsBasedOnTree = async (pipelineTree = pipelineActivityTreeData, filterDto = pipelineActivityFilterModel, cancelSource = cancelTokenSource,) => {
    // create run count query based on tree -- tree is 0 index based
    const startIndex = 20 * currentLogTreePage;
    let runCountArray = [];

    for (let i = startIndex; i < startIndex + 20 && i < pipelineTree.length; i++) {
      let runCount = pipelineTree[i].runNumber;

      if (runCount) {
        runCountArray.push(runCount);
      }
    }

    const response = await pipelineActivityActions.getPipelineActivityLogsV3(getAccessToken, cancelSource, id, runCountArray, filterDto);
    const pipelineActivityData = response?.data?.data;

    if (Array.isArray(pipelineActivityData)) {
      setActivityData([...pipelineActivityData]);
      setPipelineActivityMetadata(response?.data?.metadata);

      const newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response?.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setPipelineActivityFilterModel({...newFilterDto});
    }
  };

  const getLatestActivityLogs = async (filterDto = pipelineActivityFilterModel, cancelSource = cancelTokenSource,) => {
    const response = await pipelineActivityActions.getLatestPipelineActivityLogsV3(getAccessToken, cancelSource, id, filterDto);
    const pipelineActivityData = response?.data?.data;

    if (Array.isArray(pipelineActivityData)) {
      setLatestActivityLogs([...pipelineActivityData]);
    }
  };

  const getSecondaryActivityLogs = async (filterDto = pipelineActivityFilterModel, cancelSource = cancelTokenSource,) => {
    const response = await pipelineActivityActions.getSecondaryPipelineActivityLogsV3(getAccessToken, cancelSource, id, filterDto);
    const pipelineActivityData = response?.data?.data;

    if (Array.isArray(pipelineActivityData)) {
      setSecondaryActivityLogs([...pipelineActivityData]);
    }
  };

  const fetchPlan = async (param) => {
    await getPipeline();
    if (param) {
      setEditItem(param);
    }
  };

  const getCurrentView = () => {
    if (loading) {
      return (
        <LoadingDialog
          size="md"
          message={"Loading pipeline..."}
        />
      );
    }

    if (tab === "model") {
      return (
        <PipelineWorkflowView
          customerAccessRules={customerAccessRules}
          parentWorkflowStatus={workflowStatus}
          pipeline={pipeline}
          setPipeline={setPipeline}
          refreshCount={refreshCount}
          editItem={editItem}
          setEditItem={setEditItem}
          fetchPlan={fetchPlan}
          setWorkflowStatus={setWorkflowStatus}
          getActivityLogs={getActivityLogs}
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
            customerAccessRules={customerAccessRules}
            parentWorkflowStatus={workflowStatus}
            ownerName={pipeline?.owner_name}
            setWorkflowStatus={setWorkflowStatus}
            getActivityLogs={getActivityLogs}
            fetchPlan={fetchPlan}
          />
        </div>
        <div className="max-content-width-1875">
          <PipelineActivityLogTreeTable
            pipeline={pipeline}
            pipelineLogData={activityData}
            isLoading={logsIsLoading}
            loadData={getActivityLogs}
            pipelineActivityFilterDto={pipelineActivityFilterModel}
            setPipelineActivityFilterDto={setPipelineActivityFilterModel}
            pipelineActivityMetadata={pipelineActivityMetadata}
            pipelineActivityTreeData={pipelineActivityTreeData}
            currentLogTreePage={currentLogTreePage}
            setCurrentLogTreePage={setCurrentLogTreePage}
            latestActivityLogs={latestActivityLogs}
            secondaryActivityLogs={secondaryActivityLogs}
          />
        </div>
      </div>
    );
  };

  if (!loading && !pipeline) {
    return (
      <InfoDialog
        message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."
      />
    );
  }

  return (
    <div>
      <WorkflowSubNavigationBar currentTab={"pipelineViewer"} />
      <div className="h4 mt-3 mb-2">
        {pipeline?.name}
      </div>
      <PipelineWorkflowTabBar
        currentTab={tab}
        pipelineId={id}
        getPipeline={getPipeline}
        refreshTimer={refreshTimer}
      />
      {getCurrentView()}
    </div>
  );
}


export default PipelineDetailView;