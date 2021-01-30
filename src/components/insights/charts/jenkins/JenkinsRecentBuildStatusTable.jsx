import React, { useEffect, useContext, useState, useMemo } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import ErrorDialog from "components/common/status_notifications/error";
// import { Table } from "react-bootstrap";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import CustomTable from "components/common/table/CustomTable";
import "components/analytics/charts/charts.css";

function RecentBuildsTable({ date, tags }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const noDataMessage = "No Data is available for this chart at this time";
  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "run_count",
        desc: true,
      },
    ],
  };

  const columns = useMemo(
    () => [
      {
        Header: "Project Name",
        accessor: "data_projectName",
        class: "cell-center no-wrap-inline",
      },
      {
        Header: "Build Number",
        accessor: "data_buildNum",
      },
      {
        Header: "Completed At",
        accessor: "timestamp",
        Cell: (props) => {
          console.log(props);
          return format(new Date(props.value), "yyyy-MM-dd', 'hh:mm a");
        },
      },
      {
        Header: "Result",
        accessor: "data_result",
        Cell: (props) => {
          return props.value ? (
            props.value === "Failure" || props.value === "failed" ? (
              <>
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <div>
                    <FontAwesomeIcon icon={faTimesCircle} className="cell-icon red" />
                  </div>
                  <div className="ml-1">{props.value}</div>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <div>
                    <FontAwesomeIcon icon={faCheckCircle} className="cell-icon green" />
                  </div>
                  <div className="ml-1">{props.value}</div>
                </div>
              </>
            )
          ) : (
            "unknown"
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
      } catch (err) {
        if (err.name === "AbortError") return;
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
    const apiUrl = "/analytics/metrics";
    const postBody = {
      request: "jenkinsBuildRecent",
      startDate: date.start,
      endDate: date.end,
      tags: tags
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].jenkinsBuildRecent : [];
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;
  // } else if (typeof data !== "object" || data === undefined || data.length < 1) {
  //   return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  else
    return (
      <>
        {typeof data.data !== "object" ||
        data.data === undefined ||
        Object.keys(data).length === 1 ||
        data.status !== 200 ? (
          <>
            <div className="new-chart mb-3" style={{ height: "300px" }}>
              <div
                className="max-content-width p-5 mt-5"
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <InfoDialog message="No Data is available for this chart at this time." />
              </div>
            </div>
          </>
        ) : (
          <>
            <CustomTable
              columns={columns}
              data={data.data}
              rowStyling={""}
              noDataMessage={noDataMessage}
              // initialState={initialState}
              // paginationOptions={paginationOptions}
            ></CustomTable>
          </>
        )}
      </>
    );
}

export default RecentBuildsTable;
