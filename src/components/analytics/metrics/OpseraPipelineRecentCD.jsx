import React, { useEffect, useContext, useState, useMemo } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ErrorDialog from "../../common/status_notifications/error";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import SuccessIcon from "../../common/icons/table/SuccessIcon";
import FailIcon from "../../common/icons/table/FailIcon";

function OpseraRecentCDTable({ date }) {
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

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
      } catch (err) {
        if (err.name === "AbortError") {
          // console.log("Request was canceled via controller.abort");
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
          request: "opseraCDMetrics",
          metric: "bar",
        },
      ],
      startDate: date?.start,
      endDate: date?.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].opseraCDMetrics : [];
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "Run",
        accessor: "run_count",
        class: "no-wrap-inline",
      },
      {
        Header: "Pipeline Name",
        accessor: "pipeline_name",
      },
      {
        Header: "Step Name",
        accessor: "step_name",
      },
      {
        Header: "Tool",
        accessor: "tool",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: function parseStatus(row) {
          return row?.value ? (
            row?.value === "failure" || row?.value === "failed" ? (
              <FailIcon />
            ) : (
              <SuccessIcon />
            )
          ) : (
            "unknown"
          );
        },
      },
    ],
    []
  );

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;
  else
    return (
      <>
        {typeof data !== "object" || data === undefined || Object.keys(data).length === 1 || data.status !== 200 ? (
          <>
            <div className="chart mb-3" style={{ height: "300px" }}>
              <div className="chart-label-text">Opsera: CD Status</div>
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
            <div className="mt-3 d-flex justify-content-between">
              <div className="h6 activity-label-text mb-2">Opsera: CD Status</div>
            </div>
            <CustomTable
              columns={columns}
              data={data.data}
              rowStyling={""}
              noDataMessage={noDataMessage}
              noFooter={true}
            ></CustomTable>
          </>
        )}
      </>
    );
}

OpseraRecentCDTable.propTypes = {
  date: PropTypes.object,
};

export default OpseraRecentCDTable;
