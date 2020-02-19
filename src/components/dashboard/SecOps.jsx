import React, { useState, useEffect } from "react";
import SecOpsCounts from "./secOpsCounts";
import SonarMaintainabilityLineChart from "../analytics/charts/sonarMaintainabilityLineChart";
import SonarCodeSmellsLineChart from "../analytics/charts/sonarCodeSmellsLineChart";
import SonarCodeCategoriesPieChart from "../analytics/charts/sonarCodeCategoriesPieChart";
import SonarCodeCategoriesPieChart2 from "../analytics/charts/sonarCodeCategoriesPieChart2";
import TwistlockVulnerability from "../analytics/charts/twistlockVulnerabilityLineChart";


function SecOpsDashboard( { personaView } ) {
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState(personaView);

  useEffect( () => {
    setLoading(false);
    console.log("Persona: ", persona);
  }, [personaView]);

  return (
    <>
      <div className="d-flex">
        <div className="p-2" style={{ minWidth: "180px" }}>
          <SecOpsCounts />
        </div>
        <div className="p-2 flex-grow-1">
          <div className="chart mb-3" style={{ height: "300px" }}>
            <SonarMaintainabilityLineChart />
          
          </div>
          <div className="chart mb-3" style={{ height: "300px" }}>
            <SonarCodeSmellsLineChart />
          </div>

          <div className="chart mb-3" style={{ height: "300px" }}>
            <SonarCodeCategoriesPieChart />
          </div>

          <div className="chart mb-3" style={{ height: "300px" }}>
            <SonarCodeCategoriesPieChart2 />
          </div>

          <div className="chart mb-3" style={{ height: "300px" }}>
            <TwistlockVulnerability />
          </div>
        </div>
      </div>
      
    </>
  );
}

export default SecOpsDashboard;
