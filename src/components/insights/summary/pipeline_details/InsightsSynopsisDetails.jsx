import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DataBlockWrapper from "components/common/data_boxes/DataBlockWrapper";
import MetricContainer from "components/common/panels/insights/charts/MetricContainer";

// Opsera Pipeline
import TotalPipelinesExecuted from "components/insights/summary/pipeline_details/charts/TotalPipelinesExecuted";
import PipelinesSuccessfulExecutions from "components/insights/summary/pipeline_details/charts/PipelinesSuccessfulExecutions";
import PipelinesFailedSecurity from "components/insights/summary/pipeline_details/charts/PipelinesFailedSecurity";
import PipelinesFailedQuality from "components/insights/summary/pipeline_details/charts/PipelinesFailedQuality";
import PipelinesFailedDeployment from "components/insights/summary/pipeline_details/charts/PipelinesFailedDeployment";
import InsightsPipelineDetailsTable from "components/insights/summary/pipeline_details/InsightsPipelineDetailsTable";
import InsightsPipelineDetailsDurationTable from "components/insights/summary/pipeline_details/InsightsPipelineDetailsDurationTable";
import PipelinesByProjectTable from "components/insights/summary/PipelinesByProjectTable";
import TotalPipelinesFailed from "components/insights/summary/pipeline_details/charts/TotalpipelinesFailed";
import AvgDeploymentDuration from "components/insights/summary/pipeline_details/AvgDeploymentDuration";
import AvgBuildDuration from "components/insights/summary/pipeline_details/AvgBuildDuration";
import AvgApprovalTimeDataBlock from "components/insights/summary/pipeline_details/AvgApprovalTime";

// JIRA
import JiraLeadTimeChartNoDataBlocks from "components/insights/charts/jira/line_chart/lead_time/JiraLeadTimeChartNoDataBlocks";
import JiraLeadTimeDataBlock from "./JiraLeadTimeDataBlock";
import ChangeFailRateDataBlock from "components/insights/summary/pipeline_details/ChangeFailRateDataBlock";

// Service Now
import ServiceNowMTTRDataBlock from "./ServiceNowMTTRDataBlock";
import ServiceNowMeanTimeToResolutionBarChart from "components/insights/charts/servicenow/bar_chart/mean_time_to_resolution/ServiceNowMeanTimeToResolutionBarChart";
import ServiceNowMTTADataBlock from "./ServiceNowMTTADataBlock";
import ServiceNowMeanTimeToAcknowledgeBarChart from "components/insights/charts/servicenow/bar_chart/mean_time_to_acknowledge/ServiceNowMeanTimeToAcknowledgeBarChart";
import ServiceNowMTBFDataBlock from "./ServiceNowMTBFDataBlock";
import ServiceNowMeanTimeBetweenFailuresBarChart from "components/insights/charts/servicenow/bar_chart/mean_time_between_failures/ServiceNowMeanTimeBetweenFailuresBarChart";

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
      case "pipelines_by_project":
        return <PipelinesByProjectTable dashboardData={selectedDataBlockTableData} />;
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
      case "security_failed":
        return (
          <InsightsPipelineDetailsTable data={selectedDataBlockTableData} tableTitle="Failed Pipelines (Security)" />
        );
      case "quality_failed":
        return (
          <InsightsPipelineDetailsTable data={selectedDataBlockTableData} tableTitle="Failed Pipelines (Quality)" />
        );
      case "deployment_failed":
        return (
          <InsightsPipelineDetailsTable data={selectedDataBlockTableData} tableTitle="Failed Pipelines (Deployments)" />
        );
      case "failed_pipeline_executions":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Failed Pipeline Executions"
          />
        );
      case "jiraLeadTime":
        return (
          <JiraLeadTimeChartNoDataBlocks
            dashboardData={dashboardData}
            kpiConfiguration={{ kpi_name: "Lead Time", filters: [] }}
          />
        );
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

  const getPipelinesSuccess = () => {
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

  const getPipelinesFailure = () => {
    return (
      <DataBlockWrapper padding={0}>
        <PipelinesFailedQuality
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ width: "33%" }}
        />
        <PipelinesFailedSecurity
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
      </DataBlockWrapper>
    );
  };
  const getValueStream = () => {
    return (
      <DataBlockWrapper padding={0}>
        <JiraLeadTimeDataBlock
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{width:"33%"}}
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
  const getAverageBlocks = () => {
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

  return (
    <>
      <div className={"d-flex flex-wrap justify-content-around w-100"}>
        <MetricContainer title="Pipelines : Overview">{getPipelinesSuccess()}</MetricContainer>
        <MetricContainer title="Pipelines: Failure Score">{getPipelinesFailure()}</MetricContainer>
        <MetricContainer title="Value Stream">
          {getValueStream()}
        </MetricContainer>
        <MetricContainer title="Pipeline: Duration Average">{getAverageBlocks()}</MetricContainer>
        {/* <MetricContainer title="Incidents">{getIncidents()}</MetricContainer> */}
      </div>

      {getDynamicPanel()}
    </>
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
