import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./InNetworkTrafficByTimeLineChartConfigs";
import "./charts.css";
import ModalLogs from "../../common/modal/modalLogs";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ErrorDialog from "../../common/status_notifications/error";
import { defaultConfig, getColor, assignStandardColors,
         shortenLegend } from "../../insights/charts/charts-views";
import ChartTooltip from '../../insights/charts/ChartTooltip';

function InNetworkTrafficByTimeLineChart({ persona, date }) {
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
          request: "InNetworkTrafficByTime",
          metric: "line",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].InNetworkTrafficByTime : [];
      assignStandardColors(dataObject?.data);
      shortenLegend(dataObject?.data);
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
    }
  }, [contextType]);

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
  }, [fetchData, date]);

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;
  return (
    <>
      <ModalLogs
        header="In Network Usage"
        size="lg"
        jsonMessage={data.data}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />

      <div className="chart mb-3" style={{ height: "300px" }}>
        <div className="chart-label-text">In Network Usage</div>
        {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
          <div
            className="max-content-width p-5 mt-5"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        ) : (
          <ResponsiveLine
            {...defaultConfig("In Network Usage (MB)", "Time", true, true, "", "dateTime")}
            data={data ? data.data : []}
            onClick={() => setShowModal(true)}
            colors={getColor}
            indexBy="x"
            margin={{ top: 50, right: 110, bottom: 80, left: 120 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
            pointLabel="y"
            tooltip={({ point, color }) => <ChartTooltip 
                                  titles = {["Date & Time", "Node name", "In network usage"]}
                                  values = {[String(point.data.xFormatted), point.serieId, point.data.y + "MB"]}
                                  color={color} />}
          />
        )}
      </div>
    </>
  );
}

InNetworkTrafficByTimeLineChart.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object
};

export default InNetworkTrafficByTimeLineChart;
