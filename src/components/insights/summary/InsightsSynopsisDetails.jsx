import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Opsera Pipeline
import InsightsPipelineDetailsTable from "components/insights/summary/metrics/InsightsPipelineDetailsTable";
import InsightsPipelineDetailsDurationTable from "components/insights/summary/metrics/pipelines_average_duration/InsightsPipelineDetailsDurationTable";
import PipelinesByProjectTable from "components/insights/summary/metrics/legacy/pipelines_by_project/PipelinesByProjectTable";

// JIRA
import JiraLeadTimeChartNoDataBlocks from "components/insights/charts/jira/line_chart/lead_time/JiraLeadTimeChartNoDataBlocks";

// Service Now
import ServiceNowMeanTimeToResolutionBarChart from "components/insights/charts/servicenow/bar_chart/mean_time_to_resolution/ServiceNowMeanTimeToResolutionBarChart";
import ServiceNowMeanTimeToAcknowledgeBarChart from "components/insights/charts/servicenow/bar_chart/mean_time_to_acknowledge/ServiceNowMeanTimeToAcknowledgeBarChart";
import ServiceNowMeanTimeBetweenFailuresBarChart from "components/insights/charts/servicenow/bar_chart/mean_time_between_failures/ServiceNowMeanTimeBetweenFailuresBarChart";

import PipelinesOverviewMetrics from "components/insights/summary/metrics/pipelines_overview/PipelinesOverviewMetrics";
import PipelinesFailureScoreMetrics
  from "components/insights/summary/metrics/pipelines_failure_score/PipelinesFailureScoreMetrics";
import ValueStreamMetrics from "components/insights/summary/metrics/value_stream/ValueStreamMetrics";
import PipelineIncidentsMetrics from "components/insights/summary/metrics/incidents/PipelineIncidentsMetrics";
import PipelineAverageDurationMetrics
  from "components/insights/summary/metrics/pipelines_average_duration/PipelineAverageDurationMetrics";

function InsightsSynopsisDetails({ dashboardData }) {
  const [selectedDataBlock, setSelectedDataBlock] = useState("");
  const [selectedDataBlockTableData, setSelectedDataBlockTableData] = useState([]);

  useEffect(() => {
    setSelectedDataBlock("");
    setSelectedDataBlockTableData([]);
  }, [dashboardData]);

  // TODO: Why are the selection items inconsistent? they should all be lowercase and separated by underscores.
  const getDynamicPanel = () => {
    switch (selectedDataBlock) {
      // Legacy
      case "pipelines_by_project":
        return <PipelinesByProjectTable dashboardData={selectedDataBlockTableData} />;

      // Pipelines: Overview
      case "total_pipelines":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Total Number of Pipelines Executed"
          />
        );
      case "successful_pipelines":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Successful Pipeline Executions"
          />
        );
      case "failed_pipeline_executions":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Failed Pipeline Executions"
          />
        );


        //Pipelines: Failure Score
      case "deployment_failed":
        return (
          <InsightsPipelineDetailsTable data={selectedDataBlockTableData} tableTitle="Failed Pipelines (Deployments)" />
        );
      case "Stopped_Pipelines":
        return (
          <InsightsPipelineDetailsTable data={selectedDataBlockTableData} tableTitle="Stopped Pipelines" />
        );
      case "quality_security_failed":
        return (
          <InsightsPipelineDetailsTable data={selectedDataBlockTableData} tableTitle="Failed Pipelines (Quality & Security)" />
        );

        //Value Stream
      case "deployment_frequency":
        return (
          <InsightsPipelineDetailsTable data={selectedDataBlockTableData} tableTitle="Deployment Frequency" />
        );
      case "jiraLeadTime":
        return (
          <JiraLeadTimeChartNoDataBlocks
            dashboardData={dashboardData}
            kpiConfiguration={{ kpi_name: "Lead Time", filters: [] }}
          />
        );

        //Pipeline: Duration Average
      case "Average_Deployment_Duration":
        return (
          <InsightsPipelineDetailsDurationTable
            data={selectedDataBlockTableData}
            tableTitle="Average Deployment Duration (Mins)"
          />
        );
      case "Average_Build_Duration": {
        return <InsightsPipelineDetailsDurationTable data={selectedDataBlockTableData} tableTitle="Average Build Duration (Mins)" />;
      }

      // Incidents
      case "serviceNowMTTR":
        return (
          <ServiceNowMeanTimeToResolutionBarChart
            dashboardData={dashboardData}
            kpiConfiguration={{ kpi_name: "Service Now Mean Time to Resolution", filters: [] }}
            showSettingsToggle={false}
          />
        );
      case "serviceNowMTTA":
        return (
          <ServiceNowMeanTimeToAcknowledgeBarChart
            dashboardData={dashboardData}
            kpiConfiguration={{ kpi_name: "Service Now Mean Time to Acknowledgement", filters: [] }}
            showSettingsToggle={false}
          />
        );
      case "serviceNowMTBF":
        return (
          <ServiceNowMeanTimeBetweenFailuresBarChart
            dashboardData={dashboardData}
            kpiConfiguration={{ kpi_name: "Service Now Mean Time Between Failures", filters: [] }}
            showSettingsToggle={false}
          />
        );
      default:
        return null;
    }
  };

  const toggleDynamicPanel = (name, dataSet) => {
    if (selectedDataBlock === name) {
      setSelectedDataBlock("");
      setSelectedDataBlockTableData([]);
    } else {
      setSelectedDataBlock(name);
      setSelectedDataBlockTableData(dataSet);
    }
  };

  return (
    <div>
      <div className={"d-flex flex-wrap justify-content-around w-100"}>
        <PipelinesOverviewMetrics
          dashboardData={dashboardData}
          selectedDataBlock={selectedDataBlock}
          toggleDynamicPanel={toggleDynamicPanel}
        />
        <PipelinesFailureScoreMetrics
          dashboardData={dashboardData}
          selectedDataBlock={selectedDataBlock}
          toggleDynamicPanel={toggleDynamicPanel}
        />
        <ValueStreamMetrics
          dashboardData={dashboardData}
          selectedDataBlock={selectedDataBlock}
          toggleDynamicPanel={toggleDynamicPanel}
        />
        <PipelineAverageDurationMetrics
          dashboardData={dashboardData}
          selectedDataBlock={selectedDataBlock}
          toggleDynamicPanel={toggleDynamicPanel}
        />
        <PipelineIncidentsMetrics
          dashboardData={dashboardData}
          selectedDataBlock={selectedDataBlock}
          toggleDynamicPanel={toggleDynamicPanel}
        />
      </div>

      {getDynamicPanel()}
    </div>
  );
}

InsightsSynopsisDetails.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default InsightsSynopsisDetails;
