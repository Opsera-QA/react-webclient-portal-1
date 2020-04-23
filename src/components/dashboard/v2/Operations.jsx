import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import TimeToRestoreBarChart from "../../analytics/charts/timeToRestoreBarChart.jsx";


function OperationsDashboard({ persona }) {
  const contextType = useContext(AuthContext);
  const [token, setToken] = useState();
  
  const getApiData = async () => {
    const { getAccessToken } = contextType;

    const accessToken = await getAccessToken();
    setToken(accessToken);
    
  };

  useEffect( () => {
    getApiData();
  }, []);
  
  return (
    <>
      <div className="p-2 flex-grow-1">
        <div className="chart mb-3" style={{ height: "300px" }}>
          <TimeToRestoreBarChart token={token} persona={persona}/>
        </div>
      </div>
      
    </>
  );
}

export default OperationsDashboard;