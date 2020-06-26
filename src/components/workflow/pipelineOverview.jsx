import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import PipelineOverviewSummary from "./pipelineOverviewSummary";
import LoadingDialog from "components/common/loading";
import ErrorDialog from "components/common/error";
import InfoDialog from "components/common/info";
import Pagination from "components/common/pagination";
import { format } from "date-fns";
import ModalActivityLogs from "components/common/modalActivityLogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faTimesCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
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
    const { getAccessToken, getUserSsoUsersRecord } = contextType;
    const accessToken = await getAccessToken();
    const ssoUsersRecord = await getUserSsoUsersRecord();
    const apiUrl =  `/pipelines/${id}`;   
    try {
      const pipeline = await axiosApiService(accessToken).get(apiUrl); 
      setData({
        ...data,
        pipeline: pipeline && pipeline.data[0]
      });
      setPipelineAttributes(pipeline && pipeline.data[0], ssoUsersRecord._id);      
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

          {typeof(data.pipeline) !== "undefined" ? <PipelineOverviewSummary data={data.pipeline} parentCallback={callbackFunction} parentCallbackRefreshActivity={callbackRefreshActivity} role={role} stepStatus={stepStatus}  />  : null }
          <PipelineActivity data={activityData.pipelineData} isLoading={logsIsLoading} />
          {activityData.pipelineData && <Pagination total={activityData.count} currentPage={currentPage} pageSize={pageSize} onClick={(pageNumber, pageSize) => gotoPage(pageNumber, pageSize)} />}
        </div>       
       
      </>
    );
  }
}



const PipelineActivity = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const { data, isLoading } = props;
  
  const handleClick = (data) => {
    setModalData(data);
    setShowModal(true);
  };

  return (
    <>
      
      <div className="h6 mt-4">Activity Log 
        { isLoading ? <FontAwesomeIcon icon={faSpinner} spin className="ml-1" fixedWidth/> : null }</div>

      {data && data.length > 0 &&
        <>
          <Table striped bordered hover className="table-sm" style={{ fontSize:"small" }}>
            <thead>
              <tr>
                <th className="text-center" style={{ width: "5%" }}>Run</th>
                <th style={{ width: "10%" }}>Action</th>
                <th style={{ width: "15%" }}>Task</th>                
                <th style={{ width: "10%" }}>Tool</th>
                <th style={{ width: "10%" }}>Status</th>
                <th style={{ width: "35%" }}>Message</th>
                <th style={{ width: "15%" }}>Date</th>
              </tr>
            </thead>
            <tbody>
            
              {data.map((item, idx) => (
                <tr key={idx} >
                  <td className="text-center">{item["run_count"]}</td>
                  <td className="upper-case-first">{item["action"]}</td> 
                  
                  <td className="upper-case-first">{item["step_name"]}</td>                  
                  <td className="upper-case-first">{item["tool_identifier"]}</td>
                  
                  <td className="upper-case-first">
                    {item["status"] === "failure" || item["status"] === "failed" ? 
                      <FontAwesomeIcon icon={faTimesCircle} className="mr-1 red" style={{ cursor: "pointer" }}  /> : null }
                    {item["status"] ? item["status"] : "unknown"}</td>
                  <td>{item["message"] ? item["message"] : ""} 
                    { item["action"] !== "automation task" ? 
                      <FontAwesomeIcon icon={faSearchPlus}
                        className="mr-1 mt-1 float-right"
                        size="xs"
                        style={{ cursor: "pointer" }}
                        onClick= {() => { handleClick(item); }} /> : null }</td>
                  <td>{format(new Date(item["createdAt"]), "yyyy-MM-dd', 'hh:mm a")}</td>   
                </tr>
              ))}
            </tbody>
          </Table>
          
          <ModalActivityLogs header="Pipeline Activity Log" size="lg" jsonData={modalData} show={showModal} setParentVisibility={setShowModal} />
        </>}
        
      {data && data.length === 0 &&
         <div className="info-text mt-3 p-2">Pipeline activity data has not been generated yet.  Once this pipeline begins running, it will publish details here.</div>}
    </>
    
  );
};





PipelineOverview.propTypes = {
  id: PropTypes.string
};


PipelineActivity.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  isLoading: PropTypes.bool
};


export default PipelineOverview;