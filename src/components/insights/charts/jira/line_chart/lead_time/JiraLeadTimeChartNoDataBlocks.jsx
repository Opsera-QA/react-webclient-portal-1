import PropTypes from "prop-types";
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import config from "./jiraLeadTimeLineChartConfigs";
import React, {useState, useEffect, useContext, useRef} from "react";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { line } from "d3-shape";
import { defaultConfig, getColor, assignStandardColors, mainPurple, accentColor } from '../../../charts-views';
import ChartTooltip from '../../../ChartTooltip';
import {Col, Row, Container} from "react-bootstrap";
import InputPopover from "components/common/inputs/info_text/InputPopover";
import { faMinus } from "@fortawesome/pro-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

function JiraLeadTimeLineChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [issueData, setIssueData] = useState([]);
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
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "jiraLeadTime", kpiConfiguration, dashboardTags);
      const dataObject = response?.data && response?.data?.data[0]?.jiraLeadTime.status === 200 ? response?.data?.data[0]?.jiraLeadTime?.data : [];
      const issueDataObject = response?.data && response?.data?.data[0]?.jiraLeadTime.status === 200 ? response?.data?.data[0]?.jiraLeadTime?.issueData : [];
      assignStandardColors(dataObject && dataObject[0]?.data, true);

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setIssueData(issueDataObject);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    }
    finally {
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
        .x(d => xScale(d.data.x))
        .y(d => yScale(d.data.mean));
      return (
        <path d={lineGenerator(nodes)} fill="none" stroke={mainPurple} strokeWidth="3" />
      );
    };

    //TODO: Do these need to be passed in via object props?
    const RollingMeanLineLayer = ({ nodes, xScale, yScale }) => {
      const lineGenerator = line()
        .x(d => xScale(d.data.x))
        .y(d => yScale(d.data.rolling_mean));
      return (
        <path d={lineGenerator(nodes)} fill="none" stroke={accentColor} strokeWidth="2" />
      );
    };
    const onNodeSelect = (node) => {
      setModalData(issueData.filter(function (item) {return item.y === node.data.y && item.date_finished === node.data.date_finished;}));
      setShowModal(true);
    };

    const getPopoverBody = () => {
      return (
        <ul>
          <li><span>The purple line represents the average lead time</span></li>
          <li><span>The turquoise line represents the rolling average lead time</span></li>
          <li><span>Each point represents the cluster of issues completed on that specific date in that many days</span></li>
          <li><span>Click on a specific point to see which Jira issues with that lead time were completed that day</span></li>
          <li><span>The default issue displayed is Story. If you are interested in the lead time for a specific Jira issue type (Epic, Bug, etc.), configure in the KPI Settings Form</span></li>
          <li><span>The default completion status is Done. Configure which statuses indicate ticket completion in the KPI Settings Form</span></li>
        </ul>
      );
    };

    return (
      <div className="new-chart mb-3" style={{height: "300px", display:"flex"}}>
        <Col><InputPopover tooltipTitle={"Info"} tooltipBody={getPopoverBody()} /></Col>
        <Col xl={9} md={12} className="p-2">
        <ResponsiveScatterPlot
          data={metrics}
          {...defaultConfig("Elapsed Time (Days)", "Completion Date", 
                      false, true, "wholeNumbers", "monthDate", false, "circle")}
          {...config(getColor, MeanLineLayer, RollingMeanLineLayer)}
          onClick={(node) => onNodeSelect(node)}
          tooltip={({node, color}) => <ChartTooltip 
                                        titles = {["Date Completed", "Lead Time", "Issues Completed"]}
                                        values = {[String(node.data.date_finished), 
                                                  `${node.data.y} ${node.data.y > 1 ? "days" : "day"}`, String(node.data.count)]}
                                        color = {color} />}
        />

        </Col>
        <Container>
          <Row>
            <div className="p-2">
            <IconBase icon={faMinus} iconColor={mainPurple} iconSize={"lg"}/> Mean Lead Time<br />
            <IconBase icon={faMinus} iconColor={accentColor} iconSize={"lg"}/> Rolling Mean Lead Time
            </div>
          </Row>
        </Container>
      </div>
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
        showSettingsToggle={false}
      />
      <ModalLogs header="Lead Time" size="lg" jsonMessage={modalData} dataType="bar" show={showModal} setParentVisibility={setShowModal} />
    </>
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
  yScale: PropTypes.any
};

export default JiraLeadTimeLineChart;
 