import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { DialogToastContext } from "contexts/DialogToastContext";
import AquasecIssuesBySeverityHelpDocumentation from "components/common/help/documentation/insights/charts/AquasecIssuesBySeverityHelpDocumentation";
import AquasecActionableInsightsOverlay from "./actionable_insights/AquasecActionableInsightsOverlay";
import AquasecIssuesOverallTrendDataBlock from "./AquasecIssuesOverallTrendDataBlock";
import AquasecTopProjectsByIssueType from "./AquasecTopProjectsByIssueType";
import { ISSUE_TYPE } from "./aquasec.constants";

function AquasecIssuesBySeverity({
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
        title={`${stat} Severity Insights`}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        coveritySeverity={stat}
      />
    );
  };

  const getChartBody = () => {
    if (
      !Array.isArray(metrics) ||
      metrics.length === 0 ||
      !dataMetrics ||
      Object.keys(dataMetrics).length === 0
    ) {
      return null;
    }

    const negligibleScore = dataMetrics.negligibleIssues?.length > 0 ? dataMetrics.negligibleIssues[0]?.DataBlocks[0]?.totalIssues : 0;
    const lowScore = dataMetrics.lowIssues?.length > 0 ? dataMetrics.lowIssues[0]?.DataBlocks[0]?.totalIssues : 0;
    const mediumScore = dataMetrics.mediumIssues?.length > 0 ? dataMetrics.mediumIssues[0]?.DataBlocks[0]?.totalIssues : 0;
    const highScore = dataMetrics.highIssues?.length > 0 ? dataMetrics.highIssues[0]?.DataBlocks[0]?.totalIssues : 0;
    const criticalScore = dataMetrics.criticalIssues?.length > 0 ? dataMetrics.criticalIssues[0]?.DataBlocks[0]?.totalIssues : 0;

    return (
      <Container className="new-chart mb-3" style={{ minHeight: "300px" }}>
        <Row className="justify-content-center">
          <Col xs={6} sm={4}>
            <AquasecIssuesOverallTrendDataBlock
              score={negligibleScore}
              severity={ISSUE_TYPE.NEGLIGIBLE}
              trend={metrics[0].overallLowTrend}
              onSelect={onRowSelect}
              lastScore={metrics[0].prevNegligible}
            />
          </Col>
          <Col xs={6} sm={4}>
            <AquasecIssuesOverallTrendDataBlock
              score={lowScore}
              severity={ISSUE_TYPE.LOW}
              trend={metrics[0].overallLowTrend}
              onSelect={onRowSelect}
              lastScore={metrics[0].previousTotalLow}
            />
          </Col>
          <Col xs={6} sm={4}>
            <AquasecIssuesOverallTrendDataBlock
              score={mediumScore}
              severity={ISSUE_TYPE.MEDIUM}
              trend={metrics[0].overallMediumTrend}
              onSelect={onRowSelect}
              lastScore={metrics[0].previousTotalMedium}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs={6} sm={4}>
            <AquasecIssuesOverallTrendDataBlock
              score={highScore}
              severity={ISSUE_TYPE.HIGH}
              trend={metrics[0].overallHighTrend}
              onSelect={onRowSelect}
              lastScore={metrics[0].previousTotalHigh}
            />
          </Col>
          <Col xs={6} sm={4}>
            <AquasecIssuesOverallTrendDataBlock
              score={criticalScore}
              severity={ISSUE_TYPE.CRITICAL}
              trend={metrics[0].overallHighTrend}
              onSelect={onRowSelect}
              lastScore={metrics[0].prevCritical}
            />
          </Col>
        </Row>
        <div className={"mt-3"}>
          <AquasecTopProjectsByIssueType type={ISSUE_TYPE.HIGH} projects={metrics[0]?.highIssues} />
          <AquasecTopProjectsByIssueType type={ISSUE_TYPE.MEDIUM} projects={metrics[0]?.mediumIssues} />
          <AquasecTopProjectsByIssueType type={ISSUE_TYPE.LOW} projects={metrics[0]?.lowIssues} />
        </div>
      </Container>
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
        header="Aquasec Issues By Severity"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

AquasecIssuesBySeverity.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default AquasecIssuesBySeverity;
