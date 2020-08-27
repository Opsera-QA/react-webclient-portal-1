import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import PipelineOverviewSummary from "./PipelineSummaryPanel";
import PipelineActivityLogTable from "./pipelineActivityLogTable";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import InfoDialog from "components/common/status_notifications/info";
import "../../workflows.css";
import PipelineActionControls from "./piplineActionControls";


function PipelineDetailView({ id }) {
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [activityData, setActivityData] = useState({});
  const [stepStatus, setStepStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [logsIsLoading, setLogsIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [runCount, setRunCount] = useState(1);

  /* Role based Access Controls */
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const [customerAccessRules, setCustomerAccessRules] = useState({});


  useEffect(() => {
    initComponent();
  }, []);


  useEffect(() => {
    // Executed every time page number or page size changes
    getActivityLogs();
  }, [currentPage, pageSize]);


  const initComponent = async () => {
    setLoading(true);

    const userRecord = await getUserRecord(); //RBAC Logic
    const rules = await setAccessRoles(userRecord);
    setCustomerAccessRules(rules);

    await fetchData();
    setLoading(false);
  };

  async function fetchData() {
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${id}`;
    try {
      const pipeline = await axiosApiService(accessToken).get(apiUrl);
      console.log("Top level pipeline refresh: ", pipeline.data);
      if (pipeline && pipeline.data && pipeline.data.length > 0) {
        setData({
          ...data,
          pipeline: pipeline && pipeline.data[0],
        });

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
      console.log(err.message);
      setErrors(err.message);
    }
  }

  const selectRunCountFilter = item => {
    setRunCount(item);
  };

  async function getActivityLogs() {
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${id}/activity?page=${currentPage}&size=${pageSize}`;
    setLogsIsLoading(true);
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
      gotoPageFn: gotoPage,
    };
  };

  if (error) {
    return (<ErrorDialog error={error}/>);
  } else if (loading) {
    return (<LoadingDialog size="lg"/>);
  } else if (!loading && data.length == 0) {
    return (<InfoDialog
      message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."/>);
  } else {
    return (
      <>
        <div className="max-content-width">
          {typeof(data.pipeline) !== "undefined" && <PipelineActionControls pipeline={data.pipeline} disabledActionState={false} customerAccessRules={customerAccessRules} fetchData={fetchData} fetchActivityLogs={getActivityLogs} setParentWorkflowStatus={setWorkflowStatus} /> }
          {typeof(data.pipeline) !== "undefined" ? <PipelineOverviewSummary data={data.pipeline} parentCallback={callbackFunction} parentCallbackRefreshActivity={callbackRefreshActivity} customerAccessRules={customerAccessRules} stepStatus={stepStatus} parentWorkflowStatus={workflowStatus}  />  : null }
          <PipelineActivityLogTable isLoading={logsIsLoading} currentRunCountFilter={runCount}
                                    selectRunCountFilter={selectRunCountFilter} data={activityData.pipelineData}
                                    paginationOptions={getPaginationOptions()}/>
        </div>
      </>
    );
  }
}

PipelineDetailView.propTypes = {
  id: PropTypes.string,
};

export default PipelineDetailView;