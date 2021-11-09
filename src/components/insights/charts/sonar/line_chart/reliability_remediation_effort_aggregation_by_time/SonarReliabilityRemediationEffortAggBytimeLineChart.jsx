import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "components/insights/charts/sonar/line_chart/reliability_remediation_effort_aggregation_by_time/SonarReliabilityRemediationEffortAggBytimeLineChartConfigs";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { defaultConfig, getColor, assignStandardColors, shortenLegend } from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import VanityTable from "components/common/table/VanityTable";
import { getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import { DialogToastContext } from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/vanity-table-filter-metadata";
import FilterContainer from "components/common/table/FilterContainer";
import { faDraftingCompass, faTable } from "@fortawesome/pro-light-svg-icons";
import { getTableDateTimeColumn } from "components/common/table/column_definitions/model-table-column-definitions";

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
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  let toastContext = useContext(DialogToastContext);
  const [filterDto, setFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, genericChartFilterMetadata, false)
  );

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
    getTableDateTimeColumn(getField(fields, "date")),
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
        dashboardTags,
        filterDto
      );
      const insightsDataObject =
        insightsResponse?.data &&
        insightsResponse?.data?.data[0]?.sonarReliabilityRemediationEffortAggByTimeActIns?.status === 200
          ? insightsResponse?.data?.data[0]?.sonarReliabilityRemediationEffortAggByTimeActIns?.data[0]?.data
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
    if (insights?.length) {
      for (let thisDateObject of insights) {
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

  const getTable = (projects) => {
    return (
      <VanityTable
        isLoading={isLoading}
        columns={columns}
        data={projects}
        noDataMessage={"No Insights are available for this chart at this time"}
        paginationModel={filterDto}
        setPaginationModel={setFilterDto}
        loadData={loadData}
        scrollOnLoad={false}
        onRowSelect={onRowSelect}
      />
    );
  };

  const getBody = (thisDataPoint) => {
    let date = thisDataPoint?.data?.xFormatted;
    let projects = getProjectsFromDate(date);
    let newFilterDto = filterDto;
    newFilterDto.setData("totalCount", projects?.length);
    setFilterDto({ ...newFilterDto });

    return (
      <FilterContainer
        isLoading={isLoading}
        showBorder={false}
        title={`Pipelines`}
        titleIcon={faDraftingCompass}
        body={getTable(projects)}
        className={"px-2 pb-2"}
      />
    );
  };

  const onClickHandler = (thisDataPoint) => {
    let date = thisDataPoint?.data?.xFormatted;
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Sonar Reliability Remediation for [${date}]`}
        showToasts={true}
        titleIcon={faTable}
        isLoading={false}
        linkTooltipText={"View Full Blueprint"}
      >
        <div className={"p-3"}>{getBody(thisDataPoint)}</div>
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
