// Charts that are always shwon at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/loading";
import ErrorDialog from "../../../common/error";
import SummaryCountBlocksView from "../summaryCountBlocksView";
import JiraTicketsAssignedByUserBarChart from "../../charts/jiraTicketsAssignedByUserBarChart";
import JiraIssuesByPriorityBarChart from "../../charts/jiraIssuesByPriorityBarChart";
import JiraHealthBySprintBarChart from "../../charts/jiraHealthBySprintBarChart";
import JiraBurndownLineChart from "../../charts/jiraBurndownLineChart";
import JiraVelocityBarChart from "../../charts/jiraVelocityBarChart";
import JiraIssuesAssignedToMe from "../../metrics/jiraIssuesAssignedToMe";
import GitlabCommitsByRepositoryBarChart from "../../charts/gitlabCommitsByRepositoryBarChart";
import GitlabLatestCommitTable from "../../metrics/gitlabLatestCommitTable";

function PlanningView_Developer ({ persona }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countBlockData, setCountBlockData] = useState([]);
  const [data, setData] = useState([]);
  
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
          "request": "gitlabIssueOpen",
          "metric": "count"
        },
        {
          "request": "gitlabIssueClose",
          "metric": "count"
        },
        {
          "request": "gitlabIssueDifference",
          "metric": "difference"
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


  //wire up JUSt for counts block at top.  Data below is sample
  const buildSummaryCounts = (data) => {
    const { gitlabIssueOpen, gitlabIssueClose, gitlabIssueDifference } = data;

    let summaryCountsData = [];    

    if (gitlabIssueOpen.status === 200 && gitlabIssueOpen.data !== undefined) {
      summaryCountsData.push({ name: "Total Issues Created", value: gitlabIssueOpen.data[0].count, footer: "Gitlab", status: gitlabIssueOpen.data[0].count > 0 ? "danger" : "success" });
    }
    if (gitlabIssueClose.status === 200 && gitlabIssueClose.data !== undefined) {
      summaryCountsData.push({ name: "Issues Resolved", value: gitlabIssueClose.data[0].count, footer: "Gitlab", status : "success" });
    }
    if (gitlabIssueDifference.status === 200 && gitlabIssueDifference.data !== undefined) {
      summaryCountsData.push({ name: "Average Resolution Time", value: gitlabIssueDifference.data[0].difference + " hrs", footer: "Gitlab", status: gitlabIssueDifference.data[0].difference > 5 ? "warning" : "success" });
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
            <JiraTicketsAssignedByUserBarChart persona={persona} />
          </div>
          <div className="align-self-stretch p-2 w-100">
            <JiraIssuesByPriorityBarChart persona={persona} />
          </div>

        </div>

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <JiraHealthBySprintBarChart persona={persona} />
          </div>
          
          <div className="align-self-stretch p-2 w-100">
            <JiraBurndownLineChart persona={persona} />
          </div>
        </div>
        
        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <JiraVelocityBarChart persona={persona} />
          </div>
          <div className="align-self-stretch p-2 w-100">
 
            <JiraIssuesAssignedToMe persona={persona}/> 
          </div>
        </div>

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <GitlabCommitsByRepositoryBarChart persona={persona} />
          </div>
        </div>

        <GitlabLatestCommitTable />
      </>
    );}




}


PlanningView_Developer.propTypes = {
  persona: PropTypes.string
};

export default PlanningView_Developer;