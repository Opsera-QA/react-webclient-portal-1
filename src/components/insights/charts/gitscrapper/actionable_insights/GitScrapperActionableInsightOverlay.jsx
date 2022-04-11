import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
// import { Col, Row } from "react-bootstrap";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { faExternalLink, faTable } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import chartsActions from "components/insights/charts/charts-actions";
import { useHistory } from "react-router-dom";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import GitScrapperActionableInsightTable from "./GitScrapperActionableInsightTable";
import GitScrapperActionableDataBlockContainers from "./GitScrapperActionableDataBlockContainers";
// import { getTimeDisplay } from "components/insights/charts/sonar/sonar_ratings/data_blocks/sonar-ratings-pipeline-utility";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import IconBase from "components/common/icons/IconBase";
import FilterContainer from "components/common/table/FilterContainer";
import GitScrapperCardView from "./card/issues/GitScrapperCardView";

import GitScrapperMetricScorecardMetaData from "../gitScrapperMetricScorecardMetaData";
import gitScrapperPipelineFilterMetadata from "../git-scrapper-pipeline-filter-metadata";


function GitScrapperActionableInsightOverlay({ title, gitScrapperType, kpiConfiguration, dashboardData }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [dataBlockValues, setDataBlockValues] = useState([]);
  const [dataScorecardMetrics, setDataScorecardMetrics] = useState([]);
  const fields = GitScrapperMetricScorecardMetaData.fields;
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
  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;

      let request = "sonarBugsCodeBasedMetricScorecard";
      let responseRepoScorecardBlockValues = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        request,
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs
      );

      // responseRepoScorecardBlockValues['data'] = {"status":200,"status_text":"ES Pipeline Summary Query Results","message":"ES Query Response from Living Connection","data":[{"gitScrapperBasedMetricScorecard":{"tool":"Git Scrapper","data":[{"data":[{"projectName":"Java BE MicroService","timestamp":"2022-02-08T12:48:41.947Z","metricName":"bugs","pipelineId":"6202652df55dad00128f7012","pipelineName":"New pipeline test","run_count":16,"gitScrapperLatestMeasureValue":10,"gitScrapperPrimaryLanguage":"java","prevScanResult":10,"currScanResult":10,"status":"Neutral","libraryName":"Coverity","repositoryName":"Java BE MicroService"},{"projectName":"Python MicroService","timestamp":"2022-02-08T12:48:41.947Z","metricName":"bugs","pipelineId":"6202652df55dad00128f7012","pipelineName":"New pipeline test","run_count":30,"gitScrapperLatestMeasureValue":25,"gitScrapperPrimaryLanguage":"python","prevScanResult":5,"currScanResult":25,"status":"Red","libraryName":"SonarQube","repositoryName":"Python MicroService"},{"projectName":"C++ System Service","timestamp":"2022-02-08T12:48:41.947Z","metricName":"bugs","pipelineId":"6202652df55dad00128f7012","pipelineName":"New pipeline test","run_count":7,"gitScrapperLatestMeasureValue":12,"gitScrapperPrimaryLanguage":"c++","prevScanResult":15,"currScanResult":12,"status":"Green","libraryName":"SonarQube","repositoryName":"C++ System Service"}],"count":[{"count":3}]}],"length":1,"status":200,"status_text":"OK"}}]};
      responseRepoScorecardBlockValues['data'] = {"status":200,"status_text":"ES Pipeline Summary Query Results","message":"ES Query Response from Living Connection","data":[{"gitScrapperMetricIssuesScorecard":{"tool":"Git Scrapper","data":[{"data":[{"startTimestamp":"2021-12-07T19:33:22.659Z","endTimestamp":"2021-12-07T19:34:03.336Z","toolIdentifier":"gitscraper","activityDate":"2021-12-07T19:33:22.659Z","customerId":"60785c10ae42330133c55f7e","pipelineId":"6239d99a6d66300043c1aec7","stepId":"5f12fb88d703e0cb5d13e8b2","branch":"master","library":"trufflehog","giturl":"https://gitlab.com/opsera-repo/java-microservices/aws-service.git","gitType":"gitlab","type":"scan","action":"","targetId":"","runCount":2,"repository":"Repository 1","attributes":"","attributes2":"","totalIssues":2,"totalScans":4,"issues":[{"author":"NA","commit":"Sonar reliability rating fix","commitHash":"0fa9f3f007e84212f22cf5eb0309623f4dd019e6","path":"src/main/resources/application.yml","lineNumber":"0 // main field","reason":"High Entropy"},{"author":"NA","commit":"Sonar reliability rating fix","commitHash":"0fa9f3f007e84212f22cf5eb0309623f4dd019e6","path":"src/main/resources/application.yml","lineNumber":0,"reason":"AWS API Key"}]},{"startTimestamp":"2021-12-07T19:33:22.659Z","endTimestamp":"2021-12-07T19:34:03.336Z","toolIdentifier":"gitscraper","activityDate":"2021-12-07T19:33:22.659Z","customerId":"60785c10ae42330133c55f7e","pipelineId":"6239d99a6d66300043c1aec7","stepId":"5f12fb88d703e0cb5d13e8b2","branch":"master","library":"trufflehog","giturl":"https://gitlab.com/opsera-repo/java-microservices/aws-service.git","gitType":"gitlab","type":"scan","action":"","targetId":"","runCount":2,"repository":"Repository 2","attributes":"","attributes2":"","totalIssues":2,"totalScans":4,"issues":[{"author":"NA","commit":"Sonar reliability rating fix","commitHash":"0fa9f3f007e84212f22cf5eb0309623f4dd019e6","path":"src/main/resources/application.yml","lineNumber":"0 // main field","reason":"High Entropy"},{"author":"NA","commit":"Sonar reliability rating fix","commitHash":"0fa9f3f007e84212f22cf5eb0309623f4dd019e6","path":"src/main/resources/application.yml","lineNumber":0,"reason":"AWS API Key"}]},{"startTimestamp":"2021-12-07T19:33:22.659Z","endTimestamp":"2021-12-07T19:34:03.336Z","toolIdentifier":"gitscraper","activityDate":"2021-12-07T19:33:22.659Z","customerId":"60785c10ae42330133c55f7e","pipelineId":"6239d99a6d66300043c1aec7","stepId":"5f12fb88d703e0cb5d13e8b2","branch":"master","library":"trufflehog","giturl":"https://gitlab.com/opsera-repo/java-microservices/aws-service.git","gitType":"gitlab","type":"scan","action":"","targetId":"","runCount":2,"repository":"Repository 3","attributes":"","attributes2":"","totalIssues":2,"totalScans":4,"issues":[{"author":"NA","commit":"Sonar reliability rating fix","commitHash":"0fa9f3f007e84212f22cf5eb0309623f4dd019e6","path":"src/main/resources/application.yml","lineNumber":"0 // main field","reason":"High Entropy"},{"author":"NA","commit":"Sonar reliability rating fix","commitHash":"0fa9f3f007e84212f22cf5eb0309623f4dd019e6","path":"src/main/resources/application.yml","lineNumber":0,"reason":"AWS API Key"}]}],"count":[{"count":3}]}],"length":1,"status":200,"status_text":"OK"}}]};
      const dataObjectRepoScorecardDataBlocks = responseRepoScorecardBlockValues?.data ? responseRepoScorecardBlockValues?.data?.data[0]?.gitScrapperMetricIssuesScorecard?.data[0]?.data : [];


      if (isMounted?.current === true && dataObjectRepoScorecardDataBlocks) {
        setDataScorecardMetrics(dataObjectRepoScorecardDataBlocks);

        let newFilterDto = filterDto;
        newFilterDto.setData(
          "totalCount",
          responseRepoScorecardBlockValues?.data?.data[0]?.gitScrapperMetricIssuesScorecard?.data[0]?.count[0]?.count
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

  const getCardView = () => {
    return (
      <GitScrapperCardView
        gitScrapperDataFilterDto={tableFilterDto}
        setGitScrapperDataFilterDto={setTableFilterDto}
        isLoading={isLoading}
        data={dataScorecardMetrics}
        loadData={loadData}
        type={gitScrapperType}
      />
    );
  };

  const getFilterContainer = () => {
    return (
      <FilterContainer
        filterDto={tableFilterDto}
        setFilterDto={setTableFilterDto}
        body={getCardView()}
        isLoading={isLoading}
        loadData={loadData}
        supportSearch={true}
      />
    );
  };
  

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={title}
      showToasts={true}
      titleIcon={faTable}
      isLoading={isLoading}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        {getDateRange()}
        {getFilterContainer()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GitScrapperActionableInsightOverlay.propTypes = {
  title: PropTypes.string,
  gitScrapperSeverity: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  gitScrapperType: PropTypes.string
};

export default GitScrapperActionableInsightOverlay;
