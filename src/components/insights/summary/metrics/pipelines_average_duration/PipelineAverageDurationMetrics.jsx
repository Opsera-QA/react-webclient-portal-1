import React, {useContext} from "react";
import PropTypes from "prop-types";
import HorizontalThreeDataBlockContainer
  from "components/common/metrics/data_blocks/horizontal/HorizontalThreeDataBlockContainer";
import ExecutedPipelineTotalMetric
  from "components/insights/summary/metrics/pipelines_overview/total_executed/ExecutedPipelineTotalMetric";
import SuccessfulPipelineRunTotalMetric
  from "components/insights/summary/metrics/pipelines_overview/successful_executions/SuccessfulPipelineRunTotalMetric";
import TotalPipelinesFailed
  from "components/insights/summary/metrics/pipelines_overview/total_failed/FailedPipelineRunTotalMetric";
import InsightsPipelinesOverviewHelpDocumentation
  from "components/common/help/documentation/insights/Synopsis/InsightsPipelinesOverviewHelpDocumentation";
import MetricContainer from "components/common/panels/insights/charts/MetricContainer";
import DataBlockWrapper from "components/common/data_boxes/DataBlockWrapper";
import FailedPipelineQualityAndSecurityMetric
  from "components/insights/summary/metrics/pipelines_failure_score/failed_quality_and_security/FailedPipelineQualityAndSecurityMetric";
import PipelinesFailedDeployment
  from "components/insights/summary/metrics/pipelines_failure_score/failed_deployment/FailedPipelineDeploymentMetric";
import StoppedPipelines
  from "components/insights/summary/metrics/pipelines_failure_score/stopped_pipelines/StoppedPipelineCountMetric";
import {AuthContext} from "contexts/AuthContext";
import ServiceNowMeanTimeToResolutionDataBlock
  from "components/insights/summary/metrics/incidents/mean_time_to_resolution/ServiceNowMeanTimeToResolutionDataBlock";
import ServiceNowMeanTimeToAcknowledgeDataBlock
  from "components/insights/summary/metrics/incidents/mean_time_to_acknowledge/ServiceNowMeanTimeToAcknowledgeDataBlock";
import ServiceNowMeanTimeBetweenFailuresDataBlock
  from "components/insights/summary/metrics/incidents/mean_time_between_failures/ServiceNowMeanTimeBetweenFailuresDataBlock";
import AveragePipelineDeploymentDurationMetric
  from "components/insights/summary/metrics/pipelines_average_duration/deployment_duration/AveragePipelineDeploymentDurationMetric";
import AveragePipelineBuildDurationMetric
  from "components/insights/summary/metrics/pipelines_average_duration/build_duration/AveragePipelineBuildDurationMetric";
import AvgApprovalTimeDataBlock
  from "components/insights/summary/metrics/pipelines_average_duration/approval_time/AvgApprovalTime";

// TODO: Rework to use new components after release
function PipelineAverageDurationMetrics({ dashboardData, toggleDynamicPanel, selectedDataBlock }) {
  const {featureFlagHideItemInProd} = useContext(AuthContext);

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

  if (featureFlagHideItemInProd() !== false) {
    return null;
  }

  return (
    <MetricContainer
      // chartHelpComponent={(closeHelpPanel) => <InsightsPipelinesOverviewHelpDocumentation closeHelpPanel={closeHelpPanel} />}
      title={"Pipelines: Average Duration"}>
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
