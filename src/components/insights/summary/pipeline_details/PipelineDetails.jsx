import React, { useState } from "react";
import PropTypes from "prop-types";
import TotalPipelinesExecuted from "components/insights/summary/TotalPipelinesExecuted";
import PipelinesPassedWithQualityAndSecurity from "components/insights/summary/pipeline_details/PipelinesPassedWithQualityAndSecurity";
import PipelinesFailedSecurity from "components/insights/summary/pipeline_details/PipelinesFailedSecurity";
import PipelinesFailedQuality from "components/insights/summary/pipeline_details/PipelinesFailedQuality";
import PipelinesFailedDeployment from "components/insights/summary/pipeline_details/PipelinesFailedDeployment";
import DataBlockWrapper from "components/common/data_boxes/DataBlockWrapper";
import InsightsPipelineDetailsTable from "components/insights/summary/pipeline_details/InsightsPipelineDetailsTable";
import InsightsPipelineDetailsDurationTable from "components/insights/summary/pipeline_details/InsightsPipelineDetailsDurationTable";
import PipelinesByProjectTable from "components/insights/summary/PipelinesByProjectTable";
import TotalPipelinesPassedDeployment from 'components/insights/summary/pipeline_details/TotalPipelinesPassedDeployment';
import MetricContainer from "components/common/panels/insights/charts/MetricContainer";
import JiraLeadTimeChartNoDataBlocks from "components/insights/charts/jira/line_chart/lead_time/JiraLeadTimeChartNoDataBlocks"; 
import JiraLeadTimeDataBlock from "./JiraLeadTimeDataBlock";
import AvgDeploymentDuration from "components/insights/summary/pipeline_details/AvgDeploymentDuration";

function PipelineDetails({ dashboardData }) {
  const [selectedDataBlock, setSelectedDataBlock] = useState("");
  const [selectedDataBlockTableData, setSelectedDataBlockTableData] = useState([]);

  const getDynamicPanel = () => {
    switch (selectedDataBlock) {
      case "pipelines_by_project":
        return (
          <PipelinesByProjectTable
            dashboardData={selectedDataBlockTableData}
          />
        );
      case "total_pipelines":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Pipelines Executed"
          />
        );
      case "successful_pipelines":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Successful Pipelines (Security and Quality)"
          />
        );
      case "security_failed":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Pipelines Failing Security Step"
          />
        );
      case "quality_failed":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Pipelines Failing Quality Step"
          />
        );
      case "deployment_failed":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Pipelines Failing Deployment Step"
          />
        );
      case "successful_pipelines_deployment":
        return(
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Successful Pipelines (Deployments)"
          />
        );
      case "jiraLeadTime":
        return (
          <JiraLeadTimeChartNoDataBlocks dashboardData={dashboardData} kpiConfiguration={{kpi_name: "Lead Time", filters: []}}/>
        );
      case "Average_Deployment_Duration":
        return (
          <InsightsPipelineDetailsDurationTable
            data={selectedDataBlockTableData}
            tableTitle="Deployment Duration"
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
    }
    else {
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
          style={{maxWidth:"33%"}}
        />
        <PipelinesPassedWithQualityAndSecurity
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{maxWidth:"33%"}}
        />
        <TotalPipelinesPassedDeployment
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{maxWidth:"33%"}}
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
          style={{maxWidth:"33%"}}
        />
        <PipelinesFailedSecurity
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{maxWidth:"33%"}}
        />
        <PipelinesFailedDeployment
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{maxWidth:"33%"}}
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
          style={{maxWidth:"33%"}}
        />
      </DataBlockWrapper>
    );
  };
  const getAverageBlocks = ()=>{
    return (
      <DataBlockWrapper padding={0}>
        <AvgDeploymentDuration 
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{maxWidth:"33%"}}
        />
      </DataBlockWrapper>
    );
  };

  return (
    <>
      <div className={"d-flex flex-wrap justify-content-around w-100"} >
        <MetricContainer title="Pipelines: Success Score">
          {getPipelinesSuccess()}
        </MetricContainer>
        <MetricContainer title="Pipelines: Failure Score">
          {getPipelinesFailure()}
        </MetricContainer>
        <MetricContainer title="Value Stream">
          {getValueStream()}
        </MetricContainer>
        <MetricContainer title="Pipeline: Duration Average">
          {getAverageBlocks()}
        </MetricContainer>
      </div>

      {getDynamicPanel()}
    </>
  );
}

PipelineDetails.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default PipelineDetails;
