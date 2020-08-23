import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/status_notifications/loading";
import InfoDialog from "../common/status_notifications/info";
import ErrorDialog from "../common/status_notifications/error";
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
    console.log(Object.values(data));
    return (<LoadingDialog size="lg" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else if (data === undefined || Object.keys(data).length == 0 || Object.values(data).every(element => Object.keys(element.data[0]).length === 0) 
  || Object.values(data).every(element => element.status !== 200)) {
    return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  } else {
    console.log(Object.values(data));
    return (
      <>
        <div className="d-flex">
          <div className="p-2" style={{ minWidth: "180px" }}>
            <SecOpsCounts data={data} persona={persona} />
          </div>
          <div className="p-2 flex-grow-1">

            {Object.keys(data.twistlockVulStatusHigh.data[0]).length > 0 && data.twistlockVulStatusHigh.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <TwistlockVulnerability data={data} persona={persona} />
            </div> : ""}

            {Object.keys(data.sonarCodeCategoriesNO_VALUE.data[0]).length > 0 && data.sonarCodeCategoriesNO_VALUE.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarCodeCategoriesNO_VALUEPieChart data={data} persona={persona} />
            </div> : ""}

            {Object.keys(data.sonarCodeCategoriesOK.data[0]).length > 0 && data.sonarCodeCategoriesOK.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarCodeCategoriesOKPieChart data={data} persona={persona} />
            </div> : ""}

            {Object.keys(data.sonarMaintainability.data[0]).length > 0 && data.sonarMaintainability.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarMaintainabilityLineChart data={data} persona={persona} />
            </div> : ""}

            {Object.keys(data.sonarCodeSmells.data[0]).length > 0 && data.sonarCodeSmells.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarCodeSmellsLineChart data={data} persona={persona} />
            </div> : ""}


          </div>
        </div>
      
      </>
    );}
}

SecOpsDashboard.propTypes = {
  persona: PropTypes.string
};

export default SecOpsDashboard;
