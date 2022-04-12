import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import chartsActions from "components/insights/charts/charts-actions";
import { useHistory } from "react-router-dom";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import FilterContainer from "components/common/table/FilterContainer";
import GitScrapperCardView from "./card/GitScrapperCardView";

import gitScrapperPipelineFilterMetadata from "../git-scrapper-pipeline-filter-metadata";


function GitScrapperActionableInsightOverlay({ title, gitScrapperType, kpiConfiguration, dashboardData }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [dataScorecardMetrics, setDataScorecardMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

      let request = 'sonarBugsCodeBasedMetricScorecard';  
      if (gitScrapperType === 'totalNumberofIssues') {
        request = 'sonarBugsCodeBasedMetricScorecard'; // TODO change it to totalNumberofIssues type
      } else {
        request = 'sonarBugsCodeBasedMetricScorecard'; // TODO change it to clean repositories type
      }

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

      // set mock data => TODO remobve after API integration  
      if (gitScrapperType === 'totalNumberofIssues') {
       responseRepoScorecardBlockValues['data'] = {"status":200,"status_text":"ES Pipeline Summary Query Results","message":"ES Query Response from Living Connection","data":[{"gitScrapperMetricIssuesScorecard":{"tool":"Git Scrapper","data":[{"data":[{"startTimestamp":"2021-12-07T19:33:22.659Z","endTimestamp":"2021-12-07T19:34:03.336Z","toolIdentifier":"gitscraper","activityDate":"2021-12-07T19:33:22.659Z","customerId":"60785c10ae42330133c55f7e","pipelineId":"6239d99a6d66300043c1aec7","stepId":"5f12fb88d703e0cb5d13e8b2","branch":"master","library":"trufflehog","giturl":"https://gitlab.com/opsera-repo/java-microservices/aws-service.git","gitType":"gitlab","type":"scan","action":"","targetId":"","runCount":2,"repository":"Repository 1","attributes":"","attributes2":"","totalIssues":2,"totalScans":4,"issues":[{"author":"NA","commit":"Sonar reliability rating fix","commitHash":"0fa9f3f007e84212f22cf5eb0309623f4dd019e6","path":"src/main/resources/application.yml","lineNumber":"0 // main field","reason":"High Entropy"},{"author":"NA","commit":"Sonar reliability rating fix","commitHash":"0fa9f3f007e84212f22cf5eb0309623f4dd019e6","path":"src/main/resources/application.yml","lineNumber":0,"reason":"AWS API Key"}]},{"startTimestamp":"2021-12-07T19:33:22.659Z","endTimestamp":"2021-12-07T19:34:03.336Z","toolIdentifier":"gitscraper","activityDate":"2021-12-07T19:33:22.659Z","customerId":"60785c10ae42330133c55f7e","pipelineId":"6239d99a6d66300043c1aec7","stepId":"5f12fb88d703e0cb5d13e8b2","branch":"master","library":"trufflehog","giturl":"https://gitlab.com/opsera-repo/java-microservices/aws-service.git","gitType":"gitlab","type":"scan","action":"","targetId":"","runCount":2,"repository":"Repository 2","attributes":"","attributes2":"","totalIssues":2,"totalScans":4,"issues":[{"author":"NA","commit":"Sonar reliability rating fix","commitHash":"0fa9f3f007e84212f22cf5eb0309623f4dd019e6","path":"src/main/resources/application.yml","lineNumber":"0 // main field","reason":"High Entropy"},{"author":"NA","commit":"Sonar reliability rating fix","commitHash":"0fa9f3f007e84212f22cf5eb0309623f4dd019e6","path":"src/main/resources/application.yml","lineNumber":0,"reason":"AWS API Key"}]},{"startTimestamp":"2021-12-07T19:33:22.659Z","endTimestamp":"2021-12-07T19:34:03.336Z","toolIdentifier":"gitscraper","activityDate":"2021-12-07T19:33:22.659Z","customerId":"60785c10ae42330133c55f7e","pipelineId":"6239d99a6d66300043c1aec7","stepId":"5f12fb88d703e0cb5d13e8b2","branch":"master","library":"trufflehog","giturl":"https://gitlab.com/opsera-repo/java-microservices/aws-service.git","gitType":"gitlab","type":"scan","action":"","targetId":"","runCount":2,"repository":"Repository 3","attributes":"","attributes2":"","totalIssues":2,"totalScans":4,"issues":[{"author":"NA","commit":"Sonar reliability rating fix","commitHash":"0fa9f3f007e84212f22cf5eb0309623f4dd019e6","path":"src/main/resources/application.yml","lineNumber":"0 // main field","reason":"High Entropy"},{"author":"NA","commit":"Sonar reliability rating fix","commitHash":"0fa9f3f007e84212f22cf5eb0309623f4dd019e6","path":"src/main/resources/application.yml","lineNumber":0,"reason":"AWS API Key"}]}],"count":[{"count":3}]}],"length":1,"status":200,"status_text":"OK"}}]};
      } else {
        responseRepoScorecardBlockValues['data'] = {"status":200,"status_text":"ES Pipeline Summary Query Results","message":"ES Query Response from Living Connection","data":[{"gitScrapperMetricIssuesScorecard":{"tool":"Git Scrapper","data":[{"data":[{"startTimestamp":"2021-12-07T19:33:22.659Z","endTimestamp":"2021-12-07T19:34:03.336Z","toolIdentifier":"gitscraper","activityDate":"2021-12-07T19:33:22.659Z","customerId":"60785c10ae42330133c55f7e","pipelineId":"jasguyagdsuaidad","pipelineName":"Pipeline 1","stepId":"5f12fb88d703e0cb5d13e8b2","branch":"master","library":"trufflehog","giturl":"https://gitlab.com/opsera-repo/java-microservices/aws-service.git","gitType":"gitlab","type":"scan","action":"","targetId":"","runCount":3,"repository":"Reository 1","attributes":"","attributes2":"","totalIssues":0,"totalScans":4,"issues":[]},{"startTimestamp":"2021-12-07T19:33:22.659Z","endTimestamp":"2021-12-07T19:34:03.336Z","toolIdentifier":"gitscraper","activityDate":"2021-12-07T19:33:22.659Z","customerId":"60785c10ae42330133c55f7e","pipelineId":"saisiasadad","pipelineName":"Pipeline 2","stepId":"5f12fb88d703e0cb5d13e8b2","branch":"develop","library":"sonarqube","giturl":"https://bitbucket.com/opsera-repo/java-microservices/aws-service.git","gitType":"bitbucket","type":"scan","action":"","targetId":"","runCount":4,"repository":"Reository 2","attributes":"","attributes2":"","totalIssues":0,"totalScans":4,"issues":[]},{"startTimestamp":"2021-12-07T19:33:22.659Z","endTimestamp":"2021-12-07T19:34:03.336Z","toolIdentifier":"gitscraper","activityDate":"2021-12-07T19:33:22.659Z","customerId":"60785c10ae42330133c55f7e","pipelineId":"saissasasiasadad","pipelineName":"Pipeline 3","stepId":"5f12fb88d703e0cb5d13e8b2","branch":"develop","library":"coverity","giturl":"https://github.com/opsera-repo/java-microservices/aws-service.git","gitType":"github","type":"scan","action":"","targetId":"","runCount":2,"repository":"Reository 3","attributes":"","attributes2":"","totalIssues":0,"totalScans":4,"issues":[]}],"count":[{"count":3}]}],"length":1,"status":200,"status_text":"OK"}}]};
      }

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
