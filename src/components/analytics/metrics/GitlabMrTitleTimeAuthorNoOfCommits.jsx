import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ErrorDialog from "../../common/status_notifications/error";
import { Table }  from "react-bootstrap";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";


function GitlabMrTitleTimeAuthorNoOfCommits({ date }) {
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
          "request": "gitlabMergeReqTitleTimeAuthorNumberOfCommits",
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
  } else if (typeof data !== "object" || data.gitlabMergeReqTitleTimeAuthorNumberOfCommits === undefined || data.gitlabMergeReqTitleTimeAuthorNumberOfCommits.status !== 200) {
    return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  } else {
    return (
      <>
        <div className="">Gitlab: Merge-Request Title Time Author Number Of Commits</div>
        {data !== undefined && data.gitlabMergeReqTitleTimeAuthorNumberOfCommits.data.length > 0 ? 
          <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
            <thead>
              <tr>
                <th style={{ width: "5%" }}>Author Name</th>
                <th style={{ width: "5%" }}>Merge Request Title</th>
                <th style={{ width: "5%" }}>Merge Request Time Taken (min)</th>
                <th style={{ width: "5%" }}>Project Name</th>
                <th style={{ width: "5%" }}>Push Time stamp</th>
                <th style={{ width: "5%" }}>Number of Commits</th>
              </tr>
            </thead>
            <tbody>
              {data.gitlabMergeReqTitleTimeAuthorNumberOfCommits.data.map(function (value, index) {
                return <tr key = {index}>
                  <td>{value["AuthorName"]}</td>
                  <td>{value["MergeRequestTitle"]}</td>
                  <td>{value["TimeTaken"]}</td>
                  <td>{value["ProjectName"]}</td>                  
                  <td>{DateFormatHelper.formatDateAsTimestampWithoutSeconds(new Date(value["PushTimeStamp"]))}</td>
                  <td>{value["TotalCommits"]}</td>
                </tr>;
              })
              }
            </tbody>
          </Table> 
          : null }
      </>
    );}
}

export default GitlabMrTitleTimeAuthorNoOfCommits;
