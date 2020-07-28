import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import InfoDialog from "../../common/info";
import ErrorDialog from "../../common/error";
import { Table }  from "react-bootstrap";

function GitlabMergedMergeReqCommitsCountTable({ date }) {
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
          "request": "gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime",
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
  } else if (typeof data !== "object" || data.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime === undefined || data.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime.status !== 200) {
    return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  } else {
    return (
      <>
        <div className="">Time Taken To Complete Merge Request</div>
        {data !== undefined && data.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime.data.length > 0 ? 
          <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
            <thead>
              <tr>
                <th style={{ width: "5%" }}>Author Name</th>                
                <th style={{ width: "4%" }}>Time taken to merge (Hours)</th>
                <th style={{ width: "4%" }}>Push Time (Hours)</th>
                <th style={{ width: "5%" }}>Branch Name</th>
                <th style={{ width: "5%" }}>Project Name</th>                
              </tr>
            </thead>
            <tbody>
              {data.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime.data.map(function (value, index) {
                return <tr key = {index}>                  
                  <td>                                         
                    <div>
                      <span style={{ fontWeight: "bold" }}>
                        { value["AuthorName"] } &nbsp;
                      </span>                        
                      <span title="Number of commits" style={{  boxSizing: "border-box", fontSize: "12px", margin: "1px", lineHeight: "20px", padding: "3px", border: "1px solid #dbdbdb", borderRadius: "100px", fontWeight: "400" }} className="">commits: {value["TotalCommits"]}</span>
                    </div>                                                          
                    <span style={{ color: "grey" }}>{ value["MergeRequestTitle"].length > 70 ? value["MergeRequestTitle"].substring(0, 50) + "..." : value["MergeRequestTitle"] }</span>
                  </td>                  
                  <td>{value["MergeRequestTimeTaken"]}</td>
                  <td>{value["PushCodeTime"]}</td>
                  <td>{value["BranchName"]}</td>
                  <td>{value["ProjectName"]}</td>                  
                </tr>;
              })
              }
            </tbody>
          </Table> 
          : null }
      </>
    );}
}

export default GitlabMergedMergeReqCommitsCountTable;