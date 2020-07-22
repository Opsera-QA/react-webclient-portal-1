// Charts that are always shown at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/loading";
import ErrorDialog from "../../../common/error";
import SummaryCountBlocksView from "../summaryCountBlocksView";
import GitlabMergeRequestsByUserChart from "../../charts/GitlabMergeRequestsByUserChart";
import GitlabTimeTakenToCompleteMergeRequestReview from "../../charts/GitlabTimeTakenToCompleteMergeRequestReview";
import GitlabTimeTakenToCompleteMergeRequestReviewTable from "../../metrics/GitlabTimeTakenToCompleteMergeRequestReviewTable";
import GitlabMrTitleTimeAuthorNoOfCommits from "../../metrics/GitlabMrTitleTimeAuthorNoOfCommits";
import GitlabLastCommitToCodeByUser from "../../charts/GitlabLastCommitToCodeByUser";
import GitlabMergeReqWithMaximumTime from "../../metrics/GitlabMergeReqWithMaximumTime";
import GitlabTotalCommitsChart from "../../charts/GitlabTotalCommitsChart";
// import GitlabCommitCountByDeveloper from "../../metrics/GitlabCommitCountByDeveloper";

function SourceCodeView_developer ({ persona, date }) {
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
  }, [date, persona]);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      "data": [
        {
          "request": "gitlabTotalNumberOfBranches",
          "metric": "complexCount"
        },
        {
          "request": "gitlabTotalMergeRequestsPendingForReview",
          "metric": "complexCount"
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
    const { gitlabTotalNumberOfBranches, gitlabTotalMergeRequestsPendingForReview } = data;
    let summaryCountsData = [];    

    if (gitlabTotalNumberOfBranches.status === 200 && gitlabTotalNumberOfBranches.data !== undefined) {
      summaryCountsData.push({ name: "Branches Created", value: gitlabTotalNumberOfBranches.data[0].count, footer: "", status: "" });
    }
    if (gitlabTotalMergeRequestsPendingForReview.status === 200 && gitlabTotalMergeRequestsPendingForReview.data !== undefined) {
      summaryCountsData.push({ name: "Merge Requests Pending", value: gitlabTotalMergeRequestsPendingForReview.data[0].count, footer: "", status: gitlabTotalMergeRequestsPendingForReview.data[0].count > 0 ? "danger" : null });
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
            <GitlabMergeRequestsByUserChart persona={persona} date={date}/>
          </div>
          <div className="align-self-stretch p-2 w-100">             
            <GitlabTimeTakenToCompleteMergeRequestReview persona={persona} date={date}/>          
          </div>
        </div>
        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <GitlabTotalCommitsChart persona={persona} date={date}/>
          </div>
          <div className="align-self-stretch p-2 w-100">               
            {/* <GitlabCommitCountByDeveloper date={date}/> */}
          </div>
        </div>
        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <GitlabTimeTakenToCompleteMergeRequestReviewTable persona={persona} date={date}/>
          </div>
          <div className="align-self-stretch p-2 w-100">               
            <GitlabMrTitleTimeAuthorNoOfCommits persona={persona} date={date}/>                        
          </div>
        </div>
        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <GitlabMergeReqWithMaximumTime date={date}/>
          </div>          
        </div>
        <div className="mt-2">
          <GitlabLastCommitToCodeByUser date={date} /> 
        </div>
      </>
    );}
}

SourceCodeView_developer.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object
};

export default SourceCodeView_developer;