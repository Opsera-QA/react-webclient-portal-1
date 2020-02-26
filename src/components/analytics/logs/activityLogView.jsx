import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";
import { Alert } from "react-bootstrap";
import Moment from "react-moment";
import "./logs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";

function ActivityLogView( { persona } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/analytics/dashboard/pipeline/activity", {}, accessToken);
    
    apiCall.get()
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setErrors(err);
        setLoading(false);
      });
  };

  useEffect( () => {
    getApiData();
  }, []);

  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (typeof data !== "object" || Object.keys(data).length == 0 || error) {
    return (<ErrorDialog  error={error ? error : "Missing Data!"} />);
  } else {
    console.log("data", data);
    return (
      <>
        <MapActivityData data={data} type="success" />
    
      </>
    );
  }
}


//TODO: Make "Build number" clickable to zoom in on log views
// New Node Service: Get log details
// New Node Service: Get Recent Build summary (new kind)

const MapActivityData = (props) => {
  const { data, type } = props;
  return (
    <>
      <div className="activity-label-text mb-2">Pipeline Activity Logs</div>
      { data.map((item, idx) => (
        <Alert key={idx} variant={type}>
          <div className="row">
            <div className="col">{item.message}</div>
            <div className="col text-right"><Moment format="dddd, MMMM Do YYYY, h:mm:ss a" date={item["timestamp"]} /></div>
          </div>
          <div className="row mt-1">
            <div className="col">{item["data_projectName"]}</div>
            <div className="col">Version: {item["version"]}</div>
            <div className="col">Build: {item["data_buildNum"]} <FontAwesomeIcon icon={faSearchPlus} size="xs" style={{ cursor: "pointer" }} /></div>
          </div>
        </Alert>
      ))}
    </>
  );
};

MapActivityData.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string
};

ActivityLogView.propTypes = {
  persona: PropTypes.string
};

export default ActivityLogView;

