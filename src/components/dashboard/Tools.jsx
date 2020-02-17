import React, { useState, useEffect } from "react";

function ToolsDashboard() {
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    setLoading(false);
  }, []);

  return (
    <div className="h2">Tools Dashboard Here</div>
  );
}

export default ToolsDashboard;