import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";
import { Alert } from "react-bootstrap";
import Moment from "react-moment";
import "./logs.css";


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
        setData(res.data.data);
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
    return (
      <>
        <MapActivityData data={data.buildSuccess.data} type="success" />
    
      </>
    );
  }
}


const MapActivityData = (props) => {
  const { data, type } = props;
  return (
    <>
      <div className="activity-label-text mb-2">Successful Build Activity Logs</div>
      { data.map((item, idx) => (
        <Alert key={idx} variant={type}>
          <div className="row">
            <div className="col">{item.message}</div>
            <div className="col text-right"><Moment format="dddd, MMMM Do YYYY, h:mm:ss a" date={item["@timestamp"]} /></div>
          </div>
          <div className="row">
            <div className="col">{item["data.projectName"]}</div>
            <div className="col">Version: {item["@version"]}</div>
            <div className="col">Build: {item["data.buildNum"]}</div>
          </div>
          <div className="text-muted mt-2">{JSON.stringify(item)}</div>
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

