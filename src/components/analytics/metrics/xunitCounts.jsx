import React from "react";
import PropTypes from "prop-types";
import ErrorDialog from "../../common/error";

// eslint-disable-next-line no-unused-vars
function XUnitCounts( { data, persona } ) {
  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="Missing Data!" />);
  } else {
    const { xunitExecuted, xunitSkipped, xunitPassed, xunitFailed, xunitError, xunitNotRunnable, xunitWarning } = data;
    return (
      <div className="d-flex flex-column mb-3">
        <div className="metric-box p-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{xunitExecuted ? xunitExecuted.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Tests Executed
              </div>
            </footer>
          </blockquote>
        </div>  
 
        {/* <div className="metric-box p-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{xunitNotRunnable ? xunitNotRunnable.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Tests Not Runnable
              </div>
            </footer>
          </blockquote>
        </div>   */} 
        
        <div className="metric-box p-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{xunitPassed ? xunitPassed.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Tests Passed
              </div>
            </footer>
          </blockquote>
        </div> 

        <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (xunitFailed && xunitFailed.data[0] > 0 ? "red" : null)}>
              {xunitFailed ? xunitFailed.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Tests Failed
              </div>
            </footer>
          </blockquote>
        </div>

        <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (xunitWarning && xunitWarning.data[0] > 0 ? "yellow" : null)}>
              {xunitFailed ? xunitFailed.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Tests Warning
              </div>
            </footer>
          </blockquote>
        </div>

        <div className="metric-box p-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{xunitSkipped ? xunitSkipped.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Tests Skipped
              </div>
            </footer>
          </blockquote>
        </div> 
        
        {/* <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (xunitError && xunitError.data[0] > 0 ? "red" : null)}>
              {xunitFailed ? xunitFailed.data[0] : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Tests Errored
              </div>
            </footer>
          </blockquote>
        </div> */}

        <div className="metric-box-footertext text-muted">Source: XUnit</div>
      </div>
    );
  }
}

XUnitCounts.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};


export default XUnitCounts;
