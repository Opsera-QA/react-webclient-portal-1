import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import InfoDialog from "../../common/status_notifications/info";
// import config from "./opseraBuildDurationBarChartConfigs";
import "./charts.css";
import ModalLogs from "../../common/modal/modalLogs";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import { defaultConfig, getColor, assignStandardColors, 
         adjustBarWidth, capitalizeLegend } from '../../insights/charts/charts-views';
import ChartTooltip from '../../insights/charts/ChartTooltip';
function OpseraBuildDurationBarChart({ persona, date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [exist, setExist] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "opseraPipelineDuration",
          metric: "bar",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res?.data?.data[0] ? res.data.data[0].opseraPipelineDuration : [];
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
        if (err.name === "AbortError") return;
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<div style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}><ErrorDialog error="No Data is available for this chart at this time." /></div>);

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
        <div className="chart-label-text">Opsera: Pipeline Duration</div>
        {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
          <div
            className="max-content-width p-5 mt-5"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        ) : (
          <ResponsiveBar
            {...defaultConfig('Duration (Minutes)', 'Pipeline Run', 
                      false, false, 'wholeNumbers', 'values')}
            {...adjustBarWidth(data ? data.data : [])}
            data={data ? data.data : []}
            keys={["Value"]}
            layout="vertical"
            indexBy="item_number"
            onClick={() => setShowModal(true)}
            colorBy="id"
            colors={d => getColor(d.data)}
            tooltip={({ value, color }) => <ChartTooltip 
                                            titles = {["Duration"]}
                                            values = {[`${value} minutes`]}
                                            style = {false}
                                            color = {color} />}
          />
        )}
      </div>
    </>
  );
}

OpseraBuildDurationBarChart.propTypes = {
  date: PropTypes.object,
  persona: PropTypes.string
};

export default OpseraBuildDurationBarChart;
