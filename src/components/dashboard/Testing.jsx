import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/status_notifications/loading";
import ErrorDialog from "../common/status_notifications/error";
import InfoDialog from "../common/status_notifications/info";
import { Table }  from "react-bootstrap";

import TestingCounts from "../analytics/metrics/testingCounts";
import XUnitMaxMinPercBarChart from "../analytics/charts/xunitMaxMinPercBarChart";
import XUnitTestDurationBarChart from "../analytics/charts/xunitTestDurationBarChart";


function TestingDashboard( { persona } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/analytics/dashboard/testing", {}, accessToken);
    
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
            <TestingCounts data={data} persona={persona} />
          </div>
          <div className="p-2 flex-grow-1">
            {Object.keys(data.xunitMaxMinPerc.data[0]).length > 0 && data.xunitMaxMinPerc.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <XUnitMaxMinPercBarChart data={data} persona={persona} />
            </div> : ""}
            {Object.keys(data.xunitTestDuration.data[0]).length > 0 && data.xunitTestDuration.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
              <XUnitTestDurationBarChart data={data} persona={persona} />
            </div> : ""}
          </div> 
        </div>
        {Object.keys(data.xunitTable.data[0]).length > 0 && data.xunitTable.status === 200 ? <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>Build ID</th>
              <th style={{ width: "5%" }}>Max</th>
              <th style={{ width: "5%" }}>Min</th>
              <th style={{ width: "5%" }}>Median</th>
              <th style={{ width: "5%" }}>95th Percentile</th>
              <th style={{ width: "5%" }}>Total Duration</th>
              <th style={{ width: "5%" }}>Total Test Cases</th>
              <th style={{ width: "5%" }}>Executed Test Cases</th>
              <th style={{ width: "5%" }}>Passed</th>
              <th style={{ width: "5%" }}>Error</th>
              <th style={{ width: "5%" }}>Failed</th>
              <th style={{ width: "5%" }}>Not Runnable</th>
              <th style={{ width: "5%" }}>Warning</th>
            </tr>
          </thead>
          <tbody>
            {data.xunitTable.data.map(function (value, index) {
              return <tr key = {index}>
                <td>{value["buildId"]}</td>
                <td>{value["Max"]}</td>
                <td>{value["Min"]}</td>
                <td>{value["Median"]}</td>
                <td>{value["95th Percentile"]}</td>
                <td>{value["Total Duration"]}</td>
                <td>{value["Total Tests"]}</td>
                <td>{value["Executed Tests"]}</td>
                <td>{value["Passed"]}</td>
                <td>{value["Error"]}</td>
                <td>{value["Failed"]}</td>
                <td>{value["Not Runnable"]}</td>
                <td>{value["Warning"]}</td>
              </tr>;
            })
            }
          </tbody>
        </Table> : "" }
      </>
    );}
}

TestingDashboard.propTypes = {
  persona: PropTypes.string
};


export default TestingDashboard;
