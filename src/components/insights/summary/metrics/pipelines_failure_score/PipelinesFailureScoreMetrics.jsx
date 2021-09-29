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
import FailedPipelineQualityAndSecurityMetric
  from "components/insights/summary/metrics/pipelines_failure_score/failed_quality_and_security/FailedPipelineQualityAndSecurityMetric";
import PipelinesFailedDeployment
  from "components/insights/summary/metrics/pipelines_failure_score/failed_deployment/FailedPipelineDeploymentMetric";
import StoppedPipelines
  from "components/insights/summary/metrics/pipelines_failure_score/stopped_pipelines/StoppedPipelineCountMetric";

// TODO: Rework to use new components after release
function PipelinesFailureScoreMetrics({ dashboardData, toggleDynamicPanel, selectedDataBlock }) {
  const getChartBody = () => {
    if (dashboardData == null) {
      return null;
    }

    return (
      <ThreeStackedHorizontalMetricsContainer
        topDataBlock={
          <FailedPipelineQualityAndSecurityMetric
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
        middleDataBlock={
          <PipelinesFailedDeployment
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
        bottomDataBlock={
          <StoppedPipelines
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
            disable={true}
          />
        }
      />
    );
  };

  const getFailedPipelinesOverview = () => {
    return (
      <DataBlockWrapper padding={0}>
        <FailedPipelineQualityAndSecurityMetric
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <PipelinesFailedDeployment
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <StoppedPipelines
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
          disable={true}
        />
      </DataBlockWrapper>
    );
  };

  return (
    <MetricContainer
      // chartHelpComponent={(closeHelpPanel) => <InsightsPipelinesOverviewHelpDocumentation closeHelpPanel={closeHelpPanel} />}
      title={"Pipelines: Failure Score"}>
      {getFailedPipelinesOverview()}
    </MetricContainer>
  );
}

PipelinesFailureScoreMetrics.propTypes = {
  dashboardData: PropTypes.object,
  toggleDynamicPanel: PropTypes.func,
  selectedDataBlock: PropTypes.string,
};

export default PipelinesFailureScoreMetrics;
