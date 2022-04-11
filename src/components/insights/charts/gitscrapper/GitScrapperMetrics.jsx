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


import GitScrapperMetricScorecardMetaData from "./gitScrapperMetricScorecardMetaData";
import gitScrapperPipelineFilterMetadata from "./git-scrapper-pipeline-filter-metadata";
import { useHistory } from "react-router-dom";

function GitScrapperMetrics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...gitScrapperPipelineFilterMetadata.newObjectFields }, gitScrapperPipelineFilterMetadata, false)
  );

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

  // TODO: Don't send this complicated object, just send the metric
  const loadData = async (cancelSource = cancelTokenSource,  filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;

      let response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "overallCoverityIssuesTrend",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      ), 
      responseBaseKPIBlockValues = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "coverityBaseKPIDataBlocks",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      ),
      responseRepoScorecardBlockValues = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sonarBugsCodeBasedMetricScorecard",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs
      );
      

      response['data'] = {"status":200,"status_text":"ES Pipeline Summary Query Results","message":"ES Query Response from Living Connection","data":[{"overallGitScrapperTrend":{"tool":"Git scrapper","data":[{"lastScanRepositories":23,"lastScanClean":1,"lastScanIssues":89,"trendRepositories":"Red","trendClean":"Neutral","trendIssues":"Green","totalRepositoriesScanned":3,"totalCleanRepositories":1,"totalNumberofIssues":88}],"length":1,"status":200,"status_text":"OK"}}]},
      responseBaseKPIBlockValues['data'] = {"status":200,"status_text":"ES Pipeline Summary Query Results","message":"ES Query Response from Living Connection","data":[{"gitScrapperBaseKPIDataBlocks":{"tool":"Git Scrapper","data":{"totalScannedRepositories":[{"data":[{"length":46,"total_issues":0,"project":"github-integrator","pipeline":"623a5aa91fdb2f0012a3d84a","pipelineName":"Coverity Test Automation DO NOT DELETE Copy","run":2,"timestamp":"2022-03-22T23:52:22.224Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov-ant","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:58:07.433Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov-node1","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:56:10.079Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:53:22.787Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0}],"DataBlocks":[{"_id":1,"totalIssues":0,"totalSecurity":0,"totalQuality":0,"totalVarious":0,"totalProjects":4,"totalScans":52,"total":3}],"count":[{"count":4}]}],"totalCleanRepositories":[{"data":[{"length":46,"total_issues":0,"project":"github-integrator","pipeline":"623a5aa91fdb2f0012a3d84a","pipelineName":"Coverity Test Automation DO NOT DELETE Copy","run":2,"timestamp":"2022-03-22T23:52:22.224Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov-ant","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:58:07.433Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":2,"project":"cov-node1","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:56:10.079Z","totalIssues":2,"trend":"Neutral","trendNumber":0,"quality_issues":2,"security_issues":0,"various_issues":0},{"length":2,"total_issues":1,"project":"cov","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:53:22.787Z","totalIssues":1,"trend":"Neutral","trendNumber":0,"quality_issues":1,"security_issues":0,"various_issues":0}],"DataBlocks":[{"_id":1,"totalIssues":3,"totalSecurity":0,"totalQuality":3,"totalVarious":0,"totalProjects":4,"totalScans":52,"total":3}],"count":[{"count":4}]}],"totalIssues":[{"data":[{"length":46,"total_issues":0,"project":"github-integrator","pipeline":"623a5aa91fdb2f0012a3d84a","pipelineName":"Coverity Test Automation DO NOT DELETE Copy","run":2,"timestamp":"2022-03-22T23:52:22.224Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov-ant","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:58:07.433Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov-node1","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:56:10.079Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:53:22.787Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0}],"DataBlocks":[{"_id":1,"totalIssues":0,"totalSecurity":0,"totalQuality":0,"totalVarious":0,"totalProjects":4,"totalScans":52,"total":88}],"count":[{"count":4}]}]},"status":204,"status_text":"OK"}}]};
      responseRepoScorecardBlockValues['data'] = {"status":200,"status_text":"ES Pipeline Summary Query Results","message":"ES Query Response from Living Connection","data":[{"gitScrapperBasedMetricScorecard":{"tool":"Git Scrapper","data":[{"data":[{"projectName":"Java BE MicroService","timestamp":"2022-02-08T12:48:41.947Z","metricName":"bugs","pipelineId":"6202652df55dad00128f7012","pipelineName":"New pipeline test","run_count":16,"gitScrapperLatestMeasureValue":10,"gitScrapperPrimaryLanguage":"java","prevScanResult":10,"currScanResult":10,"status":"Neutral","libraryName":"Coverity","repositoryName":"Java BE MicroService"},{"projectName":"Python MicroService","timestamp":"2022-02-08T12:48:41.947Z","metricName":"bugs","pipelineId":"6202652df55dad00128f7012","pipelineName":"New pipeline test","run_count":30,"gitScrapperLatestMeasureValue":25,"gitScrapperPrimaryLanguage":"python","prevScanResult":5,"currScanResult":25,"status":"Red","libraryName":"SonarQube","repositoryName":"Python MicroService"},{"projectName":"C++ System Service","timestamp":"2022-02-08T12:48:41.947Z","metricName":"bugs","pipelineId":"6202652df55dad00128f7012","pipelineName":"New pipeline test","run_count":7,"gitScrapperLatestMeasureValue":12,"gitScrapperPrimaryLanguage":"c++","prevScanResult":15,"currScanResult":12,"status":"Green","libraryName":"SonarQube","repositoryName":"C++ System Service"}],"count":[{"count":3}]}],"length":1,"status":200,"status_text":"OK"}}]};

      const dataObject = response?.data ? response?.data?.data[0]?.overallGitScrapperTrend?.data : [],
      dataObjectBaseKPIDataBlocks = responseBaseKPIBlockValues?.data ? responseBaseKPIBlockValues?.data?.data[0]?.gitScrapperBaseKPIDataBlocks?.data : [],
      dataObjectRepoScorecardDataBlocks = responseRepoScorecardBlockValues?.data ? responseRepoScorecardBlockValues?.data?.data[0]?.gitScrapperBasedMetricScorecard?.data[0]?.data : [];


      if (isMounted?.current === true && dataObject && dataObjectBaseKPIDataBlocks) {

        setMetrics(dataObject);
        let newFilterDto = filterDto;
        newFilterDto.setData(
          "totalCount",
          responseRepoScorecardBlockValues?.data?.data[0]?.gitScrapperBasedMetricScorecard?.data[0]?.count[0]?.count
        );
        setTableFilterDto({ ...newFilterDto });
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
  
  
  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{ minHeight: "300px" }}>
        <Container>
          <Row className="p-1 gray">
            <Col>
              <GitScrapperOverallScannedRepositoriesTrendDataBlock
                score={metrics[0]?.totalRepositoriesScanned || 0 }
                icon={getIcon(metrics[0]?.trendRepositories)}
                className={getIconColor(metrics[0]?.trendRepositories)}
                // onSelect={() => onRowSelect({type: 'totalRepositoriesScanned', label: "Total Repositories Scanned"}")}
                lastScore={metrics[0]?.lastScanRepositories}
                iconOverlayBody={getDescription(metrics[0]?.trendRepositories)}
              />
            </Col>
            <Col>
              <GitScrapperOverallCleanRepositoriesTrendDataBlock
                score={metrics[0]?.totalCleanRepositories || 0 }
                icon={getIcon(metrics[0]?.trendClean)}
                className={getIconColor(metrics[0]?.trendClean)}
                onSelect={() => onRowSelect({type: 'totalCleanRepositories', label: "Total Clean Repositories"})}
                lastScore={metrics[0]?.lastScanClean}
                iconOverlayBody={getDescription(metrics[0]?.trendClean)}
              />
            </Col>
            <Col>
              <GitScrapperOverallIssuesTrendDataBlock
                score={metrics[0]?.totalNumberofIssues || 0 }
                icon={getIconIssuesTrend(metrics[0]?.trendIssues)}
                className={getIconColor(metrics[0]?.trendIssues)}
                onSelect={() => onRowSelect({type: 'totalNumberofIssues', label: "Total Number of Issues"})}
                lastScore={metrics[0]?.lastScanIssues}
                iconOverlayBody={getDescription(metrics[0]?.trendIssues)}
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
