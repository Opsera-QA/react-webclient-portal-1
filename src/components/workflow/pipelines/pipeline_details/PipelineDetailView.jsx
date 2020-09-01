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


function PipelineDetailView() {
  const { tab, id } = useParams();
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [pipeline, setPipeline] = useState({});
  const [activityData, setActivityData] = useState({});
  const [stepStatus, setStepStatus] = useState({});
  const [loading, setLoading] = useState(false);
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
    console.log("Pipeline object useEffect update detected!!!")
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
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${id}`;
    try {
      const pipeline = await axiosApiService(accessToken).get(apiUrl);
      if (pipeline && pipeline.data && pipeline.data.length > 0) {
        setData({
          ...data,
          pipeline: pipeline && pipeline.data[0],
        });

        setPipeline(pipeline && pipeline.data[0])

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
    }
  }

  const selectRunCountFilter = item => {
    setRunCount(item);
  };

  async function getActivityLogs() {
    if (activeTab !== "summary" || logsIsLoading) { return }
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

  if (error && !loading) {
    return (<ErrorDialog error={error} align={"detailPanelTop"} setError={setErrors}/>);
  } else if (loading && !error) {
    return (<LoadingDialog size="lg"/>);
  } else if (!loading && (data.length === 0 || data.pipeline == null)) {
    return (<InfoDialog
      message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."/>);
  } else {
    return (
      <>
        <div className="px-2">
          <div className="max-content-width">
            <BreadcrumbTrail destination={"pipelineDetailView"}/>
          </div>
          <div className="alternate-tabs">
            <ul className="nav nav-tabs">
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

          {activeTab === "summary" && <div className="max-content-width content-block-collapse p-3">
            <PipelineSummaryPanel
              pipeline={pipeline}
              customerAccessRules={customerAccessRules}
              parentWorkflowStatus={workflowStatus}
              ownerName={ownerName}
              setActiveTab={setActiveTab}
              setWorkflowStatus={setWorkflowStatus}
              getActivityLogs={getActivityLogs}
              fetchPlan={fetchPlan}
            />
            <PipelineActivityLogTable
              isLoading={logsIsLoading}
              currentRunCountFilter={runCount}
              selectRunCountFilter={selectRunCountFilter}
              data={activityData.pipelineData}
              paginationOptions={getPaginationOptions()}
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
          />}

        </div>
      </>
    );
  }
}


export default PipelineDetailView;