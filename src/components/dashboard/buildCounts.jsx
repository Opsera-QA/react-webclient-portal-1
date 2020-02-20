import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ErrorDialog from "../common/error";

function BuildCounts( { data, persona } ) {
  useEffect( () => {
   
  }, [data, persona]);
 
  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="Missing Data!" />);
  } else {
    return (
      <div className="d-flex flex-column mb-3">
        <div className="metric-box p-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{data.successfulBuilds.data[0]}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Successful Builds
              </div>
            </footer>
          </blockquote>
        </div>  
        
        <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{data.failedBuilds.data[0]}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Failed Builds
              </div>
            </footer>
          </blockquote>
        </div>
        
        <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{data.successfulDeployments.data[0]}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Successful Deployments
              </div>
            </footer>
          </blockquote>
        </div>

        <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{data.failedDeployments.data[0]}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Failed Deployments
              </div>
            </footer>
          </blockquote>
        </div>
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
