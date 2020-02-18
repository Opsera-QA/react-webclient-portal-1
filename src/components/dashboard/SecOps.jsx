import React, { useState, useEffect } from "react";
import SecOpsCounts from "./secOpsCounts";

function SecOpsDashboard() {
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    setLoading(false);
  }, []);

  return (
    <div className="d-flex">
      <div className="h2">SecOps Dashboard Here</div>
      <div className="p-2" style={{ minWidth: "140px" }}>
        <SecOpsCounts />
      </div>
    </div>
  );
}

export default SecOpsDashboard;
