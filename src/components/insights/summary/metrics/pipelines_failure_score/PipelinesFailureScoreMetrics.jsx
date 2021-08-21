import React from "react";
import PropTypes from "prop-types";
import HorizontalThreeDataBlockContainer
  from "components/common/metrics/data_blocks/horizontal/HorizontalThreeDataBlockContainer";
import TotalPipelinesExecuted
  from "components/insights/summary/metrics/pipelines_overview/total_executed/TotalPipelinesExecuted";
import PipelinesSuccessfulExecutions
  from "components/insights/summary/metrics/pipelines_overview/successful_executions/PipelinesSuccessfulExecutions";
import TotalPipelinesFailed
  from "components/insights/summary/metrics/pipelines_overview/total_failed/TotalpipelinesFailed";
import InsightsPipelinesOverviewHelpDocumentation
  from "components/common/help/documentation/insights/Synopsis/InsightsPipelinesOverviewHelpDocumentation";
import MetricContainer from "components/common/panels/insights/charts/MetricContainer";
import DataBlockWrapper from "components/common/data_boxes/DataBlockWrapper";
import PipelineFailedQualityAndSecurity
  from "components/insights/summary/metrics/pipelines_failure_score/failed_quality_and_security/PipelineFailedQualityAndSecurity";
import PipelinesFailedDeployment
  from "components/insights/summary/metrics/pipelines_failure_score/failed_deployment/PipelinesFailedDeployment";
import StoppedPipelines
  from "components/insights/summary/metrics/pipelines_failure_score/stopped_pipelines/StoppedPipelinesDataBlock";

// TODO: Rework to use new components after release
function PipelinesFailureScoreMetrics({ dashboardData, toggleDynamicPanel, selectedDataBlock }) {
  const getChartBody = () => {
    if (dashboardData == null) {
      return null;
    }

    return (
      <HorizontalThreeDataBlockContainer
        topDataBlock={
          <PipelineFailedQualityAndSecurity
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
        <PipelineFailedQualityAndSecurity
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
