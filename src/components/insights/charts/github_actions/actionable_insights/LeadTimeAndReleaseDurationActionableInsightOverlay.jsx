import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { faExternalLink, faTable } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import chartsActions from "components/insights/charts/charts-actions";
import { useHistory } from "react-router-dom";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import LeadTimeAndReleaseDurationDataBlockContainer from "./LeadTimeAndReleaseDurationDataBlockContainer";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import IconBase from "components/common/icons/IconBase";
import { assignStandardLineColors } from "components/insights/charts/charts-views";

function LeadTimeAndReleaseDurationActionableInsightOverlay({
  title,
  actionableInsightsQueryData,
  kpiConfiguration,
  dashboardData,
}) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [dataBlockValues, setDataBlockValues] = useState({});
  const [dataBlockMeanValues, setDataBlockMeanValues] = useState({});
  const [statisticsData, setBuildAndDeployMetricData] = useState([]);
  const [chartData, setBuildAndDeployChartData] = useState([]);
  const [goalsData, setGoalsData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
      actionableInsightsGenericChartFilterMetadata,
      false
    )
  );

  const DEFAULT_GOALS = {
    build_success_rate: 90,
    average_builds: 1,
    deployment_success_rate: 90,
    average_deployments: 1,
  };

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
  const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      let goals = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type === "goals")]?.value;




      let request = "salesforceDurationByStageByMonth";
      // TODO let request = "leadTimeAndReleaseTraceability";
      let response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        request,
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs,
        null,
        null,
        null,
        actionableInsightsQueryData
      );
      // TODO console.log('response', response);

      response['data'] = {"status":200,"status_text":"ES Pipeline Summary Query Results","message":"ES Query Response from Living Connection","data":[{"leadTimeAndReleaseTraceability":{"tool":"opsera-pipeline-step-summary","data":{"metrics":[{"data":[[{"id":"Deploy","data":[{"_id":"2021-09-08T04:00:00.000Z","lowerBound":"2021-09-08T04:00:00.000Z","upperBound":"2021-10-01T04:00:00.000Z","x":"2021-09-08","y":1.12,"count":80,"range":"2021-09-08 to 2021-10-01"},{"_id":"2021-10-01T04:00:00.000Z","lowerBound":"2021-10-01T04:00:00.000Z","upperBound":"2021-11-01T04:00:00.000Z","x":"2021-10-01","y":2.37,"count":365,"range":"2021-10-01 to 2021-11-01"},{"_id":"2021-11-01T04:00:00.000Z","lowerBound":"2021-11-01T04:00:00.000Z","upperBound":"2021-12-01T04:00:00.000Z","x":"2021-11-01","y":9.49,"count":392,"range":"2021-11-01 to 2021-12-01"},{"_id":"2021-12-01T04:00:00.000Z","lowerBound":"2021-12-01T04:00:00.000Z","upperBound":"2022-01-01T04:00:00.000Z","x":"2021-12-01","y":2.94,"count":1224,"range":"2021-12-01 to 2022-01-01"},{"_id":"2022-01-01T04:00:00.000Z","lowerBound":"2022-01-01T04:00:00.000Z","upperBound":"2022-01-27T05:00:00.000Z","x":"2022-01-01","y":3.6,"count":399,"range":"2022-01-01 to 2022-01-26"}]}],[{"_id":1,"deploy_count":2460,"deploy_mean":3.95}]],"summaryData":[],"count":[{"count":0}],"statisticsData":{"deploy":{"success":4009,"failure":783,"count":4792,"type":"deploy","avgDuration":2.85,"successPercent":83.66,"perDayAverage":13},"build":{"success":6518,"failure":471,"count":6989,"type":"build","avgDuration":2.04,"successPercent":93.26,"perDayAverage":19}},"chartData":{"avgDeployments":[{"x":"2021-03-10","y":2.09,"range":"2021-03-10 to 2021-04-01","total":46},{"x":"2021-04-01","y":1.6,"range":"2021-04-01 to 2021-05-01","total":48},{"x":"2021-05-01","y":3.26,"range":"2021-05-01 to 2021-06-01","total":101},{"x":"2021-06-01","y":4.77,"range":"2021-06-01 to 2021-07-01","total":143},{"x":"2021-07-01","y":10.68,"range":"2021-07-01 to 2021-08-01","total":331},{"x":"2021-08-01","y":11.68,"range":"2021-08-01 to 2021-09-01","total":362},{"x":"2021-09-01","y":5.67,"range":"2021-09-01 to 2021-10-01","total":170},{"x":"2021-10-01","y":14.61,"range":"2021-10-01 to 2021-11-01","total":453},{"x":"2021-11-01","y":16.5,"range":"2021-11-01 to 2021-12-01","total":495},{"x":"2021-12-01","y":49.52,"range":"2021-12-01 to 2022-01-01","total":1535},{"x":"2022-01-01","y":21.87,"range":"2022-01-01 to 2022-02-01","total":678},{"x":"2022-02-01","y":10.82,"range":"2022-02-01 to 2022-03-01","total":303},{"x":"2022-03-01","y":12.7,"range":"2022-03-01 to 2022-03-11","total":127}]}}],"summary":{"total_commits":80,"total_repo_changes":1000,"total_merges":25,"total_deployments":5,"mean_time_to_build":15,"mean_time_to_commit":10,"mean_time_to_merge":20,"mean_time_to_deploy":30}},"length":0,"status":200,"status_text":"OK","count":0}}]};
      console.log('response', response);
      let dataObject = response?.data ? response?.data?.data[0]?.leadTimeAndReleaseTraceability?.data?.metrics[0]?.data : [];
      let dataCount = response?.data
        ? response?.data?.data[0]?.leadTimeAndReleaseTraceability?.data?.metrics[0]?.count[0]?.count
        : [];
      let summary = response?.data ? response?.data?.data[0]?.leadTimeAndReleaseTraceability?.data?.summary : {};

      //  TODO
      const objectLength = response?.data?.data ? response?.data?.data[0]?.leadTimeAndReleaseTraceability?.data?.metrics[0]?.data.length : 0;
      let means = response?.data?.data
        ? response?.data?.data[0]?.leadTimeAndReleaseTraceability?.data?.metrics[0]?.data[objectLength - 1]
        : [];
      
      const statisticsData = response?.data?.data ? response?.data?.data[0]?.leadTimeAndReleaseTraceability?.data?.metrics[0]?.statisticsData : [];
      const chartData = response?.data?.data ? response?.data?.data[0]?.leadTimeAndReleaseTraceability?.data?.metrics[0]?.chartData : [];

      // dataObject = dataObject.map((bd, index) => ({
      //   ...bd,
      //   _blueprint: <IconBase icon={faExternalLink} className={"mr-2"} />,
      // }));
      // let newFilterDto = filterDto;
      // newFilterDto.setData("totalCount", dataCount);
      // setFilterModel({ ...newFilterDto });

      //  TODO
      assignStandardLineColors(dataObject, true);

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setDataBlockValues(summary);
        setDataBlockMeanValues(means);
        setBuildAndDeployMetricData(statisticsData);
        setBuildAndDeployChartData(chartData);
        if (goals) {
          setGoalsData(goals);
        } else {
          kpiConfiguration.filters[
            kpiConfiguration.filters.findIndex((obj) => obj.type === "goals")
          ].value = DEFAULT_GOALS;
          setGoalsData(DEFAULT_GOALS);
        }
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

  const getFooterDetails = () => {
    if (!dataBlockValues) {
      return null;
    }

    // const total_duration = dataBlockValues?.total_duration ? dataBlockValues?.total_duration : 0;
    // const total_time_to_resolve = dataBlockValues?.total_time_to_resolve ? dataBlockValues?.total_time_to_resolve : 0;
    // const total_duration_display = getTimeDisplay(total_duration);
    // const total_time_to_resolve_display = getTimeDisplay(total_time_to_resolve);
    return (null
      // <Row className="px-2">
      //   <Col className="footer-records text-right">
      //     Total time spent to execute builds :{" "}
      //     {!total_duration_display || total_duration_display === 0 ? " 0 minutes" : total_duration_display}
      //     <br></br>
      //     Total time spent to resolve failed builds:{" "}
      //     {!total_time_to_resolve_display || total_time_to_resolve_display === 0
      //       ? " 0 minutes"
      //       : total_time_to_resolve_display}
      //   </Col>
      // </Row>
    );
  };

  const onRowSelect = (rowData) => {
    history.push(`/blueprint/${rowData?.data?._id?.pipelineId}/${rowData?.data?._id?.run}`);
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getDateBadge = () => {
    const date = actionableInsightsQueryData?.data;
    return <MetricDateRangeBadge startDate={date?.lowerBound} endDate={date?.upperBound} />;
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
        {getDateBadge()}
        <LeadTimeAndReleaseDurationDataBlockContainer 
          data={dataBlockValues}
          metric={metrics[0]}
          kpiConfiguration={kpiConfiguration}
          meanData={dataBlockMeanValues[0]?.deploy_mean}
          countData={dataBlockMeanValues[0]?.deploy_count}
          goalsData={goalsData?.average_deploy}
          dashboardData={dashboardData}
          statisticsData={statisticsData}
          chartData={chartData}
        />

      </div>
    </FullScreenCenterOverlayContainer>
  );
}

LeadTimeAndReleaseDurationActionableInsightOverlay.propTypes = {
  title: PropTypes.string,
  actionableInsightsQueryData: PropTypes.any,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default LeadTimeAndReleaseDurationActionableInsightOverlay;
