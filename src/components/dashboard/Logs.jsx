import React, { useState, useEffect } from "react";

function LogsDashboard() {
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    setLoading(false);
  }, []);

  return (
    <div style={{ height: "540px" }}>
      <div className="row h-100">
        <div className="col-sm-12 my-auto text-center">
          <div className="h6">Logs Dashboard Coming Soon</div>
        </div>
      </div>
    </div>
    
  );
}

export default LogsDashboard;