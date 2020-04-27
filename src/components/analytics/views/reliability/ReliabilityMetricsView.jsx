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
        <div className="align-self-stretch p-2 w-100">
          <BugsCountLineChart persona={persona} />
        </div>
        <div className="align-self-stretch p-2 w-100">
          <NewBugsCountLineChart persona={persona} />
        </div>
      </div>
      <div className="d-flex">
        <div className="align-self-stretch p-2 w-100">
          <ReliabilityRatingLineChart persona={persona} />
        </div>
        <div className="align-self-stretch p-2 w-100">
          <ReliabilityRemediationEffortLineChart persona={persona} />
        </div>
      </div>
    </>
  );
}

ReliabilityMetricsCharts.propTypes = {
  persona: PropTypes.string
};


export default ReliabilityMetricsCharts;