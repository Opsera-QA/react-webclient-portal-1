import React, { useState, useEffect } from "react";
import BuildCounts from "./buildCounts";
import DemoLineChart from "../analytics/charts/demoLineChart";
import DemoBarChart from "../analytics/charts/demoBarChart";


function PipelineDashboard() {
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    setLoading(false);
  }, []);

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

export default PipelineDashboard;