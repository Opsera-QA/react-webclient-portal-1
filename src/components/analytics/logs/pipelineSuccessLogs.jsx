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

const FILTER = "success";

function PipelineSuccessLogs( { persona, searchQuery, filterType } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const urlParams = {
      search: searchQuery,
      filter: FILTER
    };
    const apiCall = new ApiService("/analytics/dashboard/pipeline/activity", urlParams, accessToken);    
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
  }, [searchQuery, filterType]);

  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else {
    return (
      <>
        <div className="activity-label-text mb-2">Recent Successful Builds</div>
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
      { data.map((item, idx) => (
        <Alert key={idx} variant={type}>
          <div className="row">
            <div className="col" style={{ fontWeight: "bold" }}>{item["data_projectName"]}: {item.message}</div>
          </div>
          <div className="row mt-1">
            <div className="col"><Moment format="dddd, MMMM Do YYYY, h:mm:ss a" date={item["timestamp"]} /></div>
          </div>
          <div className="row mt-2">
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

PipelineSuccessLogs.propTypes = {
  persona: PropTypes.string,
  searchQuery: PropTypes.string,
  filterType: PropTypes.string
};

export default PipelineSuccessLogs;

