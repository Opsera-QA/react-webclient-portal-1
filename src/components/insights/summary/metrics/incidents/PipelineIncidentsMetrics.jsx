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

// TODO: Rework to use new components after release
function PipelineIncidentsMetrics({ dashboardData, toggleDynamicPanel, selectedDataBlock }) {
  const {featureFlagHideItemInProd} = useContext(AuthContext);

  const getChartBody = () => {
    if (dashboardData == null) {
      return null;
    }

    return (
      <HorizontalThreeDataBlockContainer
        topDataBlock={
          <ServiceNowMTTRDataBlock
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
        middleDataBlock={
          <ServiceNowMTTADataBlock
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
        bottomDataBlock={
          <ServiceNowMTBFDataBlock
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
      />
    );
  };

  const getIncidents = () => {
    return (
      <DataBlockWrapper padding={0}>
        <ServiceNowMTTRDataBlock
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <ServiceNowMTTADataBlock
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <ServiceNowMTBFDataBlock
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
      </DataBlockWrapper>
    );
  };

  if (featureFlagHideItemInProd() !== false) {
    return null;
  }

  return (
    <MetricContainer
      chartHelpComponent={(closeHelpPanel) => <InsightsPipelinesOverviewHelpDocumentation closeHelpPanel={closeHelpPanel} />}
      title={"Pipelines: Incidents"}>
      {getIncidents()}
    </MetricContainer>
  );
}

PipelineIncidentsMetrics.propTypes = {
  dashboardData: PropTypes.object,
  toggleDynamicPanel: PropTypes.func,
  selectedDataBlock: PropTypes.string,
};

export default PipelineIncidentsMetrics;
