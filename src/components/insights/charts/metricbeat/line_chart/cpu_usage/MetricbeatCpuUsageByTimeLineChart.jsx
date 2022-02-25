import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./metricbeatCpuUsageByTimeLineChartConfigs";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import React, {useState, useEffect, useContext, useCallback, useRef} from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import ErrorDialog from "components/common/status_notifications/error";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";

function MetricbeatCpuUsageByTimeLineChart({ persona, date , tags}) {
  const {featureFlagHideItemInProd, featureFlagHideItemInTest, getAccessToken} = useContext(AuthContext);
  const envIsProd = featureFlagHideItemInProd();
  const envIsTest = featureFlagHideItemInTest();
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;

    if (date) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [date]);

  const loadData = async (cancelSource) => {
    try {
      setLoading(true);
      if (envIsProd || envIsTest) {
        const response = await chartsActions.getLegacyChartData(getAccessToken, cancelSource,"cpuUsageByTime", "line", date);
        const dataObject = response?.data?.data[0]?.cpuUsageByTime || [];
        setData(dataObject);
      }
      else {
        const postBody = {
          request: "metricbeatCpuUsageByTime",
          startDate: date.start,
          endDate: date.end,
          tags: tags
        };

        const response = await chartsActions.getLegacyMetrics(getAccessToken, cancelSource, postBody);
        const dataObject = response?.data?.data[0]?.metricbeatCpuUsageByTime || [];
        setData(dataObject);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
    }
  };

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<div style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}><ErrorDialog error="No Data is available for this chart at this time." /></div>);

  return (
    <>
      <ModalLogs
        header="CPU Usage"
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
                <strong style={{ color }}> CPU usage: </strong> {point.data.y + "%"}
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
MetricbeatCpuUsageByTimeLineChart.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object,
  tags: PropTypes.array
};

export default MetricbeatCpuUsageByTimeLineChart;
