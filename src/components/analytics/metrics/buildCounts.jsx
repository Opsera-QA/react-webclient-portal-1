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
            <div className="box-metric">{jenkinsBuildSuccess ? jenkinsBuildSuccess.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Successful Builds
              </div>
            </footer>
          </blockquote>
        
        
          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (jenkinsBuildFailure && jenkinsBuildFailure.data[0] > 0 ? "red" : null)}>
              {jenkinsBuildFailure ? jenkinsBuildFailure.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Failed Builds
              </div>
            </footer>
          </blockquote>

          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (jenkinsBuildAborted && jenkinsBuildAborted.data[0] > 0 ? "red" : null)}>
              {jenkinsBuildAborted ? jenkinsBuildAborted.data[0] : null}</div>
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
            <div className="box-metric">{jenkinsDeploySuccess ? jenkinsDeploySuccess.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Successful Deployments
              </div>
            </footer>
          </blockquote>

          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (jenkinsDeployFailure && jenkinsDeployFailure.data[0] > 0 ? "red" : null)}>
              {jenkinsDeployFailure ? jenkinsDeployFailure.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Failed Deployments
              </div>
            </footer>
          </blockquote>
        </div>
        <div className="metric-box-footertext text-muted">Source: Jenkins</div>

        {codeshipBuildSuccess ? 
          <div className="d-flex flex-column mt-3 mb-3">
            <div className="metric-box p-3 text-center">
              {codeshipBuildSuccess ?
                <blockquote className="blockquote mb-0 ">
                  <div className="box-metric">{codeshipBuildSuccess ? codeshipBuildSuccess.data[0] : null}</div>
                  <footer className="blockquote">
                    <div className="metric-box-subtext text-muted">
            Codeship Success
                    </div>
                  </footer>
                </blockquote>
              
                : ""
              }

              {codeshipBuildFailure ?
                <blockquote className="blockquote mb-0 ">
                  <div className={"box-metric " + (codeshipBuildFailure && codeshipBuildFailure.data[0] > 0 ? "red" : null)}>
                    {codeshipBuildFailure ? codeshipBuildFailure.data[0] : null}</div>
                  <footer className="blockquote">
                    <div className="metric-box-subtext text-muted">
            Codeship Failed
                    </div>
                  </footer>
                </blockquote>
              
                : ""
              } 
        
              {codeshipBuildStopped ?
                <blockquote className="blockquote mb-0 ">
                  <div className={"box-metric " + (codeshipBuildStopped && codeshipBuildStopped.data[0] > 0 ? "red" : null)}>
                    {codeshipBuildStopped ? codeshipBuildStopped.data[0] : null}</div>
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
