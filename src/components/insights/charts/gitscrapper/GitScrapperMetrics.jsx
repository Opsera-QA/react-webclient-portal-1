import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { faArrowCircleDown, faArrowCircleUp, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import Model from "core/data_model/model";

import { DialogToastContext } from "contexts/DialogToastContext";
import GitScrapperActionableInsightOverlay from "./actionable_insights/GitScrapperActionableInsightOverlay";

import GitScrapperOverallScannedRepositoriesTrendDataBlock from "./data_blocks/overall_scanned_repositories_trend/GitScrapperOverallScannedRepositoriesTrendDataBlock";
import GitScrapperOverallCleanRepositoriesTrendDataBlock from "./data_blocks/overall_clean_repositories_trend/GitScrapperOverallCleanRepositoriesTrendDataBlock";
import GitScrapperOverallIssuesTrendDataBlock from "./data_blocks/overall_issues_trend/GitScrapperOverallIssuesTrendDataBlock";

import gitScrapperPipelineFilterMetadata from "./git-scrapper-pipeline-filter-metadata";

function GitScrapperMetrics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
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
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;

      const response = await chartsActions.getGitScraperMetrics(
        kpiConfiguration,
        getAccessToken,
        cancelSource,
        dashboardTags,
        dashboardOrgs
      );

      const dataObject = response?.data && response?.status === 200 ? response?.data?.data?.data : [];

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
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
      />
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
        return "This project's issues are trending upward";
      case "Green":
        return "This project's issues are trending downward";
      case "Neutral":
        return "Neutral: This project's issues have experienced no change";
    }
  };
  
  
  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{ minHeight: "300px" }}>
        <Container>
          <Row className="p-2 gray">
            <Col md={4} className={"px-1"}>
              <GitScrapperOverallScannedRepositoriesTrendDataBlock
                score={metrics[0]?.current?.count || 0 }
                icon={getIcon(metrics[0]?.trend?.count)}
                className={getIconColor(metrics[0]?.trend?.count)}
                // onSelect={() => onRowSelect({type: 'totalRepositoriesScanned', label: "Total Repositories Scanned"}")}
                lastScore={metrics[0]?.previous?.count}
                iconOverlayBody={getDescription(metrics[0]?.trend?.count)}
              />
            </Col>
            <Col md={4} className={"px-1"}>
              <GitScrapperOverallCleanRepositoriesTrendDataBlock
                score={metrics[0]?.current?.cleanRepoCount || 0 }
                icon={getIcon(metrics[0]?.trend?.cleanRepoCount)}
                className={getIconColor(metrics[0]?.trend?.cleanRepoCount)}
                onSelect={() => onRowSelect({type: 'totalCleanRepositories', label: "Total Clean Repositories"})}
                lastScore={metrics[0]?.previous?.cleanRepoCount}
                iconOverlayBody={getDescription(metrics[0]?.trend?.cleanRepoCount)}
              />
            </Col>
            <Col md={4} className={"px-1"}>
              <GitScrapperOverallIssuesTrendDataBlock
                score={metrics[0]?.current?.issueCount || 0 }
                icon={getIconIssuesTrend(metrics[0]?.trend?.issueCount)}
                className={getIconColor(metrics[0]?.trend?.issueCount)}
                onSelect={() => onRowSelect({type: 'totalNumberofIssues', label: "Total Number of Issues"})}
                lastScore={metrics[0]?.previous?.issueCount}
                iconOverlayBody={getDescription(metrics[0]?.trend?.issueCount)}
              />
            </Col>
          </Row>
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
        tableChart={true}
        // chartHelpComponent={(closeHelpPanel) => (
        //   <CoverityIssuesByCategoryHelpDocumentation closeHelpPanel={closeHelpPanel} />
        // )}
      />
      <ModalLogs
        header="Git Scrapper Metrics"
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
