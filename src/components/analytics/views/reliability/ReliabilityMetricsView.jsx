import React from "react";
import PropTypes from "prop-types";
import BugsCountLineChart from "../../charts/BugsCountLineChart";
import NewBugsCountLineChart from "../../charts/NewBugsCountLineChart";
import ReliabilityRatingLineChart from "../../charts/ReliabilityRatingLineChart";
import ReliabilityRemediationEffortLineChart from "../../charts/ReliabilityRemediationEffortLineChart";

function ReliabilityMetricsCharts( { persona } ) {  
  return (
    <>
      <div className="d-flex">
        <div className="p-2 flex-grow-1">
          <div className="chart mb-3" style={{ height: "300px" }}>
            {/* bugs chart */}
            <BugsCountLineChart persona={persona} />
          </div>
          <div className="chart mb-3" style={{ height: "300px" }}>
            {/* new bugs chart */}
            <NewBugsCountLineChart persona={persona} />
          </div>
          <div className="chart mb-3" style={{ height: "300px" }}>
            {/* reliability_rating */}
            <ReliabilityRatingLineChart persona={persona} />
          </div>
          <div className="chart mb-3" style={{ height: "300px" }}>
            {/* reliability_remediation_effort */}
            <ReliabilityRemediationEffortLineChart persona={persona} />
          </div>
        </div> 
      </div>
    </>
  );
}

ReliabilityMetricsCharts.propTypes = {
  persona: PropTypes.string
};


export default ReliabilityMetricsCharts;