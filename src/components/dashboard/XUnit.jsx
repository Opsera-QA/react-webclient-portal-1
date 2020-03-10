import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import { Table }  from "react-bootstrap";

import XUnitCounts from "../analytics/metrics/xunitCounts";
import XUnitMaxMinPercBarChart from "../analytics/charts/xunitMaxMinPercBarChart";
import XUnitTestDurationBarChart from "../analytics/charts/xunitTestDurationBarChart";


function XUnitDashboard( { persona } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/analytics/dashboard/xunit", {}, accessToken);
    
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
  } else if (typeof data !== "object" || Object.keys(data).length == 0 || error) {
    return (<ErrorDialog  error={error ? error : "Missing Data!"} />);
  } else {
    return (
      <>
        <div className="d-flex">
          <div className="p-2" style={{ minWidth: "160px" }}>
            <XUnitCounts data={data} persona={persona} />
          </div>
          <div className="p-2 flex-grow-1">
            <div className="chart mb-3" style={{ height: "300px" }}>
              <XUnitMaxMinPercBarChart data={data} persona={persona} />
            </div>
            <div className="chart mb-3" style={{ height: "300px" }}>
              <XUnitTestDurationBarChart data={data} persona={persona} />
            </div>
          </div> 
        </div>
        {data.xunitTable.data ? <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Build ID</th>
              <th style={{ width: "20%" }}>Max</th>
              <th style={{ width: "20%" }}>Min</th>
              <th style={{ width: "20%" }}>Median</th>
              <th style={{ width: "20%" }}>95th Percentile</th>
              <th style={{ width: "20%" }}>Total Duration</th>
              <th style={{ width: "20%" }}>Total Test Cases</th>
              <th style={{ width: "20%" }}>Executed Test Cases</th>
              <th style={{ width: "20%" }}>Passed</th>
              <th style={{ width: "20%" }}>Error</th>
              <th style={{ width: "20%" }}>Failed</th>
              <th style={{ width: "20%" }}>Not Runnable</th>
              <th style={{ width: "20%" }}>Warning</th>
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

XUnitDashboard.propTypes = {
  persona: PropTypes.string
};


export default XUnitDashboard;