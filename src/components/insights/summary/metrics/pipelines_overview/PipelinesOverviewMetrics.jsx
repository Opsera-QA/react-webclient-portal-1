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

// TODO: Rework to use new components after release
function PipelinesOverviewMetrics({ dashboardData, toggleDynamicPanel, selectedDataBlock }) {
  const getChartBody = () => {
    if (dashboardData == null) {
      return null;
    }

    return (
      <HorizontalThreeDataBlockContainer
        topDataBlock={
          <TotalPipelinesExecuted
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
        middleDataBlock={
          <PipelinesSuccessfulExecutions
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
        <TotalPipelinesExecuted
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <PipelinesSuccessfulExecutions
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
      // chartHelpComponent={(closeHelpPanel) => <InsightsPipelinesOverviewHelpDocumentation closeHelpPanel={closeHelpPanel} />}
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
