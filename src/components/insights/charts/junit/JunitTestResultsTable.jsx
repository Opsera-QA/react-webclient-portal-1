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


function JunitResultsTable({ date }) {
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
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "junitTestResults",
          metric: "bar"
        }
      ]
      ,
      startDate: date.start,
      endDate: date.end
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].junitTestResults : [];
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
        accessor: "jenkinsId",
      },
      {
        Header: "Run",
        accessor: "run_count"
      },
      {
        Header: "Timestamp",
        accessor: "timestamp"
      },
      {
        Header: "Tests",
        accessor: "total"
      },
      {
        Header: "Passed",
        accessor: "passed",
      },
      {
        Header: "Failed",
        accessor: "failed",
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
              // paginationOptions={paginationOptions}
            >
            </CustomTable>
          </>
        }
      </>
    );}
}

export default JunitResultsTable;
