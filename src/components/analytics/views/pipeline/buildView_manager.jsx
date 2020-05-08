// Charts that are always shwon at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/loading";
import ErrorDialog from "../../../common/error";
import InfoDialog from "../../../common/info";
import SummaryCountBlocksView from "../summaryCountBlocksView";
import JenkinsBuildDurationBarChart from "../../charts/jenkinsBuildDurationBarChart";
import JenkinsBuildsByUserBarChart from "../../charts/jenkinsBuildsByUserBarChart";
import JenkinsStatusByJobNameBarChart from "../../charts/jenkinsStatusByJobNameBarChart";
import DeploymentFrequencyLineChart from "../../charts/deploymentFrequencyLineChart.jsx";
import RecentBuildsTable from "../../metrics/recentBuildsTable.jsx";


function BuildView_Manager({ persona }) {
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
    const apiUrl = "/analytics/data";   
    const postBody = {
      "data": [
        {
          "request": "jenkinsBuildSuccess",
          "metric": "count"
        },
        {
          "request": "jenkinsBuildFailure",
          "metric": "count"
        },
        {
          "request": "jenkinsBuildAborted",
          "metric": "count"
        },
        {
          "request": "jenkinsDeploySuccess",
          "metric": "count"
        },
        {
          "request": "jenkinsDeployFailure",
          "metric": "count"
        },
        {
          "request": "codeshipBuildSuccess",
          "metric": "count"
        },
        {
          "request": "codeshipBuildFailure",
          "metric": "count"
        },
        {
          "request": "codeshipBuildStopped",
          "metric": "count"
        },
        {
          "request": "jenkinsBuildsByUser",
          "metric": "bar"
        },
        {
          "request": "jenkinsBuildDuration",
          "metric": "bar"
        },
        {
          "request": "jenkinsStatusByJobName",
          "metric": "bar"
        }
      ]
    };
    
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);     
      let dataObject = res && res.data ? res.data.data[0] : [];
      setData(dataObject);
      const countsData = buildSummaryCounts(dataObject);
      setCountBlockData(countsData);
      setLoading(false);
    }
    catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }

  
  const buildSummaryCounts = (data) => {
    const { jenkinsBuildSuccess, jenkinsBuildFailure, jenkinsBuildAborted, jenkinsDeploySuccess, jenkinsDeployFailure, codeshipBuildSuccess, codeshipBuildFailure, codeshipBuildStopped } = data;

    let summaryCountsData = [];    

    if (jenkinsBuildSuccess.status === 200 && jenkinsBuildSuccess.data !== undefined) {
      summaryCountsData.push({ name: "Successful Builds", value: jenkinsBuildSuccess.data[0].count, footer: "", status: "success" });
    }
    if (jenkinsBuildFailure.status === 200 && jenkinsBuildFailure.data !== undefined) {
      summaryCountsData.push({ name: "Failed Builds", value: jenkinsBuildFailure.data[0].count, footer: "", status: jenkinsBuildFailure.data[0].count > 0 ? "danger" : "success" });
    }
    if (jenkinsBuildAborted.status === 200 && jenkinsBuildAborted.data !== undefined) {
      summaryCountsData.push({ name: "Aborted Builds", value: jenkinsBuildAborted.data[0].count, footer: "", status: jenkinsBuildAborted.data[0].count > 0 ? "warning" : "success" });
    }
    if (jenkinsDeploySuccess.status === 200 && jenkinsDeploySuccess.data !== undefined) {
      summaryCountsData.push({ name: "Successful Deployments", value: jenkinsDeploySuccess.data[0].count, footer: "", status: "success" });
    }
    if (jenkinsDeployFailure.status === 200 && jenkinsDeployFailure.data !== undefined) {
      summaryCountsData.push({ name: "Failed Deployments", value: jenkinsDeployFailure.data[0].count, footer: "", status: jenkinsDeployFailure.data[0].count > 0 ? "danger" : "success" });
    }
    if (codeshipBuildSuccess.status === 200 && codeshipBuildSuccess.data !== undefined) {
      summaryCountsData.push({ name: "CodeShip Success", value: codeshipBuildSuccess.data[0].count, footer: "", status: "success" });
    }
    if (codeshipBuildFailure.status === 200 && codeshipBuildFailure.data !== undefined) {
      summaryCountsData.push({ name: "CodeShip Failed", value: codeshipBuildFailure.data[0].count, footer: "", status: codeshipBuildFailure.data[0].count > 0 ? "danger" : "success" });
    }
    if (codeshipBuildStopped.status === 200 && codeshipBuildStopped.data !== undefined) {
      summaryCountsData.push({ name: "CodeShip Stopped", value: codeshipBuildStopped.data[0].count, footer: "", status: "success" });
    }

    
    return summaryCountsData;
  };


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
            <DeploymentFrequencyLineChart persona={persona}/>            
          </div>
        </div>


        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <RecentBuildsTable persona={persona} />
          </div>
        </div>

      </>
    );}




}


BuildView_Manager.propTypes = {
  persona: PropTypes.string
};

export default BuildView_Manager;