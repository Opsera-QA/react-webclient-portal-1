import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";

function SecOpsDashboard() {
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    setLoading(false);
  }, []);

  // return (
  //   <div className="h2">SecOps Dashboard Here</div>
  // );
  
  const contextType = useContext(AuthContext);
  
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState({});

  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/analytics/dashboard/secops", {}, accessToken);
    
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
      <div>
        <div className="element-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{data.twistlockHighVulnerabilities.data[0].key}</div>
            <footer className="blockquote">
              <small className="text-muted">
            Twistlock-Vulnerabilities with High Severity
              </small>
            </footer>
          </blockquote>
        </div>
        <div className="element-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{data.twistlockMidVulnerabilities.data[0].key}</div>
            <footer className="blockquote">
              <small className="text-muted">
            Twistlock-Vulnerabilities with Medium Severity
              </small>
            </footer>
          </blockquote>
        </div>

        <div className="element-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{data.twistlockLowVulnerabilities.data[0].key}</div>
            <footer className="blockquote">
              <small className="text-muted">
            Twistlock-Vulnerabilities with Low Severity
              </small>
            </footer>
          </blockquote>
        </div>

        <div className="element-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{data.sonarBugs.data[0].key}</div>
            <footer className="blockquote">
              <small className="text-muted">
            Sonar Bugs
              </small>
            </footer>
          </blockquote>
        </div>
      </div>
    );
  }

}

export default SecOpsDashboard;