import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";
import InfoDialog from "../../common/info";
import BuildCounts from "../../analytics/metrics/buildCounts";
import JenkinsBuildDurationBarChart from "../../analytics/charts/jenkinsBuildDurationBarChart";
import JenkinsBuildsByUserBarChart from "../../analytics/charts/jenkinsBuildsByUserBarChart";
import JenkinsStatusByJobNameBarChart from "../../analytics/charts/jenkinsStatusByJobNameBarChart";
import DeploymentFrequencyLineChart from "../../analytics/charts/deploymentFrequencyLineChart.jsx";


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

  console.log("Rendering Pipeline V2 Charts for persona", persona);

  if(loading) {
    return (<LoadingDialog size="lg" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else if (data === undefined || Object.keys(data).length == 0 || Object.values(data).every(element => Object.keys(element.data[0]).length === 0)
  || Object.values(data).every(element => element.status !== 200)) {
    return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  } else {
    return (
      <>
        <div className="d-flex">
          <div className="p-2" style={{ minWidth: "160px" }}>
            <BuildCounts data={data} persona={persona} />
          </div>
          <div className="p-2 flex-grow-1">
            {Object.keys(data.jenkinsBuildsByUser.data[0]).length > 0 && data.jenkinsBuildsByUser.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <JenkinsBuildsByUserBarChart data={data} persona={persona} />
            </div> : ""}
            {Object.keys(data.jenkinsBuildDuration.data[0]).length > 0 && data.jenkinsBuildDuration.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <JenkinsBuildDurationBarChart data={data} persona={persona} />
            </div> : ""}
            {Object.keys(data.jenkinsStatusByJobName.data[0]).length > 0 && data.jenkinsStatusByJobName.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <JenkinsStatusByJobNameBarChart data={data} persona={persona} />
            </div> : ""}
            {/* <div className="chart mb-3" style={{ height: "300px" }}>
              <DeploymentFrequencyLineChart persona={persona}/>
            </div> */}
          </div> 
        </div>
      </>
    );}
}

PipelineDashboard.propTypes = {
  persona: PropTypes.string
};


export default PipelineDashboard;
