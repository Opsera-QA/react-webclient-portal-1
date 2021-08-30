import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import PropTypes from "prop-types";
import ErrorDialog from "../../common/status_notifications/error";
import { Table }  from "react-bootstrap";

function JMeterResultsTable({ date }) {
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
          "request": "jmeterConnectTime",
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
    return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
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

JMeterResultsTable.propTypes = {
  date: PropTypes.object,
};

export default JMeterResultsTable;
