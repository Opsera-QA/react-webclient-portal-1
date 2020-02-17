/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
//import { CardGroup, Card, Button } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";

function BuildCounts() {
  const contextType = useContext(AuthContext);
  
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/analytics/dashboard", {}, accessToken);
    
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
  } else if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog error="Missing Data!" />);
  } else {
    return (
      <div className="d-flex flex-column mb-3">
        <div className="metric-box p-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{data.successfulBuilds.data[0].key}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Successful Builds
              </div>
            </footer>
          </blockquote>
        </div>  
        
        <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{data.failedBuilds.data[0].key}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Failed Builds
              </div>
            </footer>
          </blockquote>
        </div>
        
        <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{data.successfulDeployments.data[0].key}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Successful Deployments
              </div>
            </footer>
          </blockquote>
        </div>

        <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{data.failedDeployments.data[0].key}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Failed Deployments
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    );
  }
}

/* BuildCounts.propTypes = {
  settings: PropTypes.object
};
 */

export default BuildCounts;
