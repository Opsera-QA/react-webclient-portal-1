import React from "react";
import PropTypes from "prop-types";
import ErrorDialog from "../../common/error";

// eslint-disable-next-line no-unused-vars
function TestingCounts( { data, persona } ) {
  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="No Data Present in the ES!" />);
  } else {
    const { xunitExecuted, xunitSkipped, xunitPassed, xunitFailed, xunitError, xunitNotRunnable, xunitWarning } = data;
    return (
      <div className="d-flex flex-column mb-3">
        <div className="metric-box p-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{xunitExecuted && Object.keys(xunitExecuted.data[0]).length > 0 || xunitExecuted.status === 200 ? Object.values(xunitExecuted.data[0]) : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Tests Executed
              </div>
            </footer>
          </blockquote> 
        
          <blockquote className="blockquote mb-0 ">
          
            <div className={"box-metric " + (xunitPassed && Object.keys(xunitPassed.data[0]).length > 0 && Object.keys(xunitExecuted.data[0]).length > 0 && xunitPassed.data[0]/xunitExecuted.data[0]*100 > 80 ? "green" : "red" )}>
              {xunitPassed || Object.keys(xunitPassed.data[0]).length > 0 || xunitPassed.status === 200 ? (xunitPassed.data[0]/xunitExecuted.data[0])*100 + "%" : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Pass Percentage
              </div>
            </footer>
          </blockquote>
          
        </div> 
        <div className="metric-box-footertext text-muted">Source: XUnit</div>
        
        <div className="metric-box p-3 mt-3 text-center">
          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (xunitFailed && Object.keys(xunitFailed.data[0]).length > 0 ? "red" : null)}>
              {xunitFailed && Object.keys(xunitFailed.data[0]).length > 0 || xunitFailed.status === 200 ? Object.values(xunitFailed.data[0]) : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Tests Failed
              </div>
            </footer>
          </blockquote>

        
          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (xunitWarning && Object.keys(xunitWarning.data[0]).length > 0 ? "yellow" : null)}>
              {xunitFailed && Object.keys(xunitFailed.data[0]).length > 0 || xunitFailed.status === 200 ? Object.values(xunitFailed.data[0]) : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Tests Warning
              </div>
            </footer>
          </blockquote>
        

        
          <blockquote className="blockquote mb-0 ">
            <div className="box-metric">{xunitSkipped && Object.keys(xunitSkipped.data[0]).length > 0 || xunitSkipped.status === 200 ? Object.values(xunitSkipped.data[0]) : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
              Tests Skipped
              </div>
            </footer>
          </blockquote>

          <blockquote className="blockquote mb-0 ">
            <div className={"box-metric " + (xunitError && Object.keys(xunitError.data[0]).length > 0 ? "red" : null)}>
              {xunitError  && Object.keys(xunitError.data[0]).length > 0 || xunitError.status === 200 ? Object.values(xunitError.data[0]) : null}</div>
            <footer className="blockquote">
              <div className="metric-box-subtext text-muted">
            Tests Errored
              </div>
            </footer>
          </blockquote>
        
        </div> 

        <div className="metric-box-footertext text-muted">Source: XUnit</div>
      </div>
    );
  }
}

TestingCounts.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};


export default TestingCounts;
