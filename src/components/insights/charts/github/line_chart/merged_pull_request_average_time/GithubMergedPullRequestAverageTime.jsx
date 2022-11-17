import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import config from "./GithubMergedPullRequestAverageTimeChartConfigs.js";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import {
  faArrowCircleDown,
  faArrowCircleUp,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import ChartTooltip from "components/insights/charts/ChartTooltip.jsx";
import {
  assignStandardColors,
  assignStandardLineColors,
  defaultConfig,
  spaceOutServiceNowCountBySeverityLegend,
} from "components/insights/charts/charts-views.js";
import { DialogToastContext } from "contexts/DialogToastContext.js";
import { ResponsiveLine } from "@nivo/line";
import { metricHelpers } from "components/insights/metric.helpers";
import chartsActions from "components/insights/charts/charts-actions";
import GithubMergedPullRequestAverageTimeDataBlock from "./GithubMergedPullRequestAverageTimeDataBlock";
import IconBase from "components/common/icons/IconBase";
import { faSquare } from "@fortawesome/pro-solid-svg-icons";
import _ from "lodash";
import { smartTimeFormatter } from "components/common/helpers/date/date.helpers";
import GithubMergedPullRequestStatisticsOverlay from "components/insights/charts/github_actions/merged_pull_request_kpi/GithubMergedPullRequestStatisticsOverlay";
function GithubMergedPullRequestAverageTime({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  showSettingsToggle,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [dataBlockValues, setDataBlockValues] = useState([]);
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(dashboardData)]);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const onNodeSelect = (node) => {
    toastContext.showOverlayPanel(
      <GithubMergedPullRequestStatisticsOverlay
        data={node}
        closePanel={closePanel}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />,
    );
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(
        dashboardData?.data?.filters,
      );
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;

      const response = await chartsActions.githubMergedPullRequestAverageTime(
        kpiConfiguration,
        getAccessToken,
        cancelSource,
        dashboardTags,
        dashboardOrgs,
        dashboardFilters,
      );
      let dataObject =
        response?.data?.githubPullRequestAverageMergeTime?.data[0]?.chartData;
      let datablock =
        response?.data?.githubPullRequestAverageMergeTime?.data[0]
          ?.statisticsData;

      assignStandardColors(dataObject, true);
      spaceOutServiceNowCountBySeverityLegend(dataObject);
      assignStandardLineColors(dataObject, true);
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setDataBlockValues(datablock);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getMaxVal = (metrics) => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }
    let dataHigh = { x: "", y: 0 };
    dataHigh = _.maxBy(metrics[0].data, "y");
    const high = dataHigh?.y > 0 ? dataHigh?.y : 0;
    return Math.ceil(high);
  };

  let maxVal = getMaxVal(metrics);

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    const getIcon = (severity) => {
      switch (severity) {
        case "up":
          return faArrowCircleUp;
        case "down":
          return faArrowCircleDown;
        case "neutral":
          return faMinusCircle;
        default:
          break;
      }
    };

    const getIconColor = (severity) => {
      switch (severity) {
        case "up":
          return "green";
        case "down":
          return "red";
        case "neutral":
          return "light-gray-text-secondary";
        case "-":
          return "black";
        default:
          break;
      }
    };

    const getDataBlocks = () => {
      return (
        <>
          <Row className={"pb-2"}>
            <Col>
              <GithubMergedPullRequestAverageTimeDataBlock
                data={
                  smartTimeFormatter(
                    dataBlockValues[0]?.meanPullRequestTime,
                    "minutes",
                  )?.formattedString
                }
                lastScore={
                  smartTimeFormatter(dataBlockValues[0]?.prevData, "minutes")
                    ?.formattedString
                }
                icon={getIcon(dataBlockValues[0]?.repoTrend?.trend)}
                className={getIconColor(dataBlockValues[0]?.repoTrend?.trend)}
              />
            </Col>
          </Row>
        </>
      );
    };
    const getChart = () => {
      return (
        <div
          className="new-chart p-0"
          style={{ height: "150px" }}
        >
          <div style={{ float: "right", fontSize: "10px", marginRight: "5px" }}>
            Average Time to Merge{" "}
            <IconBase
              icon={faSquare}
              iconColor={
                METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1
              }
              iconSize={"lg"}
            />
          </div>
          <ResponsiveLine
            data={metrics}
            {...defaultConfig("", "Date", false, true, "numbers", "monthDate2")}
            {...config()}
            yScale={{
              type: "linear",
              min: "0",
              max: maxVal,
              stacked: false,
              reverse: false,
            }}
            axisLeft={{
              tickValues: [0, maxVal],
              legend: "Duration (minutes)",
              legendOffset: -38,
              legendPosition: "middle",
            }}
            onClick={(node) => onNodeSelect(node)}
            tooltip={(node) => (
              <ChartTooltip
                titles={["Date", "Duration (minutes)"]}
                values={[node.point.data.x, node.point.data.y]}
              />
            )}
          />
        </div>
      );
    };

    return (
      <>
        <div className="new-chart m-3">
          <Row>
            <Col
              md={3}
              sm={6}
              lg={3}
            >
              {getDataBlocks()}
            </Col>
            <Col
              md={9}
              sm={6}
              lg={9}
            >
              {getChart()}
            </Col>
          </Row>
        </div>
      </>
    );
  };

  return (
    <>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        showSettingsToggle={showSettingsToggle}
      />
      <ModalLogs
        header="Mean Time to Resolution"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
        O
      />
    </>
  );
}

GithubMergedPullRequestAverageTime.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  bars: PropTypes.any,
  xScale: PropTypes.any,
  yScale: PropTypes.any,
  showSettingsToggle: PropTypes.bool,
};

export default GithubMergedPullRequestAverageTime;
