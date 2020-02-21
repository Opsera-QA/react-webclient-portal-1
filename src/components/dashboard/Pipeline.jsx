import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import BuildCounts from "./buildCounts";
import { AuthContext } from "../../contexts/AuthContext";
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";

import AvgBuildDurationBarChart from "../analytics/charts/avgBuildDurationBarChart";
import BuildsByUserBarChart from "../analytics/charts/buildsByUserBarChart";
import AvgBuildsByUserBarChart from "../analytics/charts/avgBuildsByUserBarChart";

function PipelineDashboard( { persona } ) {
  const contextType = useContext(AuthContext);

  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/analytics/dashboard/pipeline", {}, accessToken);
    
    apiCall.get()
      .then(res => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        setErrors(err);
        setLoading(false);
      });
  };

  useEffect( () => {
    getApiData();
  }, []);

  if(loading) {
    return (<LoadingDialog size="lg" />);
  } else if (typeof data !== "object" || Object.keys(data).length == 0 || error) {
    return (<ErrorDialog  error={error ? error : "Missing Data!"} />);
  } else {
    return (
      <>
        <div className="d-flex">
          <div className="p-2" style={{ minWidth: "160px" }}>
            <BuildCounts data={data} persona={persona} />
          </div>
          <div className="p-2 flex-grow-1">
            <div className="chart mb-3" style={{ height: "300px" }}>
              <BuildsByUserBarChart data={data} persona={persona} />
            </div>
            <div className="chart mb-3" style={{ height: "300px" }}>
              <AvgBuildDurationBarChart data={data} persona={persona} />
            </div>
            <div className="chart mb-3" style={{ height: "300px" }}>
              <AvgBuildsByUserBarChart data={data} persona={persona} />
            </div>
          </div>
        </div>
      </>
    );}
}

PipelineDashboard.propTypes = {
  persona: PropTypes.string
};


export default PipelineDashboard;