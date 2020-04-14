import React from "react";
import PropTypes from "prop-types";
import ErrorDialog from "../../common/error";

// eslint-disable-next-line no-unused-vars
function BuildCounts( { data, persona } ) {
  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="No Data Present in the ES!" />);
  } else {
    const { jenkinsBuildSuccess, jenkinsBuildFailure, jenkinsBuildAborted, jenkinsDeploySuccess, jenkinsDeployFailure, codeshipBuildSuccess, codeshipBuildFailure, codeshipBuildStopped } = data;
    return (
      <div className="d-flex flex-column mb-3">
        <div className="metric-box p-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{jenkinsBuildSuccess && Object.keys(jenkinsBuildSuccess.data[0]).length > 0 || jenkinsBuildSuccess.status === 200 ? Object.values(jenkinsBuildSuccess.data[0]) : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Successful Builds
              </div>
            </footer>
          </blockquote>
        
        
          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (jenkinsBuildFailure && Object.keys(jenkinsBuildFailure.data[0]).length > 0 ? "red" : null)}>
              {jenkinsBuildFailure && Object.keys(jenkinsBuildFailure.data[0]).length > 0 || jenkinsBuildFailure.status === 200 ? Object.values(jenkinsBuildFailure.data[0]) : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Failed Builds
              </div>
            </footer>
          </blockquote>

          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (jenkinsBuildAborted && Object.keys(jenkinsBuildAborted.data[0]).length > 0 ? "red" : null)}>
              {jenkinsBuildAborted && Object.keys(jenkinsBuildAborted.data[0]).length > 0 || jenkinsBuildAborted.status === 200 ? Object.values(jenkinsBuildAborted.data[0]) : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Aborted Builds
              </div>
            </footer>
          </blockquote>
        </div>
        <div className="metric-box-footertext text-muted">Source: Jenkins</div>
        
        
        <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{jenkinsDeploySuccess && Object.keys(jenkinsDeploySuccess.data[0]).length > 0 || jenkinsDeploySuccess.status === 200 ? Object.values(jenkinsDeploySuccess.data[0]) : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Successful Deployments
              </div>
            </footer>
          </blockquote>

          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (jenkinsDeployFailure && Object.keys(jenkinsDeployFailure.data[0]).length > 0 ? "red" : null)}>
              {jenkinsDeployFailure && Object.keys(jenkinsDeployFailure.data[0]).length > 0 || jenkinsDeployFailure.status === 200 ? Object.values(jenkinsDeployFailure.data[0]) : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Failed Deployments
              </div>
            </footer>
          </blockquote>
        </div>
        <div className="metric-box-footertext text-muted">Source: Jenkins</div>

        {codeshipBuildSuccess && Object.keys(codeshipBuildSuccess.data[0]).length > 0 ? 
          <div className="d-flex flex-column mt-3 mb-3">
            <div className="metric-box p-3 text-center">
              {codeshipBuildSuccess ?
                <blockquote className="blockquote mb-0 ">
                  <div className="box-metric">{codeshipBuildSuccess && Object.keys(codeshipBuildSuccess.data[0]).length > 0 || codeshipBuildSuccess.status === 200 ? Object.values(codeshipBuildSuccess.data[0]) : null}</div>
                  <footer className="blockquote">
                    <div className="metric-box-subtext text-muted">
            Codeship Success
                    </div>
                  </footer>
                </blockquote>
              
                : ""
              }

              {codeshipBuildFailure && Object.keys(codeshipBuildFailure.data[0]).length > 0 ?
                <blockquote className="blockquote mb-0 ">
                  <div className={"box-metric " + (codeshipBuildFailure && Object.keys(codeshipBuildFailure.data[0]).length > 0 ? "red" : null)}>
                    {codeshipBuildFailure && Object.keys(codeshipBuildFailure.data[0]).length > 0 || codeshipBuildFailure.status === 200 ? Object.values(codeshipBuildFailure.data[0]) : null}</div>
                  <footer className="blockquote">
                    <div className="metric-box-subtext text-muted">
            Codeship Failed
                    </div>
                  </footer>
                </blockquote>
              
                : ""
              } 
        
              {codeshipBuildStopped && Object.keys(codeshipBuildStopped.data[0]).length > 0 ?
                <blockquote className="blockquote mb-0 ">
                  <div className={"box-metric " + (codeshipBuildStopped && Object.keys(codeshipBuildStopped.data[0]).length > 0 ? "red" : null)}>
                    {codeshipBuildStopped && Object.keys(codeshipBuildStopped.data[0]).length > 0 || codeshipBuildStopped.status === 200 ? Object.values(codeshipBuildStopped.data[0]) : null}</div>
                  <footer className="blockquote">
                    <div className="metric-box-subtext text-muted">
            Codeship Stopped
                    </div>
                  </footer>
                </blockquote>

                : ""
              } 
            </div>
            <div className="metric-box-footertext text-muted">Source: Codeship</div>
          </div>
          : "" }
      </div>
    );
  }
}


BuildCounts.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};


export default BuildCounts;
