// Charts that are always shwon at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/loading";
import ErrorDialog from "../../../common/error";
import InfoDialog from "../../../common/info";
import SummaryCountBlocksView from "../summaryCountBlocksView";
import XUnitMaxMinPercBarChart from "../../charts/xunitMaxMinPercBarChart";
import XUnitTestDurationBarChart from "../../charts/xunitTestDurationBarChart";
import TestResultsTable from "../../metrics/testResultsTable";


function TestView_Executive ({ persona }) {
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
    const { xunitExecuted, xunitSkipped, xunitPassed, xunitFailed, xunitError, xunitWarning } = data;
    
    let summaryCountsData = [];    
    
    if (xunitExecuted.status === 200 && xunitExecuted.data !== undefined) {
      summaryCountsData.push({ name: "Tests Run", value: xunitExecuted.data[0], footer: xunitExecuted.tool, status: "success" });
    }
    if (xunitPassed.status === 200 && xunitPassed.data !== undefined) {
      summaryCountsData.push({ name: "Pass Percentage", value: xunitPassed.data[0] + "%", footer: xunitPassed.tool, status: "success" });
    }
    if (xunitFailed.status === 200 && xunitFailed.data !== undefined) {
      summaryCountsData.push({ name: "Failed", value: xunitFailed.data[0], footer: xunitFailed.tool, status: xunitFailed.data[0].count > 0 ? "danger" : "success" });
    }
    if (xunitWarning.status === 200 && xunitWarning.data !== undefined) {
      summaryCountsData.push({ name: "Warnings", value: xunitWarning.data[0], footer: xunitWarning.tool, status: xunitWarning.data[0].count > 5 ? "warning" : "success" });
    }
    if (xunitSkipped.status === 200 && xunitSkipped.data !== undefined) {
      summaryCountsData.push({ name: "Skipped", value: xunitSkipped.data[0], footer: xunitSkipped.tool, status: xunitSkipped.data[0].count > 5 ? "warning" : "success" });
    }
    if (xunitError.status === 200 && xunitError.data !== undefined) {
      summaryCountsData.push({ name: "Errors", value: xunitError.data[0], footer: xunitError.tool, status: xunitError.data[0].count > 0 ? "danger" : "success" });
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
            {Object.keys(data.xunitMaxMinPerc.data[0]).length > 0 && data.xunitMaxMinPerc.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <XUnitMaxMinPercBarChart data={data} persona={persona} />
            </div> : ""}
          </div>
          <div className="align-self-stretch p-2 w-100">
            <XUnitTestDurationBarChart persona={persona} />
          </div>
        </div>

        
        <TestResultsTable />
      </>
    );}




}


TestView_Executive.propTypes = {
  persona: PropTypes.string
};

export default TestView_Executive;