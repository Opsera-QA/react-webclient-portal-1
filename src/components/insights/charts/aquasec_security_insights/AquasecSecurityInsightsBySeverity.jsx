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
} from "@fortawesome/free-solid-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import AquasecIssuesBySeverityHelpDocumentation from "components/common/help/documentation/insights/charts/AquasecIssuesBySeverityHelpDocumentation";
import AquasecActionableInsightsOverlay from "./actionable_insights/AquasecActionableInsightsOverlay";
import CoverityIssuesOverallLowTrendDataBlock from "components/insights/charts/coverity/CoverityIssuesByCategory/data_blocks/overall_low_trend/CoverityIssuesOverallLowTrendDataBlock";
import CoverityIssuesOverallMediumTrendDataBlock from "components/insights/charts/coverity/CoverityIssuesByCategory/data_blocks/overall_medium_trend/CoverityIssuesOverallMediumTrendDataBlock";
import CoverityIssuesOverallHighTrendDataBlock from "components/insights/charts/coverity/CoverityIssuesByCategory/data_blocks/overall_high_trend/CoverityIssuesOverallHighTrendDataBlock";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import IconBase from "components/common/icons/IconBase";

function AquasecSecurityInsightsBySeverity({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [dataMetrics, setDataMetrics] = useState([]);
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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
          getAccessToken,
          cancelSource,
          "overallCoverityIssuesTrend",
          kpiConfiguration,
          dashboardTags,
          null,
          null,
          dashboardOrgs,
        ),
        responseBaseKPIBlockValues =
          await chartsActions.parseConfigurationAndGetChartMetrics(
            getAccessToken,
            cancelSource,
            "coverityBaseKPIDataBlocks",
            kpiConfiguration,
            dashboardTags,
            null,
            null,
            dashboardOrgs,
          );

      const dataObject = response?.data
          ? response?.data?.data[0]?.overallCoverityIssuesTrend?.data
          : [],
        dataObjectBaseKPIDataBlocks = responseBaseKPIBlockValues?.data
          ? responseBaseKPIBlockValues?.data?.data[0]?.coverityBaseKPIDataBlocks
              ?.data
          : [];

      if (
        isMounted?.current === true &&
        dataObject &&
        dataObjectBaseKPIDataBlocks
      ) {
        dataObject[0]?.docs?.sort((a, b) =>
          a.currentTotalIssues < b.currentTotalIssues
            ? 1
            : b.currentTotalIssues < a.currentTotalIssues
            ? -1
            : 0,
        );
        dataObject[0]?.docs?.slice(0, 2);

        setMetrics(dataObject);
        setDataMetrics(dataObjectBaseKPIDataBlocks);
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

  const onRowSelect = (stat) => {
    toastContext.showOverlayPanel(
      <AquasecActionableInsightsOverlay
        title={stat + " Severity Insights"}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        coveritySeverity={stat}
      />,
    );
  };

  const getIcon = (severity) => {
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

  const getIconTitle = (severity) => {
    switch (severity) {
      case "Red":
        return "Risk";
      case "Green":
        return "Success";
      case "Neutral":
        return "Same as Earlier";
      case "-":
        return "No Trend";
      default:
        break;
    }
  };

  const getDescription = (severity) => {
    switch (severity) {
      case "Red":
        return "This project's issues are trending upward";
      case "Green":
        return "This project's issues are trending downward";
      case "Neutral":
        return "Neutral: This project's issues have experienced no change";
    }
  };

  const projectsWithHighIssues = (issueType) => {
    let topThreeIssues = [];

    if (issueType === "High") {
      topThreeIssues =
        metrics[0]?.highIssues?.length > 0
          ? metrics[0]?.highIssues?.slice(0, 1)
          : [];
    } else if (issueType === "Medium") {
      topThreeIssues =
        metrics[0]?.mediumIssues?.length > 0
          ? metrics[0]?.mediumIssues?.slice(0, 1)
          : [];
    } else {
      topThreeIssues =
        metrics[0]?.lowIssues?.length > 0
          ? metrics[0]?.lowIssues?.slice(0, 1)
          : [];
    }

    if (!Array.isArray(topThreeIssues) || topThreeIssues.length === 0) {
      return null;
    }

    return (
      <HorizontalDataBlocksContainer
        title={"Top Project with " + issueType + " Issues"}
        borderColor={issueType}
      >
        {topThreeIssues.map((doc, index) => (
          <>
            <span style={{ paddingLeft: "11px" }}></span>
            <Row
              className="p-1"
              key={index}
            >
              <Col lg={12}>
                {(getIcon(doc?.projectTotalIssuesTrend) !== "Neutral") !=
                  null && (
                  <IconBase
                    icon={getIcon(doc?.projectTotalIssuesTrend)}
                    iconColor={getIconColor(doc?.projectTotalIssuesTrend)}
                    iconTitle={getIconTitle(doc?.projectTotalIssuesTrend)}
                  />
                )}
                <span style={{ paddingLeft: "2px" }}></span>
                {doc?.coverityStreamName}
              </Col>
            </Row>
          </>
        ))}
      </HorizontalDataBlocksContainer>
    );
  };

  const getChartBody = () => {
    if (
      !Array.isArray(metrics) ||
      metrics.length === 0 ||
      dataMetrics.length === 0
    ) {
      return null;
    }

    return (
      <div
        className="new-chart mb-3"
        style={{ minHeight: "300px" }}
      >
        <Container>
          <Row className="p-1 gray">
            <Col>
              <CoverityIssuesOverallLowTrendDataBlock
                score={
                  dataMetrics?.lowIssues[0]?.DataBlocks[0]?.totalIssues
                    ? dataMetrics?.lowIssues[0]?.DataBlocks[0]?.totalIssues
                    : 0
                }
                icon={getIcon(metrics[0].overallLowTrend)}
                className={getIconColor(metrics[0].overallLowTrend)}
                onSelect={() => onRowSelect("Low")}
                lastScore={metrics[0].previousTotalLow}
                iconOverlayBody={getDescription(metrics[0].overallLowTrend)}
              />
            </Col>
            <Col>
              <CoverityIssuesOverallMediumTrendDataBlock
                score={
                  dataMetrics?.mediumIssues[0]?.DataBlocks[0]?.totalIssues
                    ? dataMetrics?.mediumIssues[0]?.DataBlocks[0]?.totalIssues
                    : 0
                }
                icon={getIcon(metrics[0].overallMediumTrend)}
                className={getIconColor(metrics[0].overallMediumTrend)}
                onSelect={() => onRowSelect("Medium")}
                lastScore={metrics[0].previousTotalMedium}
                iconOverlayBody={getDescription(metrics[0].overallMediumTrend)}
              />
            </Col>
            <Col>
              <CoverityIssuesOverallHighTrendDataBlock
                score={
                  dataMetrics?.highIssues[0]?.DataBlocks[0]?.totalIssues
                    ? dataMetrics?.highIssues[0]?.DataBlocks[0]?.totalIssues
                    : 0
                }
                icon={getIcon(metrics[0].overallHighTrend)}
                className={getIconColor(metrics[0].overallHighTrend)}
                onSelect={() => onRowSelect("High")}
                lastScore={metrics[0].previousTotalHigh}
                iconOverlayBody={getDescription(metrics[0].overallHighTrend)}
              />
            </Col>
          </Row>
          {/* <div className={"mt-5"}>{getFooterLine()}</div> */}
          {<div className={"mt-5"}>{projectsWithHighIssues("High")}</div>}
          {<div>{projectsWithHighIssues("Medium")}</div>}
          {<div>{projectsWithHighIssues("Low")}</div>}
        </Container>
      </div>
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
        chartHelpComponent={(closeHelpPanel) => (
          <AquasecIssuesBySeverityHelpDocumentation
            closeHelpPanel={closeHelpPanel}
          />
        )}
      />
      <ModalLogs
        header="Aquasec Security Insights By Severity"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

AquasecSecurityInsightsBySeverity.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default AquasecSecurityInsightsBySeverity;
