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
import { ISSUE_TYPE } from "./aquasec.constants";
import {getTrend} from "../charts-helpers";

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
          "aquasecSecurityInsightsBaseKPI",
          kpiConfiguration,
          dashboardTags,
          null,
          null,
          dashboardOrgs,
      );

      const dataObject = response?.data
          ? response?.data?.data[0][0]
          : [];

      if (isMounted?.current === true && dataObject) {
        setDataMetrics(dataObject);
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
        severity={stat}
      />
    );
  };

  const getChartBody = () => {
    if (
      dataMetrics.length === 0 ||
      !dataMetrics
    ) {
      return null;
    }

    return (
      <Container className="new-chart mb-3" style={{ minHeight: "300px" }}>
        <Row className="justify-content-center">
          <Col xs={6} sm={4}>
            <AquasecIssuesOverallTrendDataBlock
              score={dataMetrics?.negligibleIssues}
              severity={ISSUE_TYPE.NEGLIGIBLE}
              trend={getTrend(dataMetrics?.negligibleIssues, dataMetrics?.prevNegligible)}
              onSelect={onRowSelect}
              lastScore={dataMetrics.prevNegligible}
            />
          </Col>
          <Col xs={6} sm={4}>
            <AquasecIssuesOverallTrendDataBlock
              score={dataMetrics?.lowIssues}
              severity={ISSUE_TYPE.LOW}
              trend={getTrend(dataMetrics?.lowIssues, dataMetrics?.prevLow)}
              onSelect={onRowSelect}
              lastScore={dataMetrics.prevLow}
            />
          </Col>
          <Col xs={6} sm={4}>
            <AquasecIssuesOverallTrendDataBlock
              score={dataMetrics?.mediumIssues}
              severity={ISSUE_TYPE.MEDIUM}
              trend={getTrend(dataMetrics?.mediumIssues, dataMetrics?.prevMedium)}
              onSelect={onRowSelect}
              lastScore={dataMetrics.prevMedium}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs={6} sm={4}>
            <AquasecIssuesOverallTrendDataBlock
              score={dataMetrics?.highIssues}
              severity={ISSUE_TYPE.HIGH}
              trend={getTrend(dataMetrics?.highIssues, dataMetrics?.prevHigh)}
              onSelect={onRowSelect}
              lastScore={dataMetrics.prevHigh}
            />
          </Col>
          <Col xs={6} sm={4}>
            <AquasecIssuesOverallTrendDataBlock
              score={dataMetrics?.criticalIssues}
              severity={ISSUE_TYPE.CRITICAL}
              trend={getTrend(dataMetrics?.criticalIssues, dataMetrics?.prevCritical)}
              onSelect={onRowSelect}
              lastScore={dataMetrics.prevCritical}
            />
          </Col>
        </Row>
        {/*<div className={"mt-3"}>*/}
        {/*  <AquasecTopProjectsByIssueType type={ISSUE_TYPE.HIGH} projects={metrics[0]?.highIssues} />*/}
        {/*  <AquasecTopProjectsByIssueType type={ISSUE_TYPE.MEDIUM} projects={metrics[0]?.mediumIssues} />*/}
        {/*  <AquasecTopProjectsByIssueType type={ISSUE_TYPE.LOW} projects={metrics[0]?.lowIssues} />*/}
        {/*</div>*/}
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
