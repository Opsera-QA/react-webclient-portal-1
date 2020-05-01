import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import InfoDialog from "../../common/info";
import ErrorDialog from "../../common/error";
import { Table }  from "react-bootstrap";
import Moment from "react-moment";

function RecentBuildsTable() {
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
    const apiUrl = "/analytics/activity";   
    const postBody = {
      "requests": [ 
        "jenkinsBuildRecent" 
      ]
    };
    
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);     
      let dataObject = res && res.data ? res.data : [];   
      console.log(dataObject);   
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
  } else if (typeof data !== "object" || data === undefined || data.length < 1) {
    return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  } else {
    return (
      <>
        {data !== undefined && data.length > 0 ? 
          <>
            <div className="chart-label-text">Jenkins: Recent Build Status</div>
            <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Project Name</th>
                  <th style={{ width: "25%" }}>Build Number</th>
                  <th style={{ width: "25%" }}>Completed At</th>
                  <th style={{ width: "25%" }} className="text-center">Result</th>
                </tr>
              </thead>
              <tbody>
                {data.map(function (value, index) {
                  let className = (value["data_result"] && value["data_result"].toLowerCase() === "success") ? "green" : "red";
                  return <tr key = {index}>
                    <td className={className}>{ (value["data_projectName"]) ? value["data_projectName"] : "Unknown" }</td>
                    <td className={className}>{ (value["data_buildNum"]) ? value["data_buildNum"] : "Unknown" }</td>
                    <td className={className}>{ (value["timestamp"]) ? <Moment format="YYYY-MM-DD, hh:mm a" date={value["timestamp"]} /> : "Unknown" }</td>
                    <td className={"text-center " + className}>
                      { (value["data_result"]) ? value["data_result"] : "Unknown"}
                    </td>
                  </tr>;
                })
                }
              </tbody>
            </Table> 
          </>
          : null }
      </>
    );}
}

export default RecentBuildsTable;
