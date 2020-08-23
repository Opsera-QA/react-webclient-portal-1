import React from "react";
import PropTypes from "prop-types";
import ErrorDialog from "../../common/status_notifications/error";

// eslint-disable-next-line no-unused-vars
function SecOpsCounts( { data, persona } ) {
  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="No Data Present in the ES!" />);
  } else {
    const { twistlockHighVulnerabilities, twistlockMidVulnerabilities, twistlockLowVulnerabilities, sonarBugs } = data;
    return (
      <div className="d-flex flex-column mb-3">
        {Object.keys(twistlockHighVulnerabilities.data[0]).length > 0 ?
          <div className="metric-box p-3 text-center">
            <blockquote className="blockquote mb-0 ">
              <div className="metric-box-headertext text-muted mb-3">
              Vulnerabilities
              </div>
              <div className={"box-metric " + (twistlockHighVulnerabilities && Object.keys(twistlockHighVulnerabilities.data[0]).length > 0 ? "red" : null)}>
                {twistlockHighVulnerabilities && Object.keys(twistlockHighVulnerabilities.data[0]).length > 0 || twistlockHighVulnerabilities.status === 200 ? Object.values(twistlockHighVulnerabilities.data[0]) : null}</div>
              <footer className="blockquote">
                <div className="metric-box-subtext text-muted">
              High Severity
                </div>
              </footer>
            </blockquote>

            <blockquote className="blockquote mb-0 mt-4">
              <div className={"box-metric " + (twistlockMidVulnerabilities && Object.keys(twistlockMidVulnerabilities.data[0]).length > 0 ? "yellow" : null)}>
                {twistlockMidVulnerabilities && Object.keys(twistlockMidVulnerabilities.data[0]).length > 0 || twistlockMidVulnerabilities.status === 200 ? Object.values(twistlockMidVulnerabilities.data[0]) : null}</div>
              <footer className="blockquote">
                <div className="metric-box-subtext text-muted">
              Medium Severity
                </div>
              </footer>
            </blockquote>
        
            <blockquote className="blockquote mb-0 mt-4">
              <div className="box-metric">{twistlockLowVulnerabilities && Object.keys(twistlockLowVulnerabilities.data[0]).length > 0 || twistlockLowVulnerabilities.status === 200 ? Object.values(twistlockLowVulnerabilities.data[0]) : null}</div>
              <footer className="blockquote">
                <div className="metric-box-subtext text-muted">
              Low Severity
                </div>
              </footer>
            </blockquote>
          </div>
          : ""}
        <div className="metric-box-footertext text-muted">{Object.keys(twistlockHighVulnerabilities.data[0]).length > 0 ? "Source: TwistLock" : ""}</div>

        <div className="metric-box p-3 mt-0 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{sonarBugs && Object.keys(sonarBugs.data[0]) || sonarBugs.status === 200 ? Object.values(sonarBugs.data[0]) : null}</div>
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

SecOpsCounts.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default SecOpsCounts;