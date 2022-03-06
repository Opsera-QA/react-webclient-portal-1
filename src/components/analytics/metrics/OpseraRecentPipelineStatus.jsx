import React, { useEffect, useContext, useState, useMemo } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ErrorDialog from "../../common/status_notifications/error";
import CustomTable from "../../common/table/CustomTable";
import SuccessIcon from '../../common/icons/table/SuccessIcon';
import PropTypes from "prop-types";
import FailIcon from '../../common/icons/table/FailIcon';
import { format } from "date-fns";

function OpseraRecentPipelineStatus({ date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const noDataMessage = "No Data is available for this chart at this time";

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
  }, [date]);

  const columns = useMemo(
    () => [
      {
        Header: "Pipeline Name",
        accessor: "pipeline_name",
      },
      {
        Header: "Run",
        accessor: "run_count",
        class: "no-wrap-inline",
      },
      {
        Header: "Completed At",
        accessor: "timestamp",
        Cell: function parseDate(row) {
          return format(new Date(row?.value), "yyyy-MM-dd', 'hh:mm a");
        },
      },
      {
        Header: "Duration (Mins)",
        accessor: "duration",
      },
      {
        Header: "Result",
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

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "opseraPipelineInfo",
          metric: "bar",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].opseraPipelineInfo : [];
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }
  if (loading) {
    return <LoadingDialog size="sm" />;
  } else if (error) {
    return <ErrorDialog error={error} />;
    // } else if (typeof data !== "object" || data === undefined || data.length < 1) {
    //   return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
  } else {
    return (
      <>
        {typeof data !== "object" || data === undefined || Object.keys(data).length === 1 || data.status !== 200 ? (
          <>
            <div className="chart mb-3" style={{ height: "300px" }}>
              <div className="chart-label-text">Opsera: Recent Pipeline Status</div>
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
              <div className="h6 activity-label-text mb-2">Opsera: Recent Pipeline Status</div>
            </div>
            <div>
              <CustomTable columns={columns} data={data.data} noDataMessage={noDataMessage}
                          noFooter={true} />
            </div>
          </>
        )}
      </>
    );
  }
}

OpseraRecentPipelineStatus.propTypes = {
  date: PropTypes.object,
};

export default OpseraRecentPipelineStatus;
