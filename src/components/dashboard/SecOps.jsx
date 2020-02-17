import React, { useState, useEffect } from "react";

function SecOpsDashboard() {
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    setLoading(false);
  }, []);

  return (
    <div className="h2">SecOps Dashboard Here</div>
  );
}

export default SecOpsDashboard;