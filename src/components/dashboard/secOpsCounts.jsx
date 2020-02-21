import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ErrorDialog from "../common/error";

function SecOpsDashboard( { data, persona } ) {
  useEffect( () => {
  
  }, [data]);
  

  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="Missing Data!" />);
  } else {
    console.log("data", data);
    return (
      <div className="d-flex flex-column mb-3">
        <div className="metric-box p-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="metric-box-headertext text-muted mb-3">
              Vulnerabilities
            </div>
            <div className={"box-metric " + (data.twistlockHighVulnerabilities.data[0] > 0 ? "red" : null)}>
              {data.twistlockHighVulnerabilities.data[0]}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              High Severity
              </div>
            </footer>
          </blockquote>

          <blockquote className="blockquote mb-0 mt-4">
            <div className={"box-metric " + (data.twistlockMidVulnerabilities.data[0] > 0 ? "yellow" : null)}>
              {data.twistlockMidVulnerabilities.data[0]}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Medium Severity
              </div>
            </footer>
          </blockquote>
        
          <blockquote className="blockquote mb-0 mt-4">
            <div className="box-metric">{data.twistlockLowVulnerabilities.data[0]}</div>
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
            <div className="box-metric">{data.sonarBugs.data[0]}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Bugs
              </div>
            </footer>
          </blockquote>
        </div>
        <div className="metric-box-footertext text-muted">Source: Sonar</div>
      </div>
    );
  }

}

SecOpsDashboard.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default SecOpsDashboard;