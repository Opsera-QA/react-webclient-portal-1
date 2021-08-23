import React, {useContext} from "react";
import PropTypes from "prop-types";
import HorizontalThreeDataBlockContainer
  from "components/common/metrics/data_blocks/horizontal/HorizontalThreeDataBlockContainer";
import InsightsPipelinesOverviewHelpDocumentation
  from "components/common/help/documentation/insights/Synopsis/InsightsPipelinesOverviewHelpDocumentation";
import MetricContainer from "components/common/panels/insights/charts/MetricContainer";
import DataBlockWrapper from "components/common/data_boxes/DataBlockWrapper";
import {AuthContext} from "contexts/AuthContext";
import ServiceNowMeanTimeToResolutionDataBlock
  from "components/insights/summary/metrics/incidents/mean_time_to_resolution/ServiceNowMeanTimeToResolutionDataBlock";
import ServiceNowMeanTimeToAcknowledgeDataBlock
  from "components/insights/summary/metrics/incidents/mean_time_to_acknowledge/ServiceNowMeanTimeToAcknowledgeDataBlock";
import ServiceNowMeanTimeBetweenFailuresDataBlock
  from "components/insights/summary/metrics/incidents/mean_time_between_failures/ServiceNowMeanTimeBetweenFailuresDataBlock";

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
          <ServiceNowMeanTimeToResolutionDataBlock
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
        middleDataBlock={
          <ServiceNowMeanTimeToAcknowledgeDataBlock
            dashboardData={dashboardData}
            toggleDynamicPanel={toggleDynamicPanel}
            selectedDataBlock={selectedDataBlock}
            style={{ width: "33%" }}
          />
        }
        bottomDataBlock={
          <ServiceNowMeanTimeBetweenFailuresDataBlock
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
        <ServiceNowMeanTimeToResolutionDataBlock
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <ServiceNowMeanTimeToAcknowledgeDataBlock
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <ServiceNowMeanTimeBetweenFailuresDataBlock
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
