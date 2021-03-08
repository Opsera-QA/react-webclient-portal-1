import React, { useEffect, useContext, useState, useMemo } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import ErrorDialog from "components/common/status_notifications/error";
import { Table }  from "react-bootstrap";
import { format } from "date-fns";
import CustomTable from "components/common/table/CustomTable";
import { faTimesCircle, faCheckCircle, faSearchPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "components/analytics/charts/charts.css";


function CypressResultsTable({ date, tags }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const noDataMessage = "No Data is available for this chart at this time";
  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "timestamp",
        desc: true
      }
    ]
  };
  

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
    const apiUrl = "/analytics/metrics";
    const postBody = {
      request: "cypressTestResults",
      startDate: date.start,
      endDate: date.end,
      tags: tags
    };

    try {
      
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].cypressTestResults : [];
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
        Header: "Job",
        accessor: "pipelineId",
      },
      {
        Header: "Run",
        accessor: "runCount"
      },
      {
        Header: "Timestamp",
        accessor: "timestamp",
        Cell: (props) => {
          return format(new Date(props.value), "yyyy-MM-dd', 'hh:mm a");
        }
      },
      {
        Header: "Tests",
        accessor: "testsRun"
      },
      {
        Header: "Passed",
        accessor: "testsPassed",
      },
      {
        Header: "Failed",
        accessor: "testsFailed",
      },
      {
        Header: "Duration(s)",
        accessor: "duration"
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
        {(typeof data !== "object" || data === undefined || Object.keys(data).length === 1 || data.status !== 200) ?
          <>
            <div className="new-chart mb-3" style={{ height: "300px" }}>
              <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
                <InfoDialog message="No Data is available for this chart at this time." />
              </div>
            </div>
          </>
          :
          <>

            <CustomTable
              columns={columns}
              data={data.data}
              rowStyling={""}
              noDataMessage={noDataMessage}
              initialState={initialState}
            >
            </CustomTable>
          </>
        }
      </>
    );}
}

export default CypressResultsTable;
