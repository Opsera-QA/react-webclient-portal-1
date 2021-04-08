// Charts that are always shwon at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/status_notifications/loading";
import ErrorDialog from "../../../common/status_notifications/error";
import InfoDialog from "../../../common/status_notifications/info";
import SummaryCountBlocksView from "../SummaryCountBlocksView";
import XUnitMaxMinPercBarChart from "../../charts/xunitMaxMinPercBarChart";
import XUnitTestDurationBarChart from "../../charts/xunitTestDurationBarChart";
import XunitTestResultsTable from "../../metrics/xunitTestResultsTable";
import CypressTestResultsTable from "../../metrics/CypressTestResultsTable";
import JunitTestResultsTable from "../../metrics/junitTestResultsTable";
import {  Row } from "react-bootstrap";



function TestView_Executive({ persona, date, index }) {
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
  }, [date, persona, index]);

  async function fetchData(index) {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      "data": [
        {
          "request": "xunitMaxMinPerc",
          "metric": "bar"
        },
        {
          "request": "xunitExecuted",
          "metric": "sum"
        },
        {
          "request": "xunitSkipped",
          "metric": "sum"
        },
        {
          "request": "xunitPassed",
          "metric": "sum"
        },
        {
          "request": "xunitError",
          "metric": "sum"
        },
        {
          "request": "xunitFailed",
          "metric": "sum"
        },
        {
          "request": "xunitWarning",
          "metric": "sum"
        },
        {
          "request": "junitPassed",
          "metric": "bar"
        },
        {
          "request": "junitFailed",
          "metric": "bar"
        },
        {
          "request": "junitTotal",
          "metric": "bar"
        },
        {
          "request": "cypressPassed",
          "metric": "bar"
        },
        {
          "request": "cypressFailed",
          "metric": "bar"
        },
        {
          "request": "cypressTotal",
          "metric": "bar"
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
    const { xunitExecuted, xunitSkipped, xunitPassed, xunitFailed, xunitError, xunitWarning, junitPassed, junitFailed, junitTotal, cypressPassed, cypressFailed, cypressTotal  } = data;

    let summaryCountsData = [];    

    let junitPassedCount = 0;
    let xunitPassedCount = 0;
    let cypressPassedCount = 0;
    let passedCount = 0;
    if (junitPassed.status === 200 && junitPassed.data !== undefined && typeof(junitPassed.data[0].count) === "number") {
      junitPassedCount = junitPassed.data[0].count;
    }
    if (xunitPassed.status === 200 && xunitPassed.data !== undefined && typeof(parseInt(xunitPassed.data[0])) === "number") {
      xunitPassedCount = parseInt(xunitPassed.data[0]);
    }
    if (cypressPassed.status === 200 && cypressPassed.data !== undefined && typeof(cypressPassed.data[0].count) === "number") {
      cypressPassedCount = cypressPassed.data[0].count;
    }
    passedCount = junitPassedCount + xunitPassedCount + cypressPassedCount;
    summaryCountsData.push({ name: "Passed", value: passedCount, footer: "", status: passedCount > 0 ? "success" : null });

    
    let junitFailedCount = 0;
    let xunitFailedCount = 0;
    let cypressFailedCount = 0;
    let failedCount = 0;
    if (junitFailed.status === 200 && junitFailed.data !== undefined && typeof(junitFailed.data[0].count) === "number") {
      junitFailedCount = junitFailed.data[0].count;      
    }
    if (xunitFailed.status === 200 && xunitFailed.data !== undefined && typeof(parseInt(xunitFailed.data[0])) === "number") {
      xunitFailedCount = parseInt(xunitFailed.data[0]);      
    }
    if (cypressFailed.status === 200 && cypressFailed.data !== undefined && typeof(parseInt(cypressFailed.data[0].count)) === "number") {
      cypressFailedCount = parseInt(cypressFailed.data[0].count);      
    }
    failedCount = junitFailedCount + xunitFailedCount + cypressFailedCount;
    summaryCountsData.push({ name: "Failed", value: failedCount, footer: "", status: failedCount > 0 ? "danger" : null });

    let junitExecutedCount = junitPassedCount + junitFailedCount;
    let xunitExecutedCount = 0;
    let cypressExecutedCount = 0;

    if (xunitExecuted.status === 200 && xunitExecuted.data !== undefined) {
      xunitExecutedCount = parseInt(xunitExecuted.data[0]);
    } 
    if (cypressTotal.status === 200 && cypressTotal.data !== undefined) {
      cypressExecutedCount = parseInt(cypressTotal.data[0].count);
    }   
    let executedCount = junitExecutedCount + xunitExecutedCount + cypressExecutedCount;
    summaryCountsData.push({ name: "Tests Run", value: executedCount, footer: "", status: executedCount > 0 ? "success" : null });
    if (executedCount !== 0) {  
      summaryCountsData.push({ name: "Pass Percentage", value: Math.floor(100*100*passedCount/executedCount)/100 + "%", footer: "", status: "success" });
    }


    let junitTotalCount = 0;
    let xunitSkippedCount = 0;
    let skippedCount = 0;
    if (junitTotal.status === 200 && junitTotal.data !== undefined && typeof(junitTotal.data[0].count) === "number") {
      junitTotalCount = junitTotal.data[0].count;      
    }
    if (xunitSkipped.status === 200 && xunitSkipped.data !== undefined && typeof(parseInt(xunitSkipped.data[0])) === "number") {
      xunitSkippedCount = parseInt(xunitSkipped.data[0]);      
    }
    skippedCount = junitTotalCount + xunitSkippedCount;
    // summaryCountsData.push({ name: "Skipped", value: skippedCount, footer: "", status: skippedCount > 1 ? "warning" : null });

    if (xunitWarning.status === 200 && xunitWarning.data !== undefined && xunitWarning.data[0].count > 0) {
      summaryCountsData.push({ name: "Warnings", value: xunitWarning.data[0], footer: "", status: xunitWarning.data[0].count > 5 ? "warning" : "success" });
    }    
    if (xunitError.status === 200 && xunitError.data !== undefined && xunitError.data[0].count > 0) {
      summaryCountsData.push({ name: "Errors", value: xunitError.data[0], footer: "", status: xunitError.data[0].count > 0 ? "danger" : "success" });
    }

    return summaryCountsData;
  };


  if(loading) {
    return (<LoadingDialog />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else if (!index.includes("xunit") && !index.includes("cypress") && !index.includes("junit")) {
    return (
      <div className="mt-3 bordered-content-block p-3 max-content-width" style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}> 
      <Row>
          <InfoDialog message="No activity data has been captured for this dashboard. In order to activate quality metrics contact support@opsera.io" />
      </Row>
    </div>);
  } else {
    return (
      <>
        <SummaryCountBlocksView data={countBlockData} />

        {/* {index.includes("xunit") ? <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <XUnitMaxMinPercBarChart persona={persona}  date={date} />
          </div>
          <div className="align-self-stretch p-2 w-100">
            <XUnitTestDurationBarChart persona={persona}  date={date}/>            
          </div>
        </div> : ""} */}


          {index.includes("cypress") ?
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <CypressTestResultsTable persona={persona} date={date}/>
            </div>
          </div> : ""}

          {index.includes("junit") ?
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <JunitTestResultsTable persona={persona} date={date}/>
            </div>
          </div> : ""}

          {index.includes("xunit") ?
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <XunitTestResultsTable persona={persona} date={date}/>
            </div>
          </div> : ""}
      </>
    );}




}


TestView_Executive.propTypes = {
  persona: PropTypes.string
};

export default TestView_Executive;