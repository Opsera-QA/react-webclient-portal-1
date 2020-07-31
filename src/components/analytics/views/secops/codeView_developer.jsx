// Charts that are always shwon at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/loading";
import ErrorDialog from "../../../common/error";
import InfoDialog from "../../../common/info";
import SummaryCountBlocksView from "../summaryCountBlocksView";
import SonarMaintainabilityLineChart from "../../charts/sonarMaintainabilityLineChart";
import SonarCodeSmellsLineChart from "../../charts/sonarCodeSmellsLineChart";
import SonarCodeCategoriesNO_VALUEPieChart from "../../charts/sonarCodeCategoriesNO_VALUEPieChart";
import SonarCodeCategoriesOKPieChart from "../../charts/sonarCodeCategoriesOKPieChart";
import TwistlockVulnerability from "../../charts/twistlockVulnerabilityLineChart";
import {  Row } from "react-bootstrap";





function CodeView_Developer ({ persona, date, index }) {
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

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      "data": [
        {
          "request": "twistlockHighVulnerabilities",
          "metric": "count"
        },
        {
          "request": "twistlockMidVulnerabilities",
          "metric": "count"
        },
        {
          "request": "twistlockLowVulnerabilities",
          "metric": "count"
        },
        {
          "request": "sonarBugs",
          "metric": "sum"
        },
        {
          "request": "sonarCodeCoverage",
          "metric": "bar"
        },
        {
          "request": "sonarMaintainability",
          "metric": "line"
        },
        {
          "request": "sonarCodeSmells",
          "metric": "line"
        },
        {
          "request": "sonarCodeCategoriesNO_VALUE",
          "metric": "pie"
        },
        {
          "request": "sonarCodeCategoriesOK",
          "metric": "pie"
        },
        {
          "request": "twistlockVulStatusHigh",
          "metric": "line"
        },
        {
          "request": "twistlockVulStatusMed",
          "metric": "line"
        },
        {
          "request": "twistlockVulStatusLow",
          "metric": "line"
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
    const { twistlockHighVulnerabilities, twistlockMidVulnerabilities, twistlockLowVulnerabilities, sonarBugs } = data;

    let summaryCountsData = [];    

    if (twistlockHighVulnerabilities.status === 200 && twistlockHighVulnerabilities.data !== undefined) {
      summaryCountsData.push({ name: "High Vulnerabilities", value: twistlockHighVulnerabilities.data[0].count, footer: twistlockHighVulnerabilities.tool, status: twistlockHighVulnerabilities.data[0].count > 0 ? "danger" : "success" });
    }
    if (twistlockMidVulnerabilities.status === 200 && twistlockMidVulnerabilities.data !== undefined) {
      summaryCountsData.push({ name: "Medium Vulnerabilities", value: twistlockMidVulnerabilities.data[0].count, footer: twistlockMidVulnerabilities.tool, status: twistlockMidVulnerabilities.data[0].count > 0 ? "warning" : "success" });
    }
    if (twistlockLowVulnerabilities.status === 200 && twistlockLowVulnerabilities.data !== undefined) {
      summaryCountsData.push({ name: "Low Vulnerabilities", value: twistlockLowVulnerabilities.data[0].count, footer: twistlockLowVulnerabilities.tool, status: twistlockLowVulnerabilities.data[0].count > 5 ? "warning" : "success" });
    }    
    if (sonarBugs.status === 200 && sonarBugs.data !== undefined) {
      summaryCountsData.push({ name: "Detected Bugs", value: sonarBugs.data[0], footer: sonarBugs.tool, status: sonarBugs.data[0] > 5 ? "warning" : "success" });
    }   
    
    return summaryCountsData;
  };


  if(loading) {
    return (<LoadingDialog />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else if (!index.includes("sonar")) {
    return (
      <div
        className="mt-3 bordered-content-block p-3 max-content-width"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row>
          <InfoDialog message="No activity data has been captured for this dashboard. In order to activate secops metrics contact support@opsera.io" />
        </Row>
      </div>
    );
  } else if (data === undefined || Object.keys(data).length == 0 || Object.values(data).every(element => Object.keys(element.data[0]).length === 0)
  || Object.values(data).every(element => element.status !== 200)) {
    return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  } else {
    return (
      <>
        <SummaryCountBlocksView data={countBlockData} />

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            {Object.keys(data.sonarCodeSmells.data[0]).length > 0 && data.sonarCodeSmells.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarCodeSmellsLineChart data={data} persona={persona} date={date}/>
            </div> :         <div className="chart mb-3" style={{ height: "300px" }}>
              <div className="chart-label-text">Sonar: Code Smells</div><InfoDialog message="No Data is available for this chart at this time." /></div>}
          </div>
          <div className="align-self-stretch p-2 w-100">
            {Object.keys(data.sonarCodeCategoriesNO_VALUE.data[0]).length > 0 && data.sonarCodeCategoriesNO_VALUE.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarCodeCategoriesNO_VALUEPieChart data={data} persona={persona} date={date}/>
            </div> : <div className="chart mb-3" style={{ height: "300px" }}>
              <div className="chart-label-text">Sonar: Code Categories (Keyword = No Value)
              </div><InfoDialog message="No Data is available for this chart at this time." /></div>}
          </div>
        </div>

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            {Object.keys(data.sonarCodeCategoriesOK.data[0]).length > 0 && data.sonarCodeCategoriesOK.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarCodeCategoriesOKPieChart data={data} persona={persona} date={date}/>
            </div> : <div className="chart mb-3" style={{ height: "300px" }}>
              <div className="chart-label-text">Sonar: Code Categories (Keyword = OK)
              </div><InfoDialog message="No Data is available for this chart at this time." /></div>}
          </div>
          <div className="align-self-stretch p-2 w-100">
            {Object.keys(data.sonarMaintainability.data[0]).length > 0 && data.sonarMaintainability.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarMaintainabilityLineChart data={data} persona={persona} date={date}/>
            </div> : <div className="chart mb-3" style={{ height: "300px" }}>
              <div className="chart-label-text">Sonar: Maintainability Rating
              </div><InfoDialog message="No Data is available for this chart at this time." /></div>}
          </div>
        </div>

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            {Object.keys(data.twistlockVulStatusHigh.data[0]).length > 0 && data.twistlockVulStatusHigh.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <TwistlockVulnerability data={data} persona={persona} date={date}/>
            </div> : ""}
            
          </div>
          <div className="align-self-stretch p-2 w-100">
           &nbsp;
          </div>
        </div>
      </>
    );}




}


CodeView_Developer.propTypes = {
  persona: PropTypes.string
};

export default CodeView_Developer;