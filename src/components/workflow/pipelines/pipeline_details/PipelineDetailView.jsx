import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import {axiosApiService} from "api/apiService";
import PipelineActivityLogTreeTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTreeTable";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import "../../workflows.css";
import {useHistory, useParams} from "react-router-dom";
import PipelineWorkflowView from "./workflow/PipelineWorkflowView";
import PipelineSummaryPanel from "./PipelineSummaryPanel";
import PipelineHelpers from "../../pipelineHelpers";
import pipelineActivityActions
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-actions";
import axios from "axios";
import pipelineActivityHelpers
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import PipelineFilterModel from "components/workflow/pipelines/pipeline.filter.model";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";

const refreshInterval = 5000;

// TODO: Find way to refresh logs inside the log components rather than leaving all the methods in here
//  we could instead pass refresh trigger down. 
function PipelineDetailView() {
  const { tab, id } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [data, setData] = useState({});
  const [pipeline, setPipeline] = useState({});
  const [activityData, setActivityData] = useState([]);
  const [latestActivityLogs, setLatestActivityLogs] = useState([]);
  const [secondaryActivityLogs, setSecondaryActivityLogs] = useState([]);
  //const [stepStatus, setStepStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [softLoading, setSoftLoading] = useState(false);
  const [logsIsLoading, setLogsIsLoading] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [editItem, setEditItem] = useState(false);
  const [ownerName, setOwnerName] = useState(undefined);
  const [refreshCount, setRefreshCount] = useState(0);
  const [pipelineActivityFilterModel, setPipelineActivityFilterModel] = useState(new PipelineFilterModel());
  const history = useHistory();
  const [pipelineActivityMetadata, setPipelineActivityMetadata] = useState(undefined);
  const [pipelineActivityTreeData, setPipelineActivityTreeData] = useState([]);

  const [refreshTimer, setRefreshTimer] = useState(null);
  let staleRefreshCount = 1;

  /* Role based Access Controls */
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

    initComponent(source).catch((error) => {
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
    setActivityData([]);

    if (tab === "summary") {
      getActivityLogs().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [tab]);

  useEffect(() => {
    if (tab === "summary") {
      pullLogData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [currentLogTreePage]);

  const handleTabClick = (tabSelection) => async e => {
    e.preventDefault();
    clearTimeout(refreshTimer);

    if (tabSelection === "viewer") {
      return;
    }

    if (tabSelection === "catalog") {
      history.push(`/workflow/catalog`);
      return;
    }

    if (tabSelection === "pipelines" || tabSelection === "all") {
      history.push(`/workflow/`);
      return;
    }

    setActiveTab(tabSelection);

    if (tab !== tabSelection) {
      history.push(`/workflow/details/${id}/${tabSelection}`);
      await fetchData();
    }
  };

  useEffect(() => {
    console.log("Effect  3: Pipeline update detected, determining status!!!");
  }, [JSON.stringify(pipeline.workflow), refreshCount]);


  const initComponent = async (cancelSource = cancelTokenSource) => {
    setLoading(true);

    const userRecord = await getUserRecord(); //RBAC Logic
    const rules = await setAccessRoles(userRecord);
    setCustomerAccessRules(rules);

    if (tab) {
      setActiveTab(tab);
    }

    await fetchData(cancelSource);
    setLoading(false);
    // await getActivityLogs(undefined, false, cancelSource);
  };

  const fetchData = async (cancelSource = cancelTokenSource) => {
    setRefreshCount(refreshCount => refreshCount + 1);
    setSoftLoading(true);
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${id}`;
    try {
      const pipeline = await axiosApiService(accessToken).get(apiUrl);
      if (pipeline && pipeline.data && pipeline.data.length > 0) {
        setData({
          ...data,
          pipeline: pipeline && pipeline.data[0],
        });

        setPipeline(pipeline && pipeline.data[0]);

        let owner = await PipelineHelpers.getUserNameById(pipeline.data[0].owner, getAccessToken);
        setOwnerName(owner);

        if (pipeline && pipeline.data[0] && typeof (pipeline.data[0].workflow) !== "undefined") {
          if (typeof (pipeline.data[0].workflow.last_step) !== "undefined") {
            evaluatePipelineStatus(pipeline.data[0]);
          }
        }
      } else {
        toastContext.showLoadingErrorDialog("Pipeline not found");
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error.message);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setSoftLoading(false);
      }
    }
  };

  const evaluatePipelineStatus = (pipeline) => {
    console.log("evaluating pipeline status function");
    if (!pipeline || Object.entries(pipeline).length === 0) {
      return;
    }

    const pipelineStatus = pipeline?.workflow?.last_step?.status;

    if (pipelineStatus === "stopped" || !pipelineStatus) {
      console.log("Pipeline stopped, no need to schedule refresh. Status: ", pipelineStatus);
      return;
    }

    console.log(`Scheduling status check followup for Pipeline: ${pipeline._id}, counter: ${staleRefreshCount}, interval: ${refreshInterval} `);
    const refreshTimer = setTimeout(async function() {
      console.log("running pipeline refresh interval. Step status: ");
      staleRefreshCount++;
      await fetchData();
      if (staleRefreshCount % 3 === 0) {
        console.log("divisible by 3 refresh: getting activity logs");
        await getActivityLogs(pipelineActivityFilterModel, true);
      }
    }, refreshInterval);
    setRefreshTimer(refreshTimer);
  };

  // TODO: Find way to put refresh inside table itself
  const getActivityLogs = async (newFilterModel = pipelineActivityFilterModel, silentLoading = false, cancelSource = cancelTokenSource) => {
    if (activeTab !== "summary" || logsIsLoading) {
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
      setActivityData([]);
      setSecondaryActivityLogs([]);
      setLatestActivityLogs([]);

      if (Array.isArray(pipelineTree) && pipelineTree.length > 0) {
        await pullLogData(pipelineTree, newFilterModel, cancelSource);
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

      // TODO: Remove pagination.
      const newFilterDto = filterDto;
      newFilterDto.setData("totalCount", data?.count);
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
    // console.log("fetchPlan")
    // setEditItem(false);
    await fetchData();
    if (param) {
      setEditItem(param);
    }
  };

  const getNavigationTabs = () => {
    return (
      <div className="alternate-tabs">
        <ul className="nav nav-tabs">
          {/*<li className="nav-item">
            <a className={"nav-link"} href="#"
               onClick={handleTabClick("pipelines")}><FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>Pipelines</a>
          </li>*/}
          <li className="nav-item">
            <a className={"nav-link " + (activeTab === "summary" ? "active" : "")} href="#"
               onClick={handleTabClick("summary")}>Summary</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (activeTab === "model" ? "active" : "")} href="#"
               onClick={handleTabClick("model")}>Workflow</a>
          </li>
          {/*<li className="nav-item">*/}
          {/*  <a className={"nav-link " + (activeTab === "editor" ? "active" : "")} href="#"*/}
          {/*     onClick={handleTabClick("editor")}>Settings</a>*/}
          {/*</li>*/}
        </ul>
      </div>
    );
  };

  const getCurrentView = () => {
    if (loading) {
      return (<LoadingDialog size="md" message={"Loading pipeline..."}/>);
    }

    if (activeTab === "model") {
      return (
        <PipelineWorkflowView
          customerAccessRules={customerAccessRules}
          parentWorkflowStatus={workflowStatus}
          pipeline={pipeline}
          setPipeline={setPipeline}
          refreshCount={refreshCount}
          setRefreshCount={setRefreshCount}
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
        <div className="max-content-width-1080 content-block-no-height p-2 mb-2" style={{ width: "80vw", border: "1px solid #d2d2d2", borderRadius: "0" }}>
          <PipelineSummaryPanel
            pipeline={pipeline}
            setPipeline={setPipeline}
            refreshCount={refreshCount}
            setRefreshCount={setRefreshCount}
            customerAccessRules={customerAccessRules}
            parentWorkflowStatus={workflowStatus}
            ownerName={ownerName}
            setActiveTab={setActiveTab}
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
            setCurrentLogTreePage={setCurrentLogTreePage}
            latestActivityLogs={latestActivityLogs}
            secondaryActivityLogs={secondaryActivityLogs}
          />
        </div>
      </div>
    );
  };

  if (!loading && (data.length === 0 || data.pipeline == null)) {
    return (<InfoDialog
      message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."/>);
  }


  return (
    <div>
      <WorkflowSubNavigationBar currentTab={"pipelineViewer"} />
      <div className="h4 mt-3 mb-2">{pipeline?.name}</div>
      {getNavigationTabs()}
      {getCurrentView()}
    </div>
  );
}


export default PipelineDetailView;