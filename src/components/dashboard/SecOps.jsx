import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";

import SecOpsCounts from "../analytics/metrics/secOpsCounts";
import SonarMaintainabilityLineChart from "../analytics/charts/sonarMaintainabilityLineChart";
import SonarCodeSmellsLineChart from "../analytics/charts/sonarCodeSmellsLineChart";
import SonarCodeCategoriesNO_VALUEPieChart from "../analytics/charts/sonarCodeCategoriesNO_VALUEPieChart";
import SonarCodeCategoriesOKPieChart from "../analytics/charts/sonarCodeCategoriesOKPieChart";
import TwistlockVulnerability from "../analytics/charts/twistlockVulnerabilityLineChart";


function SecOpsDashboard( { persona } ) {
  const contextType = useContext(AuthContext);

  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/analytics/dashboard/secops", {}, accessToken);
    
    apiCall.get()
      .then(res => {
        let dataObject = res && res.data ? res.data.data[0] : [];
        setData(dataObject);
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
          <div className="p-2" style={{ minWidth: "180px" }}>
            <SecOpsCounts data={data} persona={persona} />
          </div>
          <div className="p-2 flex-grow-1">
            <div className="chart mb-3" style={{ height: "300px" }}>
              <TwistlockVulnerability data={data} persona={persona} />
            </div>
            <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarCodeCategoriesNO_VALUEPieChart data={data} persona={persona} />
            </div>

            <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarCodeCategoriesOKPieChart data={data} persona={persona} />
            </div>

            <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarMaintainabilityLineChart data={data} persona={persona} />
          
            </div>
            <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarCodeSmellsLineChart data={data} persona={persona} />
            </div>


          </div>
        </div>
      
      </>
    );}
}

SecOpsDashboard.propTypes = {
  persona: PropTypes.string
};

export default SecOpsDashboard;
