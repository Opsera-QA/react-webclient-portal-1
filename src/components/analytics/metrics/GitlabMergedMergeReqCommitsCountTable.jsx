import React, { useMemo, useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ErrorDialog from "../../common/status_notifications/error";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import CustomTable from "../../common/table/CustomTable";
import PropTypes from "prop-types";

function GitlabMergedMergeReqCommitsCountTable({ date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const noDataMessage = "No Data is available for this chart at this time";
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [logCount, setLogCount] = useState(10);

  // const initialState = {
  //   pageIndex: 0,
  //   sortBy: [
  //     {
  //       id: "Time",
  //       desc: false,
  //     },
  //   ],
  // };

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
        // Cell: (props) => {
        //     return props.value ?  <>
        //     <div>
        //       <span style={{ fontWeight: "bold" }}>{props.value} &nbsp;</span>
        //       <span
        //         title="Number of commits"
        //         style={{
        //           boxSizing: "border-box",
        //           fontSize: "12px",
        //           margin: "1px",
        //           lineHeight: "20px",
        //           padding: "3px",
        //           border: "1px solid #dbdbdb",
        //           borderRadius: "100px",
        //           fontWeight: "400",
        //         }}
        //         className=""
        //       >
        //         {/* commits: {value["TotalCommits"]} */}
        //       </span>
        //     </div>
        //     <span style={{ color: "grey" }}>
        //       {/* {value["MergeRequestTitle"].length > 70
        //         ? value["MergeRequestTitle"].substring(0, 50) + "..."
        //         : value["MergeRequestTitle"]} */}
        //     </span>
        //   </> :  "unknown";
        //   }
        // },
      },
      {
        Header: "Merge Request Title",
        accessor: "MergeRequestTitle",
      },
      {
        Header: "Time taken to merge (Hours)",
        accessor: "MergeRequestTimeTaken",
        class: "cell-center no-wrap-inline",
      },
      {
        Header: "Push Time (Hours)",
        accessor: "PushCodeTime",
        class: "cell-center no-wrap-inline",
      },
      {
        Header: "Branch Name",
        accessor: "BranchName",
      },
      {
        Header: "Project Name",
        accessor: "ProjectName",
      },
      {
        Header: "Time",
        accessor: "mrCompletionTimeTimeStamp",
        Cell: (props) => {
          return DateFormatHelper.formatDateAsTimestampWithoutSeconds(new Date(props.value));
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
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime",
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
      setLogCount(dataObject.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime.data.length);
      setLoading(false);
    } catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;
  if (
    typeof data !== "object" ||
    data.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime === undefined ||
    data.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime.status !== 200
  )
    return <InfoDialog message="No log activity has been captured for this dashboard yet." />;

  // console.log("data.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime.data", data);
  return (
    // <>
    //   <div className="">Time Taken To Complete Merge Request</div>
    //   {data !== undefined && data.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime.data.length > 0 ? (
    //     <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize: "small" }}>
    //       <thead>
    //         <tr>
    //           <th style={{ width: "5%" }}>Author Name</th>
    //           <th style={{ width: "4%" }}>Time taken to merge (Hours)</th>
    //           <th style={{ width: "4%" }}>Push Time (Hours)</th>
    //           <th style={{ width: "5%" }}>Branch Name</th>
    //           <th style={{ width: "5%" }}>Project Name</th>
    //           <th style={{ width: "5%" }}>Time (UTC)</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime.data.map(function (value, index) {
    //           return (
    //             <tr key={index}>
    //               <td>
    //                 <div>
    //                   <span style={{ fontWeight: "bold" }}>{value["AuthorName"]} &nbsp;</span>
    //                   <span
    //                     title="Number of commits"
    //                     style={{
    //                       boxSizing: "border-box",
    //                       fontSize: "12px",
    //                       margin: "1px",
    //                       lineHeight: "20px",
    //                       padding: "3px",
    //                       border: "1px solid #dbdbdb",
    //                       borderRadius: "100px",
    //                       fontWeight: "400",
    //                     }}
    //                     className=""
    //                   >
    //                     commits: {value["TotalCommits"]}
    //                   </span>
    //                 </div>
    //                 <span style={{ color: "grey" }}>
    //                   {value["MergeRequestTitle"].length > 70
    //                     ? value["MergeRequestTitle"].substring(0, 50) + "..."
    //                     : value["MergeRequestTitle"]}
    //                 </span>
    //               </td>
    //               <td>{value["MergeRequestTimeTaken"]}</td>
    //               <td>{value["PushCodeTime"]}</td>
    //               <td>{value["BranchName"]}</td>
    //               <td>{value["ProjectName"]}</td>
    //               <td>{DateFormatHelper.formatDateAsTimestampWithoutSeconds(new Date(value["mrCompletionTimeTimeStamp"]))}</td>
    //               {/* <td>{value["mrCompletionTimeTimeStamp"]}</td> */}
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </Table>
    //   ) : null}
    // </>
    <>
      {typeof data !== "object" ||
      data.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime === undefined ||
      data.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime.status !== 200 ? (
        <>
          <div className="chart mb-3" style={{ height: "300px" }}>
            <div className="chart-label-text">Recent Merge Requests</div>
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
            <div className="h6 activity-label-text mb-2">Recent Merge Requests</div>
          </div>
          <CustomTable
            columns={columns}
            data={data.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime.data}
            rowStyling={""}
            noDataMessage={noDataMessage}
            noFooter={true}
          ></CustomTable>
        </>
      )}
    </>
  );
}

GitlabMergedMergeReqCommitsCountTable.propTypes = {
  value: PropTypes.any,
  date: PropTypes.object
};

export default GitlabMergedMergeReqCommitsCountTable;
