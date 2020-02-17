import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BuildCounts from "./buildCounts";
import DemoLineChart from "../analytics/charts/demoLineChart";
import DemoBarChart from "../analytics/charts/demoBarChart";


function PipelineDashboard( { personaView } ) {
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState(personaView);

  useEffect( () => {
    setLoading(false);
    console.log("Persona: ", persona);
  }, [personaView]);


  // Persona is not currently passed down into components yet
  return (
    <div className="d-flex">
      <div className="p-2" style={{ minWidth: "140px" }}>
        <BuildCounts />
      </div>
      <div className="p-2 flex-grow-1">
        <div className="chart mb-3" style={{ height: "300px" }}>
          <DemoLineChart />
        </div>
        <div className="chart" style={{ height: "300px" }}>
          <DemoBarChart />
        </div>
      </div>
    </div>
  );
}

PipelineDashboard.propTypes = {
  persona: PropTypes.string
};


export default PipelineDashboard;