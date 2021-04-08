// Charts that are always shwon at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/status_notifications/loading";
import ErrorDialog from "../../../common/status_notifications/error";
import SummaryCountBlocksView from "../SummaryCountBlocksView";
import JiraTicketsAssignedByUserBarChart from "../../charts/JiraTicketsAssignedByUserBarChart";
import JiraIssuesByPriorityBarChart from "../../charts/JiraIssuesByPriorityBarChart";
import JiraHealthBySprintBarChart from "../../charts/JiraHealthBySprintBarChart";
import JiraBurndownLineChart from "../../charts/jiraBurndownLineChart";
import JiraVelocityBarChart from "../../charts/jiraVelocityBarChart";
import JiraIssuesAssignedToMe from "../../metrics/jiraIssuesAssignedToMe";
import GitlabCommitsByRepositoryBarChart from "../../charts/gitlabCommitsByRepositoryBarChart";
import GitlabLatestCommitTable from "../../metrics/gitlabLatestCommitTable";
import InfoDialog from "../../../common/status_notifications/info";
import { Row } from "react-bootstrap";




function PlanningView_Developer ({ persona, date, index }) {
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
  }, [date, persona, index]);

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
      (gitlabIssueDifference.data[0].difference) ? summaryCountsData.push({ name: "Average Resolution Time (hrs)", value: gitlabIssueDifference.data[0].difference, footer: "Gitlab", status: gitlabIssueDifference.data[0].difference > 5 ? "warning" : "success" }) : console.log("time filter active");
    }
    
    return summaryCountsData;
  };

  if(loading) {
    return (<LoadingDialog />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else if (!index.includes("jira") && !index.includes("gitlab")) {
    return (
      <div className="mt-3 bordered-content-block p-3 max-content-width" style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}> 
        <Row>
          <InfoDialog message="No activity data has been captured for this dashboard. In order to activate planning metrics contact support@opsera.io" />
        </Row>
      </div>
    );
  } else {
    return (
      <>
        <SummaryCountBlocksView data={countBlockData} />

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <JiraTicketsAssignedByUserBarChart persona={persona} date={date} />
          </div>
          <div className="align-self-stretch p-2 w-100">
            <JiraIssuesByPriorityBarChart persona={persona} date={date} />
          </div>
        </div>
        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <JiraHealthBySprintBarChart persona={persona} date={date} />
          </div>
          
          <div className="align-self-stretch p-2 w-100">
            <JiraBurndownLineChart persona={persona} date={date} />
          </div>
        </div>
        
        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <JiraVelocityBarChart persona={persona} date={date} />
          </div>
          <div className="align-self-stretch p-2 w-100"> 
            <JiraIssuesAssignedToMe persona={persona}/> 
          </div>
        </div>

        {/* <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <GitlabCommitsByRepositoryBarChart persona={persona} />
          </div>
        </div> */}

        {/* <GitlabLatestCommitTable /> */}
      </>
    );
  }
}


PlanningView_Developer.propTypes = {
  persona: PropTypes.string
};

export default PlanningView_Developer;