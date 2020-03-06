import React from "react";
import PropTypes from "prop-types";
import ErrorDialog from "../../common/error";

// eslint-disable-next-line no-unused-vars
function BuildCounts( { data, persona } ) {
  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="Missing Data!" />);
  } else {
    const { successfulBuilds, failedBuilds, successfulDeployments, failedDeployments, codeshipSuccess, codeshipFailed } = data;
    return (
      <div className="d-flex flex-column mb-3">
        <div className="metric-box p-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{successfulBuilds ? successfulBuilds.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Successful Builds
              </div>
            </footer>
          </blockquote>
        </div>  
        
        <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (failedBuilds && failedBuilds.data[0] > 0 ? "red" : null)}>
              {failedBuilds ? failedBuilds.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Failed Builds
              </div>
            </footer>
          </blockquote>
        </div>
        
        <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{successfulDeployments ? successfulDeployments.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Successful Deployments
              </div>
            </footer>
          </blockquote>
        </div>

        <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (failedDeployments && failedDeployments.data[0] > 0 ? "red" : null)}>
              {failedDeployments ? failedDeployments.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Failed Deployments
              </div>
            </footer>
          </blockquote>
        </div>
        {codeshipSuccess ?
          <div className="metric-box p-3 mt-3 text-center">
            <blockquote className="blockquote mb-0 ">
              <div className="box-metric">{codeshipSuccess ? codeshipSuccess.data[0] : null}</div>
              <footer className="blockquote">
                <div className="metric-box-subtext text-muted">
            Codeship Success
                </div>
              </footer>
            </blockquote>
          </div>
          : ""
        }

        {codeshipFailed ?
          <div className="metric-box p-3 mt-3 text-center">
            <blockquote className="blockquote mb-0 ">
              <div className={"box-metric " + (codeshipFailed && codeshipFailed.data[0] > 0 ? "red" : null)}>
                {codeshipFailed ? codeshipFailed.data[0] : null}</div>
              <footer className="blockquote">
                <div className="metric-box-subtext text-muted">
            Codeship Failed
                </div>
              </footer>
            </blockquote>
          </div>
          : ""
        }

        <div className="metric-box-footertext text-muted">Source: Jenkins</div>
      </div>
    );
  }
}

BuildCounts.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};


export default BuildCounts;
