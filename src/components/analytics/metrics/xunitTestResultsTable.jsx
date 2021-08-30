import React, { useEffect, useContext, useState, useMemo } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ErrorDialog from "../../common/status_notifications/error";
import CustomTable from "components/common/table/CustomTable";
import PropTypes from "prop-types";




function XunitResultsTable({ date }) {
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
          request: "xunitTable",
          metric: "bar"
        }
      ]
      ,
      startDate: date.start,
      endDate: date.end
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].xunitTable : [];
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
        Header: "Job Id",
        accessor: "buildId"
      },
      {
        Header: "Run Count",
        accessor: "run_count"
      },
      {
        Header: "Timestamp",
        accessor: "timestamp"
      },
      {
        Header: "Tests Run",
        accessor: "Executed Tests",
      },
      {
        Header: "Tests Passed",
        accessor: "Passed",
      },
      {
        Header: "Tests Failed",
        accessor: "Failed",
      },
      {
        Header: "Duration (seconds)",
        accessor: "Total Duration"
      },
      {
        Header: "Pass Rate",
        accessor: "pass_rate"
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
            <div className="chart mb-3" style={{ height: "300px" }}>
              <div className="chart-label-text">Xunit: Test Results</div>
              <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
                <InfoDialog message="No Data is available for this chart at this time." />
              </div>
            </div>
          </>
          :
          <>
            <div className="mt-3 d-flex justify-content-between">
              <div className="h6 activity-label-text mb-2">Xunit: Test Results</div>

            </div>
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

XunitResultsTable.propTypes = {
  date: PropTypes.object,
};

export default XunitResultsTable;
