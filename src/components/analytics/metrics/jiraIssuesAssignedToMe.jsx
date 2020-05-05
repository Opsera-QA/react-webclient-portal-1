import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import InfoDialog from "../../common/info";
import ErrorDialog from "../../common/error";
import { Table }  from "react-bootstrap";

function JiraIssuesAssignedToMe() {
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
          "request": "jiraTicketsAssignedToMe",
          "metric": "bar"
        }        
      ]
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
  } else if (typeof data !== "object" || data.jiraTicketsAssignedToMe === undefined || data.jiraTicketsAssignedToMe.status !== 200) {
    return (<ErrorDialog  error="No Data is available for this chart at this time." />);
  } else {
    return (
      <>
        {data !== undefined && data.jiraTicketsAssignedToMe.data.length > 0 ? 

          <div className="chart mb-3 flex" style={{ height: "300px" }}>
            <div className="chart-label-text">Jira: Issues Assigned To Me</div>
            <div className="px-2">
              <Table striped bordered hover className="mt-3 table-sm" style={{ fontSize:"small" }}>
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}>Ticket Number</th>
                    <th style={{ width: "5%" }}>Issue Type</th>
                    <th style={{ width: "5%" }}>Priority</th>
                    <th style={{ width: "5%" }}>Summary</th>

                  </tr>
                </thead>
                <tbody>
                  {data.jiraTicketsAssignedToMe.data.map(function (value, index) {
                    return <tr key = {index}>
                      <td>{value["Issue Number"]}</td>
                      <td>{value["Issue Type"]}</td>
                      <td>{value["Issue Priority"]}</td>
                      <td>{value["Issue Name"]}</td>
                    </tr>;
                  })
                  }
                </tbody>
              </Table> 
            </div>
          </div>
          : null }
      </>
    );}
}

export default JiraIssuesAssignedToMe;
