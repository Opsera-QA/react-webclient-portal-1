import React from "react";
import PropTypes from "prop-types";
import HorizontalThreeDataBlockContainer from "components/common/metrics/data_blocks/horizontal/HorizontalThreeDataBlockContainer";
import MetricContainer from "components/common/panels/insights/charts/MetricContainer";
import DataBlockWrapper from "components/common/data_boxes/DataBlockWrapper";
import AveragePipelineDeploymentDurationMetric from "components/insights/summary/metrics/pipelines_average_duration/deployment_duration/AveragePipelineDeploymentDurationMetric";
import AveragePipelineBuildDurationMetric from "components/insights/summary/metrics/pipelines_average_duration/build_duration/AveragePipelineBuildDurationMetric";
import AvgApprovalTimeDataBlock from "components/insights/summary/metrics/pipelines_average_duration/approval_time/AvgApprovalTime";

// TODO: Rework to use new components after release
function PipelineAverageDurationMetrics({ dashboardData, toggleDynamicPanel, selectedDataBlock }) {
  const getChartBody = () => {
    if (dashboardData == null) {
      return null;
    }

    return (
      <HorizontalThreeDataBlockContainer
        topDataBlock={
          <AveragePipelineDeploymentDurationMetric
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
        middleDataBlock={
          <AveragePipelineBuildDurationMetric
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
        bottomDataBlock={
          <AvgApprovalTimeDataBlock
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

  const getIncidents = () => {
    return (
      <DataBlockWrapper padding={0}>
        <AveragePipelineDeploymentDurationMetric
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <AveragePipelineBuildDurationMetric
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <AvgApprovalTimeDataBlock
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
      title={"Pipelines: Average Duration"}
    >
      {getIncidents()}
    </MetricContainer>
  );
}

PipelineAverageDurationMetrics.propTypes = {
  dashboardData: PropTypes.object,
  toggleDynamicPanel: PropTypes.func,
  selectedDataBlock: PropTypes.string,
};

export default PipelineAverageDurationMetrics;
