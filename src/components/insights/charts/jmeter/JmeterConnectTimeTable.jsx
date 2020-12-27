import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import ErrorDialog from "components/common/status_notifications/error";
import { Table }  from "react-bootstrap";
import "components/analytics/charts/charts.css";

function JMeterConnectTimeTable({ date }) {
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
  }, [date]);


  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      "data": [
        {
          "request": "jenkinsBuildsByUser",
          "metric": "bar"
        }        
      ]
      ,
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
  } else if (typeof data !== "object" || data.jmeterConnectTime === undefined || data.jmeterConnectTime.status !== 200) {
    return (<>
      <div className="new-chart mb-3" style={{ height: "300px" }}>
        <div
          className="max-content-width p-5 mt-5"
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <InfoDialog message="No Data is available for this chart at this time." />
        </div>
      </div>
    </>);
  } else {
    return (
      <>
        {data !== undefined && data.jmeterConnectTime.data.length > 0 ? 
          <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
            <thead>
              <tr>
                <th style={{ width: "5%" }}>Build ID</th>
                <th style={{ width: "5%" }}>Test Case</th>
                <th style={{ width: "5%" }}>Average Connect Time (ms)</th>
                <th style={{ width: "5%" }}>Minimum Connect Time (ms)</th>
                <th style={{ width: "5%" }}>Median Connect Time (ms)</th>
                <th style={{ width: "5%" }}>Maximum Connect Time (ms)</th>
              </tr>
            </thead>
            <tbody>
              {data.jmeterConnectTime.data.map(function (value, index) {
                return <tr key = {index}>
                  <td>{value["jenkinsId"]}</td>
                  <td>{value["testName"]}</td>
                  <td>{value["mean"]}</td>
                  <td>{value["min"]}</td>
                  <td>{value["median"]}</td>
                  <td>{value["max"]}</td>
                </tr>;
              })
              }
            </tbody>
          </Table> 
          : null }
      </>
    );}
}

export default JMeterConnectTimeTable;
