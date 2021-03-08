import React, { useMemo, useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import ErrorDialog from "components/common/status_notifications/error";
import { format } from "date-fns";
import CustomTable from "components/common/table/CustomTable";
import "components/analytics/charts/charts.css";

function GithubPendingMergeRequests({ date, tags }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const noDataMessage = "No Data is available for this chart at this time";
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [logCount, setLogCount] = useState(10);

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
        Header: "Author",
        accessor: "AuthorName",
      },
      {
        Header: "Assigned",
        accessor: "AssigneeName",
      },
      {
        Header: "Merge Request",
        accessor: "MergeRequestTitle",
      },
      {
        Header: "Branch",
        accessor: "BranchName",
      },
      {
        Header: "Project",
        accessor: "ProjectName",
      },
      {
        Header: "Time",
        accessor: "mrCompletionTimeTimeStamp",
        Cell: (props) => {
          return format(new Date(props.value), "yyyy-MM-dd', 'hh:mm a");
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
  }, [date]);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/metrics";
    const postBody = {
      request: "githubPendingMergeRequests",
      startDate: date.start,
      endDate: date.end,
      tags: tags,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0] : [];
      setData(dataObject);
      setLogCount(dataObject.githubPendingMergeRequests.data.length);
      setLoading(false);
    } catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;

  return (
    <>
      {typeof data !== "object" ||
      data.githubPendingMergeRequests === undefined ||
      data.githubPendingMergeRequests.status !== 200 ? (
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
          <div className="mt-3 d-flex justify-content-between"></div>
          <CustomTable
            columns={columns}
            data={data.githubPendingMergeRequests.data}
            rowStyling={""}
            noDataMessage={noDataMessage}
          ></CustomTable>
        </>
      )}
    </>
  );
}

export default GithubPendingMergeRequests;
