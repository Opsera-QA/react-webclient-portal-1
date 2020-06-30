// Charts that are always shwon at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/loading";
import ErrorDialog from "../../../common/error";
import SummaryCountBlocksView from "../summaryCountBlocksView";
import JenkinsBuildDurationBarChart from "../../charts/jenkinsBuildDurationBarChart";
import JenkinsBuildsByUserBarChart from "../../charts/jenkinsBuildsByUserBarChart";
import JenkinsStatusByJobNameBarChart from "../../charts/jenkinsStatusByJobNameBarChart";
import DeploymentFrequencyLineChart from "../../charts/deploymentFrequencyLineChart.jsx";
import RecentBuildsTable from "../../metrics/recentBuildsTable.jsx";



function BuildView_Developer ({ persona, date }) {
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
  }, [date]);

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
        }
      ],
      startDate: date.start, 
      endDate: date.end
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
      summaryCountsData.push({ name: "Failed Builds", value: jenkinsBuildFailure.data[0].count, footer: "", status: jenkinsBuildFailure.data[0].count > 0 ? "danger" : null });
    }
    if (jenkinsBuildAborted.status === 200 && jenkinsBuildAborted.data !== undefined) {
      summaryCountsData.push({ name: "Aborted Builds", value: jenkinsBuildAborted.data[0].count, footer: "", status: jenkinsBuildAborted.data[0].count > 0 ? "warning" : null });
    }    
    if (jenkinsDeploySuccess.status === 200 && jenkinsDeploySuccess.data !== undefined) {     
      summaryCountsData.push({ name: "Successful Deployments", value: jenkinsDeploySuccess.data[0].count, footer: "", status: jenkinsDeploySuccess.data[0].count > 0 ? "success" : null });
    }
    if (jenkinsDeployFailure.status === 200 && jenkinsDeployFailure.data !== undefined) {
      summaryCountsData.push({ name: "Failed Deployments", value: jenkinsDeployFailure.data[0].count, footer: "", status: jenkinsDeployFailure.data[0].count > 0 ? "danger" : null });
    }
    if (codeshipBuildSuccess.status === 200 && codeshipBuildSuccess.data !== undefined) {
      summaryCountsData.push({ name: "CodeShip Success", value: codeshipBuildSuccess.data[0].count, footer: "", status: codeshipBuildSuccess.data[0].count > 0 ? "success" : null });
    }
    if (codeshipBuildFailure.status === 200 && codeshipBuildFailure.data !== undefined) {
      summaryCountsData.push({ name: "CodeShip Failed", value: codeshipBuildFailure.data[0].count, footer: "", status: codeshipBuildFailure.data[0].count > 0 ? "danger" : "success" });
    }
    if (codeshipBuildStopped.status === 200 && codeshipBuildStopped.data !== undefined) {
      summaryCountsData.push({ name: "CodeShip Stopped", value: codeshipBuildStopped.data[0].count, footer: "", status: codeshipBuildFailure.data[0].count > 0 ? "success": null });
    }

    
    return summaryCountsData;
  };


  if(loading) {
    return (<LoadingDialog />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else {
    return (
      <>
        <SummaryCountBlocksView data={countBlockData} />
        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <JenkinsBuildsByUserBarChart persona={persona} date={date}/>
          </div>

          <div className="align-self-stretch p-2 w-100">
            <JenkinsBuildDurationBarChart persona={persona} date={date} />
          </div>
        </div>

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <JenkinsStatusByJobNameBarChart persona={persona} date={date}/>
          </div>
          <div className="align-self-stretch p-2 w-100">
            <DeploymentFrequencyLineChart persona={persona} date={date}/>            
          </div>
        </div>

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <RecentBuildsTable persona={persona} date={date}/>
          </div>
        </div>

      </>
    );}




}


BuildView_Developer.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object
};

export default BuildView_Developer;