import React from "react";
import PropTypes from "prop-types";
import ThreeStackedHorizontalMetricsContainer
  from "components/common/metrics/data_blocks/horizontal/ThreeStackedHorizontalMetricsContainer";
import ExecutedPipelineTotalMetric
  from "components/insights/summary/metrics/pipelines_overview/total_executed/ExecutedPipelineTotalMetric";
import SuccessfulPipelineRunTotalMetric
  from "components/insights/summary/metrics/pipelines_overview/successful_executions/SuccessfulPipelineRunTotalMetric";
import TotalPipelinesFailed
  from "components/insights/summary/metrics/pipelines_overview/total_failed/FailedPipelineRunTotalMetric";
import InsightsPipelinesOverviewHelpDocumentation
  from "components/common/help/documentation/insights/synopsis/InsightsPipelinesOverviewHelpDocumentation";
import MetricContainer from "components/common/panels/insights/charts/MetricContainer";
import DataBlockWrapper from "components/common/data_boxes/DataBlockWrapper";

// TODO: Rework to use new components after release
function PipelinesOverviewMetrics({ dashboardData, toggleDynamicPanel, selectedDataBlock }) {
  const getChartBody = () => {
    if (dashboardData == null) {
      return null;
    }

    return (
      <ThreeStackedHorizontalMetricsContainer
        topDataBlock={
          <ExecutedPipelineTotalMetric
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
        middleDataBlock={
          <SuccessfulPipelineRunTotalMetric
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
        bottomDataBlock={
          <TotalPipelinesFailed
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
      />
    );
  };

  const getPipelinesOverview = () => {
    return (
      <DataBlockWrapper padding={0}>
        <ExecutedPipelineTotalMetric
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <SuccessfulPipelineRunTotalMetric
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <TotalPipelinesFailed
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
      </DataBlockWrapper>
    );
  };

  return (
    <MetricContainer
      chartHelpComponent={(closeHelpPanel) => <InsightsPipelinesOverviewHelpDocumentation closeHelpPanel={closeHelpPanel} />}
      title="Pipelines: Overview">
      {getPipelinesOverview()}
    </MetricContainer>
  );
}

PipelinesOverviewMetrics.propTypes = {
  dashboardData: PropTypes.object,
  toggleDynamicPanel: PropTypes.func,
  selectedDataBlock: PropTypes.string,
};

export default PipelinesOverviewMetrics;
