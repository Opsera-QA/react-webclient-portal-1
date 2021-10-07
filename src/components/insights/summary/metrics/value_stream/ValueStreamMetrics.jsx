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
import JiraLeadTimeDataBlock
  from "components/insights/summary/metrics/value_stream/jira_lead_time/JiraLeadTimeDataBlock";
import DeploymentFrequencyDataBlock
  from "components/insights/summary/metrics/value_stream/deployment_frequency/DeploymentFrequencyDataBlock";
import ChangeFailRateDataBlock
  from "components/insights/summary/metrics/value_stream/change_fail_rate/ChangeFailRateDataBlock";

// TODO: Rework to use new components after release
function ValueStreamMetrics({ dashboardData, toggleDynamicPanel, selectedDataBlock }) {
  const getChartBody = () => {
    if (dashboardData == null) {
      return null;
    }

    return (
      <ThreeStackedHorizontalMetricsContainer
        topDataBlock={
          <JiraLeadTimeDataBlock
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{width:"33%"}}
          />
        }
        middleDataBlock={
          <DeploymentFrequencyDataBlock
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
        bottomDataBlock={
          <ChangeFailRateDataBlock
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

  const getValueStreamBody = () => {
    return (
      <DataBlockWrapper padding={0}>
        <JiraLeadTimeDataBlock
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{width:"33%"}}
        />
        <DeploymentFrequencyDataBlock
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <ChangeFailRateDataBlock
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
      title={"Value Stream"}>
      {getValueStreamBody()}
    </MetricContainer>
  );
}

ValueStreamMetrics.propTypes = {
  dashboardData: PropTypes.object,
  toggleDynamicPanel: PropTypes.func,
  selectedDataBlock: PropTypes.string,
};

export default ValueStreamMetrics;
