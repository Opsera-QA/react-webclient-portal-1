// Ticket Number - AN 43 Deployment Frequency
// Worked on By - Shrey Malhotra
// Sprint - Analytics Mt. Rainier

import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import ErrorDialog from "../../common/status_notifications/error";
import "./charts.css";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ModalLogs from "../../common/modal/modalLogs";
import { defaultConfig, getColor, assignBooleanColors } from "../../insights/charts/charts-views";
import ChartTooltip from "../../insights/charts/ChartTooltip";

function MaintainabilityLineChart({ persona, date }) {
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
          request: "successfulDeploymentFrequency",
          metric: "stacked",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].successfulDeploymentFrequency : [];
      assignBooleanColors(dataObject?.data);
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      // console.log(err.message);
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
          // console.log("Request was canceled via controller.abort");
          return;
        }
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, [fetchData, date]);

  if (loading) {
    return <LoadingDialog size="sm" />;
  } else if (error) {
    return <ErrorDialog error={error} />;
    // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
    //   return (<div style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}><ErrorDialog error="No Data is available for this chart at this time." /></div>);
  } else {
    return (
      <>
        <ModalLogs
          header="Deployments Graph"
          size="lg"
          jsonMessage={data.data}
          dataType="bar"
          show={showModal}
          setParentVisibility={setShowModal}
        />

        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Jenkins: Deployment Frequency</div>
          {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
            <div
              className="max-content-width p-5 mt-5"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
          ) : (
            <ResponsiveLine
              {...defaultConfig("Number of Deployments", "Date", 
                false, true, "wholeNumbers", "monthDate")}
              data={data ? data.data : []}
              indexBy="date"
              xScale={{
                type: "time",
                format: "%Y-%m-%d",
                precision: "day",
              }}
              yScale={{ 
                type: "linear", 
                min: 0, 
                max: "auto", 
                stacked: false
              }}
              colors={getColor}  
              onClick={() => setShowModal(true)}
              tooltip={({ point, color }) => <ChartTooltip 
                titles = {["Number of Deployments"]}
                values = {[point.data.y]}
                color = {color} />}
            />
          )}
        </div>
      </>
    );
  }
}
MaintainabilityLineChart.propTypes = {
  date: PropTypes.object,
  persona: PropTypes.string,
};

export default MaintainabilityLineChart;
