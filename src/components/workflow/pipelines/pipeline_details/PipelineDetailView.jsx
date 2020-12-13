import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import PipelineActivityLogTable from "./pipeline_activity/PipelineActivityLogTable";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import InfoDialog from "components/common/status_notifications/info";
import "../../workflows.css";
import { useParams } from "react-router-dom";
import PipelineWorkflowView from "./workflow/PipelineWorkflowView";
import PipelineSummaryPanel from "./PipelineSummaryPanel";
import PipelineHelpers from "../../pipelineHelpers";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDraftingCompass, faDiceD20, faMicrochip, faArrowLeft, faBracketsCurly } from "@fortawesome/pro-light-svg-icons";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import Model from "../../../../core/data_model/model";
import pipelineActivityActions from "./pipeline_activity/pipeline-activity-actions";
import pipelineActivityFilterMetadata from "./pipeline_activity/pipeline-activity-filter-metadata";

const refreshInterval = 8000;

function PipelineDetailView() {
  const { tab, id } = useParams();
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [pipeline, setPipeline] = useState({});
  const [activityData, setActivityData] = useState({});
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

  const [refreshTimer, setRefreshTimer] = useState(null);

  /* Role based Access Controls */
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const [customerAccessRules, setCustomerAccessRules] = useState({});

  useEffect(() => {
    //console.log("Effect  1");
    initComponent();
  }, []);

  const handleTabClick = (tabSelection) => async e => {
    e.preventDefault();
    clearTimeout(refreshTimer);

    if (tabSelection === "pipelines") {
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


  const initComponent = async () => {
    setLoading(true);

    const userRecord = await getUserRecord(); //RBAC Logic
    const rules = await setAccessRoles(userRecord);
    setCustomerAccessRules(rules);

    if (tab) {
      setActiveTab(tab);
    }

    await fetchData();
    await getActivityLogs();
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
  }


  let staleRefreshCount = 1;
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
        await getSilentActivityLogs();
      }
    }, refreshInterval);
    setRefreshTimer(refreshTimer);
  };

  // TODO: combine this with the other one and just pass whether to show loading or not as bool
  const getSilentActivityLogs = async () => {
    try {
      const response = await pipelineActivityActions.getPipelineActivityLogs(pipelineActivityFilterDto, pipeline?.workflow?.run_count || "0", id, getAccessToken);
      setActivityData(response.data);
      const newFilterDto = pipelineActivityFilterDto;
      newFilterDto.setData("totalCount", response.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setPipelineActivityFilterDto(() => newFilterDto);
    } catch (err) {
      setErrors(err.message);
      console.log(err.message);
    }
  };


  const analyzePipelineStatus = (pipeline) => {
    if (!pipeline || Object.entries(pipeline).length === 0) {
      return;
    }
    const { workflow } = pipeline;
    let status = workflow.last_step !== undefined && workflow.last_step.hasOwnProperty("status") ? workflow.last_step.status : false;
    return status;
  };

  const getActivityLogs = async (filterDto = pipelineActivityFilterDto) => {
    if (activeTab !== "summary" || logsIsLoading) {
      return;
    }

    try {
      setLogsIsLoading(true);
      const response = await pipelineActivityActions.getPipelineActivityLogs(pipelineActivityFilterDto, pipeline?.workflow?.run_count || "0", id, getAccessToken);
      setActivityData(response.data);
      const newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setPipelineActivityFilterDto(() => newFilterDto);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
      console.log(err.message);
    }
    finally {
      setLogsIsLoading(false);
    }
  }

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
      return faDiceD20;
    }
  };

  if (error && !loading) {
    return (<ErrorDialog error={error} align={"top"} setError={setErrors}/>);
  } else if (loading && !error) {
    return (<LoadingDialog size="md" message={"Loading pipeline..."}/>);
  } else if (!loading && (data.length === 0 || data.pipeline == null)) {
    return (<InfoDialog
      message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."/>);
  } else {
    return (
      <>
        <div>
          {pipeline ? <div className="title-text-5 mb-2">{pipeline.name}</div> :
            <div className="title-text-5 mb-2">Pipelines</div>}

          {pipeline.owner !== customerAccessRules?.UserId &&
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
            pipeline={pipeline}
            isLoading={logsIsLoading}
            loadData={getActivityLogs}
            pipelineActivityFilterDto={pipelineActivityFilterDto}
            setPipelineActivityFilterDto={setPipelineActivityFilterDto}
            data={activityData.pipelineData}
          /></div>}
      </>
    );
  }
}


export default PipelineDetailView;