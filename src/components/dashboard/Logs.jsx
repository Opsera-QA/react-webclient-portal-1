import React, { useState, useEffect } from "react";

function LogsDashboard() {
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    setLoading(false);
  }, []);

  return (
    <div className="h2">Logs Dashboard Here</div>
  );
}

export default LogsDashboard;