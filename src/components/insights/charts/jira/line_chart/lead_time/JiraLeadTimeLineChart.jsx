import PropTypes from "prop-types";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import config from "./jiraLeadTimeLineChartConfigs";
import React, { useState, useEffect, useContext, useRef } from "react";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import { line } from "d3-shape";
import { defaultConfig, getColor, assignStandardColors } from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import { Col, Row } from "react-bootstrap";
import { faMinus, faCircle } from "@fortawesome/pro-solid-svg-icons";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import JiraBugsCompletedDataBlock from "../../data_blocks/JiraBugsCompletedDataBlock";
import JiraIssuesCompletedDataBlock from "../../data_blocks/JiraIssuesCompletedDataBlock";
import JiraMeanLeadTimeDataBlock from "../../data_blocks/JiraMeanLeadTimeDataBlock";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import JiraLeadTimeChartHelpDocumentation from "components/common/help/documentation/insights/charts/JiraLeadTimeChartHelpDocumentation";
import IconBase from "components/common/icons/IconBase";

function JiraLeadTimeLineChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [issueData, setIssueData] = useState([]);
  const [previousResults, setPreviousResults] = useState(undefined);
  const [previousIssues, setPreviousIssues] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(false);
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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "jiraLeadTime",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      const dataObject =
        response?.data && response?.data?.data[0]?.jiraLeadTime.status === 200
          ? response?.data?.data[0]?.jiraLeadTime?.data
          : [];
      const issueDataObject =
        response?.data && response?.data?.data[0]?.jiraLeadTime.status === 200
          ? response?.data?.data[0]?.jiraLeadTime?.issueData
          : [];
      const previousResultsData =
        response?.data && response?.data?.data[0]?.jiraLeadTime.status === 200
          ? response?.data?.data[0]?.jiraLeadTime?.previousResults
          : [];
      const previousResultsIssueData =
          response?.data && response?.data?.data[0]?.jiraLeadTime.status === 200
            ? response?.data?.data[0]?.jiraLeadTime?.previousResults?.data[0]?.issueData
            : [];
      assignStandardColors(dataObject && dataObject[0]?.data, true);

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setIssueData(issueDataObject);
        setPreviousResults(previousResultsData);
        setPreviousIssues(previousResultsIssueData);
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

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    //TODO: Do these need to be passed in via object props?
    const MeanLineLayer = ({ nodes, xScale, yScale }) => {
      const lineGenerator = line()
        .x((d) => xScale(d.data.x))
        .y((d) => yScale(d.data.mean));
      return (
        <path
          d={lineGenerator(nodes)}
          fill="none"
          stroke={METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2}
          strokeWidth="3"
        />
      );
    };

    //TODO: Do these need to be passed in via object props?
    // const RollingMeanLineLayer = ({ nodes, xScale, yScale }) => {
    //   const lineGenerator = line()
    //     .x((d) => xScale(d.data.x))
    //     .y((d) => yScale(d.data.rolling_mean));
    //   return (
    //     <path
    //       d={lineGenerator(nodes)}
    //       fill="none"
    //       stroke={METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3}
    //       strokeWidth="2"
    //     />
    //   );
    // };
    const onNodeSelect = (node) => {
      setModalData(
        issueData.filter(function (item) {
          return item.y === node.data.y && item.date_finished === node.data.date_finished;
        })
      );
      setShowModal(true);
    };

    return (
      <>
        <div className="new-chart m-3 p-0" style={{ minheight: "300px", display: "flex" }}>
          <Row>
            <Col xl={3} lg={3} md={4} className={"d-flex align-content-around"}>
              <Row>
                <Col lg={12} className={"my-3"}>
                  <JiraMeanLeadTimeDataBlock data={metrics[0]?.data[0]?.mean} previousData={previousResults?.mean}/>
                </Col>
                <Col lg={12} className={"my-3"}>
                  <JiraIssuesCompletedDataBlock data={issueData?.length} previousData={previousIssues?.length}/>
                </Col>
                <Col lg={12} className={"mb-3"}>
                  <JiraBugsCompletedDataBlock
                    data={
                      issueData?.filter(
                        (item) =>
                          item?.issueType?.toLowerCase() === "bug" || item?.issueType?.toLowerCase() === "defect"
                      ).length
                    }
                    previousData={
                      previousIssues?.filter(
                        (item) =>
                          item?.issueType?.toLowerCase() === "bug" || item?.issueType?.toLowerCase() === "defect"
                      ).length
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col xl={9} lg={9} md={8} className={"my-2 p-2 d-flex flex-column align-items-end"}>
              <div
                className="px-3 font-inter-light-400 dark-gray-text-primary"
                style={{ float: "right", fontSize: "10px" }}
              >
                {/*{` Rolling Mean Lead Time `}*/}
                {/*<IconBase*/}
                {/*  icon={faMinus}*/}
                {/*  iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_3}*/}
                {/*  iconSize={"lg"}*/}
                {/*/>*/}
                {/*<br />*/}
                { `Mean Lead Time `}
                <IconBase
                  icon={faMinus}
                  iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_2}
                  iconSize={"lg"}
                />
                <br />
                {`Issues `}
                <IconBase
                  icon={faCircle}
                  iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1}
                  iconSize={"xs"}
                />
              </div>
              <ResponsiveScatterPlot
                data={metrics}
                {...defaultConfig(
                  "Elapsed Time (Days)",
                  "Completion Date",
                  false,
                  true,
                  "wholeNumbers",
                  "monthDate",
                  false,
                  "circle"
                )}
                {...config(getColor, MeanLineLayer)}
                onClick={(node) => onNodeSelect(node)}
                tooltip={({ node, color }) => (
                  <ChartTooltip
                    titles={["Date Completed", "Lead Time", "Issues Completed"]}
                    values={[
                      String(node.data.date_finished),
                      `${node.data.y} ${node.data.y > 1 ? "days" : "day"}`,
                      String(node.data.count),
                    ]}
                    color={color}
                  />
                )}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  };

  return (
    <div>
      <VanityMetricContainer
        title={"Jira Lead Time"}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        chartHelpComponent={(closeHelpPanel) => <JiraLeadTimeChartHelpDocumentation closeHelpPanel={closeHelpPanel} />}
      />
      <ModalLogs
        header="Jira Lead Time"
        size="lg"
        jsonMessage={modalData}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}
JiraLeadTimeLineChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  nodes: PropTypes.any,
  xScale: PropTypes.any,
  yScale: PropTypes.any,
};

export default JiraLeadTimeLineChart;
