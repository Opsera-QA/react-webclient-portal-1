// Charts that are always shwon at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";
import InfoDialog from "../../common/info";
import SummaryCountBlocksView from "./summaryCountBlocksView";
import JenkinsBuildDurationBarChart from "../charts/jenkinsBuildDurationBarChart";
import JenkinsBuildsByUserBarChart from "../charts/jenkinsBuildsByUserBarChart";
import JenkinsStatusByJobNameBarChart from "../charts/jenkinsStatusByJobNameBarChart";
import DeploymentFrequencyLineChart from "../charts/deploymentFrequencyLineChart.jsx";



function SummaryChartsView({ persona }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countBlockData, setCountBlockData] = useState([]);
  

  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
        
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, []);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/dashboard/pipeline";   
    
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);      
      let dataObject = res && res.data ? res.data.data[0] : [];
      setData(dataObject);

      //const { jenkinsBuildSuccess, jenkinsBuildFailure, jenkinsBuildAborted, jenkinsDeploySuccess, jenkinsDeployFailure, codeshipBuildSuccess, codeshipBuildFailure, codeshipBuildStopped } = data;


      let testData = [
        { name: "Successful Builds", value: "694", footer: "Jenkins", status: "success" },
        { name: "Failed Builds", value: "49", footer: "Jenkins", status: "danger" },
        { name: "Aborted Builds", value: "1", footer: "Jenkins", status: "success" },
        { name: "Successful Deployments", value: "0", footer: "Jenkins", status: "warning" },
        { name: "Failed Deployments", value: "96", footer: "Jenkins", status: "danger" },
      ];
      //build counts block
      setCountBlockData(testData);

      setLoading(false);
    }
    catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }


  if(loading) {
    return (<LoadingDialog />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else if (data === undefined || Object.keys(data).length == 0 || Object.values(data).every(element => Object.keys(element.data[0]).length === 0)
  || Object.values(data).every(element => element.status !== 200)) {
    return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  } else {
    return (
      <>
        <SummaryCountBlocksView data={countBlockData} />

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            {Object.keys(data.jenkinsBuildsByUser.data[0]).length > 0 && data.jenkinsBuildsByUser.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <JenkinsBuildsByUserBarChart data={data} persona={persona} />
            </div> : ""}
          </div>
          <div className="align-self-stretch p-2 w-100">
            {Object.keys(data.jenkinsBuildDuration.data[0]).length > 0 && data.jenkinsBuildDuration.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <JenkinsBuildDurationBarChart data={data} persona={persona} />
            </div> : ""}
          </div>
        </div>

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            {Object.keys(data.jenkinsStatusByJobName.data[0]).length > 0 && data.jenkinsStatusByJobName.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <JenkinsStatusByJobNameBarChart data={data} persona={persona} />
            </div> : ""}
          </div>
          <div className="align-self-stretch p-2 w-100">
            <div className="chart mb-3" style={{ height: "300px" }}>
              <DeploymentFrequencyLineChart persona={persona}/>
            </div>
          </div>
        </div>
      </>
    );}




}


SummaryChartsView.propTypes = {
  persona: PropTypes.string
};

export default SummaryChartsView;