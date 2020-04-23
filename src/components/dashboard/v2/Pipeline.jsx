import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SummaryChartsView from "../../analytics/views/summaryChartsView";

function PipelineDashboard( { persona } ) {

  useEffect(() => {
    console.log("Rendering Pipeline V2 Charts for persona", persona);
  }, [persona]);

  return (
    <>
      <div>
        <SummaryChartsView persona={persona} />
      </div>    
    </>
  );
}

PipelineDashboard.propTypes = {
  persona: PropTypes.string
};


export default PipelineDashboard;
