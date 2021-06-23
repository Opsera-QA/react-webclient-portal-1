import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./SonarReliabilityRemediationEffortAggBytimeLineChartConfigs";
import React, { useState, useEffect, useContext, useRef } from "react";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { defaultConfig, getColor, assignStandardColors, shortenLegend } from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import VanityTable from "components/common/table/VanityTable";
import LoadingDialog from "components/common/status_notifications/loading";
import { getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import { DialogToastContext } from "contexts/DialogToastContext";

function SonarReliabilityRemediationEffortAggBytimeLineChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  let toastContext = useContext(DialogToastContext);
  const fields = [
    { id: "pipelineName", label: "Pipeline Name" },
    { id: "run_count", label: "Run Count" },
    { id: "project", label: "Project" },
    { id: "date", label: "Date" },
  ];
  const columns = [
    getTableTextColumn(getField(fields, "pipelineName")),
    getTableTextColumn(getField(fields, "run_count")),
    getTableTextColumn(getField(fields, "project")),
    getTableTextColumn(getField(fields, "date")),
  ];

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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sonarReliabilityRemediationEffortAggregattionByTime",
        kpiConfiguration,
        dashboardTags
      );
      const dataObject =
        response?.data && response?.data?.data[0]?.sonarReliabilityRemediationEffortAggregattionByTime?.status === 200
          ? response?.data?.data[0]?.sonarReliabilityRemediationEffortAggregattionByTime?.data
          : [];

      // API for Actionable insights
      const insightsResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sonarReliabilityRemediationEffortAggByTimeActIns",
        kpiConfiguration,
        dashboardTags
      );
      const insightsDataObject =
        insightsResponse?.data &&
        insightsResponse?.data?.data[0]?.sonarReliabilityRemediationEffortAggByTimeActIns?.status === 200
          ? insightsResponse?.data?.data[0]?.sonarReliabilityRemediationEffortAggByTimeActIns?.data
          : [];

      assignStandardColors(dataObject);
      shortenLegend(dataObject);

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        if (insightsDataObject) {
          setInsights(insightsDataObject);
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

  const getProjectsFromDate = (date) => {
    let projectsData = insights[0]?.data;
    if (projectsData?.length) {
      for (let thisDateObject of projectsData) {
        if (thisDateObject?.id === date) {
          if (thisDateObject?.data) {
            return thisDateObject.data;
          }
        }
      }
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const onRowSelect = (grid, row) => {
    toastContext.showOverlayPanel(<BlueprintLogOverlay pipelineId={row?.pipelineId} runCount={row?.run_count} />);
  };

  const getBody = (projects) => {
    if (isLoading) {
      return <LoadingDialog size={"sm"} message={"Loading Data"} />;
    }
    return <VanityTable className={"no-table-border"} data={projects} columns={columns} onRowSelect={onRowSelect} />;
  };

  const onClickHandler = (thisDataPoint) => {
    let date = thisDataPoint?.data?.xFormatted;
    let projects = getProjectsFromDate(date);
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={date}
        showToasts={true}
        isLoading={false}
        linkTooltipText={"View Full Blueprint"}
      >
        <div className={"p-3"}>{getBody(projects)}</div>
      </FullScreenCenterOverlayContainer>
    );
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{ height: "300px" }}>
        <ResponsiveLine
          data={metrics}
          {...defaultConfig("Remediation Effort Required (min)", "Date", false, true, "wholeNumbers", "monthDate")}
          {...config(getColor)}
          onClick={(thisDataPoint) => onClickHandler(thisDataPoint)}
          tooltip={(node) => (
            <ChartTooltip
              titles={["Date", "Remediation Effort Required"]}
              values={[node.point.data.xFormatted, String(node.point.data.yFormatted) + " minutes"]}
            />
          )}
        />
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
      />
      <ModalLogs
        header={"Sonar Reliability Remediation Over Time"}
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

SonarReliabilityRemediationEffortAggBytimeLineChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  sonarMeasure: PropTypes.string,
};

export default SonarReliabilityRemediationEffortAggBytimeLineChart;
