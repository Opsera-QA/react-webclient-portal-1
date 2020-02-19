import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";

function SecOpsDashboard() {
  const contextType = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState({});

  useEffect( () => {
    setLoading(false);
  }, []);
  
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
  } else if (typeof data !== "object" || Object.keys(data).length == 0 || error) {
    return (<ErrorDialog error={error ? error : "Missing Data!"} />);
  } else {
    return (
      <div className="d-flex flex-column mb-3">
        
        <div className="metric-box p-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="metric-box-headertext text-muted mb-3">
              Vulnerabilities
            </div>
            <div className="box-metric">{data.twistlockHighVulnerabilities.data[0].key}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              High Severity
              </div>
            </footer>
          </blockquote>

          <blockquote className="blockquote mb-0 mt-4">
            <div className="box-metric">{data.twistlockMidVulnerabilities.data[0].key}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Medium Severity
              </div>
            </footer>
          </blockquote>
        
          <blockquote className="blockquote mb-0 mt-4">
            <div className="box-metric">{data.twistlockLowVulnerabilities.data[0].key}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Low Severity
              </div>
            </footer>
          </blockquote>
        </div>
        <div className="metric-box-footertext text-muted">Source: TwistLock</div>

        <div className="metric-box p-3 mt-4 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{data.sonarBugs.data[0].key}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Bugs
              </div>
            </footer>
          </blockquote>
        </div>
        <div className="metric-box-footertext text-muted">Source: Sonar</div>
      </div>

    /* 
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
      </div> */
    );
  }

}

export default SecOpsDashboard;