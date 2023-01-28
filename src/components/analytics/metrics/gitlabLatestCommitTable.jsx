import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ErrorDialog from "../../common/status_notifications/error";
import { Table }  from "react-bootstrap";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";

function GitlabLatestCommitTable() {
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
          "request": "gitlabLatestCommit",
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
  } else if (typeof data !== "object" || data.gitlabLatestCommit === undefined || data.gitlabLatestCommit.status !== 200) {
    return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  } else {
    return (
      <>
        {data !== undefined && data.gitlabLatestCommit.data.length > 0 ? 
          <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
            <thead>
              <tr>
                <th style={{ width: "5%" }}>Repository</th>
                <th style={{ width: "5%" }}>Last Commit</th>
              </tr>
            </thead>
            <tbody>
              {data.gitlabLatestCommit.data.map(function (value, index) {
                return <tr key = {index}>
                  <td>{value["repository"]}</td>
                  <td>{DateFormatHelper.formatDateAsTimestampWithoutSeconds(new Date(typeof(value["latest_commit"]) !== "undefined" ? value["latest_commit"] : null))}</td>
                </tr>;
              })
              }
            </tbody>
          </Table> 
          : null }
      </>
    );}
}

export default GitlabLatestCommitTable;
