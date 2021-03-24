import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./metricbeatInNetworkTrafficByTimeLineChartConfigs";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import ErrorDialog from "components/common/status_notifications/error";

function MetricbeatInNetworkTrafficByTimeLineChart({ persona, date ,tags }) {
  const contextType = useContext(AuthContext);
  const {featureFlagHideItemInProd, featureFlagHideItemInTest} = useContext(AuthContext);
  const envIsProd = featureFlagHideItemInProd();
  const envIsTest = featureFlagHideItemInTest(); 
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    let apiUrl = "/analytics/metrics";
    let postBody = {
      request: "metricbeatInNetworkTrafficByTime",
      startDate: date.start,
      endDate: date.end,
      tags: tags
    };
    if (envIsProd || envIsTest) {
      apiUrl = "/analytics/data";
      postBody = {
        data: [
          {
            request: "InNetworkTrafficByTime",
            metric: "line",
          },
        ],
        startDate: date.start,
        endDate: date.end,
      };
    }

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = (envIsProd || envIsTest) ? res && res.data ? res.data.data[0].InNetworkTrafficByTime : [] : res && res.data ? res.data.data[0].metricbeatInNetworkTrafficByTime : [];
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
        jsonMessage={data?.data}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />

      <div className="new-chart mb-3" style={{ height: "300px" }}>
        {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
          <div
            className="max-content-width p-5 mt-5"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        ) : (
          <ResponsiveLine
            data={data ? data.data : []}
            onClick={() => setShowModal(true)}
            indexBy="x"
            margin={{ top: 50, right: 110, bottom: 80, left: 120 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
            axisTop={null}
            axisRight={null}
            enableArea={false}
            axisBottom={config.axisBottom}
            axisLeft={config.axisLeft}
            pointSize={10}
            pointBorderWidth={8}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            lineWidth={3.5}
            legends={config.legends}
            colors={{ scheme: "category10" }}
            tooltip={({ point, color }) => (
              <div
                style={{
                  background: "white",
                  padding: "9px 12px",
                  border: "1px solid #ccc",
                }}
              >
                <strong style={{ color }}> Date & Time: </strong> {String(point.data.x)}
                <br></br>
                <strong style={{ color }}> Node Name: </strong> {point.serieId}
                <br></br>
                <strong style={{ color }}> In Network usage: </strong> {point.data.y + "MB"}
              </div>
            )}
            theme={{
              tooltip: {
                container: {
                  fontSize: "16px",
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
}

MetricbeatInNetworkTrafficByTimeLineChart.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object,
  tags: PropTypes.array
};

export default MetricbeatInNetworkTrafficByTimeLineChart;
