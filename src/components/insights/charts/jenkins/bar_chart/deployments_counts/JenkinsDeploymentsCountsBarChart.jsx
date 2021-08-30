// Ticket Number - AN 45 Change Failure Rate
// Worked on By - Syed Faseeh Uddin
// Sprint - Analytics Mt. Rainier
// Persona - Developer/Manager/Executive

import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "components/common/status_notifications/error";
import config from "./jenkinsDeploymentsCountsBarChartConfigs";
import "components/analytics/charts/charts.css";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import ModalLogs from "components/common/modal/modalLogs";
import { defaultConfig, getColorByData, assignBooleanColors, adjustBarWidth,
         capitalizeLegend } from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

function JenkinsDeploymentsStackedBarChart({ persona, date }) {
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
      capitalizeLegend(dataObject?.data, ["failed", "success"]);
      assignBooleanColors(dataObject.data);
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
          header="Jenkins Deployments Graph"
          size="lg"
          jsonMessage={data.data}
          dataType="bar"
          show={showModal}
          setParentVisibility={setShowModal}
        />
        <div className="new-chart mb-3" style={{ height: "300px" }}>
          {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 || data.length === 0 ? (
            <div
              className="max-content-width p-5 mt-5"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
          ) : (
            <ResponsiveBar
              data={data ? data.data : []}
              {...defaultConfig("Deployment Count", "Date", 
                      false, true, "values", "yearMonthDate")}
              {...config(getColorByData)}
              {...adjustBarWidth(data?.data)}
              onClick={() => setShowModal(true)}
              tooltip={({ indexValue, color, value, id, data }) => <ChartTooltip 
                              titles = {["Build Time", `${capitalizeFirstLetter(id)} Builds`, "Failure Rate"]}
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

JenkinsDeploymentsStackedBarChart.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object,
};

export default JenkinsDeploymentsStackedBarChart;
