import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import "./charts.css";
import ModalLogs from "../../common/modal/modalLogs";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ErrorDialog from "../../common/status_notifications/error";
import { defaultConfig, getColor, assignStandardColors,
         shortenLargeChartLegend } from "../../insights/charts/charts-views";
import ChartTooltip from '../../insights/charts/ChartTooltip';

function CpuUsageByTimeLineChart({ persona, date }) {
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
          request: "cpuUsageByTime",
          metric: "line",
        },
      ],
      startDate: date.start,
      endDate: date.end,
      // podName: "prometheus-alertmanager-d47577c4b-7lhhj",
      // podName: "ip-192-168-253-154.us-west-2.compute.internal",
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].cpuUsageByTime : [];
      assignStandardColors(dataObject?.data);
      shortenLargeChartLegend(dataObject?.data);
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
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<div style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}><ErrorDialog error="No Data is available for this chart at this time." /></div>);

  return (
    <>
      <ModalLogs
        header="CPU Usage"
        size="lg"
        jsonMessage={data.data}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />

      <div className="chart mb-3" style={{ height: "300px" }}>
        <div className="chart-label-text">CPU Usage</div>
        {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
          <div
            className="max-content-width p-5 mt-5"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        ) : (
          <ResponsiveLine
            {...defaultConfig("CPU Usage (%)", "Time", true, true, "", "dateTime")}
            data={data ? data.data : []}
            onClick={() => setShowModal(true)}
            colors={getColor}
            indexBy="x"
            margin={{ top: 50, right: 110, bottom: 80, left: 120 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
            legends={[{
              "anchor": "top-right",
              "direction": "row",
              "justify": false,
              "translateX": 0,
              "translateY": -25,
              "itemsSpacing": 60,
              "itemDirection": "right-to-left",
              "itemWidth": 60,
              "itemHeight": 20,
              "symbolSize": 10,
              "symbolShape": "square",
              "symbolBorderColor": "rgba(0, 0, 0, .5)"
            }]}
            tooltip={({ point, color }) => <ChartTooltip 
                                  titles = {["Date & Time", "Node name", "CPU usage"]}
                                  values = {[String(point.data.xFormatted), point.serieId, point.data.y + "%"]}
                                  color={color} />}
          />
        )}
      </div>
    </>
  );
}
CpuUsageByTimeLineChart.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object
};

export default CpuUsageByTimeLineChart;
