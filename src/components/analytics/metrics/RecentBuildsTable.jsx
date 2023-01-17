import React, { useEffect, useContext, useState, useMemo } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ErrorDialog from "../../common/status_notifications/error";
// import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import SuccessIcon from '../../common/icons/table/SuccessIcon';
import FailIcon from '../../common/icons/table/FailIcon';
import CustomTable from "../../common/table/CustomTable";

function RecentBuildsTable({ date }) {
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
        class: "no-wrap-inline",
      },
      {
        Header: "Build Number",
        accessor: "data_buildNum",
      },
      {
        Header: "Completed At",
        accessor: "timestamp",
        Cell: function parseDate(row) {
          return DateFormatHelper.formatDateAsTimestampWithoutSeconds(new Date(row?.value));
        },
      },
      {
        Header: "Result",
        accessor: "data_result",
        Cell: function parseStatus(row) {
          return row?.value ? (
            row?.value === "Failure" || row?.value === "failed" ? (
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
    const apiUrl = "/analytics/activity";
    const postBody = {
      requests: ["jenkinsBuildRecent"],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res : [];
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
            <div className="chart mb-3" style={{ height: "300px" }}>
              <div className="chart-label-text">Jenkins: Recent Build Status</div>
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
              <div className="h6 activity-label-text mb-2">Jenkins: Recent Build Status</div>
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

RecentBuildsTable.propTypes = {
  date: PropTypes.object,
};

export default RecentBuildsTable;
