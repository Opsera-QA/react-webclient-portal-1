import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import { GITLAB_LEADTIME_CONSTANTS as constants } from "./GitlabLeadTimeConstants";
import axios from "axios";
import GitlabLeadTimeHelpDocumentation from "../../../../../common/help/documentation/insights/charts/GitlabLeadTimeHelpDocumentation";
import GitlabLeadTimeScatterPlotContainer from "./GitlabLeadTimeScatterPlotContainer";
import GitlabLeadTimeDataBlock from "./GitlabLeadTimeDataBlock";
import {
  getDeploymentStageFromKpiConfiguration,
  getMaturityColorClass,
  getMaturityScoreText,
  getReverseTrend,
  getReverseTrendIcon,
  getTimeDisplay,
} from "../../../charts-helpers";
import GitlabLeadTimeTrendDataBlock from "./GitlabLeadTimeTrendDataBlock";
import gitlabAction from "../../gitlab.action";
import {dataPointHelpers} from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import InfoDialog from "../../../../../common/status_notifications/info";
import BadgeBase from "../../../../../common/badges/BadgeBase";
import GitlabLeadTimeMaturityBlock from "./GitlabLeadTimeMaturityBlock";
import FullScreenCenterOverlayContainer from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import GitlabDeploymentFrequencyMaturityScoreInsights
  from "../../deployment_frequency/GitlabDeploymentFrequencyMaturityScoreInsights";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import GitlabLeadTimeMaturityScoreInsights from "./GitlabLeadTimeMaturityScoreInsights";

function GitLabLeadTimeChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metricData, setMetricData] = useState(undefined);
  const [chartData, setChartData] = useState(undefined);
  const [meanCommitData, setMeanCommitData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [leadtimeDataPoint, setLeadTimeDataPoint] =
      useState(undefined);
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      // await loadDataPoints(cancelSource);
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
      const selectedDeploymentStages =
        getDeploymentStageFromKpiConfiguration(kpiConfiguration)?.length || 0;
      if(selectedDeploymentStages) {
        const response = await gitlabAction.gitlabLeadTimeForChange(
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          dashboardOrgs,
        );

        // TODO This will be enabled after fixing the formula
        // const response2 = await gitlabAction.gitlabAverageCommitTimeToMerge(
        //   getAccessToken,
        //   cancelSource,
        //   kpiConfiguration,
        //   dashboardTags,
        //   dashboardOrgs,
        // );

        const metrics = response?.data?.data?.gitlabLeadTimeForChange?.data;
        // const meanCommitTimeDataObject =
        //   response2?.data?.data[0]?.gitlabAverageCommitTimeToMerge?.data || {};

        if (
          isMounted?.current === true &&
          metrics?.statisticsData?.totalDeployments
        ) {
          setMetricData(metrics?.statisticsData);
          setChartData(metrics?.chartData);
          // setMeanCommitData(meanCommitTimeDataObject);
        } else {
          setMetricData({});
          setChartData([]);
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

  // const loadDataPoints = async () => {
  //   const dataPoints = kpiConfiguration?.dataPoints;
  //   const dataPoint = dataPointHelpers.getDataPoint(
  //     dataPoints,
  //     constants.SUPPORTED_DATA_POINT_IDENTIFIERS
  //       .LEADTIME_DATA_POINT,
  //   );
  //   setLeadTimeDataPoint(dataPoint);
  // };
 const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const onRowSelect = () => {
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Lead Time Maturity Score Statistics`}
        showToasts={true}
        titleIcon={faTable}
      >
        <div className={"p-3"}>
          <GitlabLeadTimeMaturityScoreInsights
            dashboardData={dashboardData}
            insightsData={metricData}
          />
        </div>
      </FullScreenCenterOverlayContainer>,
    );
  };


  const getChartBody = () => {
    const selectedDeploymentStages =
      getDeploymentStageFromKpiConfiguration(kpiConfiguration)?.length || 0;

    if (!selectedDeploymentStages) {
      return (
          <div className="new-chart mb-3" style={{ height: "300px" }}>
            <div className="max-content-width p-5 mt-5"
                 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <InfoDialog message="No Stages selected. Please select a deployment stage on filters to proceed further." />
            </div>
          </div>
      );
    }

    if (!metricData?.totalDeployments || !chartData?.commits?.length) {
      return null;
    }

    const recentStageDate = new Date(
      metricData?.lastDeploymentTime,
    ).toLocaleDateString();

    const dataBlockTextForDeployment = {
      current: selectedDeploymentStages
        ? "Total Deployments"
        : "Total Stages Run",
      previous: selectedDeploymentStages ? "Prev Deployments: " : "Prev Runs: ",
    };
    // Convert time in Days Hours Minutes Seconds
    const totalAverageLeadTimeDisplay = getTimeDisplay(metricData?.totalAverageLeadTime);
    const previousTotalAverageLeadTimeDisplay = getTimeDisplay(metricData?.previousTotalAverageLeadTime);
    const totalMedianTimeDisplay = getTimeDisplay(metricData?.totalMedianTime);
    const previousTotalMedianTimeDisplay = getTimeDisplay(metricData?.previousTotalMedianTime);
    const maturityScore = metricData?.overallMaturityScoreText;
    const maturityColor = getMaturityColorClass(maturityScore);
    return (
      <div
        className="new-chart m-3 p-0"
        style={{ minHeight: "500px", display: "flex" }}
      >
        <Row className={"w-100"}>
          <GitlabLeadTimeMaturityBlock
            maturityScore={getMaturityScoreText(maturityScore)}
            maturityColor={maturityColor}
            iconOverlayBody={constants.MATURITY_TOOL_TIP[maturityScore]}
            onClick={onRowSelect}
          />
          <Row
            xl={4}
            lg={4}
            md={4}
            className={`mb-2 ml-3 py-2 d-flex justify-content-center maturity-border ${maturityColor}`}
          >
            {/*This would get removed when average merge time is fixed*/}
            <Col md={12} className={"pl-2 pr-1"}>
              <GitlabLeadTimeDataBlock
                value={selectedDeploymentStages}
                prevValue={""}
                topText={"Selected Stage(s)"}
                bottomText={""}
              />
            </Col>
            <Col md={12} className={"px-1"}>
              <GitlabLeadTimeTrendDataBlock
                value={totalAverageLeadTimeDisplay[0]}
                prevValue={`${previousTotalAverageLeadTimeDisplay[0]}`}
                trend={getReverseTrend(
                  metricData?.totalAverageLeadTime,
                  metricData?.previousTotalAverageLeadTime,
                )}
                getTrendIcon={getReverseTrendIcon}
                topText={"Average LTFC"}
                bottomText={"Prev LTFC: "}
                toolTipText={totalAverageLeadTimeDisplay[1]}
              />
            </Col>
            <Col md={12} className={"px-1"}>
              <GitlabLeadTimeTrendDataBlock
                value={totalMedianTimeDisplay[0]}
                prevValue={`${previousTotalMedianTimeDisplay[0]}`}
                trend={getReverseTrend(
                    metricData?.totalMedianTime,
                    metricData?.previousTotalMedianTime,
                )}
                getTrendIcon={getReverseTrendIcon}
                topText={"Median LTFC"}
                bottomText={"Prev Median: "}
                toolTipText={totalMedianTimeDisplay[1]}
              />
            </Col>
            {/*TODO This will be enabled after fixing the formula*/}
            {/*<Col md={12}>*/}
            {/*  <GitlabLeadTimeTrendDataBlock*/}
            {/*    value={getTimeDisplay(meanCommitData?.currentAvgCommitToMergeTime || 0)[0]}*/}
            {/*    prevValue={`${getTimeDisplay(meanCommitData?.previousAvgCommitToMergeTime || 0)[0]}`}*/}
            {/*    trend={getReverseTrend(*/}
            {/*      meanCommitData?.currentAvgCommitToMergeTime,*/}
            {/*      meanCommitData?.previousAvgCommitToMergeTime,*/}
            {/*    )}*/}
            {/*    getTrendIcon={getReverseTrendIcon}*/}
            {/*    topText={`Average Merge Time`}*/}
            {/*    bottomText={`Prev Merge Time: `}*/}
            {/*    toolTipText={getTimeDisplay(meanCommitData?.currentAvgCommitToMergeTime || 0)[1]}*/}
            {/*  />*/}
            {/*</Col>*/}
            <Col md={12} className={"pl-1 pr-2"}>
              <GitlabLeadTimeDataBlock
                value={metricData?.totalDeployments}
                prevValue={metricData?.previousTotalDeployments}
                topText={`${dataBlockTextForDeployment.current}`}
                bottomText={`${dataBlockTextForDeployment.previous}`}
              />
            </Col>
          </Row>
          <Col md={12}>
            <div className={"d-flex md-2"}>
              <div className={"mr-4"}>
                {/*<b>Selected Stages:</b> {selectedDeploymentStages}*/}
                {/*<div className="row" />*/}
                <b>Recent Stage:</b> {metricData?.lastDeploymentStage || "NA"}
                <div className="row" />
                <b>Date: </b>
                {recentStageDate}
              </div>
            </div>
          </Col>
          <Col md={12} className={"my-2 p-0 d-flex flex-column align-items-end"}>
            <GitlabLeadTimeScatterPlotContainer chartData={chartData} />
          </Col>
          <Col md={12} className={"my-2 p-0"}>
            <BadgeBase className={"mx-2"} badgeText={"Note: Results fetched are based on UTC timezone of selected dates"} />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <VanityMetricContainer
        title={"Gitlab Lead Time"}
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
          <GitlabLeadTimeHelpDocumentation closeHelpPanel={closeHelpPanel} />
        )}
      />
    </div>
  );
}

GitLabLeadTimeChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default GitLabLeadTimeChart;
