import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import PipelineActivityLogTable from "./PipelineActivityLogTable";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import InfoDialog from "components/common/status_notifications/info";
import "../../workflows.css";
import { useParams } from "react-router-dom";
import PipelineWorkflowView from "./workflow/PipelineWorkflowView";
import PipelineSummaryPanel from "./PipelineSummaryPanel";
import PipelineHelpers from "../../pipelineHelpers";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import { useHistory } from "react-router-dom";
import { faBracketsCurly, faSearchPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDraftingCompass, faInfinity, faMicrochip, faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";


function PipelineDetailView() {
  const { tab, id } = useParams();
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [pipeline, setPipeline] = useState({});
  const [activityData, setActivityData] = useState({});
  const [stepStatus, setStepStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [softLoading, setSoftLoading] = useState(false);
  const [logsIsLoading, setLogsIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [runCount, setRunCount] = useState(1);
  const [activeTab, setActiveTab] = useState("summary");
  const [editItem, setEditItem] = useState(false);
  const [ownerName, setOwnerName] = useState(undefined);
  const [refreshCount, setRefreshCount] = useState(0);
  const history = useHistory();

  /* Role based Access Controls */
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const [customerAccessRules, setCustomerAccessRules] = useState({});

  useEffect(() => {
    initComponent();
  }, []);

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    if (tabSelection === "pipelines") {
      history.push(`/workflow/`);
      return;
    }

    setActiveTab(tabSelection);
    if (tab !== tabSelection) {
      history.push(`/workflow/details/${id}/${tabSelection}`);
      fetchData();
    }
    // if (tabSelection !== "catalog") {
    //   cookieHelpers.setCookie("pipelines", "selectedTab", tabSelection);
    // }
  };

  useEffect(() => {
    getActivityLogs();
  }, [currentPage, pageSize]);



  useEffect(() => {
    console.log("Pipeline update detected, determining status!!!");
    updatePipelineStatusByInterval(pipeline);
  }, [JSON.stringify(pipeline.workflow)]);


  useEffect(() => {
    console.log("Pipeline update detected!!!");
  }, [refreshCount, JSON.stringify(pipeline)]);


  const initComponent = async () => {
    setLoading(true);

    const userRecord = await getUserRecord(); //RBAC Logic
    const rules = await setAccessRoles(userRecord);
    setCustomerAccessRules(rules);

    if (tab) {
      setActiveTab(tab);
    }

    await fetchData();
    setLoading(false);
  };

  async function fetchData() {
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
            setStepStatus(pipeline.data[0].workflow.last_step);
          } else {
            setStepStatus({});
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
  }

  let timer;
  let staleRefreshCount = 0;
  const updatePipelineStatusByInterval = () => {
    if (!pipeline || Object.entries(pipeline).length === 0) {
      return;
    }

    const pipelineStatus = analyzePipelineStatus(pipeline);
    if (pipelineStatus === "stopped" || !pipelineStatus) {
      console.log("Pipeline stopped, ending timer. Status: ", pipelineStatus);
      clearTimeout(timer);
      return;
    }

    timer = setInterval(async function() {
      staleRefreshCount++;
      console.log("running pipeline refresh interval. Step status: ");
      console.log(staleRefreshCount)
      await fetchPlan();

      if (staleRefreshCount % 3 === 0) {
        console.log("divisible by 3 refresh");
        await getSilentActivityLogs();
      }

      const pipelineStatus = analyzePipelineStatus(pipeline);

      if (pipelineStatus === "stopped" || !pipelineStatus || staleRefreshCount > 20) {
        console.log("Pipeline stopped inside timer, ending timer. Status: ", pipelineStatus);
        clearTimeout(timer);
        return;
      }
    }, 15000);

  };

  const getSilentActivityLogs = async () => {
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${id}/activity?page=${currentPage}&size=${pageSize}`;
    try {
      const activity = await axiosApiService(accessToken).get(apiUrl);
      setActivityData(activity.data);
    } catch (err) {
      setErrors(err.message);
      console.log(err.message);
    }
  }



  const analyzePipelineStatus = (pipeline) => {
    if (!pipeline || Object.entries(pipeline).length === 0) {
      return;
    }
    const { workflow } = pipeline;
    let status = workflow.last_step !== undefined && workflow.last_step.hasOwnProperty("status") ? workflow.last_step.status : false;
    return status;
  };


  const selectRunCountFilter = item => {
    setRunCount(item);
  };

  async function getActivityLogs() {
    if (activeTab !== "summary" || logsIsLoading) {
      return;
    }
    setLogsIsLoading(true);
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${id}/activity?page=${currentPage}&size=${pageSize}`;
    try {
      const activity = await axiosApiService(accessToken).get(apiUrl);
      setActivityData(activity.data);
      setLogsIsLoading(false);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
      console.log(err.message);
      setLogsIsLoading(false);
    }
  }

  const gotoPage = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  const getPaginationOptions = () => {
    return {
      pageSize: pageSize,
      totalCount: activityData.count,
      currentPage: currentPage,
      gotoPageFn: gotoPage,
    };
  };

  const fetchPlan = async (param) => {
    // console.log("fetchPlan")
    // setEditItem(false);
    await fetchData();
    if (param) {
      setEditItem(param);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
    case "sfdc":
      return faSalesforce;
    case "sdlc":
      return faBracketsCurly;
    case "ai-ml":
      return faMicrochip;
    default:
      return faInfinity;
    }
  };

  if (error && !loading) {
    return (<ErrorDialog error={error} align={"detailPanelTop"} setError={setErrors}/>);
  } else if (loading && !error) {
    return (<LoadingDialog size="sm"/>);
  } else if (!loading && (data.length === 0 || data.pipeline == null)) {
    return (<InfoDialog
      message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."/>);
  } else {
    return (
      <>
        <div>
          {/*<div className="max-content-width">
            <BreadcrumbTrail destination={"pipelineDetailView"}/>
          </div>*/}

          {pipeline ? <div className="title-text-5 mb-2">{pipeline.name}</div> :
            <div className="title-text-5 mb-2">Pipelines</div>}

          {pipeline.owner !== customerAccessRules.UserId &&
          <>
            <div className="mb-2 w-100 max-charting-width info-text">
              {customerAccessRules.Role === "administrator" && <>Administrator Access Role: Your account has full
                access to this pipeline and its settings.</>}
              {customerAccessRules.Role === "power_user" && <>Power User Role: Your account has elevated privileges
                to this pipeline which include changing settings and running the pipeline.</>}
              {customerAccessRules.Role === "user" && <>Standard User Role: Your account has basic access to this
                pipeline which is limited to viewing and running pipeline operations only.</>}
              {customerAccessRules.Role === "readonly" && <>Read Only Role: Your account does not have any
                privileges associated with this pipeline. You are being temporarily granted Viewer permissions and
                will not be able to perform any actions.</>}
            </div>
          </>
          }

          <div className="alternate-tabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className={"nav-link"} href="#"
                   onClick={handleTabClick("pipelines")}><FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>Pipelines</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (activeTab === "summary" ? "active" : "")} href="#"
                   onClick={handleTabClick("summary")}><FontAwesomeIcon
                  icon={getTypeIcon(pipeline["type"] ? pipeline["type"][0] : "default")} className="mr-2"/>Summary</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (activeTab === "model" ? "active" : "")} href="#"
                   onClick={handleTabClick("model")}><FontAwesomeIcon icon={faDraftingCompass} className="mr-2"/>Workflow</a>
              </li>
              {/*<li className="nav-item">*/}
              {/*  <a className={"nav-link " + (activeTab === "editor" ? "active" : "")} href="#"*/}
              {/*     onClick={handleTabClick("editor")}>Settings</a>*/}
              {/*</li>*/}
            </ul>
          </div>

          {activeTab === "summary" &&
          <div className="max-content-width-1080 content-block-no-height pl-3 pb-2" style={{ width: "80vw" }}>
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
          </div>}


          {activeTab === "model" &&
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
          />}

        </div>

        {activeTab === "summary" &&
        <div className="max-content-width-1875">
          <PipelineActivityLogTable
            isLoading={logsIsLoading}
            currentRunCountFilter={runCount}
            selectRunCountFilter={selectRunCountFilter}
            data={activityData.pipelineData}
            paginationOptions={getPaginationOptions()}
          /></div>}
      </>
    );
  }
}


export default PipelineDetailView;