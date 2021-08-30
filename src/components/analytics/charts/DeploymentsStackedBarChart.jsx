// Ticket Number - AN 45 Change Failure Rate
// Worked on By - Syed Faseeh Uddin
// Sprint - Analytics Mt. Rainier
// Persona - Developer/Manager/Executive

import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/status_notifications/error";
import "./charts.css";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ModalLogs from "../../common/modal/modalLogs";
import { defaultConfig, assignBooleanColors, adjustBarWidth,
         capitalizeLegend } from "../../insights/charts/charts-views";
import ChartTooltip from "../../insights/charts/ChartTooltip";

function DeploymentsStackedBarChart({ persona, date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getApiData = useCallback(async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "successfulDeploymentFrequency",
          metric: "stackedBar",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].successfulDeploymentFrequency : [];
      assignBooleanColors(dataObject?.data);
      capitalizeLegend(dataObject?.data, ["success", "failed"]);
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
  }, [getApiData, date]);

  if (loading) {
    return <LoadingDialog size="sm" />;
  } else if (error) {
    return <ErrorDialog error={error} />;
    // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
    //   return (<ErrorDialog error="No Data is available for this chart at this time." />);
  } else {
    // console.log(data.data);
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
          <div className="chart-label-text">Jenkins: Deployments Graph</div>
          {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 || data.length === 0 ? (
            <div
              className="max-content-width p-5 mt-5"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
          ) : (
            <ResponsiveBar
              {...defaultConfig("Deployment Count", "Date", 
                        false, true, "values", "yearMonthDate")}
              {...adjustBarWidth(data?.data)}
              data={data ? data.data : []}
              onClick={() => setShowModal(true)}
              keys={["Success", "Failed"]}
              indexBy="buildTime"
              xScale={{ type: "point" }}
              yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
              colors={({ id, data }) => data[`${id}_color`]}
              colorBy="id"
              tooltip={({ indexValue, color, value, id, data }) => <ChartTooltip 
                              titles = {["Build Time", `${id} Builds`, "Failure Rate"]}
                              values = {[indexValue, value, data?.failureRate?.toFixed(2) + "%"]}
                              style = {false}
                              color = {color} />}
            />
          )}
        </div>
      </>
    );
  }
}

DeploymentsStackedBarChart.propTypes = {
  date: PropTypes.object,
  persona: PropTypes.string,
};

export default DeploymentsStackedBarChart;
