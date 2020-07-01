import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import InfoDialog from "../../common/info";
import ErrorDialog from "../../common/error";
import { Table }  from "react-bootstrap";
import { format } from "date-fns";

function RecentBuildsTable({ date }) {
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
      ],
      startDate: date.start, 
      endDate: date.end
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
  // } else if (typeof data !== "object" || data === undefined || data.length < 1) {
  //   return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  } else {
    return (
      <>
        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Jenkins: Recent Build Status</div>
          {(typeof data !== "object" || data === undefined || data.length < 1) ?
            <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
            :
            <div className="px-2">
              <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Project Name</th>
                    <th style={{ width: "20%" }} className="text-center">Build Number</th>
                    <th style={{ width: "20%" }} className="text-center">Started At</th>
                    {/* <th style={{ width: "20%" }} className="text-center">Duration</th> */}
                    <th style={{ width: "20%" }} className="text-center">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(function (value, index) {
                    let className = (value["data_result"] && value["data_result"].toLowerCase() === "success") ? " green" : " red";
                    return <tr key = {index}>
                      <td className={className}>{ (value["data_projectName"]) ? value["data_projectName"] : "Unknown" }</td>
                      <td className={"text-center" + className}>{ (value["data_buildNum"]) ? value["data_buildNum"] : "Unknown" }</td>
                      <td className={"text-center" + className}>{ (value["timestamp"]) ? format(new Date(value["timestamp"]), "yyyy-MM-dd', 'hh:mm a"): "Unknown" }</td>
                      {/* <td className={"text-center" + className}>{ (value["data_duration"]) ? value["data_duration"] : "0" } Seconds</td> */}
                      <td className={"text-center upper-case-first" + className}>
                        { (value["data_result"]) ? value["data_result"].toLowerCase() : "Failed"}
                      </td>
                    </tr>;
                  })
                  }
                </tbody>
              </Table>
            </div>
          }
        </div>
      </>
    );}
}

export default RecentBuildsTable;
