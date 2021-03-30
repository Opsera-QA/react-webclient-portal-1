// Analytics Software Development Tab, Developer, Node Ticket AN-153
import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ResponsiveLine } from "@nivo/line";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import "./charts.css";
import InfoDialog from "../../common/status_notifications/info";
import ModalLogs from "../../common/modal/modalLogs";
import { defaultConfig, getColor, assignIssueColors } from "../../insights/charts/charts-views";
import ChartTooltip from '../../insights/charts/ChartTooltip';

function JiraIssuesCreatedByDateLineChart({ persona, date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "jiraIssuesCreatedByDate",
          metric: "stacked",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].jiraIssuesCreatedByDate : [];
      assignIssueColors(dataObject?.data);
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
    }
  }, [contextType, date]);

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
  }, [fetchData]);

  //This needs to be more intelligent than just checking for precense of data.  Node can return a status 400 error from ES, and that would fail this.
  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<ErrorDialog  error="No Data is available for this chart at this time." />);
  return (
    <>
      <ModalLogs
        header="Issues Created vs. Resolved"
        size="lg"
        jsonMessage={data.data}
        dataType="line"
        show={showModal}
        setParentVisibility={setShowModal}
      />

      <div className="chart mb-3" style={{ height: "300px" }}>
        <div className="chart-label-text">Jira: Issues Created vs. Resolved</div>
        {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
          <div
            className="max-content-width p-5 mt-5"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        ) : (
          <ResponsiveLine
            {...defaultConfig("Number of Issues", "Date", 
                        false, true, "wholeNumbers", "monthDate2")}
            data={data ? data.data : []}
            onClick={() => setShowModal(true)}
            xScale={{
              type: "time",
              format: "%Y-%m-%d",
            }}
            xFormat="time:%Y-%m-%d"
            yScale={{
              type: "linear",
              stacked: false,
            }}
            colors={getColor}
            tooltip={(node) => <ChartTooltip 
                                  titles = {["Date", node.point.serieId]}
                                  values = {[node.point.data.xFormatted, node.point.data.yFormatted]} />}
          />
        )}
      </div>
    </>
  );
}
JiraIssuesCreatedByDateLineChart.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object
};

export default JiraIssuesCreatedByDateLineChart;
