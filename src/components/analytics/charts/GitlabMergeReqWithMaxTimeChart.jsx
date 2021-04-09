import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ResponsiveBar } from "@nivo/bar";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import config from "./GitlabMergeReqWithMaxTimeChartConfig";
import "./charts.css";
import InfoDialog from "../../common/status_notifications/info";
import ModalLogs from "../../common/modal/modalLogs";
import { defaultConfig, getColorByData, assignStandardColors, adjustBarWidth,
         spaceOutTimeTakenLegend } from "../../insights/charts/charts-views";

function GitlabMergeReqWithMaxTimeChart({ persona, date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const fetchData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "gitlabMergeReqWithMaximumTime",
          metric: "bar",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].gitlabMergeReqWithMaximumTime : [];
      assignStandardColors(dataObject?.data, true);
      spaceOutTimeTakenLegend(dataObject?.data);
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
    }
  };

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;

  return (
    <>
      <ModalLogs
        header="Merge Request with Maximum Time"
        size="lg"
        jsonMessage={data.data}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />

      <div className="chart mb-3" style={{ height: "300px" }}>
        <div className="chart-label-text">Merge Request with Maximum Time</div>
        {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
          <div
            className="max-content-width p-5 mt-5"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        ) : (
          <ResponsiveBar
            {...defaultConfig("Time (Hours)", "Project", false, true, "values", "cutoffString")}
            {...adjustBarWidth(data ? data.data : [])}
            data={data ? data.data : []}
            onClick={() => setShowModal(true)}
            keys={["Time Taken"]}
            indexBy="ProjectName"
            colorBy="id"
            colors={getColorByData}
          />
        )}
      </div>
    </>
  );
}

GitlabMergeReqWithMaxTimeChart.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object
};

export default GitlabMergeReqWithMaxTimeChart;
