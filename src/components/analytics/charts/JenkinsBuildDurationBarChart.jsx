import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import InfoDialog from "../../common/status_notifications/info";
import "./charts.css";
import ModalLogs from "../../common/modal/modalLogs";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import { defaultConfig, getColorByData, assignStandardColors, adjustBarWidth,
         capitalizeLegend } from "../../insights/charts/charts-views";
import ChartTooltip from "../../insights/charts/ChartTooltip";

function JenkinsBuildDurationBarChart({ persona, date }) {
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
          request: "jenkinsBuildDuration",
          metric: "bar",
          index: "jenkins-pipeline*",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].jenkinsBuildDuration : [];
      assignStandardColors(dataObject?.data, true);
      capitalizeLegend(dataObject?.data, ["value"]);
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
        if (err.name === "AbortError")
          //console.log("Request was canceled via controller.abort");
          return;
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  if (loading) return <LoadingDialog size="sm" />;
  else if (error) return <ErrorDialog error={error} />;
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<div style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}><ErrorDialog error="No Data is available for this chart at this time." /></div>);
  else
    return (
      <>
        <ModalLogs
          header="Build Duration"
          size="lg"
          jsonMessage={data ? data.data : []}
          dataType="bar"
          show={showModal}
          setParentVisibility={setShowModal}
        />

        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Jenkins: Build Duration</div>
          {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
            <div
              className="max-content-width p-5 mt-5"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
          ) : (
            <ResponsiveBar
              {...defaultConfig("Build Duration (Minutes)", "Build Number", 
                      false, false, "wholeNumbers", "numbers")}
              {...adjustBarWidth(data ? data.data : [])}
              data={data ? data.data : []}
              keys={["Value"]}
              indexBy="key"
              colorBy="id"
              colors={getColorByData}
              onClick={() => setShowModal(true)}
              tooltip={({ data, value, color }) => <ChartTooltip 
                              titles = {["Duration", "Build Number", "Job Name"]}
                              values = {[`${value} minutes`, data.buildNum, data.jobName]}
                              style = {false}
                              color = {color} />}
            />
          )}
        </div>
      </>
    );
}

JenkinsBuildDurationBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string,
};

export default JenkinsBuildDurationBarChart;
