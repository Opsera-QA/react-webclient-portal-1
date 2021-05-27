import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import {axiosApiService} from "api/apiService";
import PipelineActivityLogTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTable";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import InfoDialog from "components/common/status_notifications/info";
import "../../workflows.css";
import {useHistory, useParams} from "react-router-dom";
import PipelineWorkflowView from "./workflow/PipelineWorkflowView";
import PipelineSummaryPanel from "./PipelineSummaryPanel";
import PipelineHelpers from "../../pipelineHelpers";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBracketsCurly,
  faDiceD20,
  faDraftingCompass,
  faHexagon,
  faLayerGroup,
  faMicrochip,
} from "@fortawesome/pro-light-svg-icons";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import Model from "../../../../core/data_model/model";
import pipelineActivityActions
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-actions";
import pipelineActivityFilterMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-filter-metadata";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import axios from "axios";
import pipelineActivityHelpers
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-helpers";

const refreshInterval = 8000;

// TODO: Find way to refresh logs inside the log components rather than leaving all the methods in here
//  we could instead pass refresh trigger down. 
function PipelineDetailView() {
  const { tab, id } = useParams();
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [pipeline, setPipeline] = useState({});
  const [activityData, setActivityData] = useState([]);
  //const [stepStatus, setStepStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [softLoading, setSoftLoading] = useState(false);
  const [logsIsLoading, setLogsIsLoading] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [editItem, setEditItem] = useState(false);
  const [ownerName, setOwnerName] = useState(undefined);
  const [refreshCount, setRefreshCount] = useState(0);
  const [pipelineActivityFilterDto, setPipelineActivityFilterDto] = useState(new Model(pipelineActivityFilterMetadata.newObjectFields, pipelineActivityFilterMetadata, false));
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
    await getActivityLogs(undefined, false, cancelSource);
  };

  const fetchData = async (cancelSource = cancelTokenSource) => {
    console.log("Top level fetch data");
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
        setErrors("Pipeline not found");
      }
    } catch (err) {
      console.error(err.message);
      setErrors(err.message);
    } finally {
      setSoftLoading(false);
    }
  };

  const evaluatePipelineStatus = (pipeline) => {
    console.log("evaluating pipeline status function");
    if (!pipeline || Object.entries(pipeline).length === 0) {
      return;
    }

    const pipelineStatus = analyzePipelineStatus(pipeline);

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
        await getActivityLogs(pipelineActivityFilterDto, true);
      }
    }, refreshInterval);
    setRefreshTimer(refreshTimer);
  };

  const analyzePipelineStatus = (pipeline) => {
    if (!pipeline || Object.entries(pipeline).length === 0) {
      return;
    }
    const { workflow } = pipeline;
    return workflow.last_step !== undefined && workflow.last_step.hasOwnProperty("status") ? workflow.last_step.status : false;
  };

  // TODO: Find way to put refresh inside table itself
  const getActivityLogs = async (filterDto = pipelineActivityFilterDto, silentLoading = false, cancelSource = cancelTokenSource) => {
    if (activeTab !== "summary" || logsIsLoading) {
      return;
    }

    try {
      if (!silentLoading) {
        setLogsIsLoading(true);
      }

      // TODO: if search term applies ignore run count and reconstruct tree?
      const treeResponse = await pipelineActivityActions.getPipelineActivityLogTree(getAccessToken, cancelSource, id, filterDto);
      const pipelineTree = pipelineActivityHelpers.constructTree(treeResponse?.data?.data);
      setPipelineActivityTreeData([...pipelineTree]);

      if (Array.isArray(pipelineTree) && pipelineTree.length > 0) {
        await pullLogData(pipelineTree, filterDto, cancelSource);
      }
    } catch (error) {
      setErrors(error.message);
      console.log(error.message);
    } finally {
      setLogsIsLoading(false);
    }
  };

  const pullLogData = async (pipelineTree = pipelineActivityTreeData, filterDto = pipelineActivityFilterDto, cancelSource = cancelTokenSource, silentLoading = false) => {

    try {
      // create run count query based on tree -- tree is 0 index based
      const startIndex = 20 * currentLogTreePage;
      let runCountArray = [];


      if (!silentLoading) {
        setLogsIsLoading(true);
      }

      for (let i = startIndex; i < startIndex + 20 && i < pipelineTree.length; i++) {
        let runCount = pipelineTree[i].runNumber;

        if (runCount) {
          runCountArray.push(runCount);
        }
      }

      const response = await pipelineActivityActions.getPipelineActivityLogsV3(getAccessToken, cancelSource, id, runCountArray, filterDto);
      const pipelineActivityData = response?.data?.data;

      if (pipelineActivityData) {
        setActivityData(pipelineActivityData);
        setPipelineActivityMetadata(response?.data?.metadata);

        // TODO: Remove pagination.
        const newFilterDto = filterDto;
        newFilterDto.setData("totalCount", data?.count);
        newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
        setPipelineActivityFilterDto({...newFilterDto});
      }
    } catch (error) {
      setErrors(error.message);
      console.log(error.message);
    }
    finally {
      setLogsIsLoading(false);
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

  // TODO: Move to a common place for reuse
  const getTypeIcon = (type) => {
    switch (type) {
    case "sfdc":
      return faSalesforce;
    case "sdlc":
      return faBracketsCurly;
    case "ai-ml":
      return faMicrochip;
    default:
      return faDiceD20;
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
               onClick={handleTabClick("summary")}><FontAwesomeIcon
              icon={getTypeIcon(pipeline["type"] ? pipeline["type"][0] : "default")} className="mr-2"/>Summary</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (activeTab === "model" ? "active" : "")} href="#"
               onClick={handleTabClick("model")}><FontAwesomeIcon icon={faDraftingCompass}
                                                                  className="mr-2"/>Workflow</a>
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
    if (loading && !error) {
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
        <div className="max-content-width-1080 content-block-no-height pb-2" style={{ width: "80vw" }}>
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
          <PipelineActivityLogTable
            pipeline={pipeline}
            pipelineLogData={activityData}
            isLoading={logsIsLoading}
            loadData={pullLogData}
            pipelineActivityFilterDto={pipelineActivityFilterDto}
            setPipelineActivityFilterDto={setPipelineActivityFilterDto}
            pipelineActivityMetadata={pipelineActivityMetadata}
            pipelineActivityTreeData={pipelineActivityTreeData}
            setCurrentLogTreePage={setCurrentLogTreePage}
          />
        </div>
      </div>
    );
  };

  const getPipelineTitle = () => {
    if (loading) {
      //return (<span><FontAwesomeIcon icon={faSpinner} className="mr-2" spin/>Loading Pipeline</span>)
      //return (<div><FontAwesomeIcon icon={faSpinner} className="mr-2" spin/></div>);
      return (<></>);
    }

    return (
      <span>
        <FontAwesomeIcon icon={getTypeIcon(pipeline["type"] ? pipeline["type"][0] : "default")} className="mr-2"/>
        {pipeline?.name}
      </span>
    );
  };


  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab activeTab={activeTab} tabText={"Catalog"} handleTabClick={handleTabClick}
                       tabName={"catalog"} toolTipText={"Template Catalog"} icon={faHexagon}/>
        <NavigationTab activeTab={activeTab} tabText={"Pipelines"}
                       handleTabClick={handleTabClick} tabName={"pipelines"} toolTipText={"Pipelines"} icon={faDiceD20}/>
        <NavigationTab activeTab={"viewer"} tabText={"Pipeline Viewer"}
                       handleTabClick={handleTabClick} tabName={"viewer"} toolTipText={"Pipeline Viewer"} icon={faLayerGroup}/>
      </NavigationTabContainer>
    );
  };

  // TODO: Create pipeline summary error container
  if (error && !loading) {
    return (<ErrorDialog error={error} align={"top"} setError={setErrors}/>);
  }

  if (!loading && (data.length === 0 || data.pipeline == null)) {
    return (<InfoDialog
      message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."/>);
  }


  return (
    <div>
      {getNavigationTabContainer()}
      <div className="h4 mt-2 mb-4">{getPipelineTitle()}</div>
      {getNavigationTabs()}
      {getCurrentView()}
    </div>
  );
}


export default PipelineDetailView;