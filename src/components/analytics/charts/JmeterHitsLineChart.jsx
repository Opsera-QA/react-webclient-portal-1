// Ticket Number - AN 47 Reliability
// Worked on By - Syed Faseeh Uddin
// Sprint - Analytics Mt. Rainier
// Persona - Developer

import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import ErrorDialog from "../../common/status_notifications/error";
import "./charts.css";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ModalLogs from "../../common/modal/modalLogs";
import { defaultConfig, getColor, assignStandardColors } from "../../insights/charts/charts-views";
import ChartTooltip from "../../insights/charts/ChartTooltip";

function JMeterHitsLineChart({ persona, date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await getApiData();
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

  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "jmeterHits",
          metric: "line",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].jmeterHits : [];
      assignStandardColors(dataObject?.data, true);
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
    }
  };

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<ErrorDialog error="No Data is available for this chart at this time." />);
  else
    return (
      <>
        <ModalLogs
          header="Hits"
          size="lg"
          jsonMessage={data.data}
          dataType="line"
          show={showModal}
          setParentVisibility={setShowModal}
        />

        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">JMeter: Hits</div>
          {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
            <div
              className="max-content-width p-5 mt-5"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
          ) : (
            <ResponsiveLine
              {...defaultConfig("Hits", "Build Number", true, false, "wholeNumbers", "")}
              data={data ? data.data : []}
              onClick={() => setShowModal(true)}
              colors={getColor}
              tooltip={({ point, color }) => <ChartTooltip 
                titles = {["Build ID", "Hits"]}
                values = {[point.data.x, point.data.y]}
                color = {color} />}
            />
          )}
        </div>
      </>
    );
}
JMeterHitsLineChart.propTypes = {
  date: PropTypes.object,
  persona: PropTypes.string,
};

export default JMeterHitsLineChart;
