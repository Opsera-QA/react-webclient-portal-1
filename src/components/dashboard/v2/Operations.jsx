import React, { useEffect } from "react";
import PropTypes from "prop-types";
import TimeToRestoreBarChart from "../../analytics/charts/timeToRestoreBarChart.jsx";


function OperationsDashboard({ persona }) {
  
  useEffect( () => {
    console.log("Persona: ", persona);
  }, [persona]);
  
  return (
    <>
      <div className="p-2 flex-grow-1">
        <div className="chart mb-3" style={{ height: "300px" }}>
          <TimeToRestoreBarChart persona={persona}/>
        </div>
      </div>
      
    </>
  );
}

OperationsDashboard.propTypes = {
  persona: PropTypes.string
};


export default OperationsDashboard;