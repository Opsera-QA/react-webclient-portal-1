import React from "react";
import PropTypes from "prop-types";
import BugsCountLineChart from "../../charts/BugsCountLineChart";
import NewBugsCountLineChart from "../../charts/NewBugsCountLineChart";
import ReliabilityRatingLineChart from "../../charts/ReliabilityRatingLineChart";
import ReliabilityRemediationEffortLineChart from "../../charts/ReliabilityRemediationEffortLineChart";

function ReliabilityMetricsCharts( { persona, date } ) {  
  return (
    <>
      <div className="d-flex">
        <div className="align-self-stretch p-2 w-100">
          <BugsCountLineChart persona={persona} date={date} />
        </div>
        <div className="align-self-stretch p-2 w-100">
          <NewBugsCountLineChart persona={persona} date={date} />
        </div>
      </div>
      <div className="d-flex">
        <div className="align-self-stretch p-2 w-100">
          <ReliabilityRatingLineChart persona={persona} date={date} />
        </div>
        <div className="align-self-stretch p-2 w-100">
          <ReliabilityRemediationEffortLineChart persona={persona} date={date} />
        </div>
      </div>
    </>
  );
}

ReliabilityMetricsCharts.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object
};


export default ReliabilityMetricsCharts;