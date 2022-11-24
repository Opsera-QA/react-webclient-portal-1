import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  assignStandardColors,
  spaceOutServiceNowCountBySeverityLegend,
} from "../../../charts-views";
import { dataPointHelpers } from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import { JIRA_MEAN_TIME_TO_RESOLUTION_CONSTANTS as constants } from "./JiraMeanTimeToResolutionConstants";
import DataPointVisibilityWrapper from "../../../../../common/metrics/data_points/DataPointVisibilityWrapper";
import jiraAction from "../../jira.action";
import JiraMTTRDataBlock from "../../data_blocks/JiraMTTRDataBlock";
import JiraMTTRChartHelpDocumentation from "../../../../../common/help/documentation/insights/charts/JiraMTTRChartHelpDocumentation";
import {
  getMaturityColorClass,
  getMaturityScoreText,
  getReverseTrend,
  getReverseTrendIcon,
  getTrend,
  getTrendIcon
} from "../../../charts-helpers";
import BadgeBase from "../../../../../common/badges/BadgeBase";
import JiraMeanTimeToResolutionMaturityBlock from "./JiraMeanTimeToResolutionMaturityBlock";
import {DialogToastContext} from "contexts/DialogToastContext";
import JiraMeanTimeToResolutionPriorityChartPanel from './JiraMeanTimeToResolutionPriorityChartPanel';
import JiraMeanTimeToResolutionLineChart from "./JiraMeanTimeToResolutionLineChart";
import FullScreenCenterOverlayContainer from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import JiraMeanTimeToResolutionMaturityScoreInsights from "./JiraMeanTimeToResolutionMaturityScoreInsights";

function JiraMeanTimeToResolution({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  showSettingsToggle,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [sevMetrics, setSevMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [dataBlock, setDataBlock] = useState({});
  const toastContext = useContext(DialogToastContext);

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
      let dashboardOrgs =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "organizations",
          )
        ]?.value;
      const dashboardTags =
          dashboardData?.data?.filters[
            dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
          ]?.value;
      const response = await jiraAction.getJiraMTTR(
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          dashboardOrgs,
        );
      const responseData = response?.data;

      setDataBlock(responseData);

      const dataObject = responseData?.docs;
      const barchart = responseData?.severityData;

      assignStandardColors(dataObject, true);

      if (dataObject && dataObject.length) {
        dataObject.forEach((data) => (data.Count = data?.number_of_incidents));
      }

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setSevMetrics(barchart);
      }

      if (!dataObject) {
        setMetrics([]);
        setSevMetrics([]);
      }

      spaceOutServiceNowCountBySeverityLegend(barchart);

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

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const openPanel = () => {
    toastContext.showOverlayPanel(<JiraMeanTimeToResolutionPriorityChartPanel severityChartData={sevMetrics} closePanel={closePanel} />);
  };

  const closeMaturityPanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const onRowSelect = () => {
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closeMaturityPanel}
        showPanel={true}
        titleText={`Jira MTTR  Maturity Score Statistics`}
        showToasts={true}
        titleIcon={faTable}
      >
        <div className={"p-3"}>
          <JiraMeanTimeToResolutionMaturityScoreInsights
            kpiConfiguration={kpiConfiguration}
            insightsData={dataBlock}
          />
        </div>
      </FullScreenCenterOverlayContainer>,
    );
  };


  const getChartBody = () => {
    if (
      !metrics ||
      !Array.isArray(metrics) ||
      !Array.isArray(sevMetrics) ||
      sevMetrics.length === 0 ||
      !dataBlock?.totalIncidents
    ) {
      return null;
    }

    const dataPoints = kpiConfiguration?.dataPoints;
    const numberOfIncidentsDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS
        .NUMBER_OF_INCIDENTS_DATA_POINT,
    );
    const mttrChartDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS.MTTR_DATA_POINT,
    );
    const averageMTTRDataBlockDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS
        .AVERAGE_MTTR_DATA_BLOCK_DATA_POINT,
    );

    const maturityScore = dataBlock?.overallMaturityScoreText;
    const maturityColor = getMaturityColorClass(maturityScore);
    return (
      <>
        <div
          className="new-chart m-3 p-0"
          style={{ minHeight: "500px", display: "flex" }}
        >
          <Row className={"w-100"}>
            <JiraMeanTimeToResolutionMaturityBlock
                maturityScore={getMaturityScoreText(maturityScore)}
                maturityColor={maturityColor}
                iconOverlayBody={constants.MATURITY_TOOL_TIP[maturityScore]}
                onClick={onRowSelect}
            />
            <Row
                xl={4}
                lg={4}
                md={4}
                className={`mb-2 ml-3 py-2 d-flex justify-content-center ${maturityColor}`}
            >
              <Col md={12}>
            <JiraMTTRDataBlock
              incidents={dataBlock.totalIncidents}
              prevIncidents={dataBlock.previousTotalIncidents}
              dataPoint={numberOfIncidentsDataPoint}
              trend={getReverseTrend(dataBlock.totalIncidents,dataBlock.previousTotalIncidents)}
              getIcon = {getReverseTrendIcon}
              topText={"Total Incidents"}
              bottomText={"Prev Total Incidents"}
              onClick={openPanel}
            />
              </Col>
            <Col md={12}>
            <JiraMTTRDataBlock
              incidents={dataBlock.totalResolvedIncidents}
              prevIncidents={dataBlock.previousTotalResolvedIncidents}
              dataPoint={numberOfIncidentsDataPoint}
              trend={getTrend(dataBlock.totalResolvedIncidents,dataBlock.previousTotalResolvedIncidents)}
              getIcon = {getTrendIcon}
              topText={"Resolved Incidents"}
              bottomText={"Prev Resolved Incidents"}
            />
                </Col>
              <Col md={12}>
            <DataPointVisibilityWrapper
              dataPoint={averageMTTRDataBlockDataPoint}
            >
              <JiraMTTRDataBlock
                incidents={Number(dataBlock?.overallMttrHours)}
                prevIncidents={dataBlock.previousOverallMttrHours}
                dataPoint={numberOfIncidentsDataPoint}
                trend={getReverseTrend(dataBlock.overallMttrHours,dataBlock.previousOverallMttrHours)}
                getIcon = {getReverseTrendIcon}
                topText={"Average MTTR (Hours)"}
                bottomText={"Prev Average MTTR"}
              />
            </DataPointVisibilityWrapper>
              </Col>
              <Col md={12}>
                <JiraMTTRDataBlock
                  incidents={dataBlock.maxMTTR}
                  prevIncidents={dataBlock.previousMaxMTTR}
                  dataPoint={numberOfIncidentsDataPoint}
                  trend={getTrend(dataBlock.maxMTTR,dataBlock.previousMaxMTTR)}
                  getIcon = {getTrendIcon}
                  topText={"Max MTTR"}
                  bottomText={"Prev Max MTTR"}
                />
              </Col>
            </Row>
            <Col md={12}>
              <div className={"d-flex md-2"}>
                <div className={"mr-4"}>
                  <b>Minimum MTTR :</b> {dataBlock?.minMTTR || "NA"}
                </div>
              </div>
            </Col>
            {dataPointHelpers.isDataPointVisible(mttrChartDataPoint) && (
              <Col
                lg={12}
                md={6}
                className={"my-2 d-flex flex-column align-items-end"}
                style={{
                  minHeight: '300px',
                  paddingRight: '5rem',
                  paddingLeft: '5rem'
                }}
              >
              <JiraMeanTimeToResolutionLineChart metrics={metrics}/>
              </Col>
            )}
          </Row>
        </div>
        <Col md={12} className={"my-2 p-0"}>
          <BadgeBase className={"mx-2"} badgeText={"Note: Results fetched are based on UTC timezone of selected dates"} />
        </Col>
      </>
    );
  };

  return (
    <>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        showSettingsToggle={showSettingsToggle}
        chartHelpComponent={(closeHelpPanel) => <JiraMTTRChartHelpDocumentation closeHelpPanel={closeHelpPanel} />}
        // launchActionableInsightsFunction={onRowSelect}
        isBeta={true}
      />
      <ModalLogs
        header="Mean Time to Resolution"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

JiraMeanTimeToResolution.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  bars: PropTypes.any,
  xScale: PropTypes.any,
  yScale: PropTypes.any,
  showSettingsToggle: PropTypes.bool,
};

export default JiraMeanTimeToResolution;
