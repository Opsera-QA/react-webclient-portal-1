import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  faArrowCircleDown,
  faArrowCircleUp,
  faMinusCircle,
} from "@fortawesome/pro-solid-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import GitScrapperActionableInsightOverlay from "./actionable_insights/GitScrapperActionableInsightOverlay";
import GitScrapperOverallScannedRepositoriesTrendDataBlock from "./data_blocks/overall_scanned_repositories_trend/GitScrapperOverallScannedRepositoriesTrendDataBlock";
import GitScrapperOverallCleanRepositoriesTrendDataBlock from "./data_blocks/overall_clean_repositories_trend/GitScrapperOverallCleanRepositoriesTrendDataBlock";
import GitScrapperOverallIssuesTrendDataBlock from "./data_blocks/overall_issues_trend/GitScrapperOverallIssuesTrendDataBlock";
import GitScrapperMetricsHelpDocumentation from "components/common/help/documentation/insights/charts/GitScrapperMetricsHelpDocumentation";
import {ResponsiveLine} from "@nivo/line";
import {adjustBarWidth, defaultConfig} from "../charts-views";
import config from "./gitScraperLineChartConfig";
import {METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY} from "../../../common/helpers/metrics/metricTheme.helpers";
import ChartTooltip from "../ChartTooltip";
function GitScrapperMetrics({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [lineChart, setLineChart] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
        ]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "organizations",
          )
        ]?.value;

      const response = await chartsActions.getGitScraperMetrics(
        kpiConfiguration,
        getAccessToken,
        cancelSource,
        dashboardTags,
        dashboardOrgs,
      );

      const dataObject =
        response?.data && response?.status === 200
          ? response?.data?.data?.getGitScraperDataBlockMetrics?.data
          : [];
      const lineChart =
          response?.data && response?.status === 200
            ? response?.data?.data?.gitScraperLineChartFrequency?.data
            : [];

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setLineChart(lineChart);
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

  const onRowSelect = (data) => {
    toastContext.showOverlayPanel(
      <GitScrapperActionableInsightOverlay
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        title={data?.label}
        gitScrapperType={data?.type}
      />,
    );
  };

  const getIcon = (severity) => {
    switch (severity) {
      case "Red":
        return faArrowCircleDown;
      case "Green":
        return faArrowCircleUp;
      case "Neutral":
        return faMinusCircle;
      default:
        break;
    }
  };

  const getIconColor = (severity) => {
    switch (severity) {
      case "Red":
        return "red";
      case "Green":
        return "green";
      case "Neutral":
        return "light-gray-text-secondary";
      case "-":
        return "black";
      default:
        break;
    }
  };

  const getIconIssuesTrend = (severity) => {
    switch (severity) {
      case "Red":
        return faArrowCircleUp;
      case "Green":
        return faArrowCircleDown;
      case "Neutral":
        return faMinusCircle;
      default:
        break;
    }
  };

  const getDescription = (severity) => {
    switch (severity) {
      case "Red":
        return "The project  issues show an upward trend";
      case "Green":
        return "The project issues show a downward trend";
      case "Neutral":
        return "Neutral: This project's issues have experienced no change";
    }
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    const getDataBlocks = () =>{
      return (<><Row className={'pb-1'}>
        <Col>
          <GitScrapperOverallScannedRepositoriesTrendDataBlock
            score={metrics[0]?.current?.count || 0}
            icon={getIcon(metrics[0]?.trend?.count)}
            className={getIconColor(metrics[0]?.trend?.count)}
            // onSelect={() => onRowSelect({type: 'totalRepositoriesScanned', label: "Total Repositories Scanned"}")}
            lastScore={metrics[0]?.previous?.count}
            iconOverlayBody={getDescription(metrics[0]?.trend?.count)}
          />
        </Col>
      </Row><Row className={'pb-1 pt-1'}>
        <Col>
          <GitScrapperOverallCleanRepositoriesTrendDataBlock
            score={metrics[0]?.current?.cleanRepoCount || 0}
            icon={getIcon(metrics[0]?.trend?.cleanRepoCount)}
            className={getIconColor(metrics[0]?.trend?.cleanRepoCount)}
            onSelect={() =>
              onRowSelect({
                type: "totalCleanRepositories",
                label: "Total Clean Repositories",
              })
            }
            lastScore={metrics[0]?.previous?.cleanRepoCount}
            iconOverlayBody={getDescription(
              metrics[0]?.trend?.cleanRepoCount,
            )}
          />
        </Col>
      </Row><Row className={'pb-1 pt-1'}>
        <Col>
          <GitScrapperOverallIssuesTrendDataBlock
            score={metrics[0]?.current?.issueCount || 0}
            icon={getIconIssuesTrend(metrics[0]?.trend?.issueCount)}
            className={getIconColor(metrics[0]?.trend?.issueCount)}
            onSelect={() =>
              onRowSelect({
                type: "totalNumberofIssues",
                label: "Total Number of Issues",
              })
            }
            lastScore={metrics[0]?.previous?.issueCount}
            iconOverlayBody={getDescription(metrics[0]?.trend?.issueCount)}
          />
        </Col>
      </Row></>
      );};

    const getChart = () =>{
      return(<Row>
        <Col md={12} sm={12} lg={12} >
          <div className="chart" style={{ height: "354px" }} >
            <ResponsiveLine
              data={lineChart}
              {...defaultConfig(
                "Count",
                "Date",
                false,
                false,
                "wholeNumbers",
                "monthDate2",
              )}
              {...config(METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY)}
              {...adjustBarWidth(metrics)}
              tooltip={({point, color}) => <ChartTooltip
                titles = {["Date", "Deployments"]}
                values = {[String(point.data.xFormatted), point.data.y]}
                color = {color} />}
            />
          </div>
        </Col>
      </Row>);
    };

    return (
      <>
        <div className="new-chart m-3">
          <Row>
            <Col md={3} sm={6} lg={3}>{getDataBlocks()}</Col>
            <Col md={9} sm={6} lg={9}>{getChart()}</Col>
          </Row>
        </div>
      </>
    );
  };

  return (
    <div>
      <ChartContainer
        title={kpiConfiguration?.kpi_name}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        tableChart={true}
        chartHelpComponent={(closeHelpPanel) => (
          <GitScrapperMetricsHelpDocumentation closeHelpPanel={closeHelpPanel} />
        )}
      />
      <ModalLogs
        header="Git Custodian Metrics"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

GitScrapperMetrics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default GitScrapperMetrics;
