import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import PipelineOverviewSummary from "./pipelineOverviewSummary";
import PipelineActivityLogTable from "./pipelineActivityLogTable";
import LoadingDialog from "components/common/loading";
import ErrorDialog from "components/common/error";
import InfoDialog from "components/common/info";
import "./workflows.css";
import PipelineActionControls from "./piplineActionControls";


function PipelineOverview({ id }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [activityData, setActivityData] = useState({});
  const [role, setRole] = useState("");
  const [stepStatus, setStepStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [logsIsLoading, setLogsIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [workflowStatus, setWorkflowStatus] = useState(false);

  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        setLoading(true);
        await fetchData();      
        setLoading(false);    
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };

    runEffect();

    return () => {
      controller.abort();
    };
  }, []);

  // Executed every time page number or page size changes
  useEffect(() => {    
    getActivityLogs();
  }, [currentPage, pageSize]);

  async function fetchData() {
    const { getAccessToken, getUserRecord } = contextType;
    const accessToken = await getAccessToken();
    const ssoUsersRecord = await getUserRecord();
    const apiUrl =  `/pipelines/${id}`;   
    try {
      const pipeline = await axiosApiService(accessToken).get(apiUrl); 
      console.log(pipeline.data);
      if (pipeline && pipeline.data && pipeline.data.length > 0) {
        setData({
          ...data,
          pipeline: pipeline && pipeline.data[0]
        });
        setPipelineAttributes(pipeline && pipeline.data[0], ssoUsersRecord._id);      
      } else {
        setErrors("Pipeline not found");  
      }      
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  }

  async function getActivityLogs() {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${id}/activity?page=${currentPage}&size=${pageSize}`;
    setLogsIsLoading(true);  
    try {
      const activity = await axiosApiService(accessToken).get(apiUrl); 
      setActivityData(activity.data);   
      setLogsIsLoading(false);  
    }
    catch (err) {
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

  const setPipelineAttributes = (pipeline, ssoUsersId) => {
    if (typeof(pipeline.roles) !== "undefined") {
      let userRoleObject = pipeline.roles.findIndex(x => x.user === ssoUsersId); 
      if (userRoleObject >= 0) {
        setRole(pipeline.roles[userRoleObject].role);
      } else {
        setRole("");
      }
    }  

    if (typeof(pipeline.workflow) !== "undefined") {
      if (typeof(pipeline.workflow.last_step) !== "undefined") {
        setStepStatus(pipeline.workflow.last_step);
      } else {
        setStepStatus({});
      }
    }
  };

  const callbackFunction = async () => {
    await fetchData();
  };

  const callbackRefreshActivity = () => {
    getActivityLogs();
  };

  const getPaginationOptions = () => {
    return {
      pageSize: pageSize,
      totalCount: activityData.count,
      currentPage: currentPage,
      gotoPageFn: gotoPage
    };
  };

  if (error) {
    return (<ErrorDialog error={error} />);
  }  else if (loading) {
    return (<LoadingDialog size="lg" />);
  }  else if (!loading && data.length == 0) {
    return ( <InfoDialog message="No Pipeline details found.  Please ensure you have access to view the requested pipeline." />);
  } else {
    return (
      <>
        <div className="max-content-width">
          {typeof(data.pipeline) !== "undefined" && <PipelineActionControls pipeline={data.pipeline} disabledActionState={false} role={role} fetchData={fetchData} fetchActivityLogs={getActivityLogs} setParentWorkflowStatus={setWorkflowStatus} /> }
          {typeof(data.pipeline) !== "undefined" ? <PipelineOverviewSummary data={data.pipeline} parentCallback={callbackFunction} parentCallbackRefreshActivity={callbackRefreshActivity} role={role} stepStatus={stepStatus} parentWorkflowStatus={workflowStatus}  />  : null }
          <PipelineActivityLogTable isLoading={logsIsLoading} data={activityData.pipelineData} paginationOptions={getPaginationOptions()}></PipelineActivityLogTable> 
        </div>       
      </>
    );
  }
}

PipelineOverview.propTypes = {
  id: PropTypes.string
};

export default PipelineOverview;