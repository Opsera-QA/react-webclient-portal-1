import React, { useEffect, useContext, useState, useMemo } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ErrorDialog from "../../common/status_notifications/error";
import { Table }  from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";


function JiraIssuesAssignedToMe() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "run_count",
        desc: true
      }
    ]
  }; 
  const noDataMessage = "No Data is available for this chart at this time";


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

  const columns = useMemo(
    () => [
      {
        Header: "Ticket Number",
        accessor: "Issue Number",
        class: "no-wrap-inline"
      },
      {
        Header: "Issue Type",
        accessor: "Issue Type",
      },
      {
        Header: "Priority",
        accessor: "Issue Priority",
      },
      {
        Header: "Summary",
        accessor: "Issue Name",
      }
    ],
    []
  );
  
  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else {
    return (

      <>
      {(typeof data.jiraTicketsAssignedToMe !== "object" || data.jiraTicketsAssignedToMe === undefined || Object.keys(data.jiraTicketsAssignedToMe).length === 1 || data.jiraTicketsAssignedToMe.status !== 200) ?
      <>
        <div className="chart mb-3" style={{ height: "300px" }}>
        <div className="chart-label-text">Jira: Issues Assigned To Me</div>
          <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        </div>
      </>
  :
    <>
  <div className="d-flex justify-content-between">
  <div className="h6 activity-label-text mb-2">Jira: Issues Assigned To Me</div>

</div>
      <CustomTable 
        columns={columns} 
        data={data.jiraTicketsAssignedToMe.data}
        rowStyling={""}
        noDataMessage={noDataMessage}
        noFooter={true}
      >
      </CustomTable>
    </>
}
</>
    );}
}

export default JiraIssuesAssignedToMe;
