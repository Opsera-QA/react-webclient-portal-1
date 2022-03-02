import React, { useMemo, useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ErrorDialog from "../../common/status_notifications/error";
import CustomTable from "../../common/table/CustomTable";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function GitlabMostActiveUsers({ date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const noDataMessage = "No Data is available for this chart at this time";
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [logCount, setLogCount] = useState(10);

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "commitCount",
        desc: true,
      },
    ],
  };

  const getPaginationOptions = () => {
    return {
      pageSize: pageSize,
      totalCount: logCount,
      currentPage: currentPage,
      gotoPageFn: gotoPage,
    };
  };

  const gotoPage = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Author Name",
        accessor: "AuthorName",
        // class: "cell-center no-wrap-inline",
        Cell: function cellStyling (row) {
          return (
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              <div>
                <IconBase icon={faStar} className={"cell-icon green"} />
              </div>
              <div className="ml-1">{row.value}</div>
            </div>
          );
        },
      },
      {
        Header: "Total Contributions (Commits)",
        accessor: "commitCount",
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
        if (err.name === "AbortError") {
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
          request: "gitlabMostActiveUsers",
          metric: "modifiedTable",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0] : [];
      setData(dataObject);
      setLogCount(dataObject.gitlabMostActiveUsers.data.length);
      setLoading(false);
    } catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;
  if (typeof data !== "object" || data.gitlabMostActiveUsers === undefined || data.gitlabMostActiveUsers.status !== 200)
    return <InfoDialog message="No log activity has been captured for this dashboard yet." />;

  return (
    <>
      {typeof data !== "object" ||
      data.gitlabMostActiveUsers === undefined ||
      data.gitlabMostActiveUsers.status !== 200 ? (
        <>
          <div className="chart mb-3" style={{ height: "300px" }}>
            <div className="chart-label-text">Most Active Contributors</div>
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
            <div className="h6 activity-label-text mb-2">Most Active Contributors</div>
          </div>
          <CustomTable
            columns={columns}
            data={data.gitlabMostActiveUsers.data}
            rowStyling={""}
            noDataMessage={noDataMessage}
            initialState={initialState}
            noFooter={true}
          ></CustomTable>
        </>
      )}
    </>
  );
}

GitlabMostActiveUsers.propTypes = {
  value: PropTypes.any,
  date: PropTypes.object
};

export default GitlabMostActiveUsers;
