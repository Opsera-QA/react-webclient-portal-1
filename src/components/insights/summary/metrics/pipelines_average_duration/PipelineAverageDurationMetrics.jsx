import React, {useContext} from "react";
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
import {AuthContext} from "contexts/AuthContext";
import ServiceNowMTTRDataBlock
  from "components/insights/summary/metrics/incidents/mean_time_to_resolution/ServiceNowMTTRDataBlock";
import ServiceNowMTTADataBlock
  from "components/insights/summary/metrics/incidents/mean_time_to_acknowledge/ServiceNowMTTADataBlock";
import ServiceNowMTBFDataBlock
  from "components/insights/summary/metrics/incidents/mean_time_between_failures/ServiceNowMTBFDataBlock";
import AvgDeploymentDuration
  from "components/insights/summary/metrics/pipelines_average_duration/deployment_duration/AvgDeploymentDuration";
import AvgBuildDuration
  from "components/insights/summary/metrics/pipelines_average_duration/build_duration/AvgBuildDuration";
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
          <AvgDeploymentDuration
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
        middleDataBlock={
          <AvgBuildDuration
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
        <AvgDeploymentDuration
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <AvgBuildDuration
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
