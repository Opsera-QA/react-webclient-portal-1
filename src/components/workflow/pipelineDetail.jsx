import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import Modal from "../common/modal";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiServiceMultiGet } from "../../api/apiService";
import PipelineItemDetail from "./pipelineItemDetail";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import Moment from "react-moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import "./workflows.css";


function PipelineDetail({ id }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [role, setRole] = useState("");
  const [stepStatus, setStepStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(true);
  
  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
        setReload(false);
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
  }, [reload]);



  async function fetchData() {
    setLoading(true);
    const { getAccessToken, getUserSsoUsersRecord } = contextType;
    const accessToken = await getAccessToken();
    const ssoUsersRecord = await getUserSsoUsersRecord();
    const apiUrls = [ `/pipelines/${id}`, `/pipelines/${id}/activity` ];   
    try {
      const [pipeline, activity] = await axiosApiServiceMultiGet(accessToken, apiUrls);
      setData({
        pipeline: pipeline && pipeline.data[0],
        activity: activity && activity.data
      });
      setPipelineAttributes(pipeline && pipeline.data[0], ssoUsersRecord._id);
      setLoading(false);  
      console.log("pipeline", pipeline);      
      console.log("activity", activity);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }


  const setPipelineAttributes = (pipeline, ssoUsersId) => {
    if (typeof(pipeline.roles) !== "undefined") {
      let adminRoleIndex = pipeline.roles.findIndex(x => x.role === "administrator"); 
      if (pipeline.roles[adminRoleIndex].user === ssoUsersId) {
        setRole(pipeline.roles[adminRoleIndex].role);
      }
    }
    
    if (typeof(pipeline.workflow) !== "undefined") {
      if (typeof(pipeline.workflow.last_step) !== "undefined") {
        console.log("Last Step: ", pipeline.workflow.last_step);
        setStepStatus(pipeline.workflow.last_step);
      } else {
        setStepStatus({});
      }
    }
  };


  const callbackFunction = async () => {
    await fetchData();
  };

  
  if (error) {
    return (<ErrorDialog error={error} />);
  }  else if (loading) {
    return (<LoadingDialog size="lg" />);
  }  else if (!loading && data.length == 0) {
    return ( <InfoDialog message="No Pipeline details found.  Please ensure you have access to view the requested pipeline." />);
  } else {
    return (
      <div className="mt-3 max-content-width">
        {typeof(data.pipeline) !== "undefined" ? <PipelineItemDetail data={data.pipeline} parentCallback={callbackFunction} role={role} stepStatus={stepStatus}  />  : null }
        {typeof(data.activity) !== "undefined" ? <PipelineActivity data={data.activity} />  : null}
      </div>         
    );
  }
}



const PipelineActivity = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const { data } = props;
  
  const handleClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  return (
    <>
      {data !== undefined && data.length > 0 ?
        <>
          <div className="h6 mt-4">Activity Log</div>
          <Table striped bordered hover className="table-sm" style={{ fontSize:"small" }}>
            <thead>
              <tr>
                <th className="text-center" style={{ width: "5%" }}>Run</th>
                <th style={{ width: "10%" }}>Action</th>
                {/* <th className="text-center" style={{ width: "5%" }}>Step</th>   */}
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
                  {/* <td className="text-center">{item["step_index"] !== null ? item["step_index"] + 1 : ""}</td>  */}
                  <td>{item["step_name"]}</td>                  
                  <td className="upper-case-first">{item["tool_identifier"]}</td>
                  
                  <td className="upper-case-first">{item["status"] ? item["status"] : "unknown"}</td>
                  <td>{item["message"] ? item["message"] : ""} 
                    <FontAwesomeIcon icon={faSearchPlus}
                      className="mr-1 mt-1 float-right"
                      size="xs"
                      style={{ cursor: "pointer" }}
                      onClick= {() => { handleClick(item); }} /></td>
                  <td><Moment format="YYYY-MM-DD, hh:mm a" date={item["createdAt"]} /> </td>   
                </tr>
              ))}
            </tbody>
          </Table>

          {showModal ? <Modal header="Log Details"
            jsonMessage={modalMessage}
            jsonView="true"
            button="OK"
            size="lg"
            handleCancelModal={() => setShowModal(false)}
            handleConfirmModal={() => setShowModal(false)} /> : null}
        </>
        : <InfoDialog message="No pipeline activity data is currently available.  Logs will start getting populated once the pipeline starts running." />}

    </>
    
  );
};



/* 

const DateRangePicker = ({ data, parentSavePropertyCallback }) => {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);

  useEffect(() => {
    if (data.workflow.schedule !== undefined) {
      setSchedule(data.workflow.schedule);
    }
  }, [data]);


  const handleClick = (param) => {
    parentSavePropertyCallback(); //TODO: Wire this up: const handleSavePropertyClick = async (pipelineId, value, type) 
  };

  return (
    <>
      {data !== undefined ?
        <>
          


        </>
        : null}
    </>
    
  );
};
 */




PipelineDetail.propTypes = {
  id: PropTypes.string
};


PipelineActivity.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
};

/* DateRangePicker.propTypes = {
  parentSavePropertyCallback: PropTypes.func,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
}; */

export default PipelineDetail;