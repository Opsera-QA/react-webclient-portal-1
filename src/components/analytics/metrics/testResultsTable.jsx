import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import InfoDialog from "../../common/info";
import ErrorDialog from "../../common/error";
import { Table }  from "react-bootstrap";

function TestResultsTable({date}) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
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
          "request": "xunitTable",
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
      setLoading(false);
    }
    catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }
  
  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else if (typeof data !== "object" || data.xunitTable === undefined || data.xunitTable.status !== 200) {
    return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  } else {
    return (
      <>
        {data !== undefined && data.xunitTable.data.length > 0 ? 
          <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
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
          </Table> 
          : null }
      </>
    );}
}

export default TestResultsTable;
