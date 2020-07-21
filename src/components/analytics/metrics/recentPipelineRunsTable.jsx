import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import InfoDialog from "../../common/info";
import ErrorDialog from "../../common/error";
import { Table }  from "react-bootstrap";
import { format } from "date-fns";

function OpseraRecentPipelineStatus({ date }) {
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
      data: [
        { 
          request: "opseraPipelineInfo",
          metric: "bar" 
        }
      ]
      ,
      startDate: date.start, 
      endDate: date.end
    };
    
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);     
      let dataObject = res && res.data ? res.data.data[0].opseraPipelineInfo.data : [];   
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
          {/* <div className="chart-label-text">Opsera: Recent Pipeline Status</div> */}
          {(typeof data !== "object" || data === undefined || data.length < 1) ?
            <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
            :
            <div className="px-2 mt-2">
              <Table striped bordered hover size="sm" className="table-sm" style={{ fontSize:"small" }}>
                <thead>
                  <tr>
                    <th colSpan="5">Opsera: Recent Pipeline Status</th>
                  </tr>
                  <tr>
                    <th style={{ width: "55%" }}>Pipeline Name</th>
                    <th style={{ width: "5%" }} className="text-center">Run Count </th>
                    <th style={{ width: "20%" }} className="text-center">Completed At</th>
                    <th style={{ width: "10%" }} className="text-center">Duration</th>
                    <th style={{ width: "10%" }} className="text-center">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(function (value, index) {
                    let className = (value["status"] && value["status"].toLowerCase() === "failure") ? " red" : " green";
                    return <tr key = {index}>
                      <td className={className}>{ (value["pipeline_name"]) ? value["pipeline_name"] : "Unknown" }</td>
                      <td className={"text-center" + className}>{ (value["run_count"]) ? value["run_count"] : "Unknown" }</td>
                      <td className={"text-center" + className}>{ (value["timestamp"]) ? format(new Date(value["timestamp"]), "yyyy-MM-dd', 'hh:mm a"): "Unknown" }</td>
                      <td className={"text-center" + className}>{ (value["duration"]) ? value["duration"] : "0" } Mins</td>
                      <td className={"text-center upper-case-first" + className}>
                        { (value["status"]) ? value["status"].toLowerCase() : "Failed"}
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

export default OpseraRecentPipelineStatus;
