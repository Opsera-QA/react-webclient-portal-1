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
import GitScrapperCardView from "./card/GitScrapperCardView";

import GitScrapperMetricScorecardMetaData from "../gitScrapperMetricScorecardMetaData";
import gitScrapperPipelineFilterMetadata from "../git-scrapper-pipeline-filter-metadata";


function GitScrapperActionableInsightOverlay({ title, gitScrapperSeverity, kpiConfiguration, dashboardData }) {
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
  // const [filterModel, setFilterModel] = useState(
  //   new Model(
  //     { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
  //     actionableInsightsGenericChartFilterMetadata,
  //     false
  //   )
  // );
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
      // let request = "coverityInsightsDatablocks";
      // let response = await chartsActions.parseConfigurationAndGetChartMetrics(
      //   getAccessToken,
      //   cancelSource,
      //   request,
      //   kpiConfiguration,
      //   dashboardTags,
      //   filterDto,
      //   null,
      //   dashboardOrgs,
      //   null,
      //   null,
      //   null,
      //   null,
      //   gitScrapperSeverity
      // ),
      let responseRepoScorecardBlockValues = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sonarBugsCodeBasedMetricScorecard",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs
      );

      responseRepoScorecardBlockValues['data'] = {"status":200,"status_text":"ES Pipeline Summary Query Results","message":"ES Query Response from Living Connection","data":[{"gitScrapperBasedMetricScorecard":{"tool":"Git Scrapper","data":[{"data":[{"projectName":"Java BE MicroService","timestamp":"2022-02-08T12:48:41.947Z","metricName":"bugs","pipelineId":"6202652df55dad00128f7012","pipelineName":"New pipeline test","run_count":16,"gitScrapperLatestMeasureValue":10,"gitScrapperPrimaryLanguage":"java","prevScanResult":10,"currScanResult":10,"status":"Neutral","libraryName":"Coverity","repositoryName":"Java BE MicroService"},{"projectName":"Python MicroService","timestamp":"2022-02-08T12:48:41.947Z","metricName":"bugs","pipelineId":"6202652df55dad00128f7012","pipelineName":"New pipeline test","run_count":30,"gitScrapperLatestMeasureValue":25,"gitScrapperPrimaryLanguage":"python","prevScanResult":5,"currScanResult":25,"status":"Red","libraryName":"SonarQube","repositoryName":"Python MicroService"},{"projectName":"C++ System Service","timestamp":"2022-02-08T12:48:41.947Z","metricName":"bugs","pipelineId":"6202652df55dad00128f7012","pipelineName":"New pipeline test","run_count":7,"gitScrapperLatestMeasureValue":12,"gitScrapperPrimaryLanguage":"c++","prevScanResult":15,"currScanResult":12,"status":"Green","libraryName":"SonarQube","repositoryName":"C++ System Service"}],"count":[{"count":3}]}],"length":1,"status":200,"status_text":"OK"}}]};
      const dataObjectRepoScorecardDataBlocks = responseRepoScorecardBlockValues?.data ? responseRepoScorecardBlockValues?.data?.data[0]?.gitScrapperBasedMetricScorecard?.data[0]?.data : [];
      
      // TODO

      // console.log('gitScrapperSeverity', gitScrapperSeverity);

      // if (gitScrapperSeverity === 'Low') {
      //   response['data'] = {"status":200,"status_text":"ES Pipeline Summary Query Results","message":"ES Query Response from Living Connection","data":[{"coverityInsightsDatablocks":{"tool":"Coverity","data":[{"data":[{"length":46,"total_issues":0,"project":"github-integrator","pipeline":"623a5aa91fdb2f0012a3d84a","pipelineName":"Coverity Test Automation DO NOT DELETE Copy","run":2,"timestamp":"2022-03-22T23:52:22.224Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov-ant","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:58:07.433Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov-node1","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:56:10.079Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:53:22.787Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0}],"DataBlocks":[{"_id":1,"totalIssues":0,"totalSecurity":0,"totalQuality":0,"totalVarious":0,"totalProjects":4,"totalScans":52}],"count":[{"count":4}]}],"length":1,"status":200,"status_text":"OK"}}]};
      // } else if (gitScrapperSeverity === 'Medium') {
      //   response['data'] = {"status":200,"status_text":"ES Pipeline Summary Query Results","message":"ES Query Response from Living Connection","data":[{"coverityInsightsDatablocks":{"tool":"Coverity","data":[{"data":[{"length":46,"total_issues":0,"project":"github-integrator","pipeline":"623a5aa91fdb2f0012a3d84a","pipelineName":"Coverity Test Automation DO NOT DELETE Copy","run":2,"timestamp":"2022-03-22T23:52:22.224Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov-ant","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:58:07.433Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":2,"project":"cov-node1","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:56:10.079Z","totalIssues":2,"trend":"Neutral","trendNumber":0,"quality_issues":2,"security_issues":0,"various_issues":0},{"length":2,"total_issues":1,"project":"cov","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:53:22.787Z","totalIssues":1,"trend":"Neutral","trendNumber":0,"quality_issues":1,"security_issues":0,"various_issues":0}],"DataBlocks":[{"_id":1,"totalIssues":3,"totalSecurity":0,"totalQuality":3,"totalVarious":0,"totalProjects":4,"totalScans":52}],"count":[{"count":4}]}],"length":1,"status":200,"status_text":"OK"}}]};
      // } else {
      //   response['data'] = {"status":200,"status_text":"ES Pipeline Summary Query Results","message":"ES Query Response from Living Connection","data":[{"coverityInsightsDatablocks":{"tool":"Coverity","data":[{"data":[{"length":46,"total_issues":0,"project":"github-integrator","pipeline":"623a5aa91fdb2f0012a3d84a","pipelineName":"Coverity Test Automation DO NOT DELETE Copy","run":2,"timestamp":"2022-03-22T23:52:22.224Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov-ant","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:58:07.433Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov-node1","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:56:10.079Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0},{"length":2,"total_issues":0,"project":"cov","pipeline":"6104118328b45b573c285eba","pipelineName":"Coverity_test","run":72,"timestamp":"2022-01-13T15:53:22.787Z","totalIssues":0,"trend":"Neutral","trendNumber":0,"quality_issues":0,"security_issues":0,"various_issues":0}],"DataBlocks":[{"_id":1,"totalIssues":0,"totalSecurity":0,"totalQuality":0,"totalVarious":0,"totalProjects":4,"totalScans":52}],"count":[{"count":4}]}],"length":1,"status":200,"status_text":"OK"}}]};
      // }

      

      // let dataObject = response?.data ? response?.data?.data[0]?.coverityInsightsDatablocks?.data[0]?.data : [];
      // let dataCount = response?.data
      //   ? response?.data?.data[0]?.coverityInsightsDatablocks?.data[0]?.count[0]?.count
      //   : [];
      // let DataBlocks = response?.data
      //   ? response?.data?.data[0]?.coverityInsightsDatablocks?.data[0]?.DataBlocks[0]
      //   : [];
      // dataObject = dataObject.map((bd, index) => ({
      //   ...bd,
      //   _blueprint: <IconBase icon={faExternalLink} className={"mr-2"} />,
      // }));



      // console.log('response', response);
      // console.log('dataObject', dataObject);
    

      // let newFilterDto = filterDto;
      // newFilterDto.setData("totalCount", dataCount);
      // setFilterModel({ ...newFilterDto });
      // if (isMounted?.current === true && dataObject && dataObjectRepoScorecardDataBlocks) {
      if (isMounted?.current === true && dataObjectRepoScorecardDataBlocks) {
        // setMetrics(dataObject);
        // setDataBlockValues(DataBlocks);
        setDataScorecardMetrics(dataObjectRepoScorecardDataBlocks);

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

  const getCardView = () => {
    return (
      <GitScrapperCardView
        gitScrapperDataFilterDto={tableFilterDto}
        setGitScrapperDataFilterDto={setTableFilterDto}
        isLoading={isLoading}
        data={dataScorecardMetrics}
        loadData={loadData}
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
        {/* <GitScrapperActionableDataBlockContainers data={dataBlockValues} level={gitScrapperSeverity} />
        <GitScrapperActionableInsightTable
          data={metrics}
          isLoading={isLoading}
          loadData={loadData}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          title={title}
        /> */}
        {getFilterContainer()}
        {/* {getFooterDetails()} */}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GitScrapperActionableInsightOverlay.propTypes = {
  title: PropTypes.string,
  gitScrapperSeverity: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default GitScrapperActionableInsightOverlay;
